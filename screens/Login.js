import React, { useState } from "react";
import { Button, Text, TextInput, View, StyleSheet } from "react-native";
import { GlobalStyles } from "../styles/AppStyles";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../components/AuthContext";

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [codec, setCodec] = useState("");
    const [passWord, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const { saveToken, saveUser, saveEmail, saveCodec } = useAuth();

    const handleLogin = async () => {
        try {
            console.log(email, passWord, codec);
            const response = await fetch("https://apimobile.jlacassaigne.v70208.campus-centre.fr/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email, motdepasse: passWord }),
            });

            if (response.ok) {
                const data = await response.json();

                // Stocker le token dans le contexte
                await saveToken(data.token);

                // Décoder le token
                const decodedToken = jwtDecode(data.token);
                console.log("Decoded Token:", decodedToken);

                // Stocker les informations de l'utilisateur dans le contexte
                saveUser(decodedToken);

                // Stocker l'email dans le contexte
                saveEmail(email);

                // Stocker le codec dans le contexte
                saveCodec(decodedToken.codec);

                // Redirection vers la page souhaitée
                navigation.navigate("Home");
            } else {
                const errorData = await response.json();
                if (response.status === 401) {
                    setErrorMessage(errorData.message);
                }
            }
        } catch (e) {
            console.log("Erreur:", e);
            setErrorMessage("Erreur de serveur, veuillez réessayer plus tard.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Adresse Email : </Text>
            <TextInput
                style={styles.input}
                placeholder="Entrez votre Email"
                onChangeText={(text) => setEmail(text)}
            />
            <Text style={styles.label}>Mot de passe : </Text>
            <TextInput
                style={styles.input}
                placeholder="Entrez votre mot de passe"
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
            />
            <Button
                title="Se connecter"
                onPress={handleLogin}
                color="#841584"
            />
            {errorMessage ? (
                <Text style={styles.errorText}>{errorMessage}</Text>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        marginTop: 20,
        textAlign: 'center',
    },
});

export default Login;
