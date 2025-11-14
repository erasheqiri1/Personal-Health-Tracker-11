
// // // import React, { useState } from 'react';
// // // import {
// // //   Alert,
// // //   Dimensions,
// // //   ScrollView,
// // //   StyleSheet,
// // //   Text,
// // //   TouchableOpacity,
// // //   View,
// // // } from 'react-native';
// // // import { SafeAreaView } from 'react-native-safe-area-context';

// // // import { MaterialCommunityIcons } from '@expo/vector-icons';
// // // import AsyncStorage from '@react-native-async-storage/async-storage';
// // // import { Picker } from '@react-native-picker/picker';
// // // import { useRouter } from 'expo-router';
// // // import { useSafeAreaInsets } from 'react-native-safe-area-context';

// // // export default function HomeWorkoutScreen() {
// // //   const router = useRouter();
// // //   const { width: W, height: H } = Dimensions.get('window');
// // //   const insets = useSafeAreaInsets();

// // //   const BG_ICONS = [
// // //     { name: 'arm-flex', x: 0.18, y: 0.12, sizeMul: 0.22, op: 0.10, rot: -8 },
// // //     { name: 'yoga', x: 0.80, y: 0.10, sizeMul: 0.20, op: 0.08, rot: 8 },
// // //     { name: 'heart-pulse', x: 0.52, y: 0.25, sizeMul: 0.16, op: 0.08, rot: -4 },
// // //     { name: 'timer-outline', x: 0.30, y: 0.38, sizeMul: 0.20, op: 0.08, rot: 6 },
// // //     { name: 'run-fast', x: 0.12, y: 0.52, sizeMul: 0.18, op: 0.07, rot: 5 },
// // //     { name: 'jump-rope', x: 0.50, y: 0.55, sizeMul: 0.20, op: 0.07, rot: -8 },
// // //   ];

// // //   const EXERCISES = [
// // //     { title: 'Push-ups', icon: 'arm-flex' },
// // //     { title: 'Sit-ups', icon: 'ab-testing' },
// // //     { title: 'Squats', icon: 'human-handsup' },
// // //     { title: 'Lunges', icon: 'walk' },
// // //     { title: 'Plank', icon: 'yoga' },
// // //     { title: 'Mountain Climbers', icon: 'run-fast' },
// // //     { title: 'Jumping Jacks', icon: 'run' },
// // //     { title: 'Burpees', icon: 'human-handsup' },
// // //     { title: 'High Knees', icon: 'run-fast' },
// // //     { title: 'Crunches', icon: 'ab-testing' },
// // //     { title: 'Leg Raises', icon: 'human-handsup' },
// // //     { title: 'Glute Bridge', icon: 'yoga' },
// // //     { title: 'Side Plank', icon: 'yoga' },
// // //     { title: 'Superman', icon: 'human-handsup' },
// // //     { title: 'Wall Sit', icon: 'human-male' },
// // //     { title: 'Triceps Dips', icon: 'arm-flex' },
// // //     { title: 'Calf Raises', icon: 'shoe-sneaker' },
// // //     { title: 'Flutter Kicks', icon: 'yoga' },
// // //     { title: 'Bicycle Crunches', icon: 'bike' },
// // //     { title: 'Shadow Boxing', icon: 'boxing-glove' },
// // //   ];

// // //   const [selectedExercise, setSelectedExercise] = useState(EXERCISES[0].title);
// // //   const [minutes, setMinutes] = useState(20);
// // //   const [calories, setCalories] = useState<number | null>(null);

// // //   const calcCalories = async () => {
// // //     const total = minutes * 8;
// // //     setCalories(total);

// // //     const today = new Date().toISOString().slice(0, 10);
// // //     const key = `workout_kcal_${today}`;

// // //     try {
// // //       const prev = await AsyncStorage.getItem(key);
// // //       const prevNum = prev ? Number(prev) : 0;
// // //       await AsyncStorage.setItem(key, String(prevNum + total));
// // //       Alert.alert('OK', `U shtuan ${total} kcal për sot.`);
// // //     } catch (e) {
// // //       Alert.alert('Gabim', 'S’u ruajtën kaloritë.');
// // //     }
// // //   };

