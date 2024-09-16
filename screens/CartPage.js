import React, { useContext, useState, useEffect } from 'react';
import { Button, FlatList, Text, TextInput, View, TouchableOpacity, Alert, Modal, Pressable } from 'react-native';
import jwtDecode from 'jwt-decode'; // Pour décoder le token JWT
import AsyncStorage from '@react-native-async-storage/async-storage'; // Pour stocker/récupérer le token JWT
import { GlobalStyles } from "../styles/AppStyles";
import { CartContext } from '../components/CartContext';
import { useNavigation } from '@react-navigation/native'; // Pour naviguer vers la page de login

const CartPage = () => {
    const { cart, removeFromCart, updateCartItem, clearCart } = useContext(CartContext);
    const [clientId, setClientId] = useState(null);
    const [token, setToken] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false); // Gestion de la visibilité de la modale de connexion
    const [isConfirmationModalVisible, setConfirmationModalVisible] = useState(false); // Gestion de la visibilité de la modale de confirmation
    const navigation = useNavigation(); // Hook pour la navigation

    // Récupérer et décoder le token JWT au chargement de la page
    useEffect(() => {
        const getTokenAndDecode = async () => {
            try {
                const token = await AsyncStorage.getItem('jwtToken'); // Récupérer le token JWT stocké
                if (token) {
                    const decoded = jwtDecode(token); // Décoder le JWT
                    setClientId(decoded.id); // Récupérer l'ID du client depuis le token
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
        if (!clientId) {
            setModalVisible(true); // Si l'ID client est introuvable, afficher la modale
            return;
        }

        // Afficher la modale de confirmation
        setConfirmationModalVisible(true);
    };

    // Fonction pour confirmer la commande
    const confirmOrder = async () => {
        // Construire les données de la commande
        const commandeData = {
            dateCommande: new Date().toISOString(),
            totalHT: calculateCartTotal(),
            lignesCommande: cart.map(item => ({
                reference: item.reference,
                quantite_demandee: item.quantite_demande
            }))
        };

        // Requête POST à l'API avec le corps de la commande
        try {
            const response = await fetch('https://apimobile.jlacassaigne.v70208.campus-centre.fr/commande', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Inclure le token JWT dans les headers
                },
                body: JSON.stringify(commandeData),
            });

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
        <View style={GlobalStyles.item}>
            <Text style={GlobalStyles.title}>Panier</Text>
            {cart.length === 0 ? (
                <Text style={GlobalStyles.text}>Votre panier est vide</Text>
            ) : (
                <>
                    <FlatList
                        data={cart}
                        keyExtractor={(item) => item.reference.toString()}
                        renderItem={({ item }) => (
                            <View style={GlobalStyles.itemContainer}>
                                <Text style={GlobalStyles.text}>{item.designation}</Text>
                                <Text>Prix Unitaire : {item.prixUnitaireHT} €</Text>

                                {/* Boutons + et - pour ajuster la quantité */}
                                <View style={GlobalStyles.quantityContainer}>
                                    <TouchableOpacity onPress={() => decrementQuantity(item)} style={GlobalStyles.button}>
                                        <Text>-</Text>
                                    </TouchableOpacity>
                                    <TextInput
                                        style={GlobalStyles.input}
                                        value={item.quantite_demande.toString()}
                                        onChangeText={(text) => updateCartItem(item.reference, parseInt(text) || 1)}
                                        keyboardType="numeric"
                                    />
                                    <TouchableOpacity onPress={() => incrementQuantity(item)} style={GlobalStyles.button}>
                                        <Text>+</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* Calcul du prix total pour l'article */}
                                <Text>Total : {calculateTotalPrice(item)} €</Text>

                                <Button
                                    style={GlobalStyles.buttonWarning}
                                    title="Retirer du panier"
                                    onPress={() => removeFromCart(item.reference)}
                                />
                            </View>
                        )}
                    />

                    {/* Affichage du total du panier */}
                    <View>
                        <Text style={GlobalStyles.title}>Total du Panier : {calculateCartTotal()} €</Text>
                    </View>

                    {/* Bouton pour passer la commande */}
                    <Button title="Passer la commande" onPress={handleOrder} />

                    {/* Modale pour proposer de se connecter */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isModalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={GlobalStyles.modalContainer}>
                            <View style={GlobalStyles.modalView}>
                                <Text style={GlobalStyles.modalText}>Vous devez être connecté pour passer une commande.</Text>
                                <Pressable
                                    style={[GlobalStyles.button, GlobalStyles.buttonValidate]}
                                    onPress={redirectToLogin}
                                >
                                    <Text style={GlobalStyles.text}>Se connecter</Text>
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
                        <View style={GlobalStyles.modalContainer}>
                            <View style={GlobalStyles.modalView}>
                                <Text style={GlobalStyles.modalText}>Êtes-vous sûr de vouloir passer cette commande ?</Text>
                                <Pressable
                                    style={[GlobalStyles.button, GlobalStyles.buttonValidate]}
                                    onPress={confirmOrder}
                                >
                                    <Text style={GlobalStyles.text}>Confirmer</Text>
                                </Pressable>
                                <Pressable
                                    style={[GlobalStyles.button, GlobalStyles.buttonWarning]}
                                    onPress={() => setConfirmationModalVisible(false)}
                                >
                                    <Text style={GlobalStyles.text}>Annuler</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                </>
            )}
        </View>
    );
};

export default CartPage;
