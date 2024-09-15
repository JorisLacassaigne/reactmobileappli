import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CartContext = createContext();

// CartContext.js
// CartContext.js
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Fonction pour ajouter un produit au panier
    const addToCart = (product) => {
        setCart(prevCart => {
            const existingProductIndex = prevCart.findIndex(item => item.reference === product.reference);

            if (existingProductIndex !== -1) {
                // Si le produit est déjà dans le panier, on incrémente la quantité
                const updatedCart = [...prevCart];
                updatedCart[existingProductIndex].quantite_demande += product.quantite_demande || 1; // Si product.quantite_demande n'existe pas, on ajoute 1 par défaut
                return updatedCart;
            } else {
                // Si le produit n'est pas dans le panier, on l'ajoute
                return [...prevCart, { ...product, quantite_demande: product.quantite_demande || 1 }];
            }
        });
    };

    // Fonction pour retirer un produit du panier
    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.reference !== productId));
    };

    // Fonction pour mettre à jour la quantité d'un produit dans le panier
    const updateCartItem = (productId, newQuantity) => {
        setCart(cart.map(item =>
            item.reference === productId ? { ...item, quantite_demande: newQuantity } : item
        ));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCartItem }}>
            {children}
        </CartContext.Provider>
    );
};