// // //   return (
// // //     <SafeAreaView style={styles.safe}>
// // //       <View style={styles.bgLayer} pointerEvents="none">
// // //         {BG_ICONS.map((icon, i) => {
// // //           const size = Math.round(Math.min(W, H) * icon.sizeMul);
// // //           return (
// // //             <MaterialCommunityIcons
// // //               key={i}
// // //               name={icon.name as any}
// // //               size={size}
// // //               color={COLORS.green}
// // //               style={{
// // //                 position: 'absolute',
// // //                 left: icon.x * W - size / 2,
// // //                 top: icon.y * H - size / 2,
// // //                 opacity: icon.op,
// // //                 transform: [{ rotate: `${icon.rot}deg` }],
// // //               }}
// // //             />
// // //           );
// // //         })}
// // //       </View>

// // //       <View style={[styles.container, { paddingTop: Math.max(12, insets.top * 0.3) }]}>
// // //         <View style={styles.headerRow}>
// // //           <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
// // //             <MaterialCommunityIcons name="chevron-left" size={26} color="#fff" />
// // //           </TouchableOpacity>
// // //           <Text style={styles.headerTitle}>Home Workout</Text>
// // //           <View style={{ width: 36 }} />
// // //         </View>

// // //         <View style={styles.tabs}>
// // //           <TouchableOpacity style={styles.tab} onPress={() => router.replace('/ushtrime/weightlifting')}>
// // //             <Text style={styles.tabText}>Weightlifting</Text>
// // //           </TouchableOpacity>
// // //           <View style={[styles.tab, styles.tabActive]}>
// // //             <Text style={[styles.tabText, styles.tabTextActive]}>Home Workout</Text>
// // //           </View>
// // //         </View>

// // //         <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
// // //           {EXERCISES.map((item, i) => (
// // //             <View key={i} style={styles.rowCard}>
// // //               <View style={styles.rowIconWrap}>
// // //                 <MaterialCommunityIcons name={item.icon as any} size={44} color={COLORS.green} />
// // //               </View>
// // //               <Text style={styles.rowTitle}>{item.title}</Text>
// // //               <MaterialCommunityIcons name="chevron-right" size={26} color={COLORS.green} />
// // //             </View>
// // //           ))}

// // //           <View style={{ height: 30 }} />

// // //           <View style={styles.card}>
// // //             <Text style={styles.label}>Zgjedh çka ke ushtru sot</Text>
// // //             <Picker selectedValue={selectedExercise} onValueChange={(v) => setSelectedExercise(v)} dropdownIconColor={COLORS.green}>
// // //               {EXERCISES.map((ex) => (<Picker.Item key={ex.title} label={ex.title} value={ex.title} />))}
// // //             </Picker>

// // //             <Text style={[styles.label, { marginTop: 8 }]}>Për sa minuta?</Text>
// // //             <Picker selectedValue={minutes} onValueChange={(v) => setMinutes(Number(v))} dropdownIconColor={COLORS.green}>
// // //               {[10, 20, 30, 40, 50, 60].map((m) => (<Picker.Item key={m} label={`${m} min`} value={m} />))}
// // //             </Picker>

// // //             <TouchableOpacity style={styles.calcBtn} onPress={calcCalories}>
// // //               <Text style={styles.calcText}>Llogarit kaloritë</Text>
// // //             </TouchableOpacity>

// // //             {calories !== null && <Text style={styles.result}>Rreth {calories} kcal 🔥</Text>}
// // //           </View>
// // //         </ScrollView>
// // //       </View>
// // //     </SafeAreaView>
// // //   );
// // // }

// // // const COLORS = { green: '#355E3B', page: '#F7F4E9', card: '#E6DFC5', textDark: '#2E2E2E', cardSoft: '#EFE8CF' };

