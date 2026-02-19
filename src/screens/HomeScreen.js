import { Ionicons } from '@expo/vector-icons';
import { useContext } from 'react';
import { FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
        const complianceScore = user && user.complianceScore !== null ? user.complianceScore : 0;
        const steps = user && user.dailySteps ? user.dailySteps : 0; // Assuming steps are in user for now or handled via context

        // Risk Logic
        let riskColor = '#4CAF50';
        let riskLabel = 'Düşük';
        if (riskScore > 30 && riskScore <= 60) { riskColor = '#FF9800'; riskLabel = 'Orta'; }
        else if (riskScore > 60) { riskColor = '#D32F2F'; riskLabel = 'Yüksek'; }

        // Compliance Logic
        let complianceColor = '#D32F2F';
        if (complianceScore >= 50) complianceColor = '#FF9800';
        if (complianceScore >= 80) complianceColor = '#4CAF50';

        // Dynamic Recommendation
        let recommendation = "Veri bekleniyor...";
        if (riskScore > 60) recommendation = "Risk düzeyiniz yüksek. Lütfen doktor kontrolünü ihmal etmeyin.";
        else if (complianceScore > 0 && complianceScore < 50) recommendation = "Tedavi uyumunuz düşük. Planınıza sadık kalmalısınız.";
        else if (riskScore > 30) recommendation = "Dikkatli olun. Şeker tüketimini azaltıp hareketi artırın.";
        else recommendation = "Harikasınız! Değerleriniz stabil, aynen devam.";

        if (user && user.riskScore === null) recommendation = "Risk analizi için lütfen önce 'Ön Test'i tamamlayın.";

        return (
            <View style={styles.headerContainer}>
                <View style={styles.headerContent}>
                    <View style={styles.headerTopRow}>
                        <View>
                            <Text style={styles.greetingText}>Merhaba,</Text>
                            <Text style={styles.userNameText}>{user ? user.name : "Misafir"}</Text>
                        </View>
                        <Image
                            source={require('../../assets/images/Logo.png')}
                            style={styles.headerLogo}
                            resizeMode="contain"
                        />
                    </View>

                    {/* Report Grid */}
                    <View style={styles.reportGrid}>
                        {/* Row 1: Risk & Compliance */}
                        <View style={styles.row}>
                            {/* Risk Card */}
                            <View style={[styles.reportCard, { backgroundColor: '#FFF' }]}>
                                <View style={styles.cardHeader}>
                                    <Ionicons name="pulse" size={20} color={riskColor} />
                                    <Text style={[styles.cardTitle, { color: riskColor }]}>Risk</Text>
                                </View>
                                <Text style={styles.cardValue}>%{riskScore}</Text>
                                <Text style={[styles.cardLabel, { color: riskColor }]}>{riskLabel}</Text>
                            </View>

                            {/* Compliance Card */}
                            <View style={[styles.reportCard, { backgroundColor: '#FFF' }]}>
                                <View style={styles.cardHeader}>
                                    <Ionicons name="checkmark-circle" size={20} color={complianceColor} />
                                    <Text style={[styles.cardTitle, { color: complianceColor }]}>Uyum</Text>
                                </View>
                                <Text style={styles.cardValue}>%{complianceScore}</Text>
                                <View style={styles.progressBarBg}>
                                    <View style={[styles.progressBarFill, { width: `${complianceScore}%`, backgroundColor: complianceColor }]} />
                                </View>
                            </View>
                        </View>

                        {/* Row 2: Activity & Recommendation */}
                        <View style={styles.row}>
                            {/* Activity Card */}
                            <View style={[styles.reportCard, { backgroundColor: '#FFF' }]}>
                                <View style={styles.cardHeader}>
                                    <Ionicons name="walk" size={20} color="#2196F3" />
                                    <Text style={[styles.cardTitle, { color: '#2196F3' }]}>Adım</Text>
                                </View>
                                <Text style={styles.cardValue}>{steps}</Text>
                                <Text style={styles.cardSub}>Bugünkü Adım</Text>
                            </View>

                            {/* Doctor Recommendation */}
                            <TouchableOpacity
                                style={[styles.reportCard, { backgroundColor: '#F3E5F5', flex: 1.5, borderColor: '#9C27B0', borderWidth: 0.5 }]}
                                onPress={() => navigation.navigate('AnalizRaporu')}
                            >
                                <View style={styles.cardHeader}>
                                    <Ionicons name="medkit" size={20} color="#9C27B0" />
                                    <Text style={[styles.cardTitle, { color: '#9C27B0' }]}>Klinik Rapor</Text>
                                </View>
                                <Text style={[styles.recommendationText, { fontWeight: '600', color: '#6A1B9A' }]} numberOfLines={3}>
                                    Detaylı sağlık analizi ve doktor önerilerini görüntülemek için tıklayınız.
                                </Text>
                                <View style={{ alignItems: 'flex-end', marginTop: 5 }}>
                                    <Ionicons name="arrow-forward-circle" size={24} color="#9C27B0" />
                                </View>
                            </TouchableOpacity>
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
    // Report Grid Styles
    reportGrid: {
        width: '100%',
        gap: 10,
    },
    row: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10,
    },
    reportCard: {
        flex: 1,
        padding: 15,
        borderRadius: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        justifyContent: 'space-between',
        minHeight: 110,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    cardValue: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginVertical: 5,
    },
    cardLabel: {
        fontSize: 14,
        fontWeight: '600',
    },
    cardSub: {
        fontSize: 12,
        color: '#757575',
    },
    recommendationText: {
        fontSize: 13,
        color: '#555',
        lineHeight: 18,
    },
    progressBarBg: {
        height: 6,
        backgroundColor: '#E0E0E0',
        borderRadius: 3,
        width: '100%',
        marginTop: 5,
    },
    // Activity Stats Styles
    activityStats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 10,
        paddingTop: 5,
        borderTopWidth: 1,
        borderTopColor: '#F5F5F5',
    },
    statItem: {
        alignItems: 'center',
    },
    statLabel: {
        fontSize: 10,
        color: '#9E9E9E',
    },
    statValue: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#616161',
    },
    verticalLine: {
        width: 1,
        height: 20,
        backgroundColor: '#EEEEEE',
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
        width: '100%',
    },
    headerTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
    },
    headerLogo: {
        width: 50,
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 25,
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
});

export default HomeScreen;
