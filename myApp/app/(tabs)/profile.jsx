// import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as ImagePicker from "expo-image-picker";
// import { useRouter } from "expo-router";
// import React, { useEffect, useState } from "react";
// import {
//   Alert,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// const COLORS = {
//   green: "#355E3B",
//   page: "#F7F4E9",
//   card: "#E6DFC5",
//   textDark: "#2E2E2E",
//   cardSoft: "#EFE8CF",
// };

// type User = {
//   emri: string;
//   mbiemri: string;
//   emaili: string;
//   fjalekalimi: string;
//   ditelindja?: string;
//   pesha?: string | number;
//   gjatesia?: string | number;
//   gjinia?: string;
//   photo?: string | null;
// };

// export default function Profile() {
//   const [user, setUser] = useState<User | null>(null);
//   const [editing, setEditing] = useState(false);
//   const [form, setForm] = useState<User>({
//     emri: "",
//     mbiemri: "",
//     emaili: "",
//     fjalekalimi: "",
//     ditelindja: "",
//     pesha: "",
//     gjatesia: "",
//     gjinia: "",
//     photo: null,
//   });
//   const router = useRouter();

//   useEffect(() => {
//     const loadUser = async () => {
//       try {
//         const jsonValue = await AsyncStorage.getItem("currentUser");
//         if (jsonValue) {
//           const data: User = JSON.parse(jsonValue);
//           setUser(data);
//           setForm(data);
//         }
//       } catch {
//         Alert.alert("Gabim", "S'lexohen të dhënat e përdoruesit.");
//       }
//     };
//     loadUser();
//   }, []);

//   const handleChange = (key: keyof User, value: string) => {
//     setForm({ ...form, [key]: value });
//   };

//   const handlePickImage = async () => {
//     const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!permissionResult.granted) {
//       Alert.alert("Leje e nevojshme", "Duhet të japësh leje për galerinë!");
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 0.7,
//       base64: true,
//     });

//     if (!result.canceled) {
//       setForm({ ...form, photo: result.assets[0].uri });
//     }
//   };

//   const handleSave = async () => {
//     try {
//       await AsyncStorage.setItem("currentUser", JSON.stringify(form));
//       const users: User[] = JSON.parse((await AsyncStorage.getItem("users")) || "[]");
//       const idx = users.findIndex((u) => u.emaili === (user?.emaili || form.emaili));
//       const updated =
//         idx >= 0
//           ? users.map((u) => (u.emaili === (user?.emaili || form.emaili) ? form : u))
//           : [...users, form];
//       await AsyncStorage.setItem("users", JSON.stringify(updated));
//       setUser(form);
//       setEditing(false);
//       Alert.alert("Sukses", "Të dhënat u përditësuan me sukses!");
//     } catch {
//       Alert.alert("Gabim", "Nuk u arrit të ruhen ndryshimet!");
//     }
//   };

//   const handleLogout = async () => {
//     await AsyncStorage.removeItem("currentUser");
//     router.replace("/auth/login");
//   };

//   if (!user) {
//     return (
//       <View style={[styles.loading, { backgroundColor: COLORS.page }]}>
//         <Text style={[styles.loadingText, { color: COLORS.textDark }]}>
//           Duke ngarkuar profilin...
//         </Text>
//       </View>
//     );
//   }

//   const visibleFields: (keyof User)[] = [
//     "emri",
//     "mbiemri",
//     "emaili",
//     "ditelindja",
//     "pesha",
//     "gjatesia",
//   ];

//   return (
//     <ScrollView contentContainerStyle={[styles.container, { backgroundColor: COLORS.page }]}>
//       <Text style={[styles.title, { color: COLORS.green }]}>Profili i përdoruesit</Text>

//       <TouchableOpacity onPress={handlePickImage}>
//         <Image
//           source={
//             form.photo
//               ? { uri: form.photo }
//               : require("../../assets/images/user-photo-profile.png")
//           }
//           style={[
//             styles.avatar,
//             {
//               borderColor: COLORS.green,
//               backgroundColor: COLORS.cardSoft,
//             },
//           ]}
//         />
//       </TouchableOpacity>

