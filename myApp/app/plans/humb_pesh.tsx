
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
  { name: "Omëletë 2 vezë + të bardha + spinaq + kërpudha, 1 fetë bukë integrale", kcal: 300 },
  { name: "Kos grek light + boronica + fara chia (1 lugë) + pak granola", kcal: 250 },
  { name: "Tërshërë me ujë/qumësht 1.5% + kanellë + mollë të copëtuar", kcal: 280 },
  { name: "Smoothie: kos light + boronicë + spinaq + 1/2 banane + kub akulli", kcal: 220 },
  { name: "Tost integrale + avokado (1/4) + domate + piper, çaj jeshil", kcal: 270 },
  { name: "Cottage cheese (low-fat) + kastravec + kopër + kripë e zezë", kcal: 200 },
  { name: "Skyr/High-protein yogurt + dredhëza + bajame (10 copë)", kcal: 250 },
];

const lunchIdeas = [
  { name: "Pulë në furrë + sallatë e madhe (marule, kastravec, domate) + vinigret i lehtë", kcal: 420 },
  { name: "Peshk i bardhë/merluc në tigan anti-stick + perime të ziera + limon", kcal: 400 },
  { name: "Bowl me ton në ujë + fasule të zeza + misër + sallatë jeshile", kcal: 450 },
  { name: "Qofte gjeli në air-fryer + brokoli me avull + pak oriz integral", kcal: 480 },
  { name: "Wrap integrale me gjoks pule, sallatë, kos-garlic sauce (light)", kcal: 400 },
  { name: "Sallatë me vezë të ziera (2) + rukola + domate qershi + uthull balsamike", kcal: 350 },
  { name: "Supë perimesh + sanduiç i vogël integrale me gjoks pule", kcal: 380 },
];

const dinnerIdeas = [
  { name: "Turkey stir-fry me perime (pak vaj) + shirataki noodles", kcal: 400 },
  { name: "Salmon porcion i vogël + asparagus + limon + quark/cottage anash", kcal: 420 },
  { name: "Bowl tofu i pjekur + lakër e kuqe + karrotë + salcë soy-light", kcal: 350 },
  { name: "Gjoks pule i zier + pure lulelakre + sallatë anash", kcal: 400 },
  { name: "Qofte viçi 5% fat (porcion) + sallatë greke pa bukë", kcal: 450 },
  { name: "Frittata me perime + sallatë jeshile (pa bukë në darkë)", kcal: 380 },
  { name: "Pjata mezesh light: hummus (30g) + perime të freskëta + ullinj (pak)", kcal: 300 },
];


const todayKey = () => `food_loss_${new Date().toISOString().slice(0, 10)}`;

export default function HumbPeshe() {
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
    const data = { selected, total };
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
        <Text style={styles.headerTitle}>Plani: Humb Peshë</Text>
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

        <View style={{ height: 40 }} />
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
      <Text style={styles.tip}>• Qëllimi: deficit kalorik i butë (−300–500 kcal/ditë).</Text>
      <Text style={styles.tip}>• Proteina 1.6–2.2 g/kg; volum i lartë (perime, sallata, supa).</Text>
      <Text style={styles.tip}>• Kufizo pijet me kalori; mjaft ujë, çaj pa sheqer, kafe e zezë.</Text>
      <Text style={styles.tip}>• Mbaj ecje/palestra 3–5x/javë; gjumë 7–8 orë.</Text>
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
