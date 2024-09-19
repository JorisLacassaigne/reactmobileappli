import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, FlatList, Modal, Pressable, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { jwtDecode } from 'jwt-decode'; // Pour décoder le token JWT
import AsyncStorage from '@react-native-async-storage/async-storage'; // Pour stocker/récupérer le token JWT
import { GlobalStyles } from "../styles/AppStyles";
import { CartContext } from '../components/CartContext';
import { useNavigation } from '@react-navigation/native'; // Pour naviguer vers la page de login
import { useAuth } from "../components/AuthContext"; // Pour avoir la variable du client

const CartPage = () => {
    const { cart, removeFromCart, updateCartItem, clearCart } = useContext(CartContext);
    const [client, setClient] = useState(null);
    const [token, setToken] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false); // Gestion de la visibilité de la modale de connexion
    const [isConfirmationModalVisible, setConfirmationModalVisible] = useState(false); // Gestion de la visibilité de la modale de confirmation
    const navigation = useNavigation(); // Hook pour la navigation
    const { email, codec } = useAuth();

    // Récupérer et décoder le token JWT au chargement de la page
    useEffect(() => {
        const getTokenAndDecode = async () => {
            try {
                const token = await AsyncStorage.getItem('jwtToken'); // Récupérer le token JWT stocké
                if (token) {
                    const decoded = jwtDecode(token); // Décoder le JWT
                    setClient(decoded.id); // Récupérer l'ID du client depuis le token
                    setToken(token); // Stocker le token pour les requêtes
                } else {
                    setModalVisible(true); // Si pas de token, afficher la modale
                }
            } catch (error) {
                console.error("Erreur lors de la récupération du token JWT :", error);
                setModalVisible(true); // Afficher la modale en cas d'erreur
            }
        };

        getTokenAndDecode();
    }, []);

    // Incrémenter la quantité
    const incrementQuantity = (item) => {
        updateCartItem(item.reference, item.quantite_demande + 1);
    };

    // Décrémenter la quantité, en s'assurant qu'elle ne soit pas inférieure à 1
    const decrementQuantity = (item) => {
        if (item.quantite_demande > 1) {
            updateCartItem(item.reference, item.quantite_demande - 1);
        }
    };

    // Calcul du prix total d'un article en fonction de sa quantité
    const calculateTotalPrice = (item) => {
        return item.prixUnitaireHT * item.quantite_demande;
    };

    // Calcul du total du panier
    const calculateCartTotal = () => {
        return cart.reduce((total, item) => total + calculateTotalPrice(item), 0);
    };

    // Fonction pour passer la commande
    const handleOrder = () => {
        if (!email) {
            setModalVisible(true); // Si l'email client est introuvable, afficher la modale
            return;
        }

        // Afficher la modale de confirmation
        setConfirmationModalVisible(true);
    };

    // Fonction pour confirmer la commande
    const confirmOrder = async () => {
        // Construire les données de la commande
        const commandeData = {
            codev: 10,  // 10 car ajout du vendeur par défaut
            codec: codec,
            dateCommande: new Date().toISOString(),
            dateLivraison: null,
            totalHT: calculateCartTotal(),
            totalTVA: calculateCartTotal(),
            etat: 1,
            lignesCommande: cart.map(item => ({
                reference: item.reference,
                quantite_demandee: item.quantite_demande
            }))
        };
        console.log(commandeData);

        // Requête POST à l'API avec le corps de la commande
        try {
            const response = await fetch('https://apimobile.jlacassaigne.v70208.campus-centre.fr/commande', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': `Bearer ${token}`, // Inclure le token JWT dans les headers
                },
                body: JSON.stringify(commandeData),
            });
            console.log(response);
            const result = await response.json();

            if (response.ok) {
                Alert.alert("Commande réussie", "Votre commande a bien été enregistrée.");
                clearCart(); // Vider le panier après une commande réussie
            } else {
                Alert.alert("Erreur", result.message || "Une erreur est survenue lors de la commande.");
            }
        } catch (error) {
            Alert.alert("Erreur", "Impossible de passer la commande. Veuillez réessayer.");
        } finally {
            setConfirmationModalVisible(false); // Fermer la modale de confirmation
        }
    };

    // Fonction pour fermer la modale et rediriger vers la page de connexion
    const redirectToLogin = () => {
        setModalVisible(false);
        navigation.navigate('Login'); // Redirection vers la page de connexion
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Panier</Text>
            {cart.length === 0 ? (
                <Text style={styles.emptyText}>Votre panier est vide</Text>
            ) : (
                <>
                    <FlatList
                        data={cart}
                        keyExtractor={(item) => item.reference.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.itemContainer}>
                                <Text style={styles.itemTitle}>{item.designation}</Text>
                                <Text style={styles.itemPrice}>Prix Unitaire : {item.prixUnitaireHT} €</Text>

                                {/* Boutons + et - pour ajuster la quantité */}
                                <View style={styles.quantityContainer}>
                                    <TouchableOpacity onPress={() => decrementQuantity(item)} style={styles.quantityButton}>
                                        <Text style={styles.quantityButtonText}>-</Text>
                                    </TouchableOpacity>
                                    <TextInput
                                        style={styles.quantityInput}
                                        value={item.quantite_demande.toString()}
                                        onChangeText={(text) => updateCartItem(item.reference, parseInt(text) || 1)}
                                        keyboardType="numeric"
                                    />
                                    <TouchableOpacity onPress={() => incrementQuantity(item)} style={styles.quantityButton}>
                                        <Text style={styles.quantityButtonText}>+</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* Calcul du prix total pour l'article */}
                                <Text style={styles.itemTotal}>Total : {calculateTotalPrice(item)} €</Text>

                                <Button
                                    title="Retirer du panier"
                                    onPress={() => removeFromCart(item.reference)}
                                    color="#ff4500"
                                />
                            </View>
                        )}
                    />

                    {/* Affichage du total du panier */}
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalText}>Total du Panier : {calculateCartTotal()} €</Text>
                    </View>

                    {/* Bouton pour passer la commande */}
                    <Button title="Passer la commande" onPress={handleOrder} color="#841584" />

                    {/* Modale pour proposer de se connecter */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isModalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Vous devez être connecté pour passer une commande.</Text>
                                <Pressable
                                    style={[styles.button, styles.buttonValidate]}
                                    onPress={redirectToLogin}
                                >
                                    <Text style={styles.buttonText}>Se connecter</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>

                    {/* Modale pour confirmer la commande */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isConfirmationModalVisible}
                        onRequestClose={() => setConfirmationModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Êtes-vous sûr de vouloir passer cette commande ?</Text>
                                <Pressable
                                    style={[styles.button, styles.buttonValidate]}
                                    onPress={confirmOrder}
                                >
                                    <Text style={styles.buttonText}>Confirmer</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.button, styles.buttonWarning]}
                                    onPress={() => setConfirmationModalVisible(false)}
                                >
                                    <Text style={styles.buttonText}>Annuler</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
    emptyText: {
        fontSize: 18,
        color: '#555',
        marginTop: 20,
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
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    itemPrice: {
        fontSize: 16,
        color: '#555',
        marginTop: 8,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    quantityButton: {
        backgroundColor: '#841584',
        padding: 8,
        borderRadius: 4,
        marginHorizontal: 5,
    },
    quantityButtonText: {
        color: '#fff',
        fontSize: 20,
    },
    quantityInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        width: 50,
        textAlign: 'center',
        borderRadius: 4,
    },
    itemTotal: {
        fontSize: 16,
        color: '#555',
        marginTop: 8,
    },
    totalContainer: {
        marginTop: 20,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 20,
        width: '80%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    button: {
        padding: 10,
        borderRadius: 4,
        marginVertical: 5,
        width: '100%',
        alignItems: 'center',
    },
    buttonValidate: {
        backgroundColor: '#841584',
    },
    buttonWarning: {
        backgroundColor: '#ff4500',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default CartPage;
