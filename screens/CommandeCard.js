import React from 'react';
import {Image, Text, View} from 'react-native';
import {GlobalStyles} from "../styles/AppStyles";

const CommandeCard = ({ route }) => {
    const {item} = route.params;
    console.log(route);


    return (
        <View style={GlobalStyles.item}>
            <Text style={GlobalStyles.title}>{item.email}</Text>
            <Image
                style={GlobalStyles.image}
                source={{
                    uri:"https://cdn.pixabay.com/photo/2013/09/18/18/24/chocolate-183543_1280.jpg"
                }}
            />
            <Text style={GlobalStyles.title}>Numéro : {item.numero} €</Text>
            <Text style={GlobalStyles.title}>Vendeur : {item.codev}</Text>
            <Text style={GlobalStyles.title}>Date de Livraison : {item.dateLivraison}</Text>
            <Text style={GlobalStyles.title}>Date de Commande : {item.dateCommande}</Text>
            <Text style={GlobalStyles.title}>Total : {item.totalHT}</Text>
            <Text style={GlobalStyles.title}>Etat : {item.etat}</Text>
        </View>
    );
}

export default CommandeCard;

