import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const COLORS = {
  green: "#355E3B",
  page: "#F7F4E9",
  card: "#E6DFC5",
  textDark: "#2E2E2E",
  cardSoft: "#EFE8CF",
};

type User = {
  emri: string;
  mbiemri: string;
  emaili: string;
  fjalekalimi: string;
  ditelindja?: string;
  pesha?: string | number;
  gjatesia?: string | number;
  gjinia?: string;
  photo?: string | null;
};

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<User>({
    emri: "",
    mbiemri: "",
    emaili: "",
    fjalekalimi: "",
    ditelindja: "",
    pesha: "",
    gjatesia: "",
    gjinia: "",
    photo: null,
  });
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("currentUser");
        if (jsonValue) {
          const data: User = JSON.parse(jsonValue);
          setUser(data);
          setForm(data);
        }
      } catch {
        Alert.alert("Gabim", "S'lexohen të dhënat e përdoruesit.");
      }
    };
    loadUser();
  }, []);

  const handleChange = (key: keyof User, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
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
      setForm({ ...form, photo: result.assets[0].uri });
    }
  };

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem("currentUser", JSON.stringify(form));
      const users: User[] = JSON.parse((await AsyncStorage.getItem("users")) || "[]");
      const idx = users.findIndex((u) => u.emaili === (user?.emaili || form.emaili));
      const updated =
        idx >= 0
          ? users.map((u) => (u.emaili === (user?.emaili || form.emaili) ? form : u))
          : [...users, form];
      await AsyncStorage.setItem("users", JSON.stringify(updated));
      setUser(form);
      setEditing(false);
      Alert.alert("Sukses", "Të dhënat u përditësuan me sukses!");
    } catch {
      Alert.alert("Gabim", "Nuk u arrit të ruhen ndryshimet!");
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("currentUser");
    router.replace("/auth/login");
  };

  if (!user) {
    return (
      <View style={[styles.loading, { backgroundColor: COLORS.page }]}>
        <Text style={[styles.loadingText, { color: COLORS.textDark }]}>
          Duke ngarkuar profilin...
        </Text>
      </View>
    );
  }

  const visibleFields: (keyof User)[] = [
    "emri",
    "mbiemri",
    "emaili",
    "ditelindja",
    "pesha",
    "gjatesia",
  ];

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: COLORS.page }]}>
      <Text style={[styles.title, { color: COLORS.green }]}>Profili i përdoruesit</Text>

      <TouchableOpacity onPress={handlePickImage}>
        <Image
          source={
            form.photo
              ? { uri: form.photo }
              : require("../../assets/images/user-photo-profile.png")
          }
          style={[
            styles.avatar,
            {
              borderColor: COLORS.green,
              backgroundColor: COLORS.cardSoft,
            },
          ]}
        />
      </TouchableOpacity>

      <Text style={[styles.nameText, { color: COLORS.green }]}>
        {form.emri} {form.mbiemri}
      </Text>

      <View style={[styles.card, { backgroundColor: COLORS.card }]}>
        {visibleFields.map((key) => (
          <View key={key} style={styles.row}>
            <Text style={[styles.label, { color: COLORS.textDark }]}>
              {capitalize(String(key))}
            </Text>
            {editing ? (
              <TextInput
                style={[styles.input, { backgroundColor: COLORS.cardSoft, color: COLORS.textDark }]}
                value={form[key]?.toString() || ""}
                onChangeText={(text) => handleChange(key, text)}
              />
            ) : (
              <Text style={[styles.value, { color: COLORS.textDark }]}>
                {`${form[key] ?? ""}${
                  key === "pesha" ? " kg" : key === "gjatesia" ? " cm" : ""
                }`}
              </Text>
            )}
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: COLORS.green }]}
        onPress={editing ? handleSave : () => setEditing(true)}
      >
        <Text style={[styles.buttonText, { color: COLORS.page }]}>
          {editing ? "Ruaj Ndryshimet" : "Ndrysho Profilin"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.logoutButton, { backgroundColor: COLORS.cardSoft, borderColor: COLORS.green }]}
        onPress={handleLogout}
      >
        <Text style={[styles.logoutText, { color: COLORS.textDark }]}>
          Dil nga llogaria
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: { fontSize: 18 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 2,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },
  card: {
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
  label: { fontWeight: "bold" },
  value: {},
  input: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    width: "45%",
    textAlign: "right",
  },
  button: {
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  buttonText: { fontSize: 16, fontWeight: "bold" },
  logoutButton: {
    marginTop: 15,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  logoutText: { fontWeight: "bold" },
});
