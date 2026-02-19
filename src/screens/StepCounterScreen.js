import { Ionicons } from '@expo/vector-icons';
import { useContext } from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { UserContext } from '../context/UserContext';

const StepCounterScreen = ({ navigation }) => {
    const { dailySteps, updateDailySteps } = useContext(UserContext);

    // Simulate Pedometer updates (optional, for demo feeling)
    // For now we just use the stored value

    const handleReset = () => {
        updateDailySteps(0);
    };

    const handleSimulateSteps = () => {
        // Add 100 steps for demo
        updateDailySteps(dailySteps + 100);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#C62828" />

            {/* Custom Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={30} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Adımsayar</Text>
            </View>

            {/* Main Content */}
            <View style={styles.content}>

                <View style={styles.circleContainer}>
                    <View style={styles.circle}>
                        <Ionicons name="footsteps" size={50} color="#C62828" />
                        <Text style={styles.stepsText}>{dailySteps}</Text>
                        <Text style={styles.stepsLabel}>Adım</Text>
                    </View>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>Bugünkü Hedef: 10,000</Text>
                    <View style={styles.progressBarBackground}>
                        <View style={[styles.progressBarFill, { width: `${Math.min((dailySteps / 10000) * 100, 100)}%` }]} />
                    </View>
                </View>

                {/* Interaction Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.actionButton} onPress={handleSimulateSteps}>
                        <Ionicons name="add-circle-outline" size={24} color="#FFF" />
                        <Text style={styles.buttonText}>Adım Ekle (+100)</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.actionButton, styles.resetButton]} onPress={handleReset}>
                        <Ionicons name="refresh-circle-outline" size={24} color="#FFF" />
                        <Text style={styles.buttonText}>Sıfırla</Text>
                    </TouchableOpacity>
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    circleContainer: {
        marginBottom: 40,
        elevation: 10,
        shadowColor: '#C62828',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    circle: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 8,
        borderColor: '#FFEBEE',
    },
    stepsText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#333',
    },
    stepsLabel: {
        fontSize: 18,
        color: '#666',
        marginTop: 5,
    },
    infoContainer: {
        width: '100%',
        marginBottom: 40,
    },
    infoText: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
        fontWeight: '600',
        textAlign: 'center',
    },
    progressBarBackground: {
        height: 15,
        backgroundColor: '#E0E0E0',
        borderRadius: 10,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#C62828',
        borderRadius: 10,
    },
    buttonContainer: {
        width: '100%',
        gap: 15,
    },
    actionButton: {
        backgroundColor: '#C62828',
        padding: 15,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
    },
    resetButton: {
        backgroundColor: '#757575',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});

export default StepCounterScreen;
