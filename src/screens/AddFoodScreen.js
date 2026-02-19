import { Ionicons } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import { Alert, FlatList, KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { UserContext } from '../context/UserContext'; // Assuming UserContext is in this path

const AddFoodScreen = ({ navigation }) => {
    const { foodList, addFood, removeFood } = useContext(UserContext);
    const [foodName, setFoodName] = useState('');
    const [calories, setCalories] = useState('');

    const handleAddFood = () => {
        if (!foodName || !calories) {
            Alert.alert("Hata", "Lütfen tüm alanları doldurunuz.");
            return;
        }

        addFood(foodName, calories);
        Alert.alert("Başarılı", `${foodName} (${calories} kcal/miktar) başarıyla eklendi!`);

        // Clear inputs
        setFoodName('');
        setCalories('');
    };

    const renderFoodItem = ({ item }) => (
        <View style={styles.foodItem}>
            <View>
                <Text style={styles.foodName}>{item.name}</Text>
                <Text style={styles.foodCalories}>{item.calories} kcal/miktar</Text>
            </View>
            <TouchableOpacity onPress={() => removeFood(item.id)} style={styles.deleteButton}>
                <Ionicons name="trash-outline" size={24} color="#F44336" />
            </TouchableOpacity>
        </View>
    );

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
                <View style={styles.contentContainer}>

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

                    <Text style={styles.listHeader}>Eklenen Besinler</Text>

                    <FlatList
                        data={foodList}
                        renderItem={renderFoodItem}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.listContent}
                        ListEmptyComponent={
                            <Text style={styles.emptyText}>Henüz besin eklemediniz.</Text>
                        }
                    />

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
    contentContainer: {
        flex: 1,
        padding: 20,
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
        marginBottom: 20,
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
        marginBottom: 15, // Reduced margin
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    addButton: {
        backgroundColor: '#C62828',
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 5,
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
    listHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        marginLeft: 5,
    },
    listContent: {
        paddingBottom: 20,
    },
    foodItem: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 15,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    foodName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    foodCalories: {
        fontSize: 14,
        color: '#666',
    },
    deleteButton: {
        padding: 5,
    },
    emptyText: {
        textAlign: 'center',
        color: '#999',
        fontSize: 16,
        marginTop: 20,
        fontStyle: 'italic',
    },
});

export default AddFoodScreen;
