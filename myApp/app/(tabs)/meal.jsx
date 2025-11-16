import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import OptionCard from "../../components/OptionCard";

const COLORS = {
  green: "#355E3B",
  page: "#F7F4E9",
  textDark: "#2E2E2E",
};

export default function UshqimeScreen() {
  const router = useRouter();
  const { width: W, height: H } = Dimensions.get("window");

  const BG_ICONS = [
    { name: "food-apple", x: 0.18, y: 0.15, sizeMul: 0.18, op: 0.08, rot: -8 },
    { name: "food-drumstick", x: 0.8, y: 0.18, sizeMul: 0.2, op: 0.08, rot: 6 },
    { name: "carrot", x: 0.3, y: 0.38, sizeMul: 0.18, op: 0.07, rot: 5 },
    { name: "leaf", x: 0.7, y: 0.35, sizeMul: 0.18, op: 0.07, rot: -5 },
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
        <Text style={styles.topTitle}>Zgjidh një opsion</Text>

        <View style={styles.cardsRow}>
          <OptionCard
            iconName="food-variant"
            title="Shto Peshë"
            subtitle="Kalori + proteina më të larta"
            onPress={() => router.push("/plans/gain_weight")}
            style={{ width: "46%", aspectRatio: 0.62 }}
          />

          <OptionCard
            iconName="leaf"
            title="Humb Peshë"
            subtitle="Deficit kalorie, volum ushqimi"
            onPress={() => router.push("/plans/lose_weight")}
            style={{ width: "46%", aspectRatio: 0.62 }}
          />
        </View>

        <View style={styles.singleCardRow}>
          <OptionCard
            iconName="scale-balance"
            title="Mbaj Peshën"
            subtitle="Balanco kalori & makro"
            onPress={() => router.push("/plans/maintain_weight")}
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

  topTitle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.textDark,
    marginBottom: 22,
  },

  cardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  singleCardRow: {
    marginTop: 18,
    alignItems: "center",
  },
});
