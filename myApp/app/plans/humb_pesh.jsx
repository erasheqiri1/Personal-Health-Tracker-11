
// import { useEffect, useMemo, useState } from "react";
// import {
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// import { FontAwesome } from "@expo/vector-icons";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useRouter } from "expo-router";

// const COLORS = {
//   green: "#355E3B",
//   page: "#F7F4E9",
//   card: "#E6DFC5",
//   cardSoft: "#EFE8CF",
//   textDark: "#2E2E2E",
// };

// const breakfastIdeas = [
//   { name: "Omëletë 2 vezë + të bardha + spinaq + kërpudha, 1 fetë bukë integrale", kcal: 300 },
//   { name: "Kos grek light + boronica + fara chia (1 lugë) + pak granola", kcal: 250 },
//   { name: "Tërshërë me ujë/qumësht 1.5% + kanellë + mollë të copëtuar", kcal: 280 },
//   { name: "Smoothie: kos light + boronicë + spinaq + 1/2 banane + kub akulli", kcal: 220 },
//   { name: "Tost integrale + avokado (1/4) + domate + piper, çaj jeshil", kcal: 270 },
//   { name: "Cottage cheese (low-fat) + kastravec + kopër + kripë e zezë", kcal: 200 },
//   { name: "Skyr/High-protein yogurt + dredhëza + bajame (10 copë)", kcal: 250 },
// ];

// const lunchIdeas = [
//   { name: "Pulë në furrë + sallatë e madhe (marule, kastravec, domate) + vinigret i lehtë", kcal: 420 },
//   { name: "Peshk i bardhë/merluc në tigan anti-stick + perime të ziera + limon", kcal: 400 },
//   { name: "Bowl me ton në ujë + fasule të zeza + misër + sallatë jeshile", kcal: 450 },
//   { name: "Qofte gjeli në air-fryer + brokoli me avull + pak oriz integral", kcal: 480 },
//   { name: "Wrap integrale me gjoks pule, sallatë, kos-garlic sauce (light)", kcal: 400 },
//   { name: "Sallatë me vezë të ziera (2) + rukola + domate qershi + uthull balsamike", kcal: 350 },
//   { name: "Supë perimesh + sanduiç i vogël integrale me gjoks pule", kcal: 380 },
// ];

// const dinnerIdeas = [
//   { name: "Turkey stir-fry me perime (pak vaj) + shirataki noodles", kcal: 400 },
//   { name: "Salmon porcion i vogël + asparagus + limon + quark/cottage anash", kcal: 420 },
//   { name: "Bowl tofu i pjekur + lakër e kuqe + karrotë + salcë soy-light", kcal: 350 },
//   { name: "Gjoks pule i zier + pure lulelakre + sallatë anash", kcal: 400 },
//   { name: "Qofte viçi 5% fat (porcion) + sallatë greke pa bukë", kcal: 450 },
//   { name: "Frittata me perime + sallatë jeshile (pa bukë në darkë)", kcal: 380 },
//   { name: "Pjata mezesh light: hummus (30g) + perime të freskëta + ullinj (pak)", kcal: 300 },
// ];


// const todayKey = () => `food_loss_${new Date().toISOString().slice(0, 10)}`;

// export default function HumbPeshe() {
//   const router = useRouter();
//   const [selected, setSelected] = useState<Record<string, boolean>>({});

//   useEffect(() => {
//     (async () => {
//       const raw = await AsyncStorage.getItem(todayKey());
//       if (raw) {
//         const data = JSON.parse(raw);
//         if (data.selected) setSelected(data.selected); 
//       }
//     })();
//   }, []);

//   function toggle(itemName: string) {
//     setSelected((prev) => ({ ...prev, [itemName]: !prev[itemName] }));
//   }

//   async function saveToday() {
//     const key = todayKey();
//     const data = { selected, total };
//     await AsyncStorage.removeItem(key); 
//     await AsyncStorage.setItem(key, JSON.stringify(data));
//   }


