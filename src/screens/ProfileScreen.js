import { Ionicons } from '@expo/vector-icons';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const ProfileScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#C62828" />

            {/* Standard Red Curved Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="chevron-back" size={30} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Profil</Text>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardView}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>

                    {/* Logo/Icon Area */}
                    <View style={styles.logoContainer}>
                        <View style={styles.logoPlaceholder}>
                            <Ionicons name="person-circle-outline" size={100} color="#C62828" />
                        </View>
                    </View>

                    {/* Form Inputs */}
                    <View style={styles.formContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Adı Soyadı"
                            placeholderTextColor="#888"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Telefon"
                            placeholderTextColor="#888"
                            keyboardType="phone-pad"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Şifre"
                            placeholderTextColor="#888"
                            secureTextEntry={true}
                        />
                    </View>

                    {/* Update Button */}
                    <TouchableOpacity style={styles.updateButton}>
                        <Text style={styles.updateButtonText}>Profili Güncelle</Text>
                    </TouchableOpacity>

                </ScrollView>
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
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1,
    },
    backButton: {
        position: 'absolute',
        left: 20,
        top: 55,
        zIndex: 10,
    },
    headerText: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        alignItems: 'center',
        padding: 20,
    },
    logoContainer: {
        marginTop: 20,
        marginBottom: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoPlaceholder: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    formContainer: {
        width: '100%',
        marginBottom: 30,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        padding: 15,
        fontSize: 16,
        color: '#333',
        marginBottom: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        borderWidth: 1,
        borderColor: 'transparent', // Can change on focus if needed
    },
    updateButton: {
        backgroundColor: '#C62828',
        width: '100%',
        padding: 15,
        borderRadius: 30, // Fully rounded
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    updateButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ProfileScreen;
