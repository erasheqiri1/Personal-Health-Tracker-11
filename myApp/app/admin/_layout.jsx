// // app/admin/_layout.jsx
// import { Redirect, Stack } from "expo-router";
// import { ActivityIndicator, View } from "react-native";
// import { useAuth } from "../context/authContext";

// const ADMIN_EMAIL = "test1@gmail.com"; // këtu vendos emailin e adminit

// export default function AdminLayout() {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   const isAdmin =
//     (user?.email || "").toLowerCase() === ADMIN_EMAIL.toLowerCase();

//   if (!user || !isAdmin) {
//     // jo admin → ktheje te dashboard normal
//     return <Redirect href="/(tabs)/dashboard" />;
//   }

//   return <Stack screenOptions={{ headerShown: false }} />;
// }
// app/admin/_layout.jsx
import { Stack } from 'expo-router';
import React from 'react';

export default function AdminLayout() {
  // Nuk ka AuthContext këtu – admin veç vjen nga login redirect
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* këtu mjafton një Stack bosh, expo-router i gjen vetë .jsx-t brenda /admin */}
      {/* p.sh. /admin/dashboard, /admin/ushqime, /admin/ushqime/shto_pesh, /admin/ushtrime/homeworkout, etj. */}
    </Stack>
  );
}
