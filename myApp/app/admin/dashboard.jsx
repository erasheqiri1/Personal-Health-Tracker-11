

import { FontAwesome5 } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import { signOut } from "firebase/auth";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import AdminCard from "../../components/AdminCard";
import { auth } from "../../firebaseConfig";

const COLORS = {
  green: "#355E3B",
  page: "#F7F4E9",
  card: "#E6DFC5",
  textDark: "#2E2E2E",
};

export default function AdminHome() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/(auth)/login");
    } catch (e) {
      console.log("Logout error:", e);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Admin | Paneli kryesor",
          headerStyle: { backgroundColor: COLORS.green },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />

      <View style={styles.container}>
        <Text style={styles.title}>Çka don me menaxhu?</Text>

        <AdminCard
          icon={<FontAwesome5 name="utensils" size={32} color={COLORS.green} />}
          title="Menaxho planet e ushqimit"
          subtitle="Shto, ndrysho ose fshij planet e ushqimit për përdoruesit (shto pesh, humb pesh & mbaj pesh)."
          onPress={() => router.push("/admin/meal")}
        />

        <AdminCard
          icon={<FontAwesome5 name="dumbbell" size={32} color={COLORS.green} />}
          title="Menaxho planet e ushtrimeve"
          subtitle="Shto ushtrime të reja, ndrysho detajet ose fshij planet (homeworkout & weightlifting)."
          onPress={() => router.push("/admin/workout")}
        />

        <Pressable style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Dil nga llogaria</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.page,
    paddingHorizontal: 24,
    paddingVertical: 30,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.textDark,
    marginBottom: 20,
    textAlign: "center",
  },
  logoutBtn: {
    marginTop: 10,
    backgroundColor: COLORS.green,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
