import React, { useEffect, useState, useCallback } from "react";
import { FlatList, Image, Text, TouchableOpacity, View, ActivityIndicator, StyleSheet, Dimensions } from "react-native";
//import { GlobalStyles } from "../styles/AppStyles";
import { useAuth } from "../components/AuthContext";

const { width } = Dimensions.get("window");

export default function Products({ navigation }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { email } = useAuth();

    const fetchData = useCallback(() => {
        setLoading(true);
        fetch("https://apimobile.jlacassaigne.v70208.campus-centre.fr/produits")
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Erreur de chargement des données</Text>
            </View>
        );
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate("ProductCard", { item: item })}
            style={styles.itemContainer}
        >
            <Image
                style={styles.image}
                source={{
                    uri: "https://cdn.pixabay.com/photo/2013/09/18/18/24/chocolate-183543_1280.jpg",
                }}
            />
            <Text style={styles.title}>{item.designation}</Text>
        </TouchableOpacity>
    );

    const renderRow = ({ item }) => {
        const items = [item, data[data.indexOf(item) + 1]];
        return (
            <View style={styles.row}>
                {items.map((item, index) =>
                    item ? (
                        <TouchableOpacity
                            key={index}
                            onPress={() => navigation.navigate("ProductCard", { item: item })}
                            style={styles.itemContainer}
                        >
                            <Image
                                style={styles.image}
                                source={{
                                    uri: "https://cdn.pixabay.com/photo/2013/09/18/18/24/chocolate-183543_1280.jpg",
                                }}
                            />
                            <Text style={styles.title}>{item.designation}</Text>
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.itemContainer} key={index} />
                    )
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={data.filter((_, index) => index % 2 === 0)}
                renderItem={renderRow}
                keyExtractor={(item) => item.reference}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        fontSize: 18,
        color: "red",
    },
    itemContainer: {
        flex: 1,
        padding: 8,
        margin: 8,
        borderRadius: 8,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        maxWidth: (width - 48) / 2, // Ajuste la largeur pour s'assurer que deux éléments tiennent côte à côte
    },
    image: {
        width: "100%",
        height: 150,
        borderRadius: 8,
        marginBottom: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    listContainer: {
        padding: 16,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
});
