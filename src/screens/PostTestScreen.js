import { Ionicons } from '@expo/vector-icons';
import { useContext, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    LayoutAnimation,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    UIManager,
    View
} from 'react-native';

import { UserContext } from '../context/UserContext';
import { POST_TEST_POOL, getRandomQuestions } from '../data/questionPool';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}



const PostTestScreen = ({ navigation }) => {
    const { updateComplianceScore } = useContext(UserContext);

    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0); // This calculates "Risk/Non-Compliance", so LOWER is BETTER for health, HIGHER is BAD.
    const [isFinished, setIsFinished] = useState(false);
    const [loadingResult, setLoadingResult] = useState(false);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // Reset state when screen comes into focus
            setCurrentIndex(0);
            setScore(0);
            setIsFinished(false);
            setLoadingResult(false);

            // Get fresh random questions
            const selected = getRandomQuestions(POST_TEST_POOL, 20);
            setQuestions(selected);
        });

        return unsubscribe;
    }, [navigation]);

    const handleAnswer = (answer) => {
        // Calculate score for this question
        const currentQuestion = questions[currentIndex];
        let points = 0;

        // If answer matches 'riskAnswer', it means user did something 'bad' (or didn't do something 'good')
        if (answer === currentQuestion.riskAnswer) {
            points = 5;
        }

        const newScore = score + points;

        // Animate transition
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        if (currentIndex < questions.length - 1) {
            setScore(newScore);
            setCurrentIndex(currentIndex + 1);
        } else {
            // Last question answered
            // Calculate final "Compliance Score". 
            // Total max risk score = 20 * 5 = 100.
            // If risk score is 0, Compliance is 100%.
            // If risk score is 100, Compliance is 0%.
            // So: Compliance = 100 - RiskScore.
            const riskPoints = newScore;
            const finalCompliance = 100 - riskPoints;

            setScore(riskPoints); // State keeps risk points for logic if needed, but we save compliance
            finishTest(finalCompliance);
        }
    };

    const finishTest = (finalCompliance) => {
        setLoadingResult(true);
        setTimeout(() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            setLoadingResult(false);
            setIsFinished(true);
            updateComplianceScore(finalCompliance);
        }, 1000);
    };

    const getResultData = (compliance) => {
        if (compliance >= 80) {
            return {
                level: "MÜKEMMEL UYUM",
                color: "#43A047", // Green
                bg: "#E8F5E9",
                icon: "ribbon",
                message: "Tebrikler! Tedavinize ve yaşam tarzı değişikliklerine harika bir şekilde uyum sağlıyorsunuz.",
                summary: "Haftalık Durum: Çok İyi"
            };
        } else if (compliance >= 50) {
            return {
                level: "ORTA SEVİYE",
                color: "#FB8C00", // Orange
                bg: "#FFF3E0",
                icon: "trending-up",
                message: "İyi gidiyorsunuz ancak bazı alışkanlıklarınızı gözden geçirmeniz gerekiyor. Küçük kaçamaklara dikkat!",
                summary: "Haftalık Durum: Geliştirilmeli"
            };
        } else {
            return {
                level: "DÜŞÜK UYUM",
                color: "#D32F2F", // Red
                bg: "#FFEBEE",
                icon: "alert-circle",
                message: "Dikkat! Tedavi sürecinizde ciddi aksamalar görünüyor. Lütfen doktorunuzun önerilerini tekrar hatırlayın.",
                summary: "Haftalık Durum: Kritik"
            };
        }
    };

    // --- RENDER COMPONENT ---

    if (loadingResult) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#C62828" />
                <Text style={styles.loadingText}>Verileriniz analiz ediliyor...</Text>
            </SafeAreaView>
        );
    }

    // Loading check
    if (questions.length === 0) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#C62828" />
            </SafeAreaView>
        );
    }

    if (isFinished) {
        // Calculate compliance again from local state 'score' (which serves as risk points) 
        // OR better, pass it? 
        // Actually, let's just use 100 - score since 'score' state wasn't updated with final sum in the last render cycle cleanly? 
        // Wait, setScore in handleAnswer updates state for NEXT render. 
        // In finishTest, we passed finalCompliance. Let's rely on calculating derived state.
        const compliance = 100 - score;
        const result = getResultData(compliance);

        return (
            <SafeAreaView style={[styles.container, { backgroundColor: result.bg }]}>
                <StatusBar barStyle="dark-content" backgroundColor={result.bg} />
                <View style={styles.resultCard}>
                    <Ionicons name={result.icon} size={80} color={result.color} />
                    <Text style={[styles.resultLevel, { color: result.color }]}>{result.level}</Text>
                    <Text style={styles.resultScore}>Uyum Skoru: %{compliance}</Text>

                    <View style={styles.divider} />

                    <Text style={styles.resultSummary}>{result.summary}</Text>
                    <Text style={styles.resultMessage}>{result.message}</Text>

                    <TouchableOpacity
                        style={[styles.homeButton, { backgroundColor: result.color }]}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Text style={styles.homeButtonText}>Raporu Gör</Text>
                        <Ionicons name="stats-chart" size={20} color="#FFF" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    // Progress Calculation
    const progress = ((currentIndex + 1) / questions.length) * 100;
    const currentQuestion = questions[currentIndex];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#C62828" />

            {/* Header / Progress Bar */}
            <View style={styles.header}>
                <View style={styles.progressBarContainer}>
                    <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
                </View>
                <Text style={styles.progressText}>Soru {currentIndex + 1} / {questions.length}</Text>
            </View>

            {/* Content Body */}
            <View style={styles.contentContainer}>
                <View style={styles.card}>
                    <View style={styles.questionBadge}>
                        <Ionicons name="clipboard" size={24} color="#FFF" />
                    </View>
                    <Text style={styles.questionText}>
                        {currentQuestion.text}
                    </Text>
                </View>

                {/* Yes / No Buttons */}
                <View style={styles.buttonGroup}>
                    <TouchableOpacity
                        style={[styles.answerButton, styles.yesButton]}
                        onPress={() => handleAnswer(true)}
                        activeOpacity={0.8}
                    >
                        <Ionicons name="checkmark-circle-outline" size={28} color="#2E7D32" />
                        <Text style={[styles.answerText, styles.yesText]}>EVET</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.answerButton, styles.noButton]}
                        onPress={() => handleAnswer(false)}
                        activeOpacity={0.8}
                    >
                        <Ionicons name="close-circle-outline" size={28} color="#C62828" />
                        <Text style={[styles.answerText, styles.noText]}>HAYIR</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={styles.quitButton} onPress={() => navigation.goBack()}>
                <Text style={styles.quitText}>Çıkış</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    loadingText: {
        marginTop: 20,
        fontSize: 16,
        color: '#666',
        fontWeight: '600',
    },
    header: {
        height: 100,
        backgroundColor: '#C62828',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingBottom: 20,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    progressBarContainer: {
        width: '85%',
        height: 8,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 4,
        marginTop: 30, // space for status bar
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
    },
    progressText: {
        color: '#FFFFFF',
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 14,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        minHeight: 200,
        justifyContent: 'center',
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        marginBottom: 40,
        position: 'relative',
    },
    questionBadge: {
        position: 'absolute',
        top: -20,
        backgroundColor: '#C62828',
        borderRadius: 25,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: '#F5F5F5',
    },
    questionText: {
        fontSize: 20,
        color: '#333',
        textAlign: 'center',
        fontWeight: '600',
        lineHeight: 30,
        marginTop: 10,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    answerButton: {
        flex: 1,
        height: 60,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        backgroundColor: '#FFF',
    },
    yesButton: {
        borderWidth: 2,
        borderColor: '#2E7D32',
    },
    noButton: {
        borderWidth: 2,
        borderColor: '#C62828',
    },
    answerText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    yesText: {
        color: '#2E7D32',
    },
    noText: {
        color: '#C62828',
    },
    quitButton: {
        alignItems: 'center',
        marginBottom: 20,
        padding: 10,
    },
    quitText: {
        color: '#999',
        textDecorationLine: 'underline',
    },
    // Result Styles
    resultCard: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },
    resultLevel: {
        fontSize: 28,
        fontWeight: '900',
        marginTop: 20,
        letterSpacing: 1,
    },
    resultScore: {
        fontSize: 18,
        color: '#666',
        marginTop: 5,
        marginBottom: 20,
    },
    divider: {
        width: '80%',
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
        marginVertical: 20,
    },
    resultSummary: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    resultMessage: {
        fontSize: 16,
        color: '#444',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 20,
    },
    homeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 30,
        marginTop: 30,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    homeButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
    },
});

export default PostTestScreen;
