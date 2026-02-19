import { Ionicons } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    LayoutAnimation,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    UIManager,
    View,
} from 'react-native';

import { UserContext } from '../context/UserContext';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width } = Dimensions.get('window');

const QUESTIONS = [
    { id: 1, text: "Ailenizde (anne, baba, kardeş) diyabet hastası var mı?", riskAnswer: true },
    { id: 2, text: "Vücut Kitle İndeksiniz (BKİ) 25'in üzerinde mi?", riskAnswer: true },
    { id: 3, text: "Bel çevreniz erkeklerde 102 cm, kadınlarda 88 cm'den geniş mi?", riskAnswer: true },
    { id: 4, text: "Yüksek tansiyon şikayetiniz var mı veya bunun için ilaç kullanıyor musunuz?", riskAnswer: true },
    { id: 5, text: "Haftada en az 3 gün tempolu egzersiz yapıyor musunuz?", riskAnswer: false }, // Inverse Logic: 'Hayır' is risk
    { id: 6, text: "Daha önce doktorunuz tarafından kan şekerinizin yüksek olduğu söylendi mi?", riskAnswer: true },
    { id: 7, text: "Günde en az bir porsiyon taze sebze veya meyve tüketiyor musunuz?", riskAnswer: false }, // Inverse Logic
    { id: 8, text: "45 yaşın üzerinde misiniz?", riskAnswer: true },
    { id: 9, text: "Kadınsanız: Gebelik diyabeti geçirdiniz mi veya 4 kg üzeri bebek doğurdunuz mu? (Erkekler 'Hayır' diyebilir)", riskAnswer: true },
    { id: 10, text: "Gün içinde çok sık susuyor ve ağız kuruluğu yaşıyor musunuz?", riskAnswer: true },
    { id: 11, text: "Geceleri sık idrara çıkıyor musunuz?", riskAnswer: true },
    { id: 12, text: "Son zamanlarda açıklanamayan kilo kaybı veya aşırı iştah artışı yaşadınız mı?", riskAnswer: true },
    { id: 13, text: "Yemeklerden sonra üzerinize ani bir ağırlık veya uyku çöküyor mu?", riskAnswer: true },
    { id: 14, text: "Vücudunuzda açılan yaralar normalden daha geç mi iyileşiyor?", riskAnswer: true },
    { id: 15, text: "Ellerinizde veya ayaklarınızda uyuşma, karıncalanma hissediyor musunuz?", riskAnswer: true },
    { id: 16, text: "Görmenizde bulanıklık veya odaklanma sorunu yaşıyor musunuz?", riskAnswer: true },
    { id: 17, text: "Cildinizde, özellikle boyun veya koltuk altında koyulaşma var mı?", riskAnswer: true },
    { id: 18, text: "Canınız sık sık tatlı veya hamur işi türü gıdalar çekiyor mu?", riskAnswer: true },
    { id: 19, text: "Kendinizi sürekli yorgun veya halsiz hissediyor musunuz?", riskAnswer: true },
    { id: 20, text: "Günlük hayatta yüksek stres altında mısınız?", riskAnswer: true },
];

