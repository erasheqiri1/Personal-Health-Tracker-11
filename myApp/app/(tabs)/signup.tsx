export const unstable_settings = { 
  headerShown: false, 
  tabBarStyle: { display: "none" } 
};

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";

export default function SignUp() {
  const router = useRouter();
  const [emri, setEmri] = useState("");
  const [mbiemri, setMbiemri] = useState("");
  const [emaili, setEmaili] = useState("");
  const [fjalkalimi, setFjalkalimi] = useState("");
  const [ditelindja, setDitelindja] = useState("");
  const [pesha, setPesha] = useState("");
  const [gjatesia, setGjatesia] = useState("");

  const handleSignUp = () => {
    console.log("User registered:", { emri, mbiemri, emaili, fjalkalimi, ditelindja, pesha, gjatesia });
    router.push("/(tabs)/login");
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.jpg")} style={styles.logo} />

      <Text style={styles.title}>Regjistrohu</Text>

      <TextInput
        style={styles.input}
        placeholder="Emri"
        placeholderTextColor="#2e7d32"
        value={emri}
        onChangeText={setEmri}
      />
      <TextInput
        style={styles.input}
        placeholder="Mbiemri"
        placeholderTextColor="#2e7d32"
        value={mbiemri}
        onChangeText={setMbiemri}
      />
      <TextInput
        style={styles.input}
        placeholder="Emaili"
        placeholderTextColor="#2e7d32"
        value={emaili}
        onChangeText={setEmaili}
      />
      <TextInput
        style={styles.input}
        placeholder="Fjalkalimi"
        placeholderTextColor="#2e7d32"
        secureTextEntry
        value={fjalkalimi}
        onChangeText={setFjalkalimi}
      />
      <TextInput
        style={styles.input}
        placeholder="Ditëlindja"
        placeholderTextColor="#2e7d32"
        value={ditelindja}
        onChangeText={setDitelindja}
      />

      {/* Pesha and Gjatesia */}
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Pesha ne KG"
          placeholderTextColor="#2e7d32"
          value={pesha}
          onChangeText={setPesha}
        />
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Gjatësia ne M"
          placeholderTextColor="#2e7d32"
          value={gjatesia}
          onChangeText={setGjatesia}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Ruaj</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#e6f2e6", 
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 40,
    marginBottom: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2e7d32", 
    marginBottom: 25,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    borderColor: "#2e7d32",
    borderWidth: 1,
    color: "#2e7d32", 
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  halfInput: {
    width: "48%", 
  },
  button: {
    width: "100%",
    backgroundColor: "#2e7d32",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#e6f2e6", 
    fontSize: 16,
    fontWeight: "bold",
  },
});
