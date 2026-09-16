// @@iconify-code-gen
import "../../global.css";
import {
  Inter_300Light,
  Inter_400Regular,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { LuckiestGuy_400Regular } from "@expo-google-fonts/luckiest-guy/400Regular";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync().catch(console.warn);

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_600SemiBold,
    LuckiestGuy_400Regular,
  });

  useEffect(() => {
    if (fontError) {
      console.warn("Unable to load custom fonts:", fontError);
    }

    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync().catch(console.warn);
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(dashboard)" />
        <Stack.Screen name="(riders-dashboard)" />
      </Stack>
    </SafeAreaProvider>
  );
}