//       <Text style={[styles.nameText, { color: COLORS.green }]}>
//         {form.emri} {form.mbiemri}
//       </Text>

//       <View style={[styles.card, { backgroundColor: COLORS.card }]}>
//         {visibleFields.map((key) => (
//           <View key={key} style={styles.row}>
//             <Text style={[styles.label, { color: COLORS.textDark }]}>
//               {capitalize(String(key))}
//             </Text>
//             {editing ? (
//               <TextInput
//                 style={[styles.input, { backgroundColor: COLORS.cardSoft, color: COLORS.textDark }]}
//                 value={form[key]?.toString() || ""}
//                 onChangeText={(text) => handleChange(key, text)}
//               />
//             ) : (
//               <Text style={[styles.value, { color: COLORS.textDark }]}>
//                 {`${form[key] ?? ""}${
//                   key === "pesha" ? " kg" : key === "gjatesia" ? " cm" : ""
//                 }`}
//               </Text>
//             )}
//           </View>
//         ))}
//       </View>

//       <TouchableOpacity
//         style={[styles.button, { backgroundColor: COLORS.green }]}
//         onPress={editing ? handleSave : () => setEditing(true)}
//       >
//         <Text style={[styles.buttonText, { color: COLORS.page }]}>
//           {editing ? "Ruaj Ndryshimet" : "Ndrysho Profilin"}
//         </Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={[styles.logoutButton, { backgroundColor: COLORS.cardSoft, borderColor: COLORS.green }]}
//         onPress={handleLogout}
//       >
//         <Text style={[styles.logoutText, { color: COLORS.textDark }]}>
//           Dil nga llogaria
//         </Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 20,
//     alignItems: "center",
//   },
//   loading: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   loadingText: { fontSize: 18 },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   avatar: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     marginBottom: 10,
//     borderWidth: 2,
//   },
//   nameText: {
//     fontSize: 18,
//     fontWeight: "600",
//     marginBottom: 20,
//   },
//   card: {
//     width: "100%",
//     borderRadius: 12,
//     padding: 20,
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginVertical: 8,
//     alignItems: "center",
//   },
//   label: { fontWeight: "bold" },
//   value: {},
//   input: {
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     width: "45%",
//     textAlign: "right",
//   },
//   button: {
//     padding: 12,
//     borderRadius: 10,
//     marginTop: 20,
//     width: "100%",
//     alignItems: "center",
//   },
//   buttonText: { fontSize: 16, fontWeight: "bold" },
//   logoutButton: {
//     marginTop: 15,
//     padding: 10,
//     borderWidth: 2,
//     borderRadius: 10,
//     width: "100%",
//     alignItems: "center",
//   },
//   logoutText: { fontWeight: "bold" },
// });


//me logjik te re
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  GoogleAuthProvider,
  linkWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';

const COLORS = {
  green: '#355E3B',
  page: '#F7F4E9',
  card: '#E6DFC5',
  textDark: '#2E2E2E',
  cardSoft: '#EFE8CF',
};