const PreTestScreen = ({ navigation }) => {
    const { updateRiskScore } = useContext(UserContext);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [loadingResult, setLoadingResult] = useState(false);

    const handleAnswer = (answer) => {
        // Calculate score for this question
        const currentQuestion = QUESTIONS[currentIndex];
        let points = 0;

        if (answer === currentQuestion.riskAnswer) {
            points = 5;
        }

        const newScore = score + points;

        // Animate transition
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        if (currentIndex < QUESTIONS.length - 1) {
            setScore(newScore);
            setCurrentIndex(currentIndex + 1);
        } else {
            // Last question answered
            setScore(newScore);
            finishTest(newScore);
        }
    };

    const finishTest = (finalScore) => {
        setLoadingResult(true);
        // Simulate a short calculation delay for effect
        setTimeout(() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            setLoadingResult(false);
            setIsFinished(true);
            updateRiskScore(finalScore);
        }, 1000);
    };

    const getResultData = () => {
        if (score <= 30) {
            return {
                level: "DÜŞÜK RİSK",
                color: "#43A047", // Fresh Green
                bg: "#E8F5E9",
                icon: "shield-checkmark",
                message: "Harika! Diyabet riskiniz şu an için düşük seviyede.\n\nSağlıklı beslenmeye ve hareket etmeye devam ederek bu formunuzu koruyabilirsiniz.",
                recommendation: "Öneri: Yılda bir kez rutin kontrollerinizi yaptırmayı unutmayın."
            };
        } else if (score <= 60) {
            return {
                level: "ORTA RİSK",
                color: "#FB8C00", // Soft Orange
                bg: "#FFF3E0",
                icon: "alert-circle",
                message: "Dikkat! Bazı risk faktörleri taşıyorsunuz.\n\nYaşam tarzınızda yapacağınız küçük değişiklikler (daha çok hareket, daha az şeker) büyük fark yaratabilir.",
                recommendation: "Öneri: Bir beslenme uzmanı veya doktorla görüşerek önlem alabilirsiniz."
            };
        } else {
            return {
                level: "YÜKSEK RİSK",
                color: "#D32F2F", // Strong Red
                bg: "#FFEBEE",
                icon: "warning",
                message: "Önemli! Test sonuçlarınız diyabet riskinizin yüksek olduğunu gösteriyor.\n\nBu bir tanı değildir ancak en kısa sürede bir sağlık uzmanına başvurmanız şiddetle tavsiye edilir.",
                recommendation: "Öneri: Vakit kaybetmeden kan şekeri testi yaptırınız."
            };
        }
    };

    // --- RENDER COMPONENT ---

    if (loadingResult) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#C62828" />
                <Text style={styles.loadingText}>Sonuçlarınız analiz ediliyor...</Text>
            </SafeAreaView>
        );
    }

    if (isFinished) {
        const result = getResultData();
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: result.bg }]}>
                <StatusBar barStyle="dark-content" backgroundColor={result.bg} />
                <View style={styles.resultCard}>
                    <Ionicons name={result.icon} size={80} color={result.color} />
                    <Text style={[styles.resultLevel, { color: result.color }]}>{result.level}</Text>
                    <Text style={styles.resultScore}>Risk Skoru: %{score}</Text>

                    <View style={styles.divider} />

                    <Text style={styles.resultMessage}>{result.message}</Text>
                    <Text style={[styles.resultRecommendation, { color: result.color }]}>{result.recommendation}</Text>

                    <TouchableOpacity
                        style={[styles.homeButton, { backgroundColor: result.color }]}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Text style={styles.homeButtonText}>Ana Sayfaya Dön</Text>
                        <Ionicons name="arrow-forward" size={20} color="#FFF" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    // Progress Calculation
    const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;
    const currentQuestion = QUESTIONS[currentIndex];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#C62828" />

            {/* Header / Progress Bar */}
            <View style={styles.header}>
                <View style={styles.progressBarContainer}>
                    <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
                </View>
                <Text style={styles.progressText}>Soru {currentIndex + 1} / {QUESTIONS.length}</Text>
            </View>

            {/* Content Body */}
            <View style={styles.contentContainer}>
                <View style={styles.card}>
                    <View style={styles.questionBadge}>
                        <Ionicons name="help-circle-outline" size={24} color="#FFF" />
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
                        <Ionicons name="checkmark-sharp" size={28} color="#C62828" />
                        <Text style={[styles.answerText, styles.yesText]}>EVET</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.answerButton, styles.noButton]}
                        onPress={() => handleAnswer(false)}
                        activeOpacity={0.8}
                    >
                        <Ionicons name="close-sharp" size={28} color="#FFF" />
                        <Text style={[styles.answerText, styles.noText]}>HAYIR</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Quit Button (Optional, small at bottom) */}
            <TouchableOpacity style={styles.quitButton} onPress={() => navigation.goBack()}>
                <Text style={styles.quitText}>Testi İptal Et</Text>
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
    },
    yesButton: {
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        borderColor: '#C62828',
    },
    noButton: {
        backgroundColor: '#C62828',
    },
    answerText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    yesText: {
        color: '#C62828',
    },
    noText: {
        color: '#FFFFFF',
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
    resultMessage: {
        fontSize: 16,
        color: '#444',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 20,
    },
    resultRecommendation: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 15,
        backgroundColor: '#FFF',
        borderRadius: 10,
        width: '100%',
        elevation: 1,
    },
    homeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 30,
        marginTop: 40,
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

export default PreTestScreen;