// // // const styles = StyleSheet.create({
// // //   safe: { flex: 1, backgroundColor: COLORS.page },
// // //   bgLayer: { ...StyleSheet.absoluteFillObject, zIndex: -1 },
// // //   container: { flex: 1, paddingHorizontal: 16 },
// // //   headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
// // //   backBtn: { width: 36, height: 36, borderRadius: 8, backgroundColor: COLORS.green, alignItems: 'center', justifyContent: 'center' },
// // //   headerTitle: { flex: 1, textAlign: 'center', fontWeight: '900', fontSize: 18, color: COLORS.textDark },
// // //   tabs: { flexDirection: 'row', alignSelf: 'center', backgroundColor: '#d9d3bd', padding: 4, borderRadius: 12, marginBottom: 12 },
// // //   tab: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 10 },
// // //   tabActive: { backgroundColor: COLORS.green },
// // //   tabText: { fontWeight: '700', letterSpacing: 0.3, color: COLORS.textDark },
// // //   tabTextActive: { color: '#fff' },
// // //   rowCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.cardSoft, borderRadius: 16, padding: 14, elevation: 3, marginBottom: 10 },
// // //   rowIconWrap: { width: 56, height: 56, borderRadius: 12, backgroundColor: COLORS.card, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
// // //   rowTitle: { flex: 1, fontSize: 17, fontWeight: '800', color: COLORS.textDark },
// // //   card: { backgroundColor: COLORS.cardSoft, borderRadius: 16, padding: 14, marginBottom: 14, elevation: 3 },
// // //   label: { fontWeight: '700', color: COLORS.textDark, marginBottom: 4 },
// // //   calcBtn: { backgroundColor: COLORS.green, paddingVertical: 10, borderRadius: 10, alignItems: 'center', marginTop: 10 },
// // //   calcText: { color: '#fff', fontWeight: '800' },
// // //   result: { marginTop: 10, fontSize: 16, fontWeight: '800', color: COLORS.textDark },
// // // });
// // import { MaterialCommunityIcons } from '@expo/vector-icons';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import { Picker } from '@react-native-picker/picker';
// // import { useRouter } from 'expo-router';
// // import { useEffect, useState } from 'react';
// // import {
// //   Alert,
// //   Dimensions,
// //   ScrollView,
// //   StyleSheet,
// //   Text,
// //   TouchableOpacity,
// //   View,
// // } from 'react-native';
// // import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// // import { collection, onSnapshot, query, where } from 'firebase/firestore';
// // import { db } from '../../firebaseConfig'; // <-- rregullo nëse path-i s'është ky

// // const COLORS = {
// //   green: '#355E3B',
// //   page: '#F7F4E9',
// //   card: '#E6DFC5',
// //   textDark: '#2E2E2E',
// //   cardSoft: '#EFE8CF',
// // };

// // const BG_ICONS = [
// //   { name: 'arm-flex', x: 0.18, y: 0.12, sizeMul: 0.22, op: 0.10, rot: -8 },
// //   { name: 'yoga', x: 0.80, y: 0.10, sizeMul: 0.20, op: 0.08, rot: 8 },
// //   { name: 'heart-pulse', x: 0.52, y: 0.25, sizeMul: 0.16, op: 0.08, rot: -4 },
// //   { name: 'timer-outline', x: 0.30, y: 0.38, sizeMul: 0.20, op: 0.08, rot: 6 },
// //   { name: 'run-fast', x: 0.12, y: 0.52, sizeMul: 0.18, op: 0.07, rot: 5 },
// //   { name: 'jump-rope', x: 0.50, y: 0.55, sizeMul: 0.20, op: 0.07, rot: -8 },
// // ];

// // export default function HomeWorkoutScreen() {
// //   const router = useRouter();
// //   const { width: W, height: H } = Dimensions.get('window');
// //   const insets = useSafeAreaInsets();

// //   // Ushtrimet nga Firestore
// //   const [exercises, setExercises] = useState([]);        // [{id, title, calories, icon?}]
// //   const [selectedId, setSelectedId] = useState(null);    // id i ushtrimit
// //   const [minutes, setMinutes] = useState(20);
// //   const [calories, setCalories] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   // Leximi i ushtrimeve që admini i ka futur (plan = "homeworkout")
// //   useEffect(() => {
// //     setLoading(true);
// //     const q = query(
// //       collection(db, 'workouts'),
// //       where('plan', '==', 'homeworkout')
// //     );

// //     const unsub = onSnapshot(
// //       q,
// //       snapshot => {
// //         const list = snapshot.docs.map(d => ({
// //           id: d.id,
// //           ...d.data(),
// //         }));
// //         setExercises(list);
// //         if (!selectedId && list.length > 0) {
// //           setSelectedId(list[0].id);
// //         }
// //         setLoading(false);
// //       },
// //       err => {
// //         console.log('Firestore error:', err);
// //         Alert.alert('Gabim', 'S’u lexuan ushtrimet.');
// //         setLoading(false);
// //       }
// //     );

// //     return () => unsub();
// //   }, []);

// //   const calcCalories = async () => {
// //     if (!selectedId) {
// //       Alert.alert('Kujdes', 'Zgjedh një ushtrim.');
// //       return;
// //     }

