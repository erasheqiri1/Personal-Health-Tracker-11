import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      const jsonValue = await AsyncStorage.getItem("currentUser");
      if (jsonValue) {
        const data = JSON.parse(jsonValue);
        setUser(data);
        setForm(data);
      }
    };
    loadUser();
  }, []);

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handlePickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Leje e nevojshme", "Duhet të japësh leje për galerinë!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      base64: true,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setForm({ ...form, photo: imageUri });
    }
  };

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem("currentUser", JSON.stringify(form));

      const users = JSON.parse((await AsyncStorage.getItem("users")) || "[]");
      const updatedUsers = users.map((u: any) =>
       u.emaili === user.emaili ? form : u
       );
      await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));

      setUser(form);
      setEditing(false);
      Alert.alert("Sukses", "Të dhënat u përditësuan me sukses!");
    } catch (e) {
      Alert.alert("Gabim", "Nuk u arrit të ruhen ndryshimet!");
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("currentUser");
    router.replace("/signup"); // kthehet në faqen e regjistrimit
  };

  if (!user) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Duke ngarkuar profilin...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Profili i përdoruesit</Text>

      {/* FOTOGRAFIA E PROFILIT */}
      <TouchableOpacity onPress={handlePickImage}>
        <Image
          source={
            form.photo
              ? { uri: form.photo }
              : require("../../assets/images/user-photo-profile.png")
          }
          style={styles.avatar}
        />
      </TouchableOpacity>

      {/* EMRI & MBIEMRI */}
      <Text style={styles.nameText}>
        {form.emri} {form.mbiemri}
      </Text>

      <View style={styles.card}>
        {[
            "emri",
            "mbiemri",
            "emaili",
            "fjalkalimi",
            "ditelindja",
            "pesha",
            "gjatesia",
          ].map((key) => (
            
          <View key={key} style={styles.row}>
            <Text style={styles.label}>{capitalize(key)}</Text>
            {editing ? (
              <TextInput
                style={styles.input}
                secureTextEntry={key === "password" && !showPassword}
                value={form[key]?.toString() || ""}
                onChangeText={(text) => handleChange(key, text)}
              />
            ) : (
              <Text style={styles.value}>
                {key === "password"
                  ? "••••••"
                  : user[key] +
                    (key === "pesha"
                      ? " kg"
                      : key === "gjatesia"
                      ? " cm"
                      : "")}
              </Text>
            )}
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={editing ? handleSave : () => setEditing(true)}
      >
        <Text style={styles.buttonText}>
          {editing ? "Ruaj Ndryshimet" : "Ndrysho Profilin"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Dil nga llogaria</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#F7F5E9",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: { fontSize: 18, color: "#555" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2E573C",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#2E573C",
  },
  nameText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2E573C",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#D9D2A9",
    width: "100%",
    borderRadius: 12,
    padding: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
    alignItems: "center",
  },
  label: { fontWeight: "bold", color: "#333" },
  value: { color: "#333" },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    width: "45%",
    textAlign: "right",
  },
  button: {
    backgroundColor: "#2E573C",
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  logoutButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#B43F3F",
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

