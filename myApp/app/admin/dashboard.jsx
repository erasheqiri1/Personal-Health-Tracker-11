// app/admin/index.jsx
import { Stack, router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const COLORS = {
  green: "#355E3B",
  page: "#F7F4E9",
  card: "#E6DFC5",
  textDark: "#2E2E2E",
};

export default function AdminHome() {
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

        <Pressable
          style={styles.card}
          onPress={() => router.push("/admin/ushqime")}
        >
          <Text style={styles.cardTitle}>Menaxho planet e ushqimit</Text>
          <Text style={styles.cardSubtitle}>
            CRUD për planet e ushqimit (shto, ndrysho, fshij)
          </Text>
        </Pressable>

        <Pressable
          style={styles.card}
          onPress={() => router.push("/admin/ushtrime")}
        >
          <Text style={styles.cardTitle}>Menaxho planet e ushtrimeve</Text>
          <Text style={styles.cardSubtitle}>
            CRUD për homeworkout & weightlifting
          </Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.page,
    padding: 16,
    justifyContent: "center",
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.textDark,
    marginBottom: 8,
    textAlign: "center",
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textDark,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#555",
  },
});
