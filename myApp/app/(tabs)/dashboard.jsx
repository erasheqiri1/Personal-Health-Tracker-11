//kodi funksional i fazes se pare
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useFocusEffect } from "expo-router";
// import React, { useCallback, useState } from "react";
// import { StyleSheet, Text, View } from "react-native";

// const COLORS = {
//   green: "#355E3B",
//   page: "#F7F4E9",
//   card: "#E6DFC5",
//   textDark: "#2E2E2E",
//   cardSoft: "#EFE8CF",
// };

// export default function HealthWidgets({
//   steps = 5432,
//   stepGoal = 8000,
//   sleepMinutes = 465, 
// }) {
//   const [foodCalories, setFoodCalories] = useState(0);
//   const [workoutCalories, setWorkoutCalories] = useState(0);

//   useFocusEffect(
//     useCallback(() => {
//       const loadData = async () => {
//         const today = new Date().toISOString().slice(0, 10);

//         const keys = await AsyncStorage.getAllKeys();
//         let foodTotal = 0;
//         for (const key of keys) {
//           if (key.startsWith("food_") && key.includes(today)) {
//             const raw = await AsyncStorage.getItem(key);
//             if (!raw) continue;
//             try {
//               const data = JSON.parse(raw);
//               if (data?.total) foodTotal += data.total;
//             } catch {}
//           }
//         }

//         const workoutRaw = await AsyncStorage.getItem(`workout_kcal_${today}`);
//         const workoutTotal = workoutRaw ? Number(workoutRaw) : 0;

//         setFoodCalories(foodTotal);
//         setWorkoutCalories(workoutTotal);
//       };

//       loadData();
//       return () => {};
//     }, [])
//   );

//   const progress = Math.min(steps / stepGoal, 1);
//   const angle = `${360 * progress}deg`;
//   const hours = Math.floor(sleepMinutes / 60);
//   const mins = sleepMinutes % 60;

//   return (
//     <View style={[styles.container, { backgroundColor: COLORS.page }]}>
//       <View style={styles.cards}>
//         {/*numrues hapash*/}
//         <View style={[styles.cardBase, styles.cardTall]}>
//           <Text style={styles.title}>Gjurmues i hapave</Text>
//           <View style={styles.circleWrap}>
//             <View style={[styles.progressCircle, { backgroundColor: COLORS.cardSoft }]}>
//               <View
//                 style={[
//                   styles.progressFill,
//                   {
//                     transform: [{ rotate: angle }],
//                     borderTopColor: COLORS.green,
//                     borderRightColor: COLORS.green,
//                   },
//                 ]}
//               />
//               <View style={styles.innerCircle}>
//                 <Text style={styles.stepCount}>{steps.toLocaleString()}</Text>
//                 <Text style={styles.stepLabel}>hapa</Text>
//               </View>
//             </View>
//           </View>
//         </View>

//         {/* Gjumi */}
//         <View style={[styles.cardBase, styles.cardSmall]}>
//           <Text style={styles.title}>Gjumi</Text>
//           <View style={styles.sleepRow}>
//             <Text style={styles.moon}>🌙</Text>
//             <View>
//               <Text style={styles.sleepTime}>
//                 {hours} h {mins} m
//               </Text>
//               <Text style={styles.sleepLabel}>kohë gjumi</Text>
//             </View>
//           </View>
//         </View>

//         {/* Kaloritë e konsumuara */}
//         <View style={[styles.cardBase, styles.cardSmall]}>
//           <Text style={styles.title}>Kaloritë e konsumuara</Text>
//           <View style={styles.calRow}>
//             <Text style={styles.fire}>🔥</Text>
//             <View>
//               <Text style={styles.calNum}>{foodCalories}</Text>
//               <Text style={styles.calLabel}>kalori sot</Text>
//             </View>
//           </View>
//         </View>

//         {/* Kaloritë e djegura */}
//         <View style={[styles.cardBase, styles.cardSmall, styles.lastCard]}>
//           <Text style={styles.title}>Kaloritë e djegura</Text>
//           <View style={styles.calRow}>
//             <Text style={styles.fire}>🏋️</Text>
//             <View>
//               <Text style={styles.calNum}>{workoutCalories}</Text>
//               <Text style={styles.calLabel}>kalori sot</Text>
//             </View>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, alignItems: "center", paddingVertical: 10 },

//   cards: {
//     flex: 1,
//     width: "100%",
//     alignItems: "center",
//     justifyContent: "flex-start",
//     paddingVertical: 6,
//   },

//   cardBase: {
//     width: "90%",
//     backgroundColor: COLORS.card,
//     borderRadius: 18,
//     padding: 18,
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOpacity: 0.04,
//     shadowRadius: 2,
//     shadowOffset: { width: 0, height: 2 },
//     marginBottom: 10,
//   },
//   lastCard: { marginBottom: 0 },

//   cardTall: { minHeight: 240 }, 
//   cardSmall: { minHeight: 135 }, 

