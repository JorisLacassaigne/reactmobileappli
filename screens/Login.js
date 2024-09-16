import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { GlobalStyles } from "../styles/AppStyles";
import * as SecureStore from "expo-secure-store";
import {jwtDecode} from "jwt-decode";

const Login = ({ navigation }) => {
  // Définition de 2 variable (obligatoire à chaque formulaire)
  const [email, setEmail] = useState("");
  const [passWord, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  async function saveToken(key, value) {
    await SecureStore.setItemAsync(key, value);
  }


  const handleLogin = async () => {
    try {
      console.log(email, passWord);
      const response = await fetch("https://apimobile.jlacassaigne.v70208.campus-centre.fr/login", {
        //172.20.10.3
          method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, motdepasse: passWord }),
      });
      // console.log(response);
      if (response.ok) {
        const data = await response.json();

        /* Stocker le token dans le stockage sécurisé */
        await saveToken("token", data.token);

          // Décoder le token
          const decodedToken = jwtDecode(data.token);
          console.log("Decoded Token:", decodedToken);

        /* Redirection vers la page souhiatée */
        navigation.navigate("Home");
      } else {
        const errorData = await response.json();
        if (response.status === 401) {
          setErrorMessage(errorData.message);
        }
      }
    } catch (e) {
      console.log("Erreur: ²", e);
      setErrorMessage("Erreur de serveur, veuillez réessayer plus tard.");
    }
  };

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.text}>Adresse Email : </Text>
      <TextInput
        style={GlobalStyles.textInput}
        placeholder="  Entrez votre Email"
        onChangeText={(text) => setEmail(text)}
      ></TextInput>
      <Text style={GlobalStyles.text}>Mot de passe : </Text>

      <TextInput
        style={GlobalStyles.textInput}
        placeholder="  Entrez votre mot de passe"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      ></TextInput>

      <Button
        style={GlobalStyles.buttonValidate}
        title="Se connecter"
        onPress={handleLogin}
      ></Button>

      {errorMessage ? (
        <Text style={GlobalStyles.textError}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

export default Login;
