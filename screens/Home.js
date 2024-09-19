import React, { useState, useEffect } from "react";
import { View, Text, Image, ActivityIndicator, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import Carousel from 'react-native-reanimated-carousel';
import { GlobalStyles } from "../styles/AppStyles";
import { useAuth } from "../components/AuthContext";

const Home = ({ navigation }) => {
    const [newProducts, setNewProducts] = useState([]);
    const [popularProducts, setPopularProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const defaultImage = "https://cdn.pixabay.com/photo/2013/09/18/18/24/chocolate-183543_1280.jpg"; // Remplace par l'URL de ton image par défaut
    const { width } = Dimensions.get('window');
    const { email } = useAuth();

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
            onPress={() => navigation.navigate("ProductCard", { item: item })}
            style={styles.itemContainer}
        >
            <Image
                source={{ uri: item.image ? item.image : defaultImage }}
                style={styles.image}
            />
            <Text style={styles.title}>{item.designation}</Text>
        </TouchableOpacity>
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Nouveaux Produits</Text>
            <Text style={styles.instructionText}>Swipez pour voir plus de produits</Text>
            <Carousel
                width={width - 32} // Réduit la largeur pour inclure le padding
                height={250}
                data={newProducts}
                renderItem={renderProductItem}
                scrollAnimationDuration={500}
                loop
                pagingEnabled
                snapEnabled
                autoPlay
                autoPlayInterval={4000}
            />

            <Text style={styles.header}>Produits Populaires</Text>
            <Text style={styles.instructionText}>Swipez pour voir plus de produits</Text>
            <Carousel
                width={width - 32} // Réduit la largeur pour inclure le padding
                height={250}
                data={popularProducts}
                renderItem={renderProductItem}
                scrollAnimationDuration={500}
                loop
                pagingEnabled
                snapEnabled
                autoPlay
                autoPlayInterval={4000}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
    instructionText: {
        fontSize: 16,
        color: '#555',
        marginBottom: 16,
    },
    itemContainer: {
        alignItems: 'center',
        marginHorizontal: 8,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Home;
