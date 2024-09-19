import React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { GlobalStyles } from "../styles/AppStyles";
import { useAuth } from "../components/AuthContext";
import moment from 'moment';

const CommandeCard = ({ route }) => {
    const { item } = route.params;
    const { email } = useAuth();

    // Formater les dates
    const formattedDateLivraison = item.dateLivraison ? moment(item.dateLivraison).format('DD/MM/YYYY') : 'N/A';
    const formattedDateCommande = item.dateCommande ? moment(item.dateCommande).format('DD/MM/YYYY') : 'N/A';

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{
                    uri: "https://cdn.pixabay.com/photo/2013/09/18/18/24/chocolate-183543_1280.jpg"
                }}
            />
            <Text style={styles.title}>Commande n°{item.numero}</Text>
            <Text style={styles.info}>Total : {item.totalHT} €</Text>
            <Text style={styles.info}>Date de Livraison : {formattedDateLivraison}</Text>
            <Text style={styles.info}>Date de Commande : {formattedDateCommande}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    info: {
        fontSize: 18,
        color: '#555',
        marginBottom: 8,
    },
});

export default CommandeCard;
