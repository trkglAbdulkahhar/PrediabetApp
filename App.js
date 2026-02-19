import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { UserContext, UserProvider } from './src/context/UserContext';
import AboutScreen from './src/screens/AboutScreen';
import AddFoodScreen from './src/screens/AddFoodScreen';
import AnalysisReportScreen from './src/screens/AnalysisReportScreen';
import BkiScreen from './src/screens/BkiScreen';
import ContactScreen from './src/screens/ContactScreen';
import FaqScreen from './src/screens/FaqScreen';
import HomeScreen from './src/screens/HomeScreen';
import InformationScreen from './src/screens/InformationScreen';
import LoginScreen from './src/screens/LoginScreen';
import PostTestScreen from './src/screens/PostTestScreen';
import PreTestScreen from './src/screens/PreTestScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import StepCounterScreen from './src/screens/StepCounterScreen';

const Stack = createNativeStackNavigator();

// AppNavigator handles the navigation logic and access to UserContext
const AppNavigator = () => {
    const { user, isLoading } = useContext(UserContext);

    // Debug logging
    console.log("AppNavigator Rendered. User:", user);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#C62828' }}>
                <ActivityIndicator size="large" color="#FFFFFF" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {user ? (
                    // User is logged in -> Show Home Stack
                    <>
                        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="BKI" component={BkiScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="Adimsayar" component={StepCounterScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="Iletisim" component={ContactScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="SSS" component={FaqScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="Hakkimizda" component={AboutScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="Profil" component={ProfileScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="Bilgilendirme" component={InformationScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="OnTestler" component={PreTestScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="BesinEkle" component={AddFoodScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="SonTestler" component={PostTestScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="AnalizRaporu" component={AnalysisReportScreen} options={{ headerShown: false }} />
                    </>
                ) : (
                    // User is NOT logged in -> Show Auth Stack
                    <>
                        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};



export default function App() {
    return (
        <UserProvider>
            <AppNavigator />
        </UserProvider>
    );
}