//   const total = useMemo(() => {
//     let sum = 0;
//     [breakfastIdeas, lunchIdeas, dinnerIdeas].forEach((meal) => {
//       meal.forEach((item) => {
//         if (selected[item.name]) sum += item.kcal;
//       });
//     });
//     return sum;
//   }, [selected]);

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.page }}>
    
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.8}>
//           <FontAwesome name="arrow-left" size={22} color="#fff" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Plani: Humb Peshë</Text>
//         <View style={{ width: 44 }} />
//       </View>

//       <ScrollView contentContainerStyle={styles.wrap}>
//         <TipCard />

//         <MealCard title="Mëngjesi" items={breakfastIdeas} selected={selected} toggle={toggle} />
//         <MealCard title="Dreka" items={lunchIdeas} selected={selected} toggle={toggle} />
//         <MealCard title="Darkë" items={dinnerIdeas} selected={selected} toggle={toggle} />


//         <View style={styles.totalWrap}>
//           <Text style={styles.totalText}>Ju sot keni ngrënë: {total} kcal</Text>
//           <TouchableOpacity style={styles.saveBtn} onPress={saveToday}>
//             <Text style={{ color: "#fff", fontWeight: "700" }}>Ruaj për sot</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={{ height: 40 }} />
//       </ScrollView>
//     </SafeAreaView>
//   );
// }


// function MealCard({
//   title,
//   items,
//   selected,
//   toggle,
// }: {
//   title: string;
//   items: { name: string; kcal: number }[];
//   selected: Record<string, boolean>;
//   toggle: (name: string) => void;
// }) {
//   return (
//     <View style={styles.card}>
//       <Text style={styles.cardTitle}>{title}</Text>
//       {items.map((it, i) => (
//         <Pressable
//           key={i}
//           onPress={() => toggle(it.name)}
//           style={[styles.row, selected[it.name] && styles.rowActive]}
//         >
//           <FontAwesome
//             name={selected[it.name] ? "check-circle" : "circle-thin"}
//             size={18}
//             color={selected[it.name] ? COLORS.green : "#999"}
//             style={{ marginTop: 2 }}
//           />
//           <View style={{ flex: 1 }}>
//             <Text style={styles.item}>{it.name}</Text>
//             <Text style={styles.kcal}>{it.kcal} kcal</Text>
//           </View>
//         </Pressable>
//       ))}
//     </View>
//   );
// }

// function TipCard() {
//   return (
//     <View style={[styles.card, { backgroundColor: COLORS.cardSoft }]}>
//       <Text style={styles.cardTitle}>Udhëzime të shpejta</Text>
//       <Text style={styles.tip}>• Qëllimi: deficit kalorik i butë (−300–500 kcal/ditë).</Text>
//       <Text style={styles.tip}>• Proteina 1.6–2.2 g/kg; volum i lartë (perime, sallata, supa).</Text>
//       <Text style={styles.tip}>• Kufizo pijet me kalori; mjaft ujë, çaj pa sheqer, kafe e zezë.</Text>
//       <Text style={styles.tip}>• Mbaj ecje/palestra 3–5x/javë; gjumë 7–8 orë.</Text>
//     </View>
//   );
// }


