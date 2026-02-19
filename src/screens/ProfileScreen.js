import { Ionicons } from '@expo/vector-icons';
import { useContext } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { UserContext } from '../context/UserContext';

const ProfileScreen = ({ navigation }) => {
    const { user, logout } = useContext(UserContext);

    const handleLogout = () => {
        logout();
    };

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

            <ScrollView contentContainerStyle={styles.content}>

                <View style={styles.profileCard}>
                    <View style={styles.avatarContainer}>
                        <Ionicons name="person-circle-outline" size={100} color="#C62828" />
                    </View>

                    <Text style={styles.userName}>{user ? user.name : "Misafir"}</Text>
                    <Text style={styles.userEmail}>{user ? user.email : "Giriş yapılmadı"}</Text>

                    {user && user.riskScore !== null && (
                        <View style={styles.statRow}>
                            <Text style={styles.statLabel}>Risk Skoru:</Text>
                            <Text style={styles.statValue}>%{user.riskScore}</Text>
                        </View>
                    )}
                </View>

                {/* Settings Section (Visual Only for now) */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Hesap Ayarları</Text>
                    <TouchableOpacity style={styles.menuItem}>
                        <Ionicons name="settings-outline" size={24} color="#555" />
                        <Text style={styles.menuText}>Uygulama Ayarları</Text>
                        <Ionicons name="chevron-forward" size={24} color="#999" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <Ionicons name="notifications-outline" size={24} color="#555" />
                        <Text style={styles.menuText}>Bildirimler</Text>
                        <Ionicons name="chevron-forward" size={24} color="#999" />
                    </TouchableOpacity>
                </View>

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={24} color="#FFFFFF" />
                    <Text style={styles.logoutText}>Çıkış Yap</Text>
                </TouchableOpacity>

            </ScrollView>
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
        fontSize: 24,
        fontWeight: 'bold',
    },
    content: {
        padding: 20,
    },
    profileCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        elevation: 3,
        marginBottom: 20,
    },
    avatarContainer: {
        marginBottom: 10,
    },
    userName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    userEmail: {
        fontSize: 16,
        color: '#666',
        marginBottom: 15,
    },
    statRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFEBEE',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
    },
    statLabel: {
        color: '#C62828',
        fontWeight: '600',
        marginRight: 5,
    },
    statValue: {
        color: '#C62828',
        fontWeight: 'bold',
        fontSize: 16,
    },
    section: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        marginLeft: 5,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    menuText: {
        flex: 1,
        marginLeft: 15,
        fontSize: 16,
        color: '#555',
    },
    logoutButton: {
        backgroundColor: '#C62828',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 15,
        elevation: 3,
    },
    logoutText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});

export default ProfileScreen;
