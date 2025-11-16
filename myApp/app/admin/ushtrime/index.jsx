
import { FontAwesome5 } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AdminOptionCard from "../../../components/AdminOptionCard";

const COLORS = {
  green: "#355E3B",
  bg: "#F7F4E9",
};

export default function AdminUshtrime() {
  return (
    <View style={s.container}>
      <Stack.Screen
        options={{
          title: "Admin – Ushtrimet",
          headerStyle: { backgroundColor: COLORS.green },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />

      <Text style={s.title}>Zgjidh planin për ta menaxhuar:</Text>

      <AdminOptionCard
        icon={<FontAwesome5 name="home" size={28} color={COLORS.green} />}
        title="Home Workout"
        subtitle="Menaxho ushtrimet e planit Home Workout."
        onPress={() => router.push("/admin/ushtrime/homeworkout")}
      />

      <AdminOptionCard
        icon={<FontAwesome5 name="dumbbell" size={28} color={COLORS.green} />}
        title="Weightlifting"
        subtitle="Menaxho ushtrimet e planit Weightlifting."
        onPress={() => router.push("/admin/ushtrime/weightlifting")}
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