//   title: { fontSize: 15, color: COLORS.textDark, marginBottom: 6, fontWeight: "700" },


//   circleWrap: { alignItems: "center", justifyContent: "center", flex: 1 },
//   progressCircle: {
//     width: 150,  
//     height: 150,
//     borderRadius: 75,
//     justifyContent: "center",
//     alignItems: "center",
//     position: "relative",
//   },
//   progressFill: {
//     position: "absolute",
//     width: "100%",
//     height: "100%",
//     borderRadius: 75,
//     borderWidth: 14,
//     borderLeftColor: "transparent",
//     borderBottomColor: "transparent",
//   },
//   innerCircle: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: COLORS.page,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   stepCount: { fontSize: 26, fontWeight: "bold", color: COLORS.green },
//   stepLabel: { fontSize: 13, color: COLORS.textDark },


//   sleepRow: { flexDirection: "row", alignItems: "center" },
//   moon: { fontSize: 32, color: COLORS.green, marginRight: 10 },
//   sleepTime: { fontSize: 20, fontWeight: "bold", color: COLORS.green },
//   sleepLabel: { fontSize: 13, color: COLORS.textDark },


//   calRow: { flexDirection: "row", alignItems: "center" },
//   fire: { fontSize: 30, marginRight: 10 },
//   calNum: { fontSize: 20, fontWeight: "bold", color: COLORS.green },
//   calLabel: { fontSize: 13, color: COLORS.textDark },
// });
//MOS E FSHI FAZEN E PARE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//prova e re me API te motit-po funksionon
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location"; // GPS për mobile
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

const COLORS = {
  green: "#355E3B",
  page: "#F7F4E9",
  card: "#E6DFC5",
  textDark: "#2E2E2E",
  cardSoft: "#EFE8CF",
};

const OPEN_WEATHER_API_KEY = "a53564ca78a5eb1e44612c01f6485a43"; // 🔴 vendose API key

