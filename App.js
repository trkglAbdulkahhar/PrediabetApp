import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AboutScreen from './src/screens/AboutScreen';
import BkiScreen from './src/screens/BkiScreen';
import ContactScreen from './src/screens/ContactScreen';
import FaqScreen from './src/screens/FaqScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import StepCounterScreen from './src/screens/StepCounterScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="BKI"
                    component={BkiScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Adimsayar"
                    component={StepCounterScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Iletisim"
                    component={ContactScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SSS"
                    component={FaqScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Hakkimizda"
                    component={AboutScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Profil"
                    component={ProfileScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
