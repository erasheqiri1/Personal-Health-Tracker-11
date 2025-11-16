import { FontAwesome5 } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AdminOptionCard from "../../../components/AdminOptionCard";

const COLORS = {
  green: "#355E3B",
  bg: "#F7F4E9",
};

export default function AdminUshqime() {
  return (
    <View style={s.container}>
      <Stack.Screen
        options={{
          title: "Admin – Plane ushqimi",
          headerStyle: { backgroundColor: COLORS.green },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />

      <Text style={s.title}>Zgjidh planin për ta menaxhuar:</Text>

      <AdminOptionCard
        icon={<FontAwesome5 name="weight" size={28} color={COLORS.green} />}
        title="Shto Peshë"
        subtitle="Menaxho ushqimet e planit Shto Peshë."
        onPress={() => router.push("/(admin)/meal/gain_weight")}
      />

      <AdminOptionCard
        icon={<FontAwesome5 name="running" size={28} color={COLORS.green} />}
        title="Humb Peshë"
        subtitle="Menaxho ushqimet e planit Humb Peshë."
        onPress={() => router.push("/(admin)/meal/lose_weight")}
      />

      <AdminOptionCard
        icon={<FontAwesome5 name="heartbeat" size={28} color={COLORS.green} />}
        title="Mbaj Peshën"
        subtitle="Menaxho ushqimet e planit Mbaj Peshën."
        onPress={() => router.push("/(admin)/meal/maintain_weight")}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 12,
    color: COLORS.green,
  },
});