export default function Profile() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    emri: '',
    mbiemri: '',
    emaili: '',
    gjinia: '',
    pesha: '',
    gjatesia: '',
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setLoading(false);
          return;
        }

        const ref = doc(db, 'users', user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();
          setForm({
            emri: data.firstName || '',
            mbiemri: data.lastName || '',
            emaili: data.email || user.email || '',
            gjinia: data.gender || '',
            pesha: data.weight != null ? String(data.weight) : '',
            gjatesia: data.height != null ? String(data.height) : '',
          });
        } else {
          // nëse s’ka dokument, mbushi nga auth
          const displayName = user.displayName || '';
          const [fn, ...rest] = displayName.split(' ');
          const ln = rest.join(' ');

          setForm(f => ({
            ...f,
            emri: fn,
            mbiemri: ln,
            emaili: user.email || '',
          }));
        }
      } catch (e) {
        console.log('loadProfile error:', e);
        Alert.alert('Gabim', 'Nuk u lexua profili nga serveri.');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      setSaving(true);

      const parsedWeight = form.pesha
        ? Number(String(form.pesha).replace(',', '.'))
        : null;
      const parsedHeight = form.gjatesia
        ? Number(String(form.gjatesia).replace(',', '.'))
        : null;

      await setDoc(
        doc(db, 'users', user.uid),
        {
          firstName: form.emri,
          lastName: form.mbiemri,
          email: form.emaili,
          gender: form.gjinia,
          weight: parsedWeight,
          height: parsedHeight,
          profileCompleted: true,
        },
        { merge: true }
      );

      await updateProfile(user, {
        displayName: `${form.emri} ${form.mbiemri}`,
      });

      Alert.alert('Sukses', 'Profili u përditësua.');
    } catch (e) {
      console.log('save profile error:', e);
      Alert.alert('Gabim', 'Nuk u ruajtën ndryshimet.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.replace('/auth/login');
  };

  const handleLinkGoogle = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      if (Platform.OS !== 'web') {
        Alert.alert('Info', 'Lidhja me Google funksionon vetëm në web.');
        return;
      }

      const provider = new GoogleAuthProvider();
      await linkWithPopup(user, provider);
      Alert.alert('Sukses', 'Llogaria u lidh me Google.');
    } catch (e) {
      console.log('link google error:', e);
      Alert.alert('Gabim', 'Nuk u lidh llogaria me Google.');
    }
  };

  if (loading) {
    return (
      <View style={[styles.loading, { backgroundColor: COLORS.page }]}>
        <Text style={[styles.loadingText, { color: COLORS.textDark }]}>
          Duke ngarkuar profilin...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor: COLORS.page }]}
    >
      <Text style={[styles.title, { color: COLORS.green }]}>
        Profili i përdoruesit
      </Text>

      <View style={styles.iconCircle}>
        <FontAwesome5 name="leaf" size={48} color={COLORS.green} />
      </View>

      <View style={[styles.card, { backgroundColor: COLORS.card }]}>
        {[
          ['Emri', 'emri'],
          ['Mbiemri', 'mbiemri'],
          ['Emaili', 'emaili'],
          ['Gjinia', 'gjinia'],
          ['Pesha', 'pesha'],
          ['Gjatësia', 'gjatesia'],
        ].map(([label, key]) => (
          <View key={key} style={styles.row}>
            <Text style={[styles.label, { color: COLORS.textDark }]}>{label}</Text>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: COLORS.cardSoft, color: COLORS.textDark },
              ]}
              value={form[key]}
              onChangeText={text => handleChange(key, text)}
            />
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: COLORS.green }]}
        onPress={handleSave}
        disabled={saving}
      >
        <Text style={[styles.buttonText, { color: COLORS.page }]}>
          {saving ? 'Duke ruajtur...' : 'Ruaj Ndryshimet'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: COLORS.cardSoft, marginTop: 10 }]}
        onPress={handleLinkGoogle}
      >
        <Text style={[styles.buttonText, { color: COLORS.textDark }]}>
          Lidhe Google me llogarinë time
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.logoutButton, { borderColor: COLORS.green }]}
        onPress={handleLogout}
      >
        <Text style={[styles.logoutText, { color: COLORS.textDark }]}>
          Dil nga llogaria
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: { fontSize: 18 },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  iconCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#F1EFDF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  card: {
    width: '100%',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
    alignItems: 'center',
  },
  label: { fontWeight: 'bold', width: '25%' },
  input: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    width: '70%',
    textAlign: 'right',
  },
  button: {
    padding: 12,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: { fontSize: 16, fontWeight: 'bold' },
  logoutButton: {
    marginTop: 12,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  logoutText: { fontWeight: 'bold' },
});
