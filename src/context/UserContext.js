import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    // Current User Session
    const [user, setUser] = useState(null); // { name, email, riskScore, complianceScore }

    // Food List State
    const [foodList, setFoodList] = useState([]);

    // Loading State
    const [isLoading, setIsLoading] = useState(true);

    // Initial Load
    useEffect(() => {
        const loadSession = async () => {
            try {
                // Check if there is an active session
                const sessionUser = await AsyncStorage.getItem('currentUser');
                if (sessionUser) {
                    const parsedUser = JSON.parse(sessionUser);
                    setUser(parsedUser);

                    // Load user specific data
                    await loadUserData(parsedUser.email);
                }
            } catch (error) {
                console.error("Session load error", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadSession();
    }, []);

    // Helper to load specific user data
    const loadUserData = async (email) => {
        try {
            const storedFood = await AsyncStorage.getItem(`foodList_${email}`);
            const storedRisk = await AsyncStorage.getItem(`riskScore_${email}`);
            const storedCompliance = await AsyncStorage.getItem(`complianceScore_${email}`);
            const storedSteps = await AsyncStorage.getItem(`dailySteps_${email}`);
            const storedHistory = await AsyncStorage.getItem(`activityHistory_${email}`);
            const storedLastDate = await AsyncStorage.getItem(`lastSyncDate_${email}`);

            if (storedFood) setFoodList(JSON.parse(storedFood));
            else setFoodList([]);

            // Initialize User State Updates
            let updates = {};

            if (storedRisk) updates.riskScore = JSON.parse(storedRisk);
            if (storedCompliance) updates.complianceScore = JSON.parse(storedCompliance);

            // History & Date Logic
            let history = storedHistory ? JSON.parse(storedHistory) : [];
            let lastDate = storedLastDate || new Date().toISOString().split('T')[0];
            let currentSteps = storedSteps ? parseInt(storedSteps) : 0;

            // --- DAY CHANGE CHECK ---
            const today = new Date().toISOString().split('T')[0];

            // DEBUG: Uncomment to simulate a new day
            // const today = "2026-02-20"; 

            if (lastDate !== today) {
                console.log(`[UserContext] Day changed from ${lastDate} to ${today}. Archiving steps.`);

                // Archive yesterday's (or last recorded day's) steps
                if (currentSteps > 0) {
                    history.push({ date: lastDate, steps: currentSteps });
                    await AsyncStorage.setItem(`activityHistory_${email}`, JSON.stringify(history));
                }

                // Reset for today
                currentSteps = 0;
                lastDate = today;

                await AsyncStorage.setItem(`dailySteps_${email}`, JSON.stringify(0));
                await AsyncStorage.setItem(`lastSyncDate_${email}`, today);
            }
            // ------------------------

            setDailySteps(currentSteps);

            // Update user state with all loaded info
            setUser(prev => ({
                ...prev,
                ...updates,
                activityHistory: history,
                lastSyncDate: lastDate
            }));

        } catch (error) {
            console.error("User data load error", error);
        }
    };

    // Auth: Register
    const register = async (name, email, password) => {
        try {
            const usersJson = await AsyncStorage.getItem('users');
            const users = usersJson ? JSON.parse(usersJson) : [];

            // Check if exists
            if (users.some(u => u.email === email)) {
                Alert.alert("Hata", "Bu e-posta adresi ile kayıtlı bir kullanıcı zaten var.");
                return false;
            }

            const newUser = { name, email, password };
            users.push(newUser);
            await AsyncStorage.setItem('users', JSON.stringify(users));
            return true;
        } catch (error) {
            console.error("Register error", error);
            Alert.alert("Hata", "Kayıt olurken bir hata oluştu.");
            return false;
        }
    };

    // Auth: Login
    const login = async (email, password) => {
        console.log(`[UserContext] Attempting login for: ${email}`);
        try {
            const usersJson = await AsyncStorage.getItem('users');
            console.log(`[UserContext] Users in DB:`, usersJson);

            const users = usersJson ? JSON.parse(usersJson) : [];

            const foundUser = users.find(u => u.email === email && u.password === password);

            if (foundUser) {
                console.log("[UserContext] User found!", foundUser);

                // Remove password from session state for security
                const sessionUser = { name: foundUser.name, email: foundUser.email, riskScore: null, complianceScore: null }; // Reset scores initially until loaded

                setUser(sessionUser);
                await AsyncStorage.setItem('currentUser', JSON.stringify(sessionUser));
                console.log("[UserContext] Session set. User state updated.");

                // Load isolated data
                await loadUserData(email);
                return true;
            } else {
                console.log("[UserContext] Login failed: Invalid credentials or user not found.");
                Alert.alert("Hata", "E-posta veya şifre hatalı.");
                return false;
            }
        } catch (error) {
            console.error("[UserContext] Login error", error);
            return false;
        }
    };

    // Auth: Logout
    const logout = async () => {
        try {
            await AsyncStorage.removeItem('currentUser');
            setUser(null);
            setFoodList([]);
            setDailySteps(0);
        } catch (error) {
            console.error("Logout error", error);
        }
    };

    // Data: Add Food
    const addFood = async (foodName, calories) => {
        if (!user) return;
        try {
            const newFood = {
                id: Date.now().toString(),
                name: foodName,
                calories: calories,
            };
            const newFoodList = [...foodList, newFood];
            setFoodList(newFoodList);
            await AsyncStorage.setItem(`foodList_${user.email}`, JSON.stringify(newFoodList));
        } catch (error) {
            console.error("Add food error", error);
        }
    };

    // Data: Remove Food
    const removeFood = async (id) => {
        if (!user) return;
        try {
            const newFoodList = foodList.filter((item) => item.id !== id);
            setFoodList(newFoodList);
            await AsyncStorage.setItem(`foodList_${user.email}`, JSON.stringify(newFoodList));
        } catch (error) {
            console.error("Remove food error", error);
        }
    };

    // Data: Update Risk
    const updateRiskScore = async (score) => {
        if (!user) return;
        try {
            const updatedUser = { ...user, riskScore: score };
            setUser(updatedUser);
            // Update current user session to reflect new score
            await AsyncStorage.setItem('currentUser', JSON.stringify(updatedUser));
            // Save isolated risk score
            await AsyncStorage.setItem(`riskScore_${user.email}`, JSON.stringify(score));
        } catch (error) {
            console.error("Update risk error", error);
        }
    };

    // Data: Update Compliance
    const updateComplianceScore = async (score) => {
        if (!user) return;
        try {
            const updatedUser = { ...user, complianceScore: score };
            setUser(updatedUser);
            // Update current user session
            await AsyncStorage.setItem('currentUser', JSON.stringify(updatedUser));
            // Save isolated compliance score
            await AsyncStorage.setItem(`complianceScore_${user.email}`, JSON.stringify(score));
        } catch (error) {
            console.error("Update compliance error", error);
        }
    };

    // Data: Daily Steps
    const [dailySteps, setDailySteps] = useState(0);

    const updateDailySteps = async (steps) => {
        if (!user) return;
        try {
            setDailySteps(steps);
            await AsyncStorage.setItem(`dailySteps_${user.email}`, JSON.stringify(steps));
        } catch (error) {
            console.error("Update steps error", error);
        }
    };

    return (
        <UserContext.Provider
            value={{
                user,
                foodList,
                isLoading,
                login,
                register,
                logout,
                updateRiskScore,
                updateComplianceScore,
                addFood,
                removeFood,
                dailySteps,
                updateDailySteps,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
