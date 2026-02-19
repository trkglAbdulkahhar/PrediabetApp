import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    // Current User Session
    const [user, setUser] = useState(null); // { name, email, riskScore }

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
            const storedSteps = await AsyncStorage.getItem(`dailySteps_${email}`);

            if (storedFood) setFoodList(JSON.parse(storedFood));
            else setFoodList([]); // Reset if empty for this user

            // Update user state with specific risk score if it exists, otherwise keep what's in session
            if (storedRisk) {
                setUser(prev => ({ ...prev, riskScore: JSON.parse(storedRisk) }));
            }

            if (storedSteps) setDailySteps(parseInt(storedSteps));
            else setDailySteps(0); // Reset

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
                const sessionUser = { name: foundUser.name, email: foundUser.email, riskScore: null }; // Reset risk score initially

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
