
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

const COLORS = {
  green: '#355E3B',
  bg: '#F7F4E9',
  card: '#E6DFC5',
  cardSoft: '#EFE8CF',
  textDark: '#2E2E2E',
};

/**
 * Komponent i përbashkët për plane ushqimi:
 * - planKey: 'humb' | 'shto' | 'mbaj'
 * - headerTitle: titulli te header (p.sh. "Plani: Humb Peshë")
 * - tips: array me strings për udhëzimet
 */
export default function PlanMealsScreen({ planKey, headerTitle, tips = [] }) {
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

  // Totali i RUJTUR i kalorive për sot (nga Firestore/AsyncStorage)
  const [totalToday, setTotalToday] = useState(null);

  // READ – leximi i ushqimeve për planin (planKey)
  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, 'meals'), where('plan', '==', planKey));

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
  }, [planKey]);

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

  // total kcal sipas zgjedhjeve (1 per seksion) – ZGJEDHJA AKTUALE
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

  // Lexo totalin e kalorive të ushqimit për sot nga Firestore + AsyncStorage
  useEffect(() => {
    const loadTotal = async () => {
      const user = auth.currentUser;

      const today = new Date().toISOString().slice(0, 10);
      const localKey = `food_kcal_${today}`;

      if (!user) {
        console.log('No user in PlanMealsScreen – nuk duhet me ndodh.');
        setTotalToday(0);
        // prap e ruajmë 0 lokalisht që HealthWidgets mos me u bo nervoz
        await AsyncStorage.setItem(localKey, '0');
        return;
      }

      try {
        // koleksioni sipas rules: dailyIntake/{userId}/days/{dayId}
        const docRef = doc(db, 'dailyIntake', user.uid, 'days', today);
        const snap = await getDoc(docRef);

        if (snap.exists()) {
          const data = snap.data();
          const total = Number(data.totalCalories || 0);
          setTotalToday(total);
          await AsyncStorage.setItem(localKey, String(total));
        } else {
          setTotalToday(0);
          await AsyncStorage.setItem(localKey, '0');
        }
      } catch (e) {
        console.log('load food total error:', e);
        // fallback në AsyncStorage (p.sh. offline)
        const localVal = await AsyncStorage.getItem(localKey);
        setTotalToday(localVal ? Number(localVal) : 0);
      }
    };

    loadTotal();
  }, []);

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

    const today = new Date().toISOString().slice(0, 10);
    const localKey = `food_kcal_${today}`;

    try {
      // 1) Lexo vlerën ekzistuese nga AsyncStorage (cache ditore)
      const prev = await AsyncStorage.getItem(localKey);
      const prevNum = prev ? Number(prev) : (totalToday || 0);

      const newTotal = prevNum + totalKcal;

      // Ruaj në AsyncStorage – që ta shohë HealthWidgets
      await AsyncStorage.setItem(localKey, String(newTotal));
      setTotalToday(newTotal);

      // 2) Ruaj në Firestore – vetëm për user të loguar
      // Path: dailyIntake/{userId}/days/{dayId}
      const docRef = doc(db, 'dailyIntake', user.uid, 'days', today);
      await setDoc(
        docRef,
        {
          userId: user.uid,
          date: today,
          plan: planKey,          // p.sh. 'humb', 'shto', 'mbaj'
          totalCalories: newTotal,
          lastAdded: totalKcal,   // kjo zgjedhje e fundit
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );

      Alert.alert(
        'Ruajtur',
        `U shtuan ${totalKcal} kcal për sot.\nTotali i ri: ${newTotal} kcal.`
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
              {/* radio/check ikonë */}
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
      {/* HEADER */}
      <View style={s.header}>
        <Pressable
          style={s.backBtn}
          onPress={() => router.back()}
        >
          <FontAwesome name="arrow-left" size={22} color="#fff" />
        </Pressable>
        <Text style={s.headerTitle}>{headerTitle}</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={s.wrap}>
        {/* Udhëzimet */}
        {tips.length > 0 && (
          <View style={[s.card, { backgroundColor: COLORS.cardSoft }]}>
            <Text style={s.cardTitle}>Udhëzime të shpejta</Text>
            {tips.map((t, idx) => (
              <Text key={idx} style={s.tip}>
                {t}
              </Text>
            ))}
          </View>
        )}

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
          <View>
            <Text style={s.totalText}>
              Zgjedhja aktuale: {totalKcal} kcal
            </Text>
            {totalToday !== null && (
              <Text style={s.totalText}>
                Totali i ruajtur për sot: {totalToday} kcal
              </Text>
            )}
          </View>

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
