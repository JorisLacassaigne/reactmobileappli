// AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState(null);
    const [clientId, setClientId] = useState(null);

    const saveToken = async (newToken) => {
        setToken(newToken);
        // Vous pouvez également stocker le token dans SecureStore ici si nécessaire
    };

    const saveUser = (userData) => {
        setUser(userData);
    };

    const saveEmail = (userEmail) => {
        setEmail(userEmail);
    };

    const saveClientId = (userClientId) => {
        setClientId(userClientId);
    };

    return (
        <AuthContext.Provider value={{ token, saveToken, user, saveUser, email, saveEmail, clientId, saveClientId }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