// const styles = StyleSheet.create({
//   header: {
//     height: 56,
//     backgroundColor: COLORS.green,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 12,
//   },
//   backBtn: {
//     width: 44,
//     height: 36,
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   headerTitle: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "800",
//     letterSpacing: 0.3,
//   },
//   wrap: { padding: 16, gap: 14 },
//   card: {
//     backgroundColor: COLORS.card,
//     padding: 14,
//     borderRadius: 16,
//     shadowColor: "#000",
//     shadowOpacity: 0.06,
//     shadowRadius: 6,
//     shadowOffset: { width: 0, height: 3 },
//     elevation: 2,
//   },
//   cardTitle: {
//     color: COLORS.green,
//     fontSize: 18,
//     fontWeight: "800",
//     marginBottom: 8,
//   },
//   row: {
//     flexDirection: "row",
//     alignItems: "flex-start",
//     gap: 10,
//     marginBottom: 10,
//     padding: 6,
//     borderRadius: 10,
//   },
//   rowActive: {
//     backgroundColor: "#e6efd9",
//   },
//   item: { flex: 1, color: COLORS.textDark, fontSize: 15, lineHeight: 20 },
//   kcal: { color: COLORS.textDark, opacity: 0.7, fontSize: 13 },
//   tip: { color: COLORS.textDark, opacity: 0.9, marginBottom: 6, lineHeight: 20 },
//   totalWrap: {
//     backgroundColor: COLORS.cardSoft,
//     borderRadius: 14,
//     padding: 12,
//     marginTop: 8,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   totalText: { color: COLORS.textDark, fontSize: 16, fontWeight: "700" },
//   saveBtn: {
//     backgroundColor: COLORS.green,
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 10,
//   },
// });
// app/plans/humb_pesh.jsx
// app/.../humb_pesh.jsx (ose ku e ki)
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  collection,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';

const COLORS = {
  green: '#355E3B',
  bg: '#F7F4E9',
  card: '#E6DFC5',
  cardSoft: '#EFE8CF',
  textDark: '#2E2E2E',
};

