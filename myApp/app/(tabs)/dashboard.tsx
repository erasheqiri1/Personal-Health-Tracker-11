// import React from "react";
// import { View, Text, StyleSheet } from "react-native";

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
//   sleepMinutes = 465, // 7h 45m
// }) {
//   const progress = Math.min(steps / stepGoal, 1);
//   const angle = `${360 * progress}deg`;
//   const hours = Math.floor(sleepMinutes / 60);
//   const mins = sleepMinutes % 60;

//   return (
//     <View style={[styles.container, { backgroundColor: COLORS.page }]}>
//       {/* Step Tracker */}
//       <View style={styles.card}>
//         <Text style={styles.title}>Step Tracker</Text>
//         <View style={styles.circleWrap}>
//           <View
//             style={[
//               styles.progressCircle,
//               {
//                 backgroundColor: COLORS.cardSoft,
//               },
//             ]}
//           >
//             <View
//               style={[
//                 styles.progressFill,
//                 {
//                   transform: [{ rotate: angle }],
//                   borderTopColor: COLORS.green,
//                   borderRightColor: COLORS.green,
//                 },
//               ]}
//             />
//             <View style={styles.innerCircle}>
//               <Text style={styles.stepCount}>{steps.toLocaleString()}</Text>
//               <Text style={styles.stepLabel}>steps</Text>
//             </View>
//           </View>
//         </View>
//       </View>

//       {/* Sleep Tracker */}
//       <View style={styles.card}>
//         <Text style={styles.title}>Sleep Tracker</Text>
//         <View style={styles.sleepRow}>
//           <Text style={styles.moon}>🌙</Text>
//           <View>
//             <Text style={styles.sleepTime}>
//               {hours} h {mins} m
//             </Text>
//             <Text style={styles.sleepLabel}>sleep</Text>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     paddingVertical: 30,
//   },
//   card: {
//     width: "85%",
//     backgroundColor: COLORS.card,
//     borderRadius: 16,
//     padding: 20,
//     marginBottom: 20,
//     elevation: 2,
//   },
//   title: {
//     fontSize: 14,
//     color: COLORS.textDark,
//     marginBottom: 12,
//     fontWeight: "600",
//   },
//   circleWrap: {
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   progressCircle: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     justifyContent: "center",
//     alignItems: "center",
//     position: "relative",
//   },
//   progressFill: {
//     position: "absolute",
//     width: "100%",
//     height: "100%",
//     borderRadius: 60,
//     borderWidth: 12,
//     borderLeftColor: "transparent",
//     borderBottomColor: "transparent",
//   },
//   innerCircle: {
//     width: 85,
//     height: 85,
//     borderRadius: 42.5,
//     backgroundColor: COLORS.page,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   stepCount: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: COLORS.green,
//   },
//   stepLabel: {
//     fontSize: 12,
//     color: COLORS.textDark,
//   },
//   sleepRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//   },
//   moon: {
//     fontSize: 32,
//     color: COLORS.green,
//   },
//   sleepTime: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: COLORS.green,
//   },
//   sleepLabel: {
//     fontSize: 12,
//     color: COLORS.textDark,
//   },
// });
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const COLORS = {
  green: "#355E3B",
  page: "#F7F4E9",
  card: "#E6DFC5",
  textDark: "#2E2E2E",
  cardSoft: "#EFE8CF",
};

export default function HealthWidgets({
  steps = 5432,
  stepGoal = 8000,
  sleepMinutes = 465, // 7h 45m
}) {
  const [foodCalories, setFoodCalories] = useState(0);

  const progress = Math.min(steps / stepGoal, 1);
  const angle = `${360 * progress}deg`;
  const hours = Math.floor(sleepMinutes / 60);
  const mins = sleepMinutes % 60;

  // 🔥 lexon totalin e kalorive të ruajtur për sot
  useEffect(() => {
    (async () => {
      const today = new Date().toISOString().slice(0, 10);
      const keys = await AsyncStorage.getAllKeys();
      let total = 0;

      for (const key of keys) {
        if (key.startsWith("food_") && key.includes(today)) {
          const raw = await AsyncStorage.getItem(key);
          if (!raw) continue;

          const data = JSON.parse(raw);
          if (data?.total) total += data.total;
        }
      }

      setFoodCalories(total);
    })();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: COLORS.page }]}>
      {/* Step Tracker */}
      <View style={styles.card}>
        <Text style={styles.title}>Step Tracker</Text>
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
              <Text style={styles.stepCount}>{steps.toLocaleString()}</Text>
              <Text style={styles.stepLabel}>steps</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Sleep Tracker */}
      <View style={styles.card}>
        <Text style={styles.title}>Sleep Tracker</Text>
        <View style={styles.sleepRow}>
          <Text style={styles.moon}>🌙</Text>
          <View>
            <Text style={styles.sleepTime}>
              {hours} h {mins} m
            </Text>
            <Text style={styles.sleepLabel}>sleep</Text>
          </View>
        </View>
      </View>

      {/* Calorie Tracker */}
      <View style={styles.card}>
        <Text style={styles.title}>Calorie Intake</Text>
        <View style={styles.calRow}>
          <Text style={styles.fire}>🔥</Text>
          <View>
            <Text style={styles.calNum}>{foodCalories}</Text>
            <Text style={styles.calLabel}>kalori të konsumuara sot</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 30,
  },
  card: {
    width: "85%",
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
  },
  title: {
    fontSize: 14,
    color: COLORS.textDark,
    marginBottom: 12,
    fontWeight: "600",
  },
  // Step Circle
  circleWrap: { alignItems: "center", justifyContent: "center" },
  progressCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  progressFill: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 60,
    borderWidth: 12,
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
  },
  innerCircle: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    backgroundColor: COLORS.page,
    alignItems: "center",
    justifyContent: "center",
  },
  stepCount: { fontSize: 22, fontWeight: "bold", color: COLORS.green },
  stepLabel: { fontSize: 12, color: COLORS.textDark },
  // Sleep Tracker         
  sleepRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  moon: { fontSize: 32, color: COLORS.green },
  sleepTime: { fontSize: 20, fontWeight: "bold", color: COLORS.green },
  sleepLabel: { fontSize: 12, color: COLORS.textDark },
  // Calorie Tracker
  calRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  fire: { fontSize: 32 },
  calNum: { fontSize: 20, fontWeight: "bold", color: COLORS.green },
  calLabel: { fontSize: 12, color: COLORS.textDark },
});
