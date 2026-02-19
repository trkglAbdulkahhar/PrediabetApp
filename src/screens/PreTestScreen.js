import { Ionicons } from '@expo/vector-icons';
import { Alert, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const PreTestScreen = ({ navigation }) => {

    // Function to handle button presses
    const handleAnswer = (questionId, answer) => {
        const answerText = answer ? "Evet" : "Hayır";
        Alert.alert("Seçiminiz", `#${questionId} sorusuna "${answerText}" dediniz.`);
    };

    const QuestionCard = ({ id, text }) => (
        <View style={styles.card}>
            <Text style={styles.questionText}>{text}</Text>
            <View style={styles.buttonContainer}>
                {/* YES Button */}
                <TouchableOpacity
                    style={[styles.actionButton, styles.yesButton]}
                    onPress={() => handleAnswer(id, true)}
                >
                    <Text style={styles.buttonText}>Evet</Text>
                </TouchableOpacity>

                {/* NO Button */}
                <TouchableOpacity
                    style={[styles.actionButton, styles.noButton]}
                    onPress={() => handleAnswer(id, false)}
                >
                    <Text style={styles.buttonText}>Hayır</Text>
                </TouchableOpacity>
            </View>
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
                <Text style={styles.headerText}>Ön Testler</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.introText}>
                    Lütfen aşağıdaki soruları kendinize göre cevaplayınız.
                </Text>

                {/* Question 1 */}
                <QuestionCard
                    id={1}
                    text="1. Ailenizde diyabet (şeker hastalığı) öyküsü var mı?"
                />

                {/* Question 2 */}
                <QuestionCard
                    id={2}
                    text="2. Günlük hayatınızda çabuk yoruluyor musunuz?"
                />

                {/* Question 3 */}
                <QuestionCard
                    id={3}
                    text="3. Sık sık susama veya ağız kuruluğu hissediyor musunuz?"
                />

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
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    introText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
        fontStyle: 'italic',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    questionText: {
        fontSize: 18,
        color: '#333',
        fontWeight: '600',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionButton: {
        flex: 0.48,
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
    },
    yesButton: {
        backgroundColor: '#4CAF50', // Green
    },
    noButton: {
        backgroundColor: '#F44336', // Red
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PreTestScreen;
