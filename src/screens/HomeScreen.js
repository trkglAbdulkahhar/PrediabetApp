import { Ionicons } from '@expo/vector-icons';
import { useContext } from 'react';
import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { UserContext } from '../context/UserContext';

const MENU_ITEMS = [
    { id: '1', title: 'Profil' },
    { id: '2', title: 'Bilgilendirme' },
    { id: '3', title: 'BKİ Hesaplama' },
    { id: '4', title: 'Ön Testler' },
    { id: '5', title: 'Son Testler' },
    { id: '6', title: 'İletişim' },
    { id: '7', title: 'Hakkımızda' },
    { id: '8', title: 'S.S.S.' },
    { id: '9', title: 'Besin Ekle' },
    { id: '10', title: 'Adımsayar' },
];

const HomeScreen = ({ navigation }) => {
    const { user } = useContext(UserContext);



    const renderHeaderItem = () => {
        const riskScore = user && user.riskScore !== null ? user.riskScore : 0;
        let riskColor = '#4CAF50'; // Low Risk Green
        let riskLabel = 'Düşük Risk';

        if (riskScore > 30 && riskScore <= 60) {
            riskColor = '#FF9800'; // Medium Risk Orange
            riskLabel = 'Orta Risk';
        } else if (riskScore > 60) {
            riskColor = '#D32F2F'; // High Risk Red
            riskLabel = 'Yüksek Risk';
        }

        return (
            <View style={styles.headerContainer}>
                <View style={styles.headerContent}>
                    <Text style={styles.greetingText}>Merhaba,</Text>
                    <Text style={styles.userNameText}>{user ? user.name : "Misafir"}</Text>

                    <View style={[styles.riskCard, { backgroundColor: '#FFFFFF' }]}>
                        <View style={styles.riskHeader}>
                            <Ionicons name="pulse" size={24} color={riskColor} />
                            <Text style={[styles.riskTitle, { color: riskColor }]}>Diyabet Risk Durumu</Text>
                        </View>
                        <Text style={[styles.riskLevel, { color: riskColor }]}>{riskLabel}</Text>
                        <Text style={styles.riskDescription}>
                            {user && user.riskScore !== null
                                ? `Risk Oranı: %${riskScore}`
                                : "Risk analizi için ön testi tamamlayın."}
                        </Text>

                        {/* Progress Bar */}
                        <View style={styles.riskProgressBarBg}>
                            <View style={[styles.riskProgressBarFill, { width: `${Math.min(riskScore, 100)}%`, backgroundColor: riskColor }]} />
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => {
                if (item.title === 'Profil') {
                    navigation.navigate('Profil');
                } else if (item.title === 'Bilgilendirme') {
                    navigation.navigate('Bilgilendirme');
                } else if (item.title === 'Ön Testler') {
                    navigation.navigate('OnTestler');
                } else if (item.title === 'Son Testler') {
                    navigation.navigate('SonTestler');
                } else if (item.title === 'BKİ Hesaplama') {
                    navigation.navigate('BKI');
                } else if (item.title === 'Besin Ekle') {
                    navigation.navigate('BesinEkle');
                } else if (item.title === 'Adımsayar') {
                    navigation.navigate('Adimsayar');
                } else if (item.title === 'İletişim') {
                    navigation.navigate('Iletisim');
                } else if (item.title === 'S.S.S.') {
                    navigation.navigate('SSS');
                } else if (item.title === 'Hakkımızda') {
                    navigation.navigate('Hakkimizda');
                }
            }}
        >
            <Text style={styles.cardText}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#C62828" />

            {renderHeaderItem()}

            {/* Menu Grid */}
            <FlatList
                data={MENU_ITEMS}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        backgroundColor: '#C62828',
        paddingTop: 50, // Extra padding for status bar area
        paddingBottom: 40,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        elevation: 5, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        alignItems: 'center',
        marginBottom: 20, // Space below header
    },
    headerText: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 1,
        marginBottom: 5,
    },
    subHeaderText: {
        color: '#FFEBEE',
        fontSize: 16,
        marginBottom: 15,
    },
    riskCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 15,
        padding: 20,
        marginTop: 20,
        width: '100%',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    riskHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    riskTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    riskValue: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    // List Specific Styles
    listContent: {
        paddingHorizontal: 10,
        paddingBottom: 20,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    card: {
        backgroundColor: '#FFFFFF',
        width: '45%',
        height: 90,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    cardText: {
        color: '#333333',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    // New Header Styles
    headerContainer: {
        backgroundColor: '#C62828',
        paddingTop: 50,
        paddingBottom: 40,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginBottom: 20,
    },
    headerContent: {
        alignItems: 'flex-start',
        width: '100%',
    },
    greetingText: {
        color: '#FFEBEE',
        fontSize: 16,
        marginBottom: 2,
    },
    userNameText: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    riskLevel: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 5,
    },
    riskDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 15,
    },
    riskProgressBarBg: {
        height: 8,
        backgroundColor: '#E0E0E0',
        borderRadius: 4,
        overflow: 'hidden',
        width: '100%',
    },
    riskProgressBarFill: {
        height: '100%',
        borderRadius: 4,
    },
});

export default HomeScreen;
