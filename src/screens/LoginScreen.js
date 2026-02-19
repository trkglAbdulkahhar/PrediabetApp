import { useContext, useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { UserContext } from '../context/UserContext';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(UserContext);

    const handleLogin = async () => {
        console.log(`[LoginScreen] Login button pressed. Email: ${email}`);
        if (email.trim().length === 0 || password.trim().length === 0) {
            console.log("[LoginScreen] Validation failed: Empty fields");
            Alert.alert('Uyarı', 'Lütfen e-posta ve şifrenizi giriniz.');
            return;
        }

        console.log("[LoginScreen] Calling context login...");
        const success = await login(email, password);
        console.log(`[LoginScreen] Login result: ${success}`);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#C62828" />

            {/* Red Curved Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Hoş Geldiniz</Text>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.content}
            >
                <View style={styles.logoContainer}>
                    <View style={styles.logoPlaceholder}>
                        <Text style={styles.logoText}>PREDIABE-TR</Text>
                    </View>
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.label}>E-posta</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="E-postanızı girin..."
                        placeholderTextColor="#999"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <Text style={styles.label}>Şifre</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="******"
                        placeholderTextColor="#999"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>Giriş Yap</Text>
                    </TouchableOpacity>

                    <View style={styles.registerLinkContainer}>
                        <Text style={styles.registerLinkText}>Hesabınız yok mu? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.registerLink}>Kayıt Ol</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        backgroundColor: '#C62828',
        height: 150,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    headerText: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 50,
    },
    logoPlaceholder: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        borderWidth: 2,
        borderColor: '#C62828',
    },
    logoText: {
        color: '#C62828',
        fontWeight: 'bold',
        fontSize: 14,
    },
    formContainer: {
        backgroundColor: '#FFFFFF',
        padding: 25,
        borderRadius: 20,
        elevation: 3,
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
        fontWeight: '600',
    },
    input: {
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
        color: '#333',
        marginBottom: 20,
    },
    loginButton: {
        backgroundColor: '#C62828',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#C62828',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    registerLinkContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    registerLinkText: {
        color: '#666',
        fontSize: 15,
    },
    registerLink: {
        color: '#C62828',
        fontWeight: 'bold',
        fontSize: 15,
    },
});

export default LoginScreen;
