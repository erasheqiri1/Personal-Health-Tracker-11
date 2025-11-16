import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import OptionCard from "../../components/OptionCard";

const COLORS = {
  green: "#355E3B",
  page: "#F7F4E9",
  card: "#E6DFC5",
  textDark: "#2E2E2E",
  cardSoft: "#EFE8CF",
};

export default function UshtrimeScreen() {
  const router = useRouter();
  const { width: W, height: H } = Dimensions.get("window");

  const BG_ICONS = [
    { name: "dumbbell", x: 0.15, y: 0.1, sizeMul: 0.2, op: 0.1, rot: -8 },
    { name: "kettlebell", x: 0.8, y: 0.12, sizeMul: 0.22, op: 0.09, rot: 10 },
    { name: "boxing-glove", x: 0.45, y: 0.18, sizeMul: 0.17, op: 0.08, rot: -5 },
    { name: "arm-flex", x: 0.25, y: 0.35, sizeMul: 0.19, op: 0.08, rot: 8 },
    { name: "weight", x: 0.7, y: 0.32, sizeMul: 0.2, op: 0.09, rot: -6 },
    { name: "heart-pulse", x: 0.12, y: 0.5, sizeMul: 0.16, op: 0.07, rot: 5 },
    { name: "timer-outline", x: 0.5, y: 0.48, sizeMul: 0.18, op: 0.07, rot: -8 },
    { name: "treadmill", x: 0.88, y: 0.48, sizeMul: 0.2, op: 0.08, rot: 6 },
    { name: "medal-outline", x: 0.32, y: 0.65, sizeMul: 0.18, op: 0.08, rot: -6 },
    { name: "bottle-soda", x: 0.68, y: 0.63, sizeMul: 0.17, op: 0.07, rot: 8 },
    { name: "weight-lifter", x: 0.1, y: 0.72, sizeMul: 0.19, op: 0.08, rot: 6 },
    { name: "jump-rope", x: 0.5, y: 0.72, sizeMul: 0.16, op: 0.07, rot: -4 },
    { name: "barbell", x: 0.88, y: 0.7, sizeMul: 0.22, op: 0.09, rot: 5 },
    { name: "yoga", x: 0.28, y: 0.88, sizeMul: 0.18, op: 0.07, rot: -5 },
    { name: "boxing-glove", x: 0.75, y: 0.88, sizeMul: 0.2, op: 0.08, rot: 8 },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.bgLayer} pointerEvents="none">
        {BG_ICONS.map((icon, i) => {
          const size = Math.round(Math.min(W, H) * icon.sizeMul);
          const left = icon.x * W - size / 2;
          const top = icon.y * H - size / 2;
          return (
            <MaterialCommunityIcons
              key={i}
              name={icon.name}
              size={size}
              color={COLORS.green}
              style={{
                position: "absolute",
                left,
                top,
                opacity: icon.op,
                transform: [{ rotate: `${icon.rot}deg` }],
              }}
            />
          );
        })}
      </View>

      <View style={styles.container}>
        <View style={styles.ribbon}>
          <MaterialCommunityIcons name="run-fast" size={22} color="#fff" />
          <Text style={styles.ribbonText}>Zgjidh një opsion</Text>
        </View>

        <View style={styles.cardsRow}>
          <OptionCard
            iconName="dumbbell"
            title={"WEIGHT-\nLIFTING"}
            onPress={() => router.push("/ushtrime/weightlifting")}
            style={{ width: "46%", aspectRatio: 0.62 }}
          />

          <OptionCard
            iconName="arm-flex"
            title={"HOME\nWORKOUT"}
            onPress={() => router.push("/ushtrime/homeworkout")}
            style={{ width: "46%", aspectRatio: 0.62 }}
          />
        </View>

        <View style={{ height: 28 }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.page },
  bgLayer: { ...StyleSheet.absoluteFillObject, zIndex: -1 },
  container: { flex: 1, justifyContent: "center", paddingHorizontal: 16 },

  ribbon: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.green,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 22,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  ribbonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    marginLeft: 8,
    letterSpacing: 0.4,
  },

  cardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
});
