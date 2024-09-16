import React, { useContext, useState } from 'react';
import { Button, Image, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { GlobalStyles } from "../styles/AppStyles";
import { CartContext } from '../components/CartContext'
import { useAuth } from "../components/AuthContext";


const ProductCard = ({ route }) => {
    const { item } = route.params;
    const { addToCart } = useContext(CartContext);
    const [quantite_demande, setQuantiteDemande] = useState(1); // Quantité par défaut

    // Incrémenter la quantité
    const incrementQuantity = () => {
        setQuantiteDemande(quantite_demande + 1);
    };

    // Décrémenter la quantité, en s'assurant qu'elle ne soit pas négative
    const decrementQuantity = () => {
        if (quantite_demande > 1) {
            setQuantiteDemande(quantite_demande - 1);
        }
    };

    const handleAddToCart = () => {
        const productWithQuantity = { ...item, quantite_demande };
        addToCart(productWithQuantity);
    };

    return (
        <View style={GlobalStyles.item}>
            <Text style={GlobalStyles.title}>{item.designation}</Text>
            <Image
                style={GlobalStyles.image}
                source={{
                    uri: "https://cdn.pixabay.com/photo/2013/09/18/18/24/chocolate-183543_1280.jpg"
                }}
            />
            <Text style={GlobalStyles.title}>Prix : {item.prixUnitaireHT} €</Text>
            <Text style={GlobalStyles.title}>Stock : {item.quantite}</Text>
            <Text style={GlobalStyles.title}>Stock : {item.stock}</Text>
            {item.poidsPiece != null && (
                <Text style={GlobalStyles.title}>Poids : {item.poidsPiece} grammes</Text>
            )}

            {/* Section pour ajuster la quantité */}
            <View style={GlobalStyles.quantityContainer}>
                <TouchableOpacity onPress={decrementQuantity} style={GlobalStyles.button}>
                    <Text>-</Text>
                </TouchableOpacity>
                <TextInput
                    style={GlobalStyles.input}
                    value={quantite_demande.toString()}
                    onChangeText={(text) => setQuantiteDemande(parseInt(text) || 1)}
                    keyboardType="numeric"
                />
                <TouchableOpacity onPress={incrementQuantity} style={GlobalStyles.button}>
                    <Text>+</Text>
                </TouchableOpacity>
            </View>

            <Button
                title="Ajouter au panier"
                onPress={handleAddToCart}
            />
        </View>
    );
};

export default ProductCard;

