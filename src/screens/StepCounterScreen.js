import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const STATIC_HISTORY = [
    { id: '1', steps: '5600', date: '01/05/2023' },
    { id: '2', steps: '7200', date: '02/05/2023' },
    { id: '3', steps: '8100', date: '03/05/2023' },
    { id: '4', steps: '4500', date: '04/05/2023' },
    { id: '5', steps: '9800', date: '05/05/2023' },
    { id: '6', steps: '6300', date: '06/05/2023' },
];

const StepCounterScreen = ({ navigation }) => {
    const renderItem = ({ item }) => (
        <View style={styles.historyItem}>
            <Text style={styles.historyText}>Adım Sayısı: {item.steps}</Text>
            <Text style={styles.historyDate}>Tarih: {item.date}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#C62828" />

            {/* Custom Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>{'<'}</Text>
                </TouchableOpacity>
                <Text style={styles.headerText}>Adımsayar</Text>
            </View>

            {/* Main Content */}
            <View style={styles.content}>
                <Text style={styles.totalStepsTitle}>ADIM SAYISI: 70951</Text>

                <Text style={styles.sectionHeader}>Geçmiş Adımlarım</Text>

                <FlatList
                    data={STATIC_HISTORY}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    style={styles.list}
                    contentContainerStyle={styles.listContent}
                />
            </View>

            {/* Bottom Button */}
            <TouchableOpacity style={styles.bottomButton}>
                <Text style={styles.bottomButtonText}>Haftalık Adımlarım</Text>
            </TouchableOpacity>
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
        paddingTop: 60,
        paddingBottom: 30,
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
        zIndex: 10,
    },
    backButton: {
        position: 'absolute',
        left: 20,
        top: 60,
        padding: 5,
    },
    backButtonText: {
        color: '#FFFFFF',
        fontSize: 30,
        fontWeight: 'bold',
    },
    headerText: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    totalStepsTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 30,
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        marginBottom: 15,
    },
    list: {
        flex: 1,
    },
    listContent: {
        paddingBottom: 20,
    },
    historyItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    historyText: {
        fontSize: 16,
        color: '#333',
    },
    historyDate: {
        fontSize: 16,
        color: '#666',
    },
    bottomButton: {
        backgroundColor: '#C62828',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default StepCounterScreen;
