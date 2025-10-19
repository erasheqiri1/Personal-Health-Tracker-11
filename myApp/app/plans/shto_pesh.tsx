
import React, { useEffect, useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const COLORS = {
  green: "#355E3B",
  page: "#F7F4E9",
  card: "#E6DFC5",
  cardSoft: "#EFE8CF",
  textDark: "#2E2E2E",
};


const breakfastIdeas = [
  { name: "Tërshërë me qumësht të plotë + gjalpë kikiriku + banane + fara chia", kcal: 450 },
  { name: "Kos grek (10%) me granola, mjaltë, arra dhe boronica", kcal: 380 },
  { name: "Omëletë 3 vezë + djathë + avokado në bukë integrale me vaj ulliri", kcal: 520 },
  { name: "Smoothie: qumësht i plotë + banane + tërshërë + gjalpë kikiriku + 1 lugë proteinë", kcal: 600 },
  { name: "Palaçinka me gjizë/kotixh + reçel frutash + pak mjaltë", kcal: 430 },
];

const lunchIdeas = [
  { name: "Bowl me pulë, kuinoa, avokado, misër, fasule, salcë jogurti + vaj ulliri", kcal: 650 },
  { name: "Salmon i pjekur + oriz i bardhë + teriyaki + susam", kcal: 700 },
  { name: "Burrito me viç, fasule, djathë, avokado dhe oriz", kcal: 750 },
  { name: "Pasta me pesto, fileto pule, domate qershi dhe arra pishe", kcal: 680 },
  { name: "Wrap me falafel, hummus, sallatë dhe tahini", kcal: 550 },
];

const dinnerIdeas = [
  { name: "Qofte gjeli/pule në furrë + spageti integrale + vaj ulliri", kcal: 600 },
  { name: "Salmon me patate të ëmbla + brokoli + pak gjalpë", kcal: 550 },
  { name: "Stir-fry viçi me perime, oriz basmati dhe arra kashu", kcal: 650 },
  { name: "Curry pule me qumësht kokosi + oriz", kcal: 700 },
  { name: "Gyros bowl: mish qengji/pule + oriz + tzatziki + sallatë", kcal: 680 },
];


const todayKey = () => `food_${new Date().toISOString().slice(0, 10)}`;

export default function ShtoPeshe() {
  const router = useRouter();
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  useEffect(() => {
    (async () => {
      const raw = await AsyncStorage.getItem(todayKey());
      if (raw) {
        const data = JSON.parse(raw);
        if (data.selected) setSelected(data.selected); 
      }
    })();
  }, []);

  function toggle(itemName: string) {
    setSelected((prev) => ({ ...prev, [itemName]: !prev[itemName] }));
  }


  async function saveToday() {
    const key = todayKey();
    const data = {
      selected,
      total,
    };
    await AsyncStorage.removeItem(key);
    await AsyncStorage.setItem(key, JSON.stringify(data));
  }


  const total = useMemo(() => {
    let sum = 0;
    [breakfastIdeas, lunchIdeas, dinnerIdeas].forEach((meal) => {
      meal.forEach((item) => {
        if (selected[item.name]) sum += item.kcal;
      });
    });
    return sum;
  }, [selected]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.page }}>

      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.8}>
          <FontAwesome name="arrow-left" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Plani: Shto Peshë</Text>
        <View style={{ width: 44 }} />
      </View>

 
      <ScrollView contentContainerStyle={styles.wrap}>
        <TipCard />

        <MealCard title="Mëngjesi" items={breakfastIdeas} selected={selected} toggle={toggle} />
        <MealCard title="Dreka" items={lunchIdeas} selected={selected} toggle={toggle} />
        <MealCard title="Darkë" items={dinnerIdeas} selected={selected} toggle={toggle} />

        <View style={styles.totalWrap}>
          <Text style={styles.totalText}>Ju sot keni ngrënë: {total} kcal</Text>
          <TouchableOpacity style={styles.saveBtn} onPress={saveToday}>
            <Text style={{ color: "#fff", fontWeight: "700" }}>Ruaj për sot</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}



function MealCard({
  title,
  items,
  selected,
  toggle,
}: {
  title: string;
  items: { name: string; kcal: number }[];
  selected: Record<string, boolean>;
  toggle: (name: string) => void;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {items.map((it, i) => (
        <Pressable
          key={i}
          onPress={() => toggle(it.name)}
          style={[styles.row, selected[it.name] && styles.rowActive]}
        >
          <FontAwesome
            name={selected[it.name] ? "check-circle" : "circle-thin"}
            size={18}
            color={selected[it.name] ? COLORS.green : "#999"}
            style={{ marginTop: 2 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.item}>{it.name}</Text>
            <Text style={styles.kcal}>{it.kcal} kcal</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
}

function TipCard() {
  return (
    <View style={[styles.card, { backgroundColor: COLORS.cardSoft }]}>
      <Text style={styles.cardTitle}>Udhëzime të shpejta</Text>
      <Text style={styles.tip}>
        • Qëllimi: suficit kalorik i lehtë (+250–400 kcal/ditë) me proteina 1.6–2.2 g/kg.
      </Text>
      <Text style={styles.tip}>
        • Shto kalori “të pastra”: vaj ulliri, arra, farat, gjalpë kikiriku/bajame, djathë, qumësht i plotë.
      </Text>
      <Text style={styles.tip}>
        • Bëj 3 vakte + 1–2 ndërmjetëse (smoothie është zgjidhje e shpejtë).
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    backgroundColor: COLORS.green,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  backBtn: {
    width: 44,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  wrap: { padding: 16, gap: 14 },
  card: {
    backgroundColor: COLORS.card,
    padding: 14,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  cardTitle: {
    color: COLORS.green,
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 10,
    padding: 6,
    borderRadius: 10,
  },
  rowActive: {
    backgroundColor: "#e6efd9",
  },
  item: { flex: 1, color: COLORS.textDark, fontSize: 15, lineHeight: 20 },
  kcal: { color: COLORS.textDark, opacity: 0.7, fontSize: 13 },
  tip: { color: COLORS.textDark, opacity: 0.9, marginBottom: 6, lineHeight: 20 },
  totalWrap: {
    backgroundColor: COLORS.cardSoft,
    borderRadius: 14,
    padding: 12,
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalText: { color: COLORS.textDark, fontSize: 16, fontWeight: "700" },
  saveBtn: {
    backgroundColor: COLORS.green,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
});
