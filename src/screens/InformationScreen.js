import { Ionicons } from '@expo/vector-icons';
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const InformationScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#C62828" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={30} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Bilgi Kütüphanesi</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/images/Logo.png')}
                        style={styles.logoImage}
                        resizeMode="contain"
                    />
                </View>

                {/* 1. Beslenme Rehberi */}
                <View style={[styles.card, { borderLeftColor: '#4CAF50' }]}>
                    <View style={styles.cardHeader}>
                        <Ionicons name="nutrition" size={24} color="#4CAF50" />
                        <Text style={styles.cardTitle}>Beslenme Fizyolojisi</Text>
                    </View>
                    <Text style={styles.paragraph}>
                        Diyabet yönetiminde beslenme, sadece kalori hesabı değildir; hormon yönetimidir. İnsülin hormonunun aşırı salgılanmasını önlemek için karbonhidrat yükü düşük, lif oranı yüksek besinler tercih edilmelidir.
                    </Text>
                    <Text style={[styles.paragraph, { fontWeight: 'bold' }]}>Akdeniz Diyeti Modeli:</Text>
                    <Text style={styles.paragraph}>
                        Bilimsel çalışmalar, zeytinyağı, balık, fındık/ceviz ve sebze ağırlıklı Akdeniz tipi beslenmenin kardiyovasküler riskleri %30 oranında azalttığını göstermektedir.
                    </Text>
                </View>

                {/* 2. Egzersiz Bilimi */}
                <View style={[styles.card, { borderLeftColor: '#2196F3' }]}>
                    <View style={styles.cardHeader}>
                        <Ionicons name="bicycle" size={24} color="#2196F3" />
                        <Text style={styles.cardTitle}>Egzersiz & Metabolizma</Text>
                    </View>
                    <Text style={styles.paragraph}>
                        Sadece kilo vermek için değil, hücrelerin glikoz alımını (insülin duyarlılığını) artırmak için egzersiz şarttır. Egzersiz sırasında kaslar, insüline ihtiyaç duymadan da kandan şeker çekebilir.
                    </Text>
                    <Text style={[styles.paragraph, { fontWeight: 'bold' }]}>Önerilen Reçete:</Text>
                    <Text style={styles.paragraph}>
                        Haftada en az 150 dakika orta şiddetli aerobik aktivite (tempolu yürüyüş) ve haftada 2 gün direnç egzersizleri (ağırlık çalışması) kas kütlesini korumak için elzemdir.
                    </Text>
                </View>

                {/* 3. Uyku ve Stres */}
                <View style={[styles.card, { borderLeftColor: '#9C27B0' }]}>
                    <View style={styles.cardHeader}>
                        <Ionicons name="moon" size={24} color="#9C27B0" />
                        <Text style={styles.cardTitle}>Sirkadiyen Ritim</Text>
                    </View>
                    <Text style={styles.paragraph}>
                        Uyku düzensizliği, kortizol (stres hormonu) seviyelerini yükselterek kan şekerini artırır. Günde 7 saatten az uyuyan bireylerde diyabet riski daha yüksektir.
                    </Text>
                    <Text style={styles.paragraph}>
                        Yatmadan en az 2 saat önce mavi ışık maruziyetini (telefon, tablet) kesmek, melatonin salgısını artırarak metabolik onarımı hızlandırır.
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
    logoContainer: { alignItems: 'center', marginBottom: 20 },
    logoImage: { width: 80, height: 80 },
    card: { backgroundColor: '#FFF', padding: 20, borderRadius: 15, marginBottom: 20, elevation: 3, borderLeftWidth: 5 },
    cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
    cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginLeft: 10 },
    paragraph: { fontSize: 16, color: '#555', lineHeight: 24, marginBottom: 10, textAlign: 'justify' },
});

export default InformationScreen;
