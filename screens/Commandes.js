import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View, StyleSheet, ActivityIndicator } from "react-native";
import { GlobalStyles } from "../styles/AppStyles";
import { useAuth } from "../components/AuthContext";

export default function Commandes({ navigation }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { email } = useAuth();

    useEffect(() => {
        setLoading(true);
        fetch(`https://apimobile.jlacassaigne.v70208.campus-centre.fr/commande/email/${email}`)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [email]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
    }

    if (error) {
        return <Text style={styles.errorText}>Erreur lors du chargement des commandes</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Mes Commandes</Text>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate("CommandeCard", { item: item })}
                        style={styles.itemContainer}
                    >
                        <View style={styles.item}>
                            <Image
                                style={styles.image}
                                source={{
                                    uri: "https://cdn.pixabay.com/photo/2013/09/18/18/24/chocolate-183543_1280.jpg",
                                }}
                            />
                            <Text style={styles.title}>Commande n°{item.numero}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.email}
            />
        </View>
    );
}

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
    itemContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    item: {
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
});