// //     const ex = exercises.find(e => e.id === selectedId);
// //     if (!ex) {
// //       Alert.alert('Gabim', 'Ushtrimi nuk u gjet.');
// //       return;
// //     }

// //     // supozojmë që admini ka futur "calories" = kalori për 30 min
// //     const base = Number(ex.calories) || 0;
// //     if (!base) {
// //       Alert.alert('Gabim', 'Ky ushtrim nuk ka kalori të caktuara nga admini.');
// //       return;
// //     }

// //     const total = Math.round((base * minutes) / 30); // shkallëzim sipas minutave
// //     setCalories(total);

// //     const today = new Date().toISOString().slice(0, 10);
// //     const key = `workout_kcal_${today}`;

// //     try {
// //       const prev = await AsyncStorage.getItem(key);
// //       const prevNum = prev ? Number(prev) : 0;
// //       await AsyncStorage.setItem(key, String(prevNum + total));
// //       Alert.alert('OK', `U shtuan ${total} kcal për sot.`);
// //     } catch (e) {
// //       console.log(e);
// //       Alert.alert('Gabim', 'S’u ruajtën kaloritë.');
// //     }
// //   };

// //   const selectedExercise = exercises.find(e => e.id === selectedId);

// //   return (
// //     <SafeAreaView style={styles.safe}>
// //       {/* ikonat dekorative në sfond */}
// //       <View style={styles.bgLayer} pointerEvents="none">
// //         {BG_ICONS.map((icon, i) => {
// //           const size = Math.round(Math.min(W, H) * icon.sizeMul);
// //           return (
// //             <MaterialCommunityIcons
// //               key={i}
// //               name={icon.name}
// //               size={size}
// //               color={COLORS.green}
// //               style={{
// //                 position: 'absolute',
// //                 left: icon.x * W - size / 2,
// //                 top: icon.y * H - size / 2,
// //                 opacity: icon.op,
// //                 transform: [{ rotate: `${icon.rot}deg` }],
// //               }}
// //             />
// //           );
// //         })}
// //       </View>

// //       <View style={[styles.container, { paddingTop: Math.max(12, insets.top * 0.3) }]}>
// //         {/* header */}
// //         <View style={styles.headerRow}>
// //           <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
// //             <MaterialCommunityIcons name="chevron-left" size={26} color="#fff" />
// //           </TouchableOpacity>
// //           <Text style={styles.headerTitle}>Home Workout</Text>
// //           <View style={{ width: 36 }} />
// //         </View>

// //         {/* tabs */}
// //         <View style={styles.tabs}>
// //           <TouchableOpacity
// //             style={styles.tab}
// //             onPress={() => router.replace('/ushtrime/weightlifting')}
// //           >
// //             <Text style={styles.tabText}>Weightlifting</Text>
// //           </TouchableOpacity>
// //           <View style={[styles.tab, styles.tabActive]}>
// //             <Text style={[styles.tabText, styles.tabTextActive]}>Home Workout</Text>
// //           </View>
// //         </View>

// //         <ScrollView
// //           showsVerticalScrollIndicator={false}
// //           contentContainerStyle={{ paddingBottom: 40 }}
// //         >
// //           {/* lista e ushtrimeve nga Firestore */}
// //           {loading ? (
// //             <Text style={{ marginVertical: 16 }}>Duke u ngarkuar ushtrimet...</Text>
// //           ) : (
// //             exercises.map(item => (
// //               <View key={item.id} style={styles.rowCard}>
// //                 <View style={styles.rowIconWrap}>
// //                   <MaterialCommunityIcons
// //                     name={(item.icon || 'arm-flex')}
// //                     size={44}
// //                     color={COLORS.green}
// //                   />
// //                 </View>
// //                 <Text style={styles.rowTitle}>{item.title}</Text>
// //                 <MaterialCommunityIcons name="chevron-right" size={26} color={COLORS.green} />
// //               </View>
// //             ))
// //           )}

// //           <View style={{ height: 30 }} />

// //           {/* karta për llogaritjen e kalorive */}
// //           <View style={styles.card}>
// //             <Text style={styles.label}>Zgjedh çka ke ushtru sot</Text>
// //             <Picker
// //               selectedValue={selectedId}
// //               onValueChange={v => setSelectedId(v)}
// //               dropdownIconColor={COLORS.green}
// //             >
// //               {exercises.map(ex => (
// //                 <Picker.Item key={ex.id} label={ex.title} value={ex.id} />
// //               ))}
// //             </Picker>