export default function HealthWidgets({
  steps = 5432,
  stepGoal = 8000,
  sleepMinutes = 465,
}) {
  const [foodCalories, setFoodCalories] = useState(0);
  const [workoutCalories, setWorkoutCalories] = useState(0);

  // ---- STATE për motin ----
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState(null);

  // ======================
  // 1) Leximi i kalorive nga AsyncStorage
  // ======================
  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        const today = new Date().toISOString().slice(0, 10);

        const keys = await AsyncStorage.getAllKeys();
        let foodTotal = 0;
        for (const key of keys) {
          if (key.startsWith("food_") && key.includes(today)) {
            const raw = await AsyncStorage.getItem(key);
            if (!raw) continue;
            try {
              const data = JSON.parse(raw);
              if (data?.total) foodTotal += data.total;
            } catch {}
          }
        }

        const workoutRaw = await AsyncStorage.getItem(`workout_kcal_${today}`);
        const workoutTotal = workoutRaw ? Number(workoutRaw) : 0;

        setFoodCalories(foodTotal);
        setWorkoutCalories(workoutTotal);
      };

      loadData();
      return () => {};
    }, [])
  );

  // ======================
  // 2) Marrja e lokacionit:
  //    - në mobile: GPS (expo-location)
  //    - në Web: IP-based location (ipapi.co)
  // ======================
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setWeatherLoading(true);
        setWeatherError(null);

        let latitude;
        let longitude;
        let cityFromIP = null;

        if (Platform.OS === "web") {
          // ⭐ WEB: përdor IP-based location
          const geoRes = await fetch("https://ipapi.co/json/");
          if (!geoRes.ok) {
            throw new Error("Gabim gjatë marrjes së lokacionit (IP)");
          }
          const geoData = await geoRes.json();
          latitude = geoData.latitude;
          longitude = geoData.longitude;
          cityFromIP = geoData.city;
        } else {
          // 📱 MOBILE: përdor GPS (expo-location)
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            setWeatherError("Leja për lokacion u refuzua");
            return;
          }

          const position = await Location.getCurrentPositionAsync({});
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
        }

        if (!latitude || !longitude) {
          throw new Error("Koordinatat nuk u gjetën");
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${OPEN_WEATHER_API_KEY}`;
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Gabim gjatë marrjes së motit");
        }

        const data = await res.json();

        // nëse jemi në Web dhe API s’kthejnë city, përdor city nga IP
        if (Platform.OS === "web" && cityFromIP && !data.name) {
          data.name = cityFromIP;
        }

        setWeather(data);
      } catch (err) {
  console.log("WEATHER ERROR:", err);
  setWeatherError(err.message || "Gabim i panjohur");
}
 finally {
        setWeatherLoading(false);
      }
    };

    fetchWeather();
  }, []);

  // ======================
  // Llogaritjet ekzistuese
  // ======================
  const progress = Math.min(steps / stepGoal, 1);
  const angle = `${360 * progress}deg`;
  const hours = Math.floor(sleepMinutes / 60);
  const mins = sleepMinutes % 60;

  const temperature =
    weather?.main?.temp != null ? Math.round(weather.main.temp) : null;
  const cityName = weather?.name;
  const description = weather?.weather?.[0]?.description;

  return (
    <View style={[styles.container, { backgroundColor: COLORS.page }]}>
      <View style={styles.cards}>
        {/* KARTA E MOTIT */}
        <View style={[styles.cardBase, styles.cardSmall]}>
          <Text style={styles.title}>Moti sot</Text>

          {weatherLoading && <Text>Duke u ngarkuar...</Text>}

          {!weatherLoading && weatherError && (
            <Text style={styles.errorText}>{weatherError}</Text>
          )}

          {!weatherLoading && !weatherError && temperature !== null && (
            <View style={styles.weatherRow}>
              <Text style={styles.weatherIcon}>☀️</Text>
              <View>
                <Text style={styles.weatherTemp}>{temperature}°C</Text>
                <Text style={styles.weatherCity}>
                  {cityName || "Lokacioni yt"}
                </Text>
                <Text style={styles.weatherDesc}>
                  {description || "Pa të dhëna"}
                </Text>
              </View>
            </View>
          )}
        </View>

        {/*numrues hapash*/}
        <View style={[styles.cardBase, styles.cardTall]}>
          <Text style={styles.title}>Gjurmues i hapave</Text>
          <View style={styles.circleWrap}>
            <View
              style={[
                styles.progressCircle,
                { backgroundColor: COLORS.cardSoft },
              ]}
            >
              <View
                style={[
                  styles.progressFill,
                  {
                    transform: [{ rotate: angle }],
                    borderTopColor: COLORS.green,
                    borderRightColor: COLORS.green,
                  },
                ]}
              />
              <View style={styles.innerCircle}>
                <Text style={styles.stepCount}>
                  {steps.toLocaleString()}
                </Text>
                <Text style={styles.stepLabel}>hapa</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Gjumi */}
        <View style={[styles.cardBase, styles.cardSmall]}>
          <Text style={styles.title}>Gjumi</Text>
          <View style={styles.sleepRow}>
            <Text style={styles.moon}>🌙</Text>
            <View>
              <Text style={styles.sleepTime}>
                {hours} h {mins} m
              </Text>
              <Text style={styles.sleepLabel}>kohë gjumi</Text>
            </View>
          </View>
        </View>

        {/* Kaloritë e konsumuara */}
        <View style={[styles.cardBase, styles.cardSmall]}>
          <Text style={styles.title}>Kaloritë e konsumuara</Text>
          <View style={styles.calRow}>
            <Text style={styles.fire}>🔥</Text>
            <View>
              <Text style={styles.calNum}>{foodCalories}</Text>
              <Text style={styles.calLabel}>kalori sot</Text>
            </View>
          </View>
        </View>

        {/* Kaloritë e djegura */}
        <View style={[styles.cardBase, styles.cardSmall, styles.lastCard]}>
          <Text style={styles.title}>Kaloritë e djegura</Text>
          <View style={styles.calRow}>
            <Text style={styles.fire}>🏋️</Text>
            <View>
              <Text style={styles.calNum}>{workoutCalories}</Text>
              <Text style={styles.calLabel}>kalori sot</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", paddingVertical: 10 },

  cards: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 6,
  },

  cardBase: {
    width: "90%",
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 18,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 10,
  },
  lastCard: { marginBottom: 0 },

  cardTall: { minHeight: 240 },
  cardSmall: { minHeight: 135 },

  title: {
    fontSize: 15,
    color: COLORS.textDark,
    marginBottom: 6,
    fontWeight: "700",
  },

  // STEPS
  circleWrap: { alignItems: "center", justifyContent: "center", flex: 1 },
  progressCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  progressFill: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 75,
    borderWidth: 14,
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
  },
  innerCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.page,
    alignItems: "center",
    justifyContent: "center",
  },
  stepCount: { fontSize: 26, fontWeight: "bold", color: COLORS.green },
  stepLabel: { fontSize: 13, color: COLORS.textDark },

  // SLEEP
  sleepRow: { flexDirection: "row", alignItems: "center" },
  moon: { fontSize: 32, color: COLORS.green, marginRight: 10 },
  sleepTime: { fontSize: 20, fontWeight: "bold", color: COLORS.green },
  sleepLabel: { fontSize: 13, color: COLORS.textDark },

  // CALORIES
  calRow: { flexDirection: "row", alignItems: "center" },
  fire: { fontSize: 30, marginRight: 10 },
  calNum: { fontSize: 20, fontWeight: "bold", color: COLORS.green },
  calLabel: { fontSize: 13, color: COLORS.textDark },

  // WEATHER
  weatherRow: { flexDirection: "row", alignItems: "center" },
  weatherIcon: { fontSize: 30, marginRight: 10 },
  weatherTemp: { fontSize: 22, fontWeight: "bold", color: COLORS.green },
  weatherCity: { fontSize: 14, color: COLORS.textDark },
  weatherDesc: { fontSize: 13, color: COLORS.textDark },
  errorText: { fontSize: 13, color: "red" },
});
