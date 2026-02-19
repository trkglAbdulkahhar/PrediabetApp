import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CONTACT_OPTIONS = [
    'Telefon: 0545 664 76 62',
    'E-Posta : ibrahim.topuz@ksbu.edu.tr',
    'Website : ',
    'Whatsapp ile yaz',
    'Uzmana sor',
];

const ContactScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#C62828" />

            {/* Custom Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>{'<'}</Text>
                </TouchableOpacity>
                <Text style={styles.headerText}>İletişim</Text>
            </View>

            {/* Content */}
            <View style={styles.content}>
                {CONTACT_OPTIONS.map((option, index) => (
                    <TouchableOpacity key={index} style={styles.optionCard}>
                        <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        backgroundColor: '#C62828',
        paddingTop: 60,
        paddingBottom: 30,
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
        zIndex: 10,
    },
    backButton: {
        position: 'absolute',
        left: 20,
        top: 60,
        padding: 5,
    },
    backButtonText: {
        color: '#FFFFFF',
        fontSize: 30,
        fontWeight: 'bold',
    },
    headerText: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    content: {
        flex: 1,
        padding: 20,
        paddingTop: 40,
    },
    optionCard: {
        backgroundColor: '#E0E0E0',
        paddingVertical: 18,
        borderRadius: 25,
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionText: {
        color: '#333333',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default ContactScreen;
