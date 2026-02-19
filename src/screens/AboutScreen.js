import { Ionicons } from '@expo/vector-icons';
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const AboutScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#C62828" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={30} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Hakkımızda</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/images/Logo.png')}
                        style={styles.logoImage}
                        resizeMode="contain"
                    />
                    <Text style={styles.appName}>GLUCOPREDIA</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Vizyonumuz & Misyonumuz</Text>
                    <Text style={styles.paragraph}>
                        <Text style={styles.bold}>GlucoPredia</Text>, yapay zeka destekli analiz yöntemleri ve modern tıp algoritmalarını birleştirerek, Tip 2 Diyabet riskini erkenden tespit etmeyi ve önlemeyi amaçlayan öncü bir dijital sağlık platformudur. Amacımız, sadece veri göstermek değil; kullanıcılarımızın yaşam tarzlarını kalıcı olarak iyileştirecek bilinç ve motivasyonu sağlamaktır.
                    </Text>
                    <Text style={styles.paragraph}>
                        Diyabet, günümüzün "sessiz salgını" olarak nitelendirilmektedir. Biz, teknolojinin gücünü kullanarak bu sessizliği bozuyor ve sağlığınızın iplerini sizin elinize veriyoruz.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Teknolojik Altyapımız</Text>
                    <Text style={styles.paragraph}>
                        Uygulamamız, kullanıcı verilerini işlemek için <Text style={styles.bold}>React Native</Text> mimarisi üzerine kurulmuş olup, arka planda gelişmiş risk hesaplama motorları çalıştırmaktadır. Adımsayar entegrasyonu, kişiselleştirilmiş kalori takibi ve dinamik anket sistemlerimiz, sürekli öğrenen bir yapıya sahiptir.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Ekibimiz & Hedefimiz</Text>
                    <Text style={styles.paragraph}>
                        Tazelenen arayüzümüz ve güçlendirilen içerik kütüphanemizle, GlucoPredia ekibi olarak "Daha Sağlıklı Yarınlar" mottosuyla çalışıyoruz. Hedefimiz, Türkiye genelinde 1 milyondan fazla bireyin diyabet farkındalığını artırmaktır.
                    </Text>
                </View>

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
    logoContainer: { alignItems: 'center', marginBottom: 30 },
    logoImage: { width: 120, height: 120, marginBottom: 10 },
    appName: { fontSize: 24, fontWeight: '900', color: '#C62828', letterSpacing: 3 },
    section: { backgroundColor: '#FFF', padding: 20, borderRadius: 15, marginBottom: 20, elevation: 3 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 10 },
    paragraph: { fontSize: 16, color: '#555', lineHeight: 24, marginBottom: 15, textAlign: 'justify' },
    bold: { fontWeight: 'bold', color: '#C62828' },
});

export default AboutScreen;
