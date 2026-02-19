import { Ionicons } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import {
    Alert,
    Image,
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

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { register } = useContext(UserContext);

    const handleRegister = async () => {
        if (!name || !email || !password) {
            Alert.alert('Hata', 'Lütfen tüm alanları doldurunuz.');
            return;
        }

        const success = await register(name, email, password);
        if (success) {
            Alert.alert('Başarılı', 'Kayıt oluşturuldu! Giriş yapabilirsiniz.', [
                { text: 'Tamam', onPress: () => navigation.navigate('Login') }
            ]);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#C62828" />

            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="chevron-back" size={30} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Kayıt Ol</Text>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.content}
            >
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/images/Logo.png')}
                        style={styles.logoImage}
                        resizeMode="contain"
                    />
                    <Text style={styles.logoText}>GLUCOPREDIA</Text>
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.label}>İsim Soyisim</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Adınız..."
                        placeholderTextColor="#999"
                        value={name}
                        onChangeText={setName}
                    />

                    <Text style={styles.label}>E-posta</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="orn@email.com"
                        placeholderTextColor="#999"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <Text style={styles.label}>Şifre</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="******"
                        placeholderTextColor="#999"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />

                    <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                        <Text style={styles.registerButtonText}>Hesap Oluştur</Text>
                    </TouchableOpacity>

                    <View style={styles.loginLinkContainer}>
                        <Text style={styles.loginLinkText}>Zaten hesabınız var mı? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.loginLink}>Giriş Yap</Text>
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
        height: 120,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        elevation: 5,
    },
    backButton: {
        position: 'absolute',
        left: 20,
        top: 45,
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
        marginBottom: 20,
    },
    logoImage: {
        width: 100,
        height: 100,
    },
    logoText: {
        color: '#C62828',
        fontWeight: '900',
        fontSize: 18,
        letterSpacing: 1,
        marginTop: 5,
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
        marginBottom: 8,
        fontWeight: '600',
    },
    input: {
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
        color: '#333',
        marginBottom: 15,
    },
    registerButton: {
        backgroundColor: '#C62828',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        elevation: 5,
    },
    registerButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginLinkContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    loginLinkText: {
        color: '#666',
        fontSize: 15,
    },
    loginLink: {
        color: '#C62828',
        fontWeight: 'bold',
        fontSize: 15,
    },
});

export default RegisterScreen;
