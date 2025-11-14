
// // import { Stack } from "expo-router";

// // export default function RootLayout() {
// //   return (
// //     <Stack screenOptions={{ headerShown: false }}>
 
// //       <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

  
// //       <Stack.Screen name="plans/shto-peshe" options={{ headerShown: false }} />
// //       <Stack.Screen name="plans/humb-peshe" options={{ headerShown: false }} />
// //       <Stack.Screen name="plans/mbaj-peshe" options={{ headerShown: false }} />

// //       <Stack.Screen name="ushtrime/weightlifting" options={{ headerShown: false }} />
// //       <Stack.Screen name="ushtrime/homeworkout"  options={{ headerShown: false }} />
// //     </Stack>
// //   );
// // }
// // app/_layout.jsx
// import { Stack } from "expo-router";
// import { AuthProvider } from "./context/authContext";

// export default function RootLayout() {
//   return (
//     <AuthProvider>
//       <Stack screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

//         <Stack.Screen name="plans/shto-peshe" options={{ headerShown: false }} />
//         <Stack.Screen name="plans/humb-peshe" options={{ headerShown: false }} />
//         <Stack.Screen name="plans/mbaj-peshe" options={{ headerShown: false }} />

//         <Stack.Screen name="ushtrime/weightlifting" options={{ headerShown: false }} />
//         <Stack.Screen name="ushtrime/homeworkout"  options={{ headerShown: false }} />

//         {/* grupi admin ka layout-in e vet */}
//         <Stack.Screen name="admin" options={{ headerShown: false }} />
//       </Stack>
//     </AuthProvider>
//   );
// }
// app/_layout.jsx
import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Grupi kryesor me tabat për përdoruesin normal */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Grupi i auth (login, signup) */}
      <Stack.Screen name="auth" options={{ headerShown: false }} />

      {/* Planet e ushqimit (shto_pesh, humb_pesh, mbaj_pesh) */}
      <Stack.Screen name="plans" options={{ headerShown: false }} />

      {/* Ushtrimet për user (homeworkout, weightlifting) */}
      <Stack.Screen name="ushtrime" options={{ headerShown: false }} />

      {/* Zona e adminit (admin/dashboard, admin/ushqime, admin/ushtrime, ...) */}
      <Stack.Screen name="admin" options={{ headerShown: false }} />
    </Stack>
  );
}
