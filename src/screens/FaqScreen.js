import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const FaqScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#C62828" />

            {/* Standard Red Curved Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="chevron-back" size={30} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerText}>S.S.S.</Text>
            </View>

            {/* Main Content Area */}
            <ScrollView style={styles.content}>
                <View style={styles.cardContainer}>

                    {/* Q&A Item 1 */}
                    <View style={styles.qaBlock}>
                        <Text style={styles.questionText}>
                            1- Kan şekerinizi evde ölçebileceğinizi biliyor musunuz?
                        </Text>
                        <Text style={styles.answerText}>
                            Cevap: Kan şekerinizi glukometre ile ev ortamında ölçebilirsiniz. Ölçüm cihazınızın doğru çalıştığından emin olun ve düzenli aralıklarla kontrol edin.
                        </Text>
                    </View>

                    {/* Q&A Item 2 */}
                    <View style={styles.qaBlock}>
                        <Text style={styles.questionText}>
                            2- Prediyabet tamamen iyileşebilir mi?
                        </Text>
                        <Text style={styles.answerText}>
                            Cevap: Evet, yaşam tarzı değişiklikleri, sağlıklı beslenme ve düzenli egzersiz ile kan şekeri seviyeleri normal aralıklara dönebilir ve Tip 2 diyabet gelişimi önlenebilir.
                        </Text>
                    </View>

                    {/* Q&A Item 3 */}
                    <View style={styles.qaBlock}>
                        <Text style={styles.questionText}>
                            3- Egzersiz yaparken nelere dikkat etmeliyim?
                        </Text>
                        <Text style={styles.answerText}>
                            Cevap: Haftada en az 150 dakika orta şiddette egzersiz önerilir. Egzersize başlamadan önce doktorunuza danışmanız ve kan şekerinizi kontrol etmeniz önemlidir.
                        </Text>
                    </View>

                </View>
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
        paddingTop: 50, // Standard padding for status bar
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
        justifyContent: 'center', // Center the title
        position: 'relative', // For absolute positioning of back button
    },
    backButton: {
        position: 'absolute',
        left: 20,
        top: 55, // Adjust alignment with text
        zIndex: 10,
    },
    headerText: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    content: {
        flex: 1,
    },
    cardContainer: {
        backgroundColor: '#F0F0F0', // Light gray background requested
        borderRadius: 15,
        margin: 15,
        padding: 20,
    },
    qaBlock: {
        marginBottom: 20,
        borderBottomColor: '#DDD', // Optional separator like effect
        borderBottomWidth: 1,
        paddingBottom: 15,
    },
    questionText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 8,
    },
    answerText: {
        fontSize: 15,
        color: '#444444',
        lineHeight: 22, // Improve readability for long text
    },
});

export default FaqScreen;
