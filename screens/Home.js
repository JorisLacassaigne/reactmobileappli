import React, { useState, useEffect } from "react";
import { View, Text, Image, ActivityIndicator, TouchableOpacity, Dimensions } from "react-native";
import Carousel from 'react-native-reanimated-carousel';
import { GlobalStyles } from "../styles/AppStyles";

const Home = ({ navigation }) => {
    const [newProducts, setNewProducts] = useState([]);
    const [popularProducts, setPopularProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const defaultImage = "https://cdn.pixabay.com/photo/2013/09/18/18/24/chocolate-183543_1280.jpg"; // Remplace par l'URL de ton image par défaut
    const { width } = Dimensions.get('window');

    useEffect(() => {
        fetch("https://apimobile.jlacassaigne.v70208.campus-centre.fr/produits/new")
            .then(response => response.json())
            .then(data => setNewProducts(data))
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        fetch("https://apimobile.jlacassaigne.v70208.campus-centre.fr/produits/popular")
            .then(response => response.json())
            .then(data => {
                setPopularProducts(data);
                setLoading(false);
            })
            .catch(error => console.error(error));
    }, []);

    const renderProductItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate("ProductCard", { item: item})}
            style={GlobalStyles.itemContainer}
        >
            <Image
                source={{ uri: item.image ? item.image : defaultImage }}
                style={GlobalStyles.image}
            />
            <Text style={GlobalStyles.title}>{item.designation}</Text>
        </TouchableOpacity>
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={GlobalStyles.container}>
            <Text style={GlobalStyles.header}>Nouveaux Produits</Text>
            <Carousel
                width={width - 32} // Réduit la largeur pour inclure le padding
                height={250}
                data={newProducts}
                renderItem={renderProductItem}
                scrollAnimationDuration={500}
                loop
            />

            <Text style={GlobalStyles.header}>Produits Populaires</Text>
            <Carousel
                width={width - 32} // Réduit la largeur pour inclure le padding
                height={250}
                data={popularProducts}
                renderItem={renderProductItem}
                scrollAnimationDuration={500}
                loop
            />
        </View>
    );
};

export default Home;
