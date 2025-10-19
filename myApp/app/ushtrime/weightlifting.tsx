
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function WeightliftingScreen() {
  const router = useRouter();
  const { width: W, height: H } = Dimensions.get('window');
  const insets = useSafeAreaInsets();

  const BG_ICONS = [
    { name: 'barbell', x: 0.18, y: 0.14, sizeMul: 0.22, op: 0.10, rot: -8 },
    { name: 'arm-flex', x: 0.80, y: 0.10, sizeMul: 0.18, op: 0.08, rot: 8 },
    { name: 'dumbbell', x: 0.50, y: 0.22, sizeMul: 0.18, op: 0.08, rot: -4 },
    { name: 'weight', x: 0.28, y: 0.38, sizeMul: 0.20, op: 0.08, rot: 6 },
    { name: 'timer-outline', x: 0.12, y: 0.55, sizeMul: 0.16, op: 0.07, rot: 5 },
  ];

  const EXERCISES = [
    { title: 'Barbell Squat', icon: 'weight-lifter' },
    { title: 'Front Squat', icon: 'weight-lifter' },
    { title: 'Deadlift', icon: 'barbell' },
    { title: 'Romanian Deadlift', icon: 'barbell' },
    { title: 'Bench Press', icon: 'dumbbell' },
    { title: 'Incline Bench Press', icon: 'dumbbell' },
    { title: 'Overhead Press', icon: 'arm-flex' },
    { title: 'Push Press', icon: 'arm-flex' },
    { title: 'Bent-Over Row', icon: 'barbell' },
    { title: 'Pull-Up', icon: 'arm-flex' },
    { title: 'Biceps Curl', icon: 'dumbbell' },
    { title: 'Triceps Dip', icon: 'arm-flex' },
    { title: 'Plank', icon: 'yoga' },
  ];

 
  const [selectedExercise, setSelectedExercise] = useState(EXERCISES[0].title);
  const [minutes, setMinutes] = useState(30);
  const [calories, setCalories] = useState<number | null>(null);

  const calcCalories = async () => {
    const total = minutes * 6; 
    setCalories(total);

    const today = new Date().toISOString().slice(0, 10);
    const key = `workout_kcal_${today}`;

    try {
      const prev = await AsyncStorage.getItem(key);
      const prevNum = prev ? Number(prev) : 0;
      const next = prevNum + total;
      await AsyncStorage.setItem(key, String(next));
      Alert.alert('U ruajt', `U shtuan ${total} kcal në totalin e ditës.`);
    } catch (e) {
      console.warn('Nuk u ruajtën kaloritë e workouts', e);
      Alert.alert('Gabim', 'S’u ruajtën kaloritë. Provo përsëri.');
    }
  };

  return (
    <SafeAreaView style={styles.safe}>

      <View style={styles.bgLayer} pointerEvents="none">
        {BG_ICONS.map((icon, i) => {
          const size = Math.round(Math.min(W, H) * icon.sizeMul);
          return (
            <MaterialCommunityIcons
              key={i}
              name={icon.name as any}
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

      <View style={[styles.container, { paddingTop: Math.max(12, insets.top * 0.3) }]}>

        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <MaterialCommunityIcons name="chevron-left" size={26} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Weightlifting</Text>
          <View style={{ width: 36 }} />
        </View>

        <View style={styles.tabs}>
          <View style={[styles.tab, styles.tabActive]}>
            <Text style={[styles.tabText, styles.tabTextActive]}>Weightlifting</Text>
          </View>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => router.replace('/ushtrime/homeworkout')}
          >
            <Text style={styles.tabText}>Home Workout</Text>
          </TouchableOpacity>
        </View>

    
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
 
          {EXERCISES.map((item, i) => (
            <View key={i} style={styles.rowCard}>
              <View style={styles.rowIconWrap}>
                <MaterialCommunityIcons name={item.icon as any} size={44} color={COLORS.green} />
              </View>
              <Text style={styles.rowTitle}>{item.title}</Text>
              <MaterialCommunityIcons name="chevron-right" size={26} color={COLORS.green} />
            </View>
          ))}

     
          <View style={{ height: 30 }} />

       
          <View style={styles.card}>
            <Text style={styles.label}>Zgjedh çka ke ushtru sot</Text>
            <Picker
              selectedValue={selectedExercise}
              onValueChange={(v) => setSelectedExercise(v)}
              dropdownIconColor={COLORS.green}
            >
              {EXERCISES.map((ex) => (
                <Picker.Item key={ex.title} label={ex.title} value={ex.title} />
              ))}
            </Picker>

            <Text style={[styles.label, { marginTop: 8 }]}>Për sa minuta?</Text>
            <Picker
              selectedValue={minutes}
              onValueChange={(v) => setMinutes(Number(v))}
              dropdownIconColor={COLORS.green}
            >
              {[10, 20, 30, 40, 50, 60].map((m) => (
                <Picker.Item key={m} label={`${m} min`} value={m} />
              ))}
            </Picker>

            <TouchableOpacity style={styles.calcBtn} onPress={calcCalories}>
              <Text style={styles.calcText}>Llogarit kaloritë</Text>
            </TouchableOpacity>

            {calories !== null && (
              <Text style={styles.result}>Ju keni harxhuar rreth {calories} kcal 🔥</Text>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const COLORS = {
  green: '#355E3B',
  page: '#F7F4E9',
  card: '#E6DFC5',
  textDark: '#2E2E2E',
  cardSoft: '#EFE8CF',
};

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
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
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
  rowTitle: { flex: 1, fontSize: 17, fontWeight: '800', color: COLORS.textDark },

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
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textDark,
  },
});