// //             <Text style={[styles.label, { marginTop: 8 }]}>Për sa minuta?</Text>
// //             <Picker
// //               selectedValue={minutes}
// //               onValueChange={v => setMinutes(Number(v))}
// //               dropdownIconColor={COLORS.green}
// //             >
// //               {[10, 20, 30, 40, 50, 60].map(m => (
// //                 <Picker.Item key={m} label={`${m} min`} value={m} />
// //               ))}
// //             </Picker>

// //             <TouchableOpacity style={styles.calcBtn} onPress={calcCalories}>
// //               <Text style={styles.calcText}>Llogarit kaloritë</Text>
// //             </TouchableOpacity>

// //             {calories !== null && (
// //               <Text style={styles.result}>
// //                 {selectedExercise ? `${selectedExercise.title}: ` : ''}
// //                 Rreth {calories} kcal 🔥
// //               </Text>
// //             )}
// //           </View>
// //         </ScrollView>
// //       </View>
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   safe: { flex: 1, backgroundColor: COLORS.page },
// //   bgLayer: { ...StyleSheet.absoluteFillObject, zIndex: -1 },
// //   container: { flex: 1, paddingHorizontal: 16 },
// //   headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
// //   backBtn: {
// //     width: 36,
// //     height: 36,
// //     borderRadius: 8,
// //     backgroundColor: COLORS.green,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   headerTitle: {
// //     flex: 1,
// //     textAlign: 'center',
// //     fontWeight: '900',
// //     fontSize: 18,
// //     color: COLORS.textDark,
// //   },
// //   tabs: {
// //     flexDirection: 'row',
// //     alignSelf: 'center',
// //     backgroundColor: '#d9d3bd',
// //     padding: 4,
// //     borderRadius: 12,
// //     marginBottom: 12,
// //   },
// //   tab: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 10 },
// //   tabActive: { backgroundColor: COLORS.green },
// //   tabText: { fontWeight: '700', letterSpacing: 0.3, color: COLORS.textDark },
// //   tabTextActive: { color: '#fff' },

// //   rowCard: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     backgroundColor: COLORS.cardSoft,
// //     borderRadius: 16,
// //     padding: 14,
// //     elevation: 3,
// //     marginBottom: 10,
// //   },
// //   rowIconWrap: {
// //     width: 56,
// //     height: 56,
// //     borderRadius: 12,
// //     backgroundColor: COLORS.card,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     marginRight: 12,
// //   },
// //   rowTitle: { flex: 1, fontSize: 17, fontWeight: '800', color: COLORS.textDark },

// //   card: {
// //     backgroundColor: COLORS.cardSoft,
// //     borderRadius: 16,
// //     padding: 14,
// //     marginBottom: 14,
// //     elevation: 3,
// //   },
// //   label: { fontWeight: '700', color: COLORS.textDark, marginBottom: 4 },
// //   calcBtn: {
// //     backgroundColor: COLORS.green,
// //     paddingVertical: 10,
// //     borderRadius: 10,
// //     alignItems: 'center',
// //     marginTop: 10,
// //   },
// //   calcText: { color: '#fff', fontWeight: '800' },
// //   result: { marginTop: 10, fontSize: 16, fontWeight: '800', color: COLORS.textDark },
// // });
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Picker } from '@react-native-picker/picker';
// import { useRouter } from 'expo-router';
// import { useEffect, useState } from 'react';
// import {
//   Alert,
//   Dimensions,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// import { collection, onSnapshot, query, where } from 'firebase/firestore';
// import { db } from '../../firebaseConfig';

// const COLORS = {
//   green: '#355E3B',
//   page: '#F7F4E9',
//   card: '#E6DFC5',
//   textDark: '#2E2E2E',
//   cardSoft: '#EFE8CF',
// };

// const BG_ICONS = [
//   { name: 'arm-flex', x: 0.18, y: 0.12, sizeMul: 0.22, op: 0.10, rot: -8 },
//   { name: 'yoga', x: 0.80, y: 0.10, sizeMul: 0.20, op: 0.08, rot: 8 },
//   { name: 'heart-pulse', x: 0.52, y: 0.25, sizeMul: 0.16, op: 0.08, rot: -4 },
//   { name: 'timer-outline', x: 0.30, y: 0.38, sizeMul: 0.20, op: 0.08, rot: 6 },
//   { name: 'run-fast', x: 0.12, y: 0.52, sizeMul: 0.18, op: 0.07, rot: 5 },
//   { name: 'jump-rope', x: 0.50, y: 0.55, sizeMul: 0.20, op: 0.07, rot: -8 },
// ];

