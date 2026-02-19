import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    Image,
    LayoutAnimation,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    UIManager,
    View
} from 'react-native';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

const FAQ_DATA = [
    {
        id: 1,
        question: "Prediyabet nedir ve neden önemlidir?",
        answer: "Prediyabet (Gizli Şeker), kan şekeri seviyelerinin normalden yüksek olduğu ancak Tip 2 diyabet tanısı konulacak kadar yüksek olmadığı bir ara evredir. Önemsiz gibi görünse de, bu evrede müdahale edilmezse 5-10 yıl içinde Tip 2 Diyabet gelişme riski %50'den fazladır. Erken teşhis hayat kurtarır."
    },
    {
        id: 2,
        question: "Risk Skoru ne anlama geliyor?",
        answer: "Uygulamamızdaki Risk Skoru, FINDRISC (Finlandiya Diyabet Risk Skoru) algoritması temel alınarak hesaplanır. Yaş, VKİ, bel çevresi, fiziksel aktivite, beslenme, hipertansiyon ve aile öyküsü gibi parametreleri değerlendirerek size 10 yıl içinde diyabet geliştirme olasılığınızı yüzde olarak sunar."
    },
    {
        id: 3,
        question: "Diyabetin en yaygın belirtileri nelerdir?",
        answer: "1. Çok sık susama ve ağız kuruluğu.\n2. Sık idrara çıkma.\n3. Aşırı açlık hissi.\n4. Açıklanamayan kilo kaybı.\n5. İdrarda keton varlığı.\n6. Yorgunluk ve halsizlik.\n7. Bulanık görme.\n8. Yaraların geç iyileşmesi."
    },
    {
        id: 4,
        question: "Günde kaç adım atmalıyım?",
        answer: "Dünya Sağlık Örgütü (WHO), yetişkinler için günde en az 10.000 adımı önermektedir. Ancak diyabet riskini azaltmak için yapılan araştırmalar, günde en az 7.500 adımın bile metabolik sağlığı önemli ölçüde iyileştirdiğini göstermektedir."
    },
    {
        id: 5,
        question: "Glisemik İndeks neden önemlidir?",
        answer: "Glisemik İndeks (Gİ), karbonhidrat içeren bir besinin kan şekerini ne kadar hızlı yükselttiğini ölçer. Yüksek Gİ'li besinler (beyaz ekmek, şeker, patates) kan şekerini hızla yükseltip düşürerek açlık krizlerine ve insülin direncine yol açar. Düşük Gİ'li besinler (tam tahıllar, baklagiller) ise uzun süre tokluk sağlar."
    },
    {
        id: 6,
        question: "Uygulama verilerimi doktorumla paylaşabilir miyim?",
        answer: "Evet! Özellikle yeni eklenen 'Klinik Analiz Raporu' ekranı, doktorunuza sunmanız için optimize edilmiştir. Bu rapordaki veriler, hekiminizin tedavi planını şekillendirmesine yardımcı olabilir."
    },
    {
        id: 7,
        question: "İnsülin direnci tamamen geçer mi?",
        answer: "Evet, insülin direnci geri döndürülebilir bir durumdur. Kilo vermek, düzenli egzersiz yapmak ve düşük karbonhidratlı beslenmek, hücrelerin insüline olan duyarlılığını artırarak direnci kırabilir."
    },
    {
        id: 8,
        question: "Hangi sıklıkla test yapmalıyım?",
        answer: "Risk durumunuza göre değişmekle birlikte, yaşam tarzı değişikliği yaptıktan sonra (diyet, spor vb.) her 3 ayda bir 'Son Test'leri tekrarlamanızı öneririz. Değişiminizi görmek motivasyonunuzu artıracaktır."
    },
    {
        id: 9,
        question: "Tip 1 ve Tip 2 Diyabet arasındaki fark nedir?",
        answer: "Tip 1 Diyabet, pankreasın hiç insülin üretmediği otoimmün bir hastalıktır ve genellikle çocuklukta başlar. Tip 2 Diyabet ise vücudun insülini etkili kullanamadığı (insülin direnci) ve genellikle yaşam tarzına bağlı gelişen, önlenebilir bir hastalıktır."
    },
    {
        id: 10,
        question: "Metabolik Sendrom nedir?",
        answer: "Metabolik sendrom; bel çevresi yağlanması, yüksek tansiyon, yüksek kan şekeri ve yüksek kolesterolün bir arada bulunduğu tehlikeli bir tablodur. Kalp krizi ve felç riskini ciddi oranda artırır."
    }
];

const ExpandableItem = ({ item, expanded, onPress }) => {
    return (
        <TouchableOpacity style={styles.itemContainer} onPress={onPress} activeOpacity={0.9}>
            <View style={styles.itemHeader}>
                <Text style={styles.questionText}>{item.question}</Text>
                <Ionicons
                    name={expanded ? "remove-circle" : "add-circle"}
                    size={24}
                    color={expanded ? "#C62828" : "#9E9E9E"}
                />
            </View>
            {expanded && (
                <View style={styles.itemContent}>
                    <Text style={styles.answerText}>{item.answer}</Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

const FaqScreen = ({ navigation }) => {
    const [expandedId, setExpandedId] = useState(null);

    const toggleExpand = (id) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#C62828" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={30} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Sıkça Sorulan Sorular</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.introContainer}>
                    <Image
                        source={require('../../assets/images/Logo.png')}
                        style={styles.logoImage}
                        resizeMode="contain"
                    />
                    <Text style={styles.introText}>
                        Diyabet ve sağlıklı yaşam hakkında en çok merak edilenleri uzman kaynaklardan derledik.
                    </Text>
                </View>

                {FAQ_DATA.map((item) => (
                    <ExpandableItem
                        key={item.id}
                        item={item}
                        expanded={expandedId === item.id}
                        onPress={() => toggleExpand(item.id)}
                    />
                ))}

                <View style={{ height: 30 }} />
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
    introContainer: { alignItems: 'center', marginBottom: 20 },
    logoImage: { width: 60, height: 60, marginBottom: 10 },
    introText: { textAlign: 'center', color: '#666', fontSize: 14, fontStyle: 'italic' },
    itemContainer: { backgroundColor: '#FFF', borderRadius: 10, marginBottom: 10, overflow: 'hidden', elevation: 2 },
    itemHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, backgroundColor: '#FAFAFA' },
    questionText: { fontSize: 16, fontWeight: 'bold', color: '#333', flex: 1, marginRight: 10 },
    itemContent: { padding: 15, borderTopWidth: 1, borderTopColor: '#F0F0F0', backgroundColor: '#FFF' },
    answerText: { fontSize: 15, color: '#555', lineHeight: 22 },
});

export default FaqScreen;
