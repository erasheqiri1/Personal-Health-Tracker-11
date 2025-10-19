
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
 
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

  
      <Stack.Screen name="plans/shto-peshe" options={{ headerShown: false }} />
      <Stack.Screen name="plans/humb-peshe" options={{ headerShown: false }} />
      <Stack.Screen name="plans/mbaj-peshe" options={{ headerShown: false }} />

      <Stack.Screen name="ushtrime/weightlifting" options={{ headerShown: false }} />
      <Stack.Screen name="ushtrime/homeworkout"  options={{ headerShown: false }} />
    </Stack>
  );
}
