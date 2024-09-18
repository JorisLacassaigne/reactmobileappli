import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState(null);
    const [codec, setCodec] = useState(null);

    const saveToken = (token) => {
        setToken(token);
    };

    const saveUser = (user) => {
        setUser(user);
    };

    const saveEmail = (email) => {
        setEmail(email);
    };

    const saveCodec = (codec) => {
        setCodec(codec);
    };

    return (
        <AuthContext.Provider value={{ token, user, email, codec, saveToken, saveUser, saveEmail, saveCodec }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
