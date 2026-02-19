import { Ionicons } from '@expo/vector-icons';
import { useContext } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { UserContext } from '../context/UserContext';

const AnalysisReportScreen = ({ navigation }) => {
    const { user } = useContext(UserContext);

    // --- 1. DATA EXTRACTION ---
    const riskScore = user?.riskScore || 0;
    const complianceScore = user?.complianceScore || 0;

    // Determine Scenario
    // Risk: Low <= 30, High > 30
    // Compliance: Low < 50, High >= 50
    const isRiskHigh = riskScore > 30;
    const isComplianceHigh = complianceScore >= 50;

    let scenario = 'A'; // Default
    if (!isRiskHigh && isComplianceHigh) scenario = 'A'; // Ideal
    else if (isRiskHigh && isComplianceHigh) scenario = 'B'; // Controlled
    else if (!isRiskHigh && !isComplianceHigh) scenario = 'C'; // Hidden Threat
    else if (isRiskHigh && !isComplianceHigh) scenario = 'D'; // CRITICAL

    // --- 2. DYNAMIC CONTENT ENGINE ---
    const getContent = (scn) => {
        switch (scn) {
            case 'A': // Low Risk & High Compliance
                return {
                    title: "Mükemmel Metabolik Denge",
                    color: "#4CAF50", // Green
                    intro: `Sayın ${user?.name || 'Kullanıcımız'}, tebrikler! Analiz sonuçlarınız, metabolik sağlığınızın zirvede olduğunu gösteriyor. Hem risk faktörleriniz düşük hem de yaşam tarzı alışkanlıklarınız koruyucu tıp standartlarına uygun.`,
                    nutrition: {
                        title: "Koruyucu Beslenme",
                        text: "Mevcut beslenme düzeniniz gayet başarılı. Bu dengeyi korumak için 'Gökkuşağı Beslenmesi' modeline devam edin. Antioksidan kapasitesi yüksek kırmızı ve mor meyveleri (yaban mersini, böğürtlen) porsiyon kontrolüyle tüketebilirsiniz. Glisemik indeksi düşük karbonhidratlar (kinoa, karabuğday) enerji seviyenizi stabil tutacaktır."
                    },
                    exercise: {
                        title: "Aktif Yaşamın Sürdürülebilirliği",
                        text: "Fiziksel aktivite düzeyiniz metabolizmanızı canlı tutuyor. Kas kütlenizi korumak için haftada 2 kez direnç egzersizleri (vücut ağırlığı veya hafif ağırlıklar) eklemeyi düşünebilirsiniz. Bu, yaşla birlikte yavaşlayan metabolizmaya karşı en güçlü silahınızdır."
                    },
                    medical: {
                        title: "Rutin Kontroller",
                        text: "Her şey yolunda görünse de, yılda bir kez rutin biyokimya testleri (Açlık Kan Şekeri, Lipid Profili) yaptırmayı ihmal etmeyin. Sağlık, varış noktası değil, bir yolculuktur."
                    }
                };
            case 'B': // High Risk & High Compliance
                return {
                    title: "Kontrollü Risk Yönetimi",
                    color: "#FF9800", // Orange
                    intro: `Sayın ${user?.name || 'Kullanıcımız'}, genetik veya çevresel risk faktörleriniz bulunmasına rağmen, yüksek uyum skorunuz sayesinde bu riskleri başarıyla yönetiyorsunuz. Bu, 'Bilinçli Farkındalık' durumudur ve diyabeti önlemede en önemli adımdır.`,
                    nutrition: {
                        title: "Stratejik Beslenme Optimizasyonu",
                        text: "Çabanız takdire şayan. Ancak risk faktörleriniz nedeniyle karbonhidrat sayımına biraz daha dikkat etmelisiniz. 'Tabak Modeli'ni (Yarım tabak sebze, çeyrek protein, çeyrek kompleks karbonhidrat) her öğünde katı bir şekilde uygulayın. Gizli şeker kaynaklarına (soslar, paketli diyet ürünleri) dikkat edin."
                    },
                    exercise: {
                        title: "İnsülin Duyarlılığını Artırma",
                        text: "Egzersiz rutininize 'High Intensity Interval Training' (HIIT) eklemek, insülin duyarlılığını %25-30 oranında artırabilir. Haftada 1-2 kez, doktor onayıyla nabzınızı güvenli aralıkta yükseltip düşürecek antrenmanlar yapın."
                    },
                    medical: {
                        title: "Yakın Takip",
                        text: "Risk grubunda olduğunuz için 6 ayda bir HbA1c (3 aylık şeker ortalaması) testinizi tekrarlamanız hayati önem taşır. Çabalarınızın biyokimyasal karşılığını görmek motivasyonunuzu artıracaktır."
                    }
                };
            case 'C': // Low Risk & Low Compliance
                return {
                    title: "Gizli Tehdit: Rehavet Uyarısı",
                    color: "#FFC107", // Amber
                    intro: `Sayın ${user?.name || 'Kullanıcımız'}, şu anki risk skorunuzun düşük olması sizi yanıltmasın. Düşük uyum skorunuz (beslenme ve hareket eksikliği), metabolik kredinizden yediğinizi gösteriyor. Bu yaşam tarzı devam ederse, önümüzdeki 5 yıl içinde risk grubuna girme ihtimaliniz %70'in üzerindedir.`,
                    nutrition: {
                        title: "Metabolik Çöpü Temizleme",
                        text: "Vücudunuzu işlenmiş gıdalardan arındırmanın vakti geldi. Şekerli içecekleri, beyaz unu ve trans yağları hayatınızdan çıkarın. Güne protein ağırlıklı (yumurta, peynir) bir kahvaltıyla başlamak, gün boyu tatlı krizlerini önleyecektir. Su tüketiminizi günde en az 2.5 litreye çıkarın."
                    },
                    exercise: {
                        title: "Harekete Geç!",
                        text: "Hareketsizlik, modern çağın sigarasıdır. Spor salonuna gitmek zorunda değilsiniz; sadece asansör yerine merdiven kullanmak, akşamları 20 dakikalık tempolu yürüyüş yapmak bile metabolizmanızı 'uyandıracaktır'. Hedefiniz günlük 5.000 adımı geçmek olsun."
                    },
                    medical: {
                        title: "Erken Uyarı",
                        text: "Vücudunuz henüz alarm vermiyor olabilir ama hücresel düzeyde stres birikiyor. Bu uyarıyı bir fırsat olarak görün ve bugünden itibaren küçük ama kalıcı değişiklikler yapın."
                    }
                };
            case 'D': // High Risk & Low Compliance
                return {
                    title: "KRİTİK DURUM: ACİL EYLEM PLANI",
                    color: "#D32F2F", // Red
                    intro: `DİKKAT! Sayın ${user?.name || 'Kullanıcımız'}, analiz sonuçlarınız 'Yüksek Risk' ve 'Düşük Uyum' kombinasyonunu işaret ediyor. Bu tablo, metabolik sendrom veya Tip 2 Diyabet gelişimi için elverişli bir zemin oluşturmaktadır. Bu bir son değil, güçlü bir uyarıdır.`,
                    nutrition: {
                        title: "Tıbbi Beslenme Tedavisi",
                        text: "Bu noktada beslenme bir tercih değil, tedavidir. Basit karbonhidratları (şeker, bal, reçel, beyaz ekmek, pirinç) tamamen kesin. Glisemik indeksi 55'in altındaki besinlere odaklanın. Öğün atlamayın; uzun süreli açlıklar kan şekerinde ani dalgalanmalara yol açarak insülin direncini derinleştirir."
                    },
                    exercise: {
                        title: "Reçeteli Hareket",
                        text: "Her yemekten sonra yapılacak 15 dakikalık yürüyüş, kan şekerinin ani yükselmesini önlemede ilaç kadar etkilidir. Kaslarınızdaki glikoz depolarını boşaltmak için aktif olmak zorundasınız. Yürüyüşe bugün, hemen şimdi başlayın."
                    },
                    medical: {
                        title: "Doktor Randevusu Alın",
                        text: "Lütfen en kısa sürede bir İç Hastalıkları veya Endokrinoloji uzmanına başvurun. Oral Glukoz Tolerans Testi (OGTT) ve İnsülin direnci (HOMA-IR) testlerinizi yaptırın. Erken müdahale ile bu tabloyu tersine çevirmek tamamen sizin elinizde."
                    }
                };
            default: return {};
        }
    };

    const content = getContent(scenario);
    const themeColor = content.color;

    // --- 3. RENDER HELPERS ---
    const ProgressBar = ({ label, value, color }) => (
        <View style={styles.progressContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                <Text style={styles.progressLabel}>{label}</Text>
                <Text style={[styles.progressValue, { color }]}>%{value}</Text>
            </View>
            <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: `${Math.min(value, 100)}%`, backgroundColor: color }]} />
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#C62828" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={30} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Klinik Rapor</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>

                {/* STATUS CARD */}
                <View style={[styles.statusCard, { borderTopColor: themeColor }]}>
                    <Text style={[styles.statusTitle, { color: themeColor }]}>{content.title}</Text>
                    <View style={styles.scoreRow}>
                        <ProgressBar label="Risk Skoru" value={riskScore} color={isRiskHigh ? '#D32F2F' : '#4CAF50'} />
                        <View style={{ height: 15 }} />
                        <ProgressBar label="Uyum Başarısı" value={complianceScore} color={isComplianceHigh ? '#4CAF50' : '#FF9800'} />
                    </View>
                </View>

                {/* DOCTOR'S NOTE (INTRO) */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="medical" size={24} color={themeColor} />
                        <Text style={[styles.sectionTitle, { color: themeColor }]}>Klinik Değerlendirme</Text>
                    </View>
                    <Text style={styles.paragraph}>{content.intro}</Text>
                </View>

                {/* NUTRITION */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="nutrition" size={24} color={themeColor} />
                        <Text style={[styles.sectionTitle, { color: themeColor }]}>{content.nutrition.title}</Text>
                    </View>
                    <Text style={styles.paragraph}>{content.nutrition.text}</Text>
                </View>

                {/* EXERCISE */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="fitness" size={24} color={themeColor} />
                        <Text style={[styles.sectionTitle, { color: themeColor }]}>{content.exercise.title}</Text>
                    </View>
                    <Text style={styles.paragraph}>{content.exercise.text}</Text>
                </View>

                {/* MEDICAL/ACTION */}
                <View style={[styles.section, { backgroundColor: themeColor + '10', borderLeftColor: themeColor, borderLeftWidth: 4 }]}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="pulse" size={24} color={themeColor} />
                        <Text style={[styles.sectionTitle, { color: themeColor }]}>{content.medical.title}</Text>
                    </View>
                    <Text style={styles.paragraph}>{content.medical.text}</Text>
                </View>

                <View style={{ alignItems: 'center', marginTop: 20, opacity: 0.6 }}>
                    <Image source={require('../../assets/images/Logo.png')} style={{ width: 50, height: 50 }} resizeMode="contain" />
                    <Text style={{ fontSize: 12, color: '#999' }}>GlucoPredia Tıbbi Algoritma v2.1</Text>
                </View>

                <View style={{ height: 50 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F5F5' },
    header: { backgroundColor: '#C62828', height: 100, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 30, elevation: 5 },
    backButton: { marginRight: 15 },
    headerText: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold' },
    content: { padding: 20 },

    // Status Card
    statusCard: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 15,
        elevation: 4,
        marginBottom: 20,
        borderTopWidth: 5
    },
    statusTitle: {
        fontSize: 22,
        fontWeight: '900',
        textAlign: 'center',
        marginBottom: 20,
        textTransform: 'uppercase',
        letterSpacing: 1
    },
    scoreRow: {
        width: '100%'
    },
    progressContainer: {},
    progressLabel: { fontSize: 14, color: '#666', fontWeight: '600' },
    progressValue: { fontSize: 14, fontWeight: 'bold' },
    progressBarBg: { height: 10, backgroundColor: '#E0E0E0', borderRadius: 5, width: '100%' },
    progressBarFill: { height: 10, borderRadius: 5 },

    // Sections
    section: { backgroundColor: '#FFF', padding: 20, borderRadius: 15, marginBottom: 15, elevation: 2 },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 10 },
    paragraph: { fontSize: 15, color: '#444', lineHeight: 24, textAlign: 'justify' },
});

export default AnalysisReportScreen;
