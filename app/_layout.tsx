import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { CustomToast } from "./Toast/Toast";
import { useColorScheme } from "@/hooks/useColorScheme";
import Toast from "react-native-toast-message";

// You can customize this config as needed

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Spinwheel" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
      <Toast config={CustomToast} />
    </ThemeProvider>
  );
}
