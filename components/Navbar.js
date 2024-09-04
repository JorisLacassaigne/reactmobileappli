import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { GlobalStyles } from "../styles/AppStyles";
import { AntDesign, Entypo } from "@expo/vector-icons";

export default function Navbar({ title, navigation, route }) {
  return (
    <View style={GlobalStyles.containerNav}>
      {route.name !== "Home" && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      )}
      <Text style={GlobalStyles.titleNav}>{title}</Text>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Entypo name="menu" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}
