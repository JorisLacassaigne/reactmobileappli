import React, { useContext, useState } from 'react';
import { Button, Image, Text, TextInput, View, TouchableOpacity, StyleSheet } from 'react-native';
import { GlobalStyles } from "../styles/AppStyles";
import { CartContext } from '../components/CartContext'
import { useAuth } from "../components/AuthContext";

const ProductCard = ({ route }) => {
    const { item } = route.params;
    const { addToCart } = useContext(CartContext);
    const [quantite_demande, setQuantiteDemande] = useState(1); // Quantité par défaut
    const { email } = useAuth();

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
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{
                    uri: "https://cdn.pixabay.com/photo/2013/09/18/18/24/chocolate-183543_1280.jpg"
                }}
            />
            <Text style={styles.title}>{item.designation}</Text>
            <Text style={styles.price}>Prix : {item.prixUnitaireHT} €</Text>
            <Text style={styles.stock}>Stock : {item.quantite}</Text>
            {item.poidsPiece != null}

            {/* Section pour ajuster la quantité */}
            <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={decrementQuantity} style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <TextInput
                    style={styles.quantityInput}
                    value={quantite_demande.toString()}
                    onChangeText={(text) => setQuantiteDemande(parseInt(text) || 1)}
                    keyboardType="numeric"
                />
                <TouchableOpacity onPress={incrementQuantity} style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
            </View>

            <Button
                title="Ajouter au panier"
                onPress={handleAddToCart}
                color="#841584"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    price: {
        fontSize: 18,
        color: '#333',
        marginBottom: 5,
    },
    stock: {
        fontSize: 18,
        color: '#333',
        marginBottom: 5,
    },
    weight: {
        fontSize: 18,
        color: '#333',
        marginBottom: 20,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    quantityButton: {
        backgroundColor: '#841584',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    quantityButtonText: {
        color: '#fff',
        fontSize: 20,
    },
    quantityInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        width: 50,
        textAlign: 'center',
        borderRadius: 5,
    },
});

export default ProductCard;
