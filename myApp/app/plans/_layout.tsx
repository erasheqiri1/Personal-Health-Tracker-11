// // app/_layout.tsx
// import { Stack } from "expo-router";

// export default function RootLayout() {
//   return (
//     <Stack screenOptions={{ headerShown: false }}>
//       {/* Tabs si ekran i vetëm brenda Root Stack */}
//       <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

//       {/* Ekranet jashtë tabs – pa header, pa footer */}
//       <Stack.Screen name="plans/shto-peshe" options={{ headerShown: false }} />
//       <Stack.Screen name="plans/humb-peshe" options={{ headerShown: false }} />
//       <Stack.Screen name="plans/mbaj-peshe" options={{ headerShown: false }} />
//     </Stack>
//   );
// }
// app/plans/_layout.tsx
import { Stack } from "expo-router";

export default function PlansLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }} />
  );
}
