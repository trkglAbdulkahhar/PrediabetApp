import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const InformationScreen = ({ navigation }) => {
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
                <Text style={styles.headerText}>Bilgilendirme</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Section 1: Sağlıklı Beslenme */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Sağlıklı Beslenme</Text>
                    <View style={styles.card}>
                        <Text style={styles.cardText}>
                            Dengeli beslenme, prediyabet yönetiminde en önemli adımdır.
                            Sebze, meyve, tam tahıllar ve protein açısından zengin bir diyet uygulayın.
                            Şekerli içeceklerden ve işlenmiş gıdalardan kaçınmak kan şekeri kontrolüne yardımcı olur.
                        </Text>
                    </View>
                </View>

                {/* Section 2: Egzersizin Önemi */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Egzersizin Önemi</Text>
                    <View style={styles.card}>
                        <Text style={styles.cardText}>
                            Düzenli fiziksel aktivite, vücudun insülin duyarlılığını artırır.
                            Haftada en az 150 dakika orta tempolu yürüyüş veya egzersiz yapmayı hedefleyin.
                            Aktif kalmak hem kilonuzu korumanıza hem de enerjinizi artırmanıza yardımcı olur.
                        </Text>
                    </View>
                </View>

                {/* Section 3: Kan Şekeri Takibi */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Kan Şekeri Takibi</Text>
                    <View style={styles.card}>
                        <Text style={styles.cardText}>
                            Kan şekeri seviyelerinizi düzenli olarak ölçmek ve kaydetmek,
                            vücudunuzun yiyeceklere ve aktivitelere nasıl tepki verdiğini anlamanızı sağlar.
                            Doktorunuzun önerdiği aralıkta kalmaya özen gösterin.
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
    sectionContainer: {
        marginBottom: 25,
    },
    sectionTitle: {
        color: '#C62828',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 5,
    },
    card: {
        backgroundColor: '#E0E0E0', // Grey card background
        borderRadius: 15,
        padding: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    cardText: {
        color: '#333333',
        fontSize: 16,
        lineHeight: 24,
    },
});

export default InformationScreen;
