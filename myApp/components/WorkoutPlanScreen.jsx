import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { auth, db } from '../firebaseConfig'; // SIGUROHU që ky path ekziston

const COLORS = {
  green: '#355E3B',
  page: '#F7F4E9',
  card: '#E6DFC5',
  textDark: '#2E2E2E',
  cardSoft: '#EFE8CF',
};

/**
 * Komponent i përbashkët për ushtrimet:
 *
 * props:
 * - planKey: 'homeworkout' | 'weightlifting'
 * - headerTitle: p.sh. "Home Workout", "Weightlifting"
 * - activeTabLabel: teksti i tab-it aktiv
 * - otherTabLabel: teksti i tab-it tjetër
 * - otherTabRoute: ruta p.sh. "/ushtrime/weightlifting"
 * - bgIcons: array me ikonat dekorative në sfond
 */
export default function WorkoutPlanScreen({
  planKey,
  headerTitle,
  activeTabLabel,
  otherTabLabel,
  otherTabRoute,
  bgIcons = [],
}) {
  const router = useRouter();
  const { width: W, height: H } = Dimensions.get('window');
  const insets = useSafeAreaInsets();

  const [user, setUser] = useState(null);          // user lokal për këtë screen
  const [exercises, setExercises] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [minutes, setMinutes] = useState(20);
  const [lastCalories, setLastCalories] = useState(null);
  const [totalCalories, setTotalCalories] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);

  const getSectionLabel = section => {
    if (section === 'upper') return 'Trup i sipërm';
    if (section === 'lower') return 'Trup i poshtëm';
    if (section === 'full') return 'Gjithë trupi';
    return '';
  };

  // 1) Dëgjo gjendjen e Auth (kjo zëvendëson useAuth)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => {
      setUser(u || null);
      setAuthLoading(false);
    });
    return unsub;
  }, []);

  // 2) Leximi i ushtrimeve për këtë plan (homeworkout / weightlifting)
  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, 'workouts'), where('plan', '==', planKey));

    const unsub = onSnapshot(
      q,
      snapshot => {
        const list = snapshot.docs.map(d => ({
          id: d.id,
          ...d.data(),
        }));
        setExercises(list);
        if (!selectedId && list.length > 0) {
          setSelectedId(list[0].id);
        }
        setLoading(false);
      },
      err => {
        console.log('Firestore error:', err);
        Alert.alert('Gabim', 'S’u lexuan ushtrimet.');
        setLoading(false);
      }
    );

    return () => unsub();
  }, [planKey]);

  // 3) Lexo totalin e kalorive për sot nga Firestore + AsyncStorage
  useEffect(() => {
    if (authLoading) return; // prit derisa Firebase Auth me u bo gati
    if (!user) return;       // nëse s’ka user, mos prek AsyncStorage / Firestore

    const loadTotal = async () => {
      const today = new Date().toISOString().slice(0, 10);
      const localKey = `workout_kcal_${today}`;

      try {
        const docRef = doc(db, 'workoutDaily', `${user.uid}_${today}`);
        const snap = await getDoc(docRef);

        if (snap.exists()) {
          const data = snap.data();
          const total = Number(data.totalCalories || 0);
          setTotalCalories(total);

          // sync edhe në AsyncStorage që ta lexojë HealthWidgets
          await AsyncStorage.setItem(localKey, String(total));
        } else {
          setTotalCalories(0);
          await AsyncStorage.setItem(localKey, '0');
        }
      } catch (e) {
        console.log('loadTotal Firestore error:', e);
        // fallback në AsyncStorage (p.sh. offline)
        const localVal = await AsyncStorage.getItem(localKey);
        setTotalCalories(localVal ? Number(localVal) : 0);
      }
    };

    loadTotal();
  }, [authLoading, user, planKey]);

  // 4) Llogaritja dhe ruajtja e kalorive
  const calcCalories = async () => {
    if (!user) {
      Alert.alert('Gabim', 'Nuk ka user të loguar.');
      return;
    }

    if (!selectedId) {
      Alert.alert('Kujdes', 'Zgjedh një ushtrim.');
      return;
    }

    const ex = exercises.find(e => e.id === selectedId);
    if (!ex) {
      Alert.alert('Gabim', 'Ushtrimi nuk u gjet.');
      return;
    }

    const base = Number(ex.calories) || 0;
    const total = Math.round((base * minutes) / 30);

    setLastCalories(total);

    const today = new Date().toISOString().slice(0, 10);
    const localKey = `workout_kcal_${today}`;

    try {
      // 1) Lexo totalin ekzistues nga AsyncStorage (cache ditore)
      const prev = await AsyncStorage.getItem(localKey);
      const prevNum = prev ? Number(prev) : (totalCalories || 0);
      const newTotal = prevNum + total;

      // Ruaj në AsyncStorage – që ta shohë HealthWidgets
      await AsyncStorage.setItem(localKey, String(newTotal));
      setTotalCalories(newTotal);

      // 2) Ruaj në Firestore
      const docRef = doc(db, 'workoutDaily', `${user.uid}_${today}`);
      await setDoc(
        docRef,
        {
          userId: user.uid,
          date: today,
          plan: planKey,
          totalCalories: newTotal,
          lastAdded: total,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );

      Alert.alert('OK', `U shtuan ${total} kcal për sot.`);
    } catch (e) {
      console.log('calcCalories error:', e);
      Alert.alert('Gabim', 'S’u ruajtën kaloritë.');
    }
  };

  const selectedExercise = exercises.find(e => e.id === selectedId);

  return (
    <SafeAreaView style={styles.safe}>
      {/* Ikonat dekorative në sfond */}
      <View style={styles.bgLayer} pointerEvents="none">
        {bgIcons.map((icon, i) => {
          const size = Math.round(Math.min(W, H) * icon.sizeMul);
          return (
            <MaterialCommunityIcons
              key={i}
              name={icon.name}
              size={size}
              color={COLORS.green}
              style={{
                position: 'absolute',
                left: icon.x * W - size / 2,
                top: icon.y * H - size / 2,
                opacity: icon.op,
                transform: [{ rotate: `${icon.rot}deg` }],
              }}
            />
          );
        })}
      </View>

      <View
        style={[
          styles.container,
          { paddingTop: Math.max(12, insets.top * 0.3) },
        ]}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <MaterialCommunityIcons name="chevron-left" size={26} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{headerTitle}</Text>
          <View style={{ width: 36 }} />
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => router.replace(otherTabRoute)}
          >
            <Text style={styles.tabText}>{otherTabLabel}</Text>
          </TouchableOpacity>

          <View style={[styles.tab, styles.tabActive]}>
            <Text style={[styles.tabText, styles.tabTextActive]}>
              {activeTabLabel}
            </Text>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* Lista e ushtrimeve */}
          {loading ? (
            <Text style={{ marginVertical: 16 }}>Duke u ngarkuar ushtrimet...</Text>
          ) : (
            exercises.map(item => (
              <View key={item.id} style={styles.rowCard}>
                <View style={styles.rowIconWrap}>
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={44}
                    color={COLORS.green}
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.rowTitle}>{item.title}</Text>
                  <Text style={styles.rowSection}>
                    {getSectionLabel(item.section)}
                  </Text>
                </View>

                <MaterialCommunityIcons
                  name="chevron-right"
                  size={26}
                  color={COLORS.green}
                />
              </View>
            ))
          )}

          <View style={{ height: 30 }} />

          {/* Llogaritja e kalorive */}
          <View style={styles.card}>
            <Text style={styles.label}>Zgjedh çka ke ushtru sot</Text>
            <Picker
              selectedValue={selectedId}
              onValueChange={v => setSelectedId(v)}
              dropdownIconColor={COLORS.green}
            >
              {exercises.map(ex => (
                <Picker.Item key={ex.id} label={ex.title} value={ex.id} />
              ))}
            </Picker>

            <Text style={[styles.label, { marginTop: 8 }]}>Për sa minuta?</Text>
            <Picker
              selectedValue={minutes}
              onValueChange={v => setMinutes(Number(v))}
              dropdownIconColor={COLORS.green}
            >
              {[10, 20, 30, 40, 50, 60].map(m => (
                <Picker.Item key={m} label={`${m} min`} value={m} />
              ))}
            </Picker>

            <TouchableOpacity style={styles.calcBtn} onPress={calcCalories}>
              <Text style={styles.calcText}>Llogarit kaloritë</Text>
            </TouchableOpacity>

            {lastCalories !== null && (
              <Text style={styles.result}>
                {selectedExercise ? `${selectedExercise.title}: ` : ''}
                Rreth {lastCalories} kcal 🔥
              </Text>
            )}

            {totalCalories !== null && (
              <Text style={styles.total}>
                Totali i ushtrimeve sot: {totalCalories} kcal 🔥
              </Text>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.page },
  bgLayer: { ...StyleSheet.absoluteFillObject, zIndex: -1 },
  container: { flex: 1, paddingHorizontal: 16 },

  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: COLORS.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 18,
    color: COLORS.textDark,
  },

  tabs: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#d9d3bd',
    padding: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  tab: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 10 },
  tabActive: { backgroundColor: COLORS.green },
  tabText: { fontWeight: '700', letterSpacing: 0.3, color: COLORS.textDark },
  tabTextActive: { color: '#fff' },

  rowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardSoft,
    borderRadius: 16,
    padding: 14,
    elevation: 3,
    marginBottom: 10,
  },
  rowIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rowTitle: { fontSize: 17, fontWeight: '800', color: COLORS.textDark },
  rowSection: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
    fontWeight: '600',
  },

  card: {
    backgroundColor: COLORS.cardSoft,
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    elevation: 3,
  },
  label: { fontWeight: '700', color: COLORS.textDark, marginBottom: 4 },

  calcBtn: {
    backgroundColor: COLORS.green,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  calcText: { color: '#fff', fontWeight: '800' },

  result: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  total: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
  },
});
