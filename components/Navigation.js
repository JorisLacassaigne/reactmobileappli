import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import Navbar from "./Navbar";
import Home from "../screens/Home";
import Login from "../screens/Login";
import Products from "../screens/Products";
import ProductCard from "../screens/ProductCard";
import ListModal from "../screens/ListModal";
import Commandes from "../screens/Commandes";
import CommandeCard from "../screens/CommandeCard";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Stack Navigator pour les écrans qui ne doivent pas apparaître dans le drawer
const ProductStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Product">
      <Stack.Screen name="ProductList" component={Products} />
      <Stack.Screen name="ProductCard" component={ProductCard} />
    </Stack.Navigator>
  );
};

const CommandeStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Commandes">
            <Stack.Screen name="CommandeList" component={Commandes} />
            <Stack.Screen name="CommandeCard" component={CommandeCard} />
        </Stack.Navigator>
    );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName={"Home"}>
        <Drawer.Screen
          name="Home"
          component={Home}
          options={() => ({
            header: (props) => <Navbar {...props} title="Accueil"></Navbar>,
          })}
        />
        <Drawer.Screen
          name="Produits"
          component={ProductStackNavigator}
          options={() => ({
            header: (props) => <Navbar {...props} title="Products"></Navbar>,
          })}
        />
        <Drawer.Screen
            name="Commandes"
            component={CommandeStackNavigator}
            options={() => ({
              header: (props) => <Navbar {...props} title="Commandes"></Navbar>,
            })}
        />
        <Drawer.Screen
          name="Login"
          component={Login}
          options={() => ({
            header: (props) => <Navbar {...props} title="Login"></Navbar>,
          })}
        />
        <Drawer.Screen
          name="ListModal"
          component={ListModal}
          options={() => ({
            header: (props) => <Navbar {...props} title="ListModal"></Navbar>,
          })}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
