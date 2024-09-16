import { View } from "react-native";
import Navigation from "./components/Navigation";
import { useCallback, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import {CartProvider} from "./components/CartContext";
import {AuthProvider} from "./components/AuthContext";


// Permet de laisser en place le splash screen pendant le chargement
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_900Black,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded || fontError]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
      <AuthProvider>
        <CartProvider>
          <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
            <Navigation />
          </View>
        </CartProvider>
      </AuthProvider>
  );
}