export default function HumbPeshPlan() {
  const router = useRouter();

  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // id-të e ushqimeve të zgjedhura për çdo seksion (1 opsion per seksion)
  const [selected, setSelected] = useState({
    menges: null,
    dreka: null,
    darke: null,
  });

  // READ – leximi i ushqimeve për planin "humb"
  useEffect(() => {
    setLoading(true);
    const q = query(
      collection(db, 'meals'),
      where('plan', '==', 'humb')
    );

    const unsub = onSnapshot(
      q,
      snapshot => {
        const list = snapshot.docs.map(d => ({
          id: d.id,
          ...d.data(),
        }));
        setMeals(list);
        setLoading(false);
        setError('');
      },
      err => {
        console.log('Meal read error:', err);
        setError('S’u lexuan ushqimet.');
        setLoading(false);
      }
    );

    return () => unsub();
  }, []);

  // i ndajmë në seksione
  const grouped = useMemo(() => {
    const base = { menges: [], dreka: [], darke: [] };
    for (const m of meals) {
      if (m.section === 'menges') base.menges.push(m);
      else if (m.section === 'dreka') base.dreka.push(m);
      else if (m.section === 'darke') base.darke.push(m);
    }
    return base;
  }, [meals]);

  // total kcal sipas zgjedhjeve (1 per seksion)
  const totalKcal = useMemo(() => {
    let total = 0;
    for (const sec of ['menges', 'dreka', 'darke']) {
      const id = selected[sec];
      if (!id) continue;
      const meal = meals.find(m => m.id === id);
      if (meal?.calories) total += Number(meal.calories);
    }
    return total;
  }, [selected, meals]);

  const handleSelect = (section, id) => {
  setSelected(prev => ({
    ...prev,
    // nëse veç është i zgjedhur ky id → bëje null (unclick)
    [section]: prev[section] === id ? null : id,
  }));
};

  const handleSaveForToday = async () => {
    if (totalKcal === 0) {
      Alert.alert('Vërejtje', 'Zgjidh të paktën një ushqim.');
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Gabim', 'Duhet të jeni i kyçur për ta ruajtur.');
      return;
    }

    try {
      // këtu ma vonë mundesh me e shtu n'Firestore (p.sh. dailyIntake)
      Alert.alert(
        'Ruajtur',
        `U ruajt për sot: ${totalKcal} kcal (plan: Humb Peshë).`
      );
    } catch (e) {
      console.log('Save intake error:', e);
      Alert.alert('Gabim', 'Nuk u ruajt konsumimi për sot.');
    }
  };

  const renderSection = (label, key) => {
    const list = grouped[key];
    if (!list?.length) return null;

    return (
      <View style={s.card}>
        <Text style={s.cardTitle}>{label}</Text>
        {list.map(meal => {
          const checked = selected[key] === meal.id;
          return (
            <Pressable
              key={meal.id}
              style={[
                s.row,
                checked && s.rowActive,
              ]}
              onPress={() => handleSelect(key, meal.id)}
            >
              {/* radio/check ikonë në stilin tand */}
              <FontAwesome
                name={checked ? 'check-circle' : 'circle-thin'}
                size={20}
                color={checked ? COLORS.green : '#999'}
                style={{ marginTop: 2, marginRight: 8 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={s.mealTitle}>{meal.title}</Text>
                {!!meal.subtitle && (
                  <Text style={s.mealSubtitle}>{meal.subtitle}</Text>
                )}
                <Text style={s.mealKcal}>{meal.calories} kcal</Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      {/* HEADER si te ShtoPeshe */}
      <View style={s.header}>
        <Pressable
          style={s.backBtn}
          onPress={() => router.back()}
        >
          <FontAwesome name="arrow-left" size={22} color="#fff" />
        </Pressable>
        <Text style={s.headerTitle}>Plani: Humb Peshë</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={s.wrap}>
        {/* Udhëzimet – mundesh mi ndryshu textet po stilin po e ruaj */}
        <View style={[s.card, { backgroundColor: COLORS.cardSoft }]}>
          <Text style={s.cardTitle}>Udhëzime të shpejta</Text>
          <Text style={s.tip}>
            • Qëllimi: deficit kalorik i lehtë (-250–400 kcal/ditë).
          </Text>
          <Text style={s.tip}>
            • Fokus te perimet, proteinat e larta, shmang kaloritë boshe
            (pije të ëmbla, snacks ultra–të–përpunuara).
          </Text>
          <Text style={s.tip}>
            • Mbaj 3 vakte + 1 ndërmjetëse nëse ke nevojë, jo “urije ekstreme”.
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator
            size="large"
            color={COLORS.green}
            style={{ marginTop: 20 }}
          />
        ) : error ? (
          <Text style={s.error}>{error}</Text>
        ) : (
          <>
            {renderSection('Mëngjesi', 'menges')}
            {renderSection('Dreka', 'dreka')}
            {renderSection('Darkë', 'darke')}
          </>
        )}

        <View style={s.totalWrap}>
          <Text style={s.totalText}>
            Ju sot keni ngrënë: {totalKcal} kcal
          </Text>
          <Pressable
            style={s.saveBtn}
            onPress={handleSaveForToday}
          >
            <Text style={{ color: '#fff', fontWeight: '700' }}>
              Ruaj për sot
            </Text>
          </Pressable>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  header: {
    height: 56,
    backgroundColor: COLORS.green,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  backBtn: {
    width: 44,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  wrap: {
    padding: 16,
    gap: 14,
  },
  card: {
    backgroundColor: COLORS.card,
    padding: 14,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  cardTitle: {
    color: COLORS.green,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 10,
    padding: 6,
    borderRadius: 10,
  },
  rowActive: {
    backgroundColor: '#e6efd9',
  },
  mealTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  mealSubtitle: {
    fontSize: 12,
    color: '#444',
  },
  mealKcal: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.green,
    marginTop: 2,
  },
  tip: {
    color: COLORS.textDark,
    opacity: 0.9,
    marginBottom: 6,
    lineHeight: 20,
    fontSize: 13,
  },
  totalWrap: {
    backgroundColor: COLORS.cardSoft,
    borderRadius: 14,
    padding: 12,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    color: COLORS.textDark,
    fontSize: 16,
    fontWeight: '700',
  },
  saveBtn: {
    backgroundColor: COLORS.green,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  error: {
    color: '#C0392B',
    marginTop: 12,
  },
});

