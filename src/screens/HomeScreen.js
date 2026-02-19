import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => {
                if (item.title === 'Profil') {
                    navigation.navigate('Profil');
                } else if (item.title === 'BKİ Hesaplama') {
                    navigation.navigate('BKI');
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

            {/* Custom Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>PREDIABET</Text>
            </View>

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
        paddingTop: 60, // Extra padding for status bar area
        paddingBottom: 30,
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
    },
    listContent: {
        paddingHorizontal: 10,
        paddingBottom: 20,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 15, // Low spacing between rows
    },
    card: {
        backgroundColor: '#FFFFFF',
        width: '45%', // Approximately 42-45% as requested
        height: 90,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4, // Android shadow
        shadowColor: '#000', // iOS shadow
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
});

export default HomeScreen;