// export default function HomeWorkoutScreen() {
//   const router = useRouter();
//   const { width: W, height: H } = Dimensions.get('window');
//   const insets = useSafeAreaInsets();

//   const [exercises, setExercises] = useState([]);
//   const [selectedId, setSelectedId] = useState(null);
//   const [minutes, setMinutes] = useState(20);
//   const [calories, setCalories] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Helper për me shfaq tekstin e seksionit
//   const getSectionLabel = (section) => {
//     if (section === 'upper') return 'Trup i sipërm';
//     if (section === 'lower') return 'Trup i poshtëm';
//     if (section === 'full') return 'Gjithë trupi';
//     return '';
//   };

//   // Leximi i ushtrimeve të adminit
//   useEffect(() => {
//     setLoading(true);
//     const q = query(
//       collection(db, 'workouts'),
//       where('plan', '==', 'homeworkout')
//     );

//     const unsub = onSnapshot(
//       q,
//       snapshot => {
//         const list = snapshot.docs.map(d => ({
//           id: d.id,
//           ...d.data(),
//         }));
//         setExercises(list);
//         if (!selectedId && list.length > 0) {
//           setSelectedId(list[0].id);
//         }
//         setLoading(false);
//       },
//       err => {
//         console.log('Firestore error:', err);
//         Alert.alert('Gabim', 'S’u lexuan ushtrimet.');
//         setLoading(false);
//       }
//     );

//     return () => unsub();
//   }, []);

//   // Llogaritja e kalorive
//   const calcCalories = async () => {
//     if (!selectedId) {
//       Alert.alert('Kujdes', 'Zgjedh një ushtrim.');
//       return;
//     }

//     const ex = exercises.find(e => e.id === selectedId);
//     if (!ex) {
//       Alert.alert('Gabim', 'Ushtrimi nuk u gjet.');
//       return;
//     }

//     const base = Number(ex.calories) || 0;

//     const total = Math.round((base * minutes) / 30);
//     setCalories(total);

//     const today = new Date().toISOString().slice(0, 10);
//     const key = `workout_kcal_${today}`;

//     try {
//       const prev = await AsyncStorage.getItem(key);
//       const prevNum = prev ? Number(prev) : 0;
//       await AsyncStorage.setItem(key, String(prevNum + total));
//       Alert.alert('OK', `U shtuan ${total} kcal për sot.`);
//     } catch (e) {
//       Alert.alert('Gabim', 'S’u ruajtën kaloritë.');
//     }
//   };

//   const selectedExercise = exercises.find(e => e.id === selectedId);

//   return (
//     <SafeAreaView style={styles.safe}>
//       {/* Ikonat dekorative */}
//       <View style={styles.bgLayer} pointerEvents="none">
//         {BG_ICONS.map((icon, i) => {
//           const size = Math.round(Math.min(W, H) * icon.sizeMul);
//           return (
//             <MaterialCommunityIcons
//               key={i}
//               name={icon.name}
//               size={size}
//               color={COLORS.green}
//               style={{
//                 position: 'absolute',
//                 left: icon.x * W - size / 2,
//                 top: icon.y * H - size / 2,
//                 opacity: icon.op,
//                 transform: [{ rotate: `${icon.rot}deg` }],
//               }}
//             />
//           );
//         })}
//       </View>

//       <View style={[styles.container, { paddingTop: Math.max(12, insets.top * 0.3) }]}>
        
//         {/* Header */}
//         <View style={styles.headerRow}>
//           <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
//             <MaterialCommunityIcons name="chevron-left" size={26} color="#fff" />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Home Workout</Text>
//           <View style={{ width: 36 }} />
//         </View>

//         {/* Tabs */}
//         <View style={styles.tabs}>
//           <TouchableOpacity
//             style={styles.tab}
//             onPress={() => router.replace('/ushtrime/weightlifting')}
//           >
//             <Text style={styles.tabText}>Weightlifting</Text>
//           </TouchableOpacity>
//           <View style={[styles.tab, styles.tabActive]}>
//             <Text style={[styles.tabText, styles.tabTextActive]}>Home Workout</Text>
//           </View>
//         </View>

//         <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
          
