import { useState } from 'react';
import { FlatList, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const BkiScreen = ({ navigation }) => {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmiResult, setBmiResult] = useState(null);
    const [error, setError] = useState('');
    const [history, setHistory] = useState([]);

    const calculateBMI = () => {
        // Input validation
        if (!height || !weight || isNaN(height) || isNaN(weight)) {
            setError('Lütfen geçerli boy ve kilo giriniz.');
            setBmiResult(null);
            return;
        }

        const heightInMeters = parseFloat(height) / 100;
        const weightInKg = parseFloat(weight);

        if (heightInMeters <= 0 || weightInKg <= 0) {
            setError('Boy ve kilo 0 dan büyük olmalıdır.');
            setBmiResult(null);
            return;
        }

        // Clear error
        setError('');

        // Calculate BMI
        const bmi = weightInKg / (heightInMeters * heightInMeters);
        const formattedBMI = bmi.toFixed(2);
        setBmiResult(formattedBMI);

        // Create history record
        const date = new Date();
        const formattedDate = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;

        const newRecord = {
            id: Date.now().toString(),
            bmi: formattedBMI,
            date: formattedDate,
        };

        // Add to history (newest first)
        setHistory(prevHistory => [newRecord, ...prevHistory]);

        // Clear inputs
        setHeight('');
        setWeight('');
    };

    const deleteRecord = (id) => {
        setHistory(prevHistory => prevHistory.filter(item => item.id !== id));
    };

    const renderHistoryItem = ({ item }) => (
        <View style={styles.historyItem}>
            <Text style={styles.historyText}>BKİ Değeri: {item.bmi}</Text>
            <View style={styles.historyRight}>
                <Text style={styles.historyDate}>{item.date}</Text>
                <TouchableOpacity onPress={() => deleteRecord(item.id)} style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>X</Text>
                </TouchableOpacity>
            </View>
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
                <Text style={styles.headerText}>BKİ Hesaplama</Text>
            </View>

            {/* Content */}
            <View style={styles.content}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Boyunuzu Giriniz (cm)"
                        keyboardType="numeric"
                        value={height}
                        onChangeText={setHeight}
                        placeholderTextColor="#666"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Kilonuzu Giriniz (kg)"
                        keyboardType="numeric"
                        value={weight}
                        onChangeText={setWeight}
                        placeholderTextColor="#666"
                    />
                </View>

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <TouchableOpacity style={styles.calculateButton} onPress={calculateBMI}>
                    <Text style={styles.calculateButtonText}>Hesapla</Text>
                </TouchableOpacity>

                {bmiResult && (
                    <Text style={styles.resultText}>BKİ Değeri: {bmiResult}</Text>
                )}

                <View style={styles.historyContainer}>
                    <FlatList
                        data={history}
                        renderItem={renderHistoryItem}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        ListEmptyComponent={
                            <Text style={styles.emptyText}>
                                Henüz bir ölçüm yapmadınız. İlk ölçümünüzü yukarıdan yapabilirsiniz.
                            </Text>
                        }
                        contentContainerStyle={history.length === 0 ? styles.emptyContainer : null}
                    />
                </View>
            </View>
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
        padding: 20,
        alignItems: 'center',
        paddingTop: 30,
    },
    inputContainer: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        borderRadius: 15,
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    input: {
        padding: 15,
        fontSize: 16,
        color: '#333',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        fontWeight: 'bold',
    },
    calculateButton: {
        backgroundColor: '#C62828',
        width: '100%',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 20,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
    },
    calculateButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    resultText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    historyContainer: {
        flex: 1,
        width: '100%',
        marginTop: 10,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        color: '#888',
        textAlign: 'center',
        fontSize: 16,
        paddingHorizontal: 20,
    },
    historyItem: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 15,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    historyText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    historyRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    historyDate: {
        color: '#666',
        marginRight: 10,
        fontSize: 14,
    },
    deleteButton: {
        backgroundColor: '#FFEBEE',
        padding: 5,
        borderRadius: 5,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#C62828',
        fontWeight: 'bold',
    },
});

export default BkiScreen;
