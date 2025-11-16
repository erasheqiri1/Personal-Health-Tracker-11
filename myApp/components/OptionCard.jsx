// perdorim te ushtrime edhe ushqime
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const COLORS = {
  green: "#355E3B",
  cardSoft: "#EFE8CF",
  textDark: "#2E2E2E",
};

export default function OptionCard({
  iconName,
  title,
  subtitle,
  onPress,
  style,
  iconSize = 90,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.88}
      style={[styles.card, style]}
      onPress={onPress}
    >
      {iconName && (
        <MaterialCommunityIcons
          name={iconName}
          size={iconSize}
          color={COLORS.green}
        />
      )}

      <Text style={styles.title}>{title}</Text>

      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardSoft,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.14,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 4 },
  },
  title: {
    color: COLORS.textDark,
    textAlign: "center",
    fontWeight: "900",
    fontSize: 18,     
    marginTop: 10,
    lineHeight: 22,
    letterSpacing: 0.4,
  },
  subtitle: {
    marginTop: 4,
    textAlign: "center",
    color: "#4F4F4F",
    fontSize: 12,
  },
});