//           {/* Ushtrimet */}
//           {loading ? (
//             <Text style={{ marginVertical: 16 }}>Duke u ngarkuar ushtrimet...</Text>
//           ) : (
//             exercises.map(item => (
//               <View key={item.id} style={styles.rowCard}>
//                 <View style={styles.rowIconWrap}>
//                   <MaterialCommunityIcons
//                     name={item.icon || 'arm-flex'}
//                     size={44}
//                     color={COLORS.green}
//                   />
//                 </View>

//                 <View style={{ flex: 1 }}>
//                   <Text style={styles.rowTitle}>{item.title}</Text>
                  
//                   {/* KËTU SHFAQET PJESA E TRUPIT */}
//                   <Text style={styles.rowSection}>
//                     {getSectionLabel(item.section)}
//                   </Text>
//                 </View>

//                 <MaterialCommunityIcons name="chevron-right" size={26} color={COLORS.green} />
//               </View>
//             ))
//           )}

//           <View style={{ height: 30 }} />

//           {/* Llogaritja e kalorive */}
//           <View style={styles.card}>
//             <Text style={styles.label}>Zgjedh çka ke ushtru sot</Text>
//             <Picker
//               selectedValue={selectedId}
//               onValueChange={v => setSelectedId(v)}
//               dropdownIconColor={COLORS.green}
//             >
//               {exercises.map(ex => (
//                 <Picker.Item key={ex.id} label={ex.title} value={ex.id} />
//               ))}
//             </Picker>

//             <Text style={[styles.label, { marginTop: 8 }]}>Për sa minuta?</Text>
//             <Picker
//               selectedValue={minutes}
//               onValueChange={v => setMinutes(Number(v))}
//               dropdownIconColor={COLORS.green}
//             >
//               {[10, 20, 30, 40, 50, 60].map(m => (
//                 <Picker.Item key={m} label={`${m} min`} value={m} />
//               ))}
//             </Picker>

//             <TouchableOpacity style={styles.calcBtn} onPress={calcCalories}>
//               <Text style={styles.calcText}>Llogarit kaloritë</Text>
//             </TouchableOpacity>

//             {calories !== null && (
//               <Text style={styles.result}>
//                 {selectedExercise ? `${selectedExercise.title}: ` : ''}
//                 Rreth {calories} kcal 🔥
//               </Text>
//             )}
//           </View>
//         </ScrollView>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safe: { flex: 1, backgroundColor: COLORS.page },
//   bgLayer: { ...StyleSheet.absoluteFillObject, zIndex: -1 },
//   container: { flex: 1, paddingHorizontal: 16 },
  
//   headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
//   backBtn: {
//     width: 36, height: 36, borderRadius: 8,
//     backgroundColor: COLORS.green,
//     alignItems: 'center', justifyContent: 'center',
//   },
//   headerTitle: {
//     flex: 1, textAlign: 'center',
//     fontWeight: '900', fontSize: 18,
//     color: COLORS.textDark,
//   },

//   tabs: {
//     flexDirection: 'row',
//     alignSelf: 'center',
//     backgroundColor: '#d9d3bd',
//     padding: 4,
//     borderRadius: 12,
//     marginBottom: 12,
//   },
//   tab: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 10 },
//   tabActive: { backgroundColor: COLORS.green },
//   tabText: { fontWeight: '700', letterSpacing: 0.3, color: COLORS.textDark },
//   tabTextActive: { color: '#fff' },

//   rowCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: COLORS.cardSoft,
//     borderRadius: 16,
//     padding: 14,
//     elevation: 3,
//     marginBottom: 10,
//   },
//   rowIconWrap: {
//     width: 56, height: 56, borderRadius: 12,
//     backgroundColor: COLORS.card,
//     alignItems: 'center', justifyContent: 'center',
//     marginRight: 12,
//   },

//   rowTitle: { fontSize: 17, fontWeight: '800', color: COLORS.textDark },
//   rowSection: {
//     fontSize: 13,
//     color: '#666',
//     marginTop: 2,
//     fontWeight: '600',
//   },

//   card: {
//     backgroundColor: COLORS.cardSoft,
//     borderRadius: 16,
//     padding: 14,
//     marginBottom: 14,
//     elevation: 3,
//   },
//   label: { fontWeight: '700', color: COLORS.textDark, marginBottom: 4 },

//   calcBtn: {
//     backgroundColor: COLORS.green,
//     paddingVertical: 10,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   calcText: { color: '#fff', fontWeight: '800' },

