import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";

export default function Layout() {
  return (
    <PaperProvider>
      <Stack
        screenOptions={{
          headerShown: false, // Oculta el encabezado en todas las pantallas
          headerStyle: { backgroundColor: "#AE9E5B" },
          headerTintColor: "white",
          headerTitle: "Urna Electrónica UAEM",
          headerTitleAlign: "center",
        }}
      >
        {/* Especifica opciones para la pantalla de inicio de sesión */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        {/* Permite que las demás pantallas usen encabezado */}
        <Stack.Screen name="home" options={{ headerShown: true }} />
      </Stack>
    </PaperProvider>
  );
}
