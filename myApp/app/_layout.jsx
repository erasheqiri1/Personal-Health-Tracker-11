
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