//   result: { marginTop: 10, fontSize: 16, fontWeight: '800', color: COLORS.textDark },
// });
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

import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const COLORS = {
  green: '#355E3B',
  page: '#F7F4E9',
  card: '#E6DFC5',
  textDark: '#2E2E2E',
  cardSoft: '#EFE8CF',
};

const BG_ICONS = [
  { name: 'arm-flex', x: 0.18, y: 0.12, sizeMul: 0.22, op: 0.10, rot: -8 },
  { name: 'yoga', x: 0.80, y: 0.10, sizeMul: 0.20, op: 0.08, rot: 8 },
  { name: 'heart-pulse', x: 0.52, y: 0.25, sizeMul: 0.16, op: 0.08, rot: -4 },
  { name: 'timer-outline', x: 0.30, y: 0.38, sizeMul: 0.20, op: 0.08, rot: 6 },
  { name: 'run-fast', x: 0.12, y: 0.52, sizeMul: 0.18, op: 0.07, rot: 5 },
  { name: 'jump-rope', x: 0.50, y: 0.55, sizeMul: 0.20, op: 0.07, rot: -8 },
];

export default function HomeWorkoutScreen() {
  const router = useRouter();
  const { width: W, height: H } = Dimensions.get('window');
  const insets = useSafeAreaInsets();

  const [exercises, setExercises] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [minutes, setMinutes] = useState(20);
  const [lastCalories, setLastCalories] = useState(null);      // kaloritë e ushtrimit të fundit
  const [totalCalories, setTotalCalories] = useState(null);    // totali për sot
  const [loading, setLoading] = useState(true);

  const getSectionLabel = (section) => {
    if (section === 'upper') return 'Trup i sipërm';
    if (section === 'lower') return 'Trup i poshtëm';
    if (section === 'full') return 'Gjithë trupi';
    return '';
  };

  // Leximi i ushtrimeve të adminit
  useEffect(() => {
    setLoading(true);
    const q = query(
      collection(db, 'workouts'),
      where('plan', '==', 'homeworkout')
    );

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
  }, []);

  // Lexo totalin e kalorive për sot kur hapet ekrani
  useEffect(() => {
    const loadTotal = async () => {
      const today = new Date().toISOString().slice(0, 10);
      const key = `workout_kcal_${today}`;
      const value = await AsyncStorage.getItem(key);
      if (value) {
        setTotalCalories(Number(value));
      } else {
        setTotalCalories(0);
      }
    };

    loadTotal();
  }, []);

  // Llogaritja e kalorive
  const calcCalories = async () => {
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
    const key = `workout_kcal_${today}`;

    try {
      const prev = await AsyncStorage.getItem(key);
      const prevNum = prev ? Number(prev) : 0;
      const newTotal = prevNum + total;

      await AsyncStorage.setItem(key, String(newTotal));
      setTotalCalories(newTotal);

      Alert.alert('OK', `U shtuan ${total} kcal për sot.`);
    } catch (e) {
      Alert.alert('Gabim', 'S’u ruajtën kaloritë.');
    }
  };

  const selectedExercise = exercises.find(e => e.id === selectedId);

  return (
    <SafeAreaView style={styles.safe}>
      {/* Ikonat dekorative */}
      <View style={styles.bgLayer} pointerEvents="none">
        {BG_ICONS.map((icon, i) => {
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

      <View style={[styles.container, { paddingTop: Math.max(12, insets.top * 0.3) }]}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <MaterialCommunityIcons name="chevron-left" size={26} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Home Workout</Text>
          <View style={{ width: 36 }} />
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => router.replace('/ushtrime/weightlifting')}
          >
            <Text style={styles.tabText}>Weightlifting</Text>
          </TouchableOpacity>
          <View style={[styles.tab, styles.tabActive]}>
            <Text style={[styles.tabText, styles.tabTextActive]}>Home Workout</Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
          {/* Ushtrimet */}
          {loading ? (
            <Text style={{ marginVertical: 16 }}>Duke u ngarkuar ushtrimet...</Text>
          ) : (
            exercises.map(item => (
              <View key={item.id} style={styles.rowCard}>
               <View style={styles.rowIconWrap}>
  <MaterialCommunityIcons
    name={item.icon}   // vetëm prej Firestore, pa default
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

                <MaterialCommunityIcons name="chevron-right" size={26} color={COLORS.green} />
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


