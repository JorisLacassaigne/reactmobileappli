import React from 'react';
import {Image, Text, View} from 'react-native';
import {GlobalStyles} from "../styles/AppStyles";

const ProductCard = ({ route }) => {
    const {item} = route.params;
    console.log(route);
    //{"item": {"descriptif": "G", "designation": "FEU DE JOIE LIQUEUR ASSORT.", "poids_piece": 0, "prix_unitaire_HT": 23, "quantite": 500, "reference
    // ": 1004, "stock": 50}}


    return (
        <View style={GlobalStyles.item}>
           <Text style={GlobalStyles.title}>{item.designation}</Text>
            <Image
                style={GlobalStyles.image}
                source={{
                    uri:"https://cdn.pixabay.com/photo/2013/09/18/18/24/chocolate-183543_1280.jpg"
                }}
            />
            <Text style={GlobalStyles.title}>Prix : {item.prix_unitaire_HT} €</Text>
            <Text style={GlobalStyles.title}>Quantité : {item.quantite}</Text>
            <Text style={GlobalStyles.title}>Stock : {item.stock}</Text>
            <Text style={GlobalStyles.title}>Référence : {item.reference}</Text>
            <Text style={GlobalStyles.title}>MARCUS : {item.poids_piece}</Text>
        </View>
    );
}

export default ProductCard;

