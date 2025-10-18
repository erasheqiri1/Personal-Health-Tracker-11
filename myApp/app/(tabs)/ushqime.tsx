// app/(tabs)/(ushqime)/index.tsx  (ose app/ushqime/index.tsx nëse s'ke route group)
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

const COLORS = {
  green: '#355E3B',
  page: '#F7F4E9',
  card: '#E6DFC5',
  textDark: '#2E2E2E',
  cardSoft: '#EFE8CF',
};

export default function UshqimeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.subtitle}>Zgjidh një opsion</Text>

        {/* GRID: 2 sipër, 1 poshtë */}
        <View style={styles.grid}>
          <FoodCard
            icon="drumstick-bite"
            title="Shto Peshë"
            sub="Kalori + proteina më të larta"
            onPress={() => router.push('/plans/shto_pesh')}  // krijo /shto.tsx
          />
          <FoodCard
            icon="leaf" // ose "broccoli" nuk ekziston në FA5
            title="Humb Peshë"
            sub="Deficit kalorie, volum ushqimi"
            onPress={() => router.push('/plans/humb_pesh')}
          />
          <FoodCard
            icon="balance-scale"
            title="Mbaj Peshën"
            sub="Balanco kalori & makro"
            onPress={() => router.push('/plans/mbaj_pesh')}
            fullRow   // e vendos kartën e tretë në qendër poshtë
          />
        </View>
      </View>
      <View style={{ height: 80 }} />
    </SafeAreaView>
  );
}

function FoodCard({
  icon,
  title,
  sub,
  onPress,
  fullRow,
}: {
  icon: React.ComponentProps<typeof FontAwesome5>['name'];
  title: string;
  sub: string;
  onPress: () => void;
  fullRow?: boolean;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.card, fullRow ? styles.cardFull : undefined]}
      onPress={onPress}
    >
      <View style={styles.iconWrap}>
        <FontAwesome5 name={icon} size={28} color={COLORS.green} />
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSub}>{sub}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.page },
  container: { flex: 1, paddingHorizontal: 18, paddingTop: 16 },
  subtitle: {
    textAlign: 'center',
    color: COLORS.textDark,
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 16,
  },

  // --- GRID ---
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignContent: 'space-between',
  },

  // --- CARD stile si në foto por me ngjyrat e tua ---
  card: {
    backgroundColor: COLORS.card,
    width: '48%',         // të gjitha të njëjta
    height: '47%',        // mbush faqen me dy rreshta e një të tretë poshtë
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  cardFull: {
    width: '48%',
  },
  cardSub: {
    fontSize: 14,
    color: COLORS.textDark,
    opacity: 0.8,
    textAlign: 'center',
    marginTop: 4,
  },

  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: COLORS.cardSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    color: COLORS.green,
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 4,
  },

});

// import React from 'react';
// import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { useRouter } from 'expo-router';
// import { FontAwesome5 } from '@expo/vector-icons';

// const COLORS = {
//   green: '#355E3B',
//   page: '#F7F4E9',
//   card: '#E6DFC5',
//   textDark: '#2E2E2E',
//   cardSoft: '#EFE8CF',
// };

// export default function UshqimeScreen() {
//   const router = useRouter();

//   return (
//     <SafeAreaView style={styles.safe}>
//       <View style={styles.container}>
//         <Text style={styles.subtitle}>Zgjidh një opsion</Text>

//         <View style={styles.grid}>
//           <FoodCard
//             icon="drumstick-bite"
//             title="Shto Peshë"
//             sub="Kalori + proteina më të larta"
//             onPress={() => router.push('/(tabs)/shto')}
//           />
//           <FoodCard
//             icon="leaf"
//             title="Humb Peshë"
//             sub="Deficit kalorie, volum ushqimi"
//             onPress={() => router.push('/(tabs)/humb')}
//           />
//           <FoodCard
//             icon="balance-scale"
//             title="Mbaj Peshën"
//             sub="Balanco kalori & makro"
//             onPress={() => router.push('/(tabs)/mbaj')}
//             fullRow
//           />
//         </View>
//       </View>
//       <View style={{ height: 80 }} />
//     </SafeAreaView>
//   );
// }

// function FoodCard({ icon, title, sub, onPress, fullRow }) {
//   return (
//     <TouchableOpacity
//       activeOpacity={0.9}
//       style={[styles.card, fullRow ? styles.cardFull : undefined]}
//       onPress={onPress}
//     >
//       <View style={styles.iconWrap}>
//         <FontAwesome5 name={icon} size={28} color={COLORS.green} />
//       </View>
//       <Text style={styles.cardTitle}>{title}</Text>
//       <Text style={styles.cardSub}>{sub}</Text>
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   safe: { flex: 1, backgroundColor: COLORS.page },
//   container: { flex: 1, paddingHorizontal: 18, paddingTop: 16 },
//   subtitle: {
//     textAlign: 'center',
//     color: COLORS.textDark,
//     fontSize: 16,
//     fontWeight: '600',
//     marginTop: 4,
//     marginBottom: 16,
//   },
//   grid: {
//     flex: 1,
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//     alignContent: 'space-between',
//   },
//   card: {
//     backgroundColor: COLORS.card,
//     width: '48%',
//     height: '47%',
//     borderRadius: 18,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#000',
//     shadowOpacity: 0.08,
//     shadowRadius: 6,
//     shadowOffset: { width: 0, height: 3 },
//     elevation: 2,
//   },
//   cardFull: { width: '48%' },
//   cardSub: {
//     fontSize: 14,
//     color: COLORS.textDark,
//     opacity: 0.8,
//     textAlign: 'center',
//     marginTop: 4,
//   },
//   iconWrap: {
//     width: 56,
//     height: 56,
//     borderRadius: 16,
//     backgroundColor: COLORS.cardSoft,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 10,
//   },
//   cardTitle: {
//     color: COLORS.green,
//     fontSize: 18,
//     fontWeight: '800',
//     textAlign: 'center',
//     marginBottom: 4,
//   },
// });
