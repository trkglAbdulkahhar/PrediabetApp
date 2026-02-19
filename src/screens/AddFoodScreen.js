import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const AddFoodScreen = ({ navigation }) => {
    const [foodName, setFoodName] = useState('');
    const [calories, setCalories] = useState('');

    const handleAddFood = () => {
        if (!foodName || !calories) {
            Alert.alert("Hata", "Lütfen tüm alanları doldurunuz.");
            return;
        }

        // Here you would typically save to state/database
        Alert.alert("Başarılı", `${foodName} (${calories} kcal/miktar) başarıyla eklendi!`);

        // Clear inputs
        setFoodName('');
        setCalories('');
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#C62828" />

            {/* Custom Red Curved Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="chevron-back" size={30} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Besin Ekle</Text>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardView}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>

                    <View style={styles.formContainer}>
                        <Text style={styles.label}>Besin Adı</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Örn: Elma"
                            placeholderTextColor="#999"
                            value={foodName}
                            onChangeText={setFoodName}
                        />

                        <Text style={styles.label}>Kalori / Miktar</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Örn: 52 kcal"
                            placeholderTextColor="#999"
                            keyboardType="numeric"
                            value={calories}
                            onChangeText={setCalories}
                        />

                        <TouchableOpacity style={styles.addButton} onPress={handleAddFood}>
                            <Text style={styles.addButtonText}>Ekle</Text>
                        </TouchableOpacity>
                    </View>

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
        padding: 20,
        paddingTop: 40,
        alignItems: 'center',
    },
    formContainer: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    label: {
        fontSize: 16,
        color: '#333',
        fontWeight: '600',
        marginBottom: 8,
        marginLeft: 5,
    },
    input: {
        backgroundColor: '#F0F0F0',
        borderRadius: 15,
        padding: 15,
        fontSize: 16,
        color: '#333',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    addButton: {
        backgroundColor: '#C62828',
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AddFoodScreen;
