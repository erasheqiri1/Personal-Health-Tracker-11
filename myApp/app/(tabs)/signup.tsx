<<<<<<< HEAD
// export const unstable_settings = { 
//   headerShown: false, 
//   tabBarStyle: { display: "none" } 
// };
=======
import AsyncStorage from "@react-native-async-storage/async-storage";

export const unstable_settings = { 
  headerShown: false, 
  tabBarStyle: { display: "none" } 
};
>>>>>>> c5bff4695c1646389c1fce4b31d95ce9c786191f

// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
// import { useRouter } from "expo-router";

// export default function SignUp() {
//   const router = useRouter();
//   const [emri, setEmri] = useState("");
//   const [mbiemri, setMbiemri] = useState("");
//   const [emaili, setEmaili] = useState("");
//   const [fjalkalimi, setFjalkalimi] = useState("");
//   const [ditelindja, setDitelindja] = useState("");
//   const [pesha, setPesha] = useState("");
//   const [gjatesia, setGjatesia] = useState("");

<<<<<<< HEAD
//   const handleSignUp = () => {
//     console.log("User registered:", { emri, mbiemri, emaili, fjalkalimi, ditelindja, pesha, gjatesia });
//     router.push("/(tabs)/login");
//   };

//   return (
//     <View style={styles.container}>
//       <Image source={require("../../assets/logo.jpg")} style={styles.logo} />
=======
 const handleSignUp = async () => {
  if (!emri || !mbiemri || !emaili || !fjalkalimi) {
    alert("Ju lutem plotësoni të gjitha fushat!");
    return;
  }

  // Krijo objektin e përdoruesit të ri
  const newUser = {
    emri,
    mbiemri,
    emaili,
    fjalkalimi,
    ditelindja,
    pesha,
    gjatesia,
  };

  try {
    // Merr listën ekzistuese të përdoruesve
    const existingUsers = JSON.parse((await AsyncStorage.getItem("users")) || "[]");

    // Shto përdoruesin e ri
    existingUsers.push(newUser);

    // Ruaji të gjithë përdoruesit në AsyncStorage
    await AsyncStorage.setItem("users", JSON.stringify(existingUsers));

    //  Ruaj përdoruesin që u regjistrua si përdorues aktual
    await AsyncStorage.setItem("currentUser", JSON.stringify(newUser));

    console.log("User registered:", newUser);
    
    
     // Brenda handleSignUp:
     const userData = { emri, mbiemri, emaili, ditelindja, pesha, gjatesia };
     await AsyncStorage.setItem("userData", JSON.stringify(userData));
    // Kalo në faqen e profilit (ose dashboard)
    router.push("/profile");
  } catch (error) {
    console.error("Gabim gjatë regjistrimit:", error);
    alert("Ndodhi një gabim gjatë regjistrimit.");
  }
};


  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.jpg")} style={styles.logo} />
>>>>>>> c5bff4695c1646389c1fce4b31d95ce9c786191f

//       <Text style={styles.title}>Regjistrohu</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Emri"
//         placeholderTextColor="#2e7d32"
//         value={emri}
//         onChangeText={setEmri}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Mbiemri"
//         placeholderTextColor="#2e7d32"
//         value={mbiemri}
//         onChangeText={setMbiemri}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Emaili"
//         placeholderTextColor="#2e7d32"
//         value={emaili}
//         onChangeText={setEmaili}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Fjalkalimi"
//         placeholderTextColor="#2e7d32"
//         secureTextEntry
//         value={fjalkalimi}
//         onChangeText={setFjalkalimi}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Ditëlindja"
//         placeholderTextColor="#2e7d32"
//         value={ditelindja}
//         onChangeText={setDitelindja}
//       />

//       {/* Pesha and Gjatesia */}
//       <View style={styles.row}>
//         <TextInput
//           style={[styles.input, styles.halfInput]}
//           placeholder="Pesha ne KG"
//           placeholderTextColor="#2e7d32"
//           value={pesha}
//           onChangeText={setPesha}
//         />
//         <TextInput
//           style={[styles.input, styles.halfInput]}
//           placeholder="Gjatësia ne M"
//           placeholderTextColor="#2e7d32"
//           value={gjatesia}
//           onChangeText={setGjatesia}
//         />
//       </View>

//       <TouchableOpacity style={styles.button} onPress={handleSignUp}>
//         <Text style={styles.buttonText}>Ruaj</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     backgroundColor: "#e6f2e6", 
//     padding: 20,
//   },
//   logo: {
//     width: 100,
//     height: 100,
//     marginTop: 40,
//     marginBottom: 20,
//     resizeMode: "contain",
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "#2e7d32", 
//     marginBottom: 25,
//   },
//   input: {
//     width: "100%",
//     backgroundColor: "#fff",
//     padding: 12,
//     borderRadius: 10,
//     marginBottom: 12,
//     borderColor: "#2e7d32",
//     borderWidth: 1,
//     color: "#2e7d32", 
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "100%",
//   },
//   halfInput: {
//     width: "48%", 
//   },
//   button: {
//     width: "100%",
//     backgroundColor: "#2e7d32",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     marginTop: 20,
//   },
//   buttonText: {
//     color: "#e6f2e6", 
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });
