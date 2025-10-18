<<<<<<< HEAD
// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
// import { useRouter } from "expo-router";
=======
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage"; // ⬅️ kjo është e rëndësishme
>>>>>>> c5bff4695c1646389c1fce4b31d95ce9c786191f

// export const unstable_settings = { 
//   headerShown: false, 
//   tabBarStyle: { display: "none" } 
// };

// export default function LogIn() {
//   const router = useRouter();
//   const [perdoruesi, setPerdoruesi] = useState("");
//   const [fjalekalimi, setFjalekalimi] = useState("");
//   const [show, setShow] = useState(false);

  // 🧹 Fshin të dhënat e ruajtura vetëm për testim
  useEffect(() => {
    const clearData = async () => {
      await AsyncStorage.clear();
      console.log("AsyncStorage u pastrua me sukses!");
    };
    clearData();
  }, []);

//   const handleLogIn = () => {
//     console.log("User Logged in:", { perdoruesi, fjalekalimi });
//     router.push("/dashboard");
//   };

//   return (
//     <View style={styles.container}>
//       <Image source={require("../../assets/logo.jpg")} style={styles.logo} />
//       <Text style={styles.title}>Hyrje</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Perdoruesi"
//         placeholderTextColor="#2e7d32"
//         value={perdoruesi}
//         onChangeText={setPerdoruesi}
//       />

<<<<<<< HEAD
//        <TextInput
//         style={styles.input}
//         placeholder="Fjalekalimi"
//         placeholderTextColor="#2e7d32"
//         secureTextEntry={!show}
//         value={fjalekalimi}
//         onChangeText={setFjalekalimi}
//         />
//         <Text
//           onPress={() => setShow(!show)}
//           style={{ color: "#2e7d32", alignSelf: "flex-end", marginTop: 5 }}
//            >
//           {show ? "Fshih" : "Shfaq"}
//         </Text>

=======
      <TextInput
        style={styles.input}
        placeholder="Fjalekalimi"
        placeholderTextColor="#2e7d32"
        secureTextEntry={!show}
        value={fjalekalimi}
        onChangeText={setFjalekalimi}
      />
      <Text
        onPress={() => setShow(!show)}
        style={{ color: "#2e7d32", alignSelf: "flex-end", marginTop: 5 }}
      >
        {show ? "Fshih" : "Shfaq"}
      </Text>
>>>>>>> c5bff4695c1646389c1fce4b31d95ce9c786191f

//       <TouchableOpacity style={styles.button} onPress={handleLogIn}>
//         <Text style={styles.buttonText}>HYR</Text>
//       </TouchableOpacity>

<<<<<<< HEAD
//       <Text style={{ marginTop: 15, color: "#2e7d32" }}>
//          S'keni nje llogari?{" "}
//           <Text onPress={() => router.push("/signup")} style={{ fontWeight: "bold" }}>
//             Regjistrohu
//           </Text>
//       </Text>

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
=======
      <Text style={{ marginTop: 15, color: "#2e7d32" }}>
        S'keni një llogari?{" "}
        <Text onPress={() => router.push("/signup")} style={{ fontWeight: "bold" }}>
          Regjistrohu
        </Text>
      </Text>
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
>>>>>>> c5bff4695c1646389c1fce4b31d95ce9c786191f
