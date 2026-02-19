import { Ionicons } from '@expo/vector-icons';
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const AboutScreen = ({ navigation }) => {
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
                <Text style={styles.headerText}>Hakkımızda</Text>
            </View>

            {/* Main Content Area */}
            <ScrollView style={styles.content}>
                <View style={styles.cardContainer}>

                    {/* Placeholder Image */}
                    <Image
                        source={{ uri: 'https://via.placeholder.com/300x150' }}
                        style={styles.image}
                        resizeMode="cover"
                    />

                    {/* About Text */}
                    <Text style={styles.aboutText}>
                        PREDIABE-TR mobil uygulamasının geliştirilmesi ve kullanılabilirliğinin değerlendirilmesi. Bu mobil uygulama prediyabetli bireylere sağlıkla ilgili konularda bilgi sunmak ve bireylerde sağlıklı yaşam biçimi davranışları oluşmasını sağlamayı içermektedir.
                    </Text>

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
        justifyContent: 'center',
        position: 'relative',
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
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        margin: 15,
        padding: 15,
        elevation: 2, // Slight shadow for depth
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 15,
        marginBottom: 20,
    },
    aboutText: {
        fontSize: 16,
        color: '#333333',
        textAlign: 'justify',
        lineHeight: 24, // Improve readability
    },
});

export default AboutScreen;
