import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function UshtrimeScreen() {
  const router = useRouter();
  const { width: W, height: H } = Dimensions.get('window');

  // ====== Ikonat e sfondit (të shpërndara natyrshëm) ======
  const BG_ICONS = [
    { name: 'dumbbell',      x: 0.15, y: 0.10, sizeMul: 0.20, op: 0.10, rot: -8 },
    { name: 'kettlebell',    x: 0.80, y: 0.12, sizeMul: 0.22, op: 0.09, rot: 10 },
    { name: 'boxing-glove',  x: 0.45, y: 0.18, sizeMul: 0.17, op: 0.08, rot: -5 },
    { name: 'arm-flex',      x: 0.25, y: 0.35, sizeMul: 0.19, op: 0.08, rot: 8 },
    { name: 'weight',        x: 0.70, y: 0.32, sizeMul: 0.20, op: 0.09, rot: -6 },
    { name: 'heart-pulse',   x: 0.12, y: 0.50, sizeMul: 0.16, op: 0.07, rot: 5 },
    { name: 'timer-outline', x: 0.50, y: 0.48, sizeMul: 0.18, op: 0.07, rot: -8 },
    { name: 'treadmill',     x: 0.88, y: 0.48, sizeMul: 0.20, op: 0.08, rot: 6 },
    { name: 'medal-outline', x: 0.32, y: 0.65, sizeMul: 0.18, op: 0.08, rot: -6 },
    { name: 'bottle-soda',   x: 0.68, y: 0.63, sizeMul: 0.17, op: 0.07, rot: 8 },
    { name: 'weight-lifter', x: 0.10, y: 0.72, sizeMul: 0.19, op: 0.08, rot: 6 },
    { name: 'jump-rope',     x: 0.50, y: 0.72, sizeMul: 0.16, op: 0.07, rot: -4 },
    { name: 'barbell',       x: 0.88, y: 0.70, sizeMul: 0.22, op: 0.09, rot: 5 },
    { name: 'yoga',          x: 0.28, y: 0.88, sizeMul: 0.18, op: 0.07, rot: -5 },
    { name: 'boxing-glove',  x: 0.75, y: 0.88, sizeMul: 0.20, op: 0.08, rot: 8 },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      {/* ===== SFONDI ME IKONA ===== */}
      <View style={styles.bgLayer} pointerEvents="none">
        {BG_ICONS.map((icon, i) => {
          const size = Math.round(Math.min(W, H) * icon.sizeMul);
          const left = icon.x * W - size / 2;
          const top = icon.y * H - size / 2;
          return (
            <MaterialCommunityIcons
              key={i}
              name={icon.name as any}
              size={size}
              color={COLORS.green}
              style={{
                position: 'absolute',
                left,
                top,
                opacity: icon.op,
                transform: [{ rotate: `${icon.rot}deg` }],
              }}
            />
          );
        })}
      </View>

      {/* ===== PËRMBAJTJA ===== */}
      <View style={styles.container}>
        {/* Titulli */}
        <View style={styles.ribbon}>
          <MaterialCommunityIcons name="run-fast" size={22} color="#fff" />
          <Text style={styles.ribbonText}>Zgjidh një opsion</Text>
        </View>

        {/* Kartat */}
        <View style={styles.cardsRow}>
          <TouchableOpacity
            activeOpacity={0.88}
            style={[styles.card, { width: '46%', aspectRatio: 0.62 }]}
            onPress={() => router.push('/workouts/home')}



          >
            <MaterialCommunityIcons name="dumbbell" size={90} color={COLORS.green} />
            <Text style={styles.cardText}>WEIGHT-{"\n"}LIFTING</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.88}
            style={[styles.card, { width: '46%', aspectRatio: 0.62 }]}
           onPress={() => router.push('/workouts/gym')}
          >
            <MaterialCommunityIcons name="arm-flex" size={90} color={COLORS.green} />
            <Text style={styles.cardText}>HOME{"\n"}WORKOUT</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 28 }} />
      </View>
    </SafeAreaView>
  );
}

/* ===== NGJYRAT ===== */
const COLORS = {
  green: '#355E3B',
  page:  '#F7F4E9',
  card:  '#E6DFC5',
  textDark: '#2E2E2E',
  cardSoft: '#EFE8CF',
};

/* ===== STILET ===== */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.page,
  },

  /* SFONDI */
  bgLayer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },

  /* PËRMBAJTJA */
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  ribbon: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.green,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 22,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  ribbonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
    marginLeft: 8,
    letterSpacing: 0.4,
  },

  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  card: {
    backgroundColor: COLORS.cardSoft,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.14,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 4 },
  },
  cardText: {
    color: COLORS.textDark,
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 18,
    marginTop: 10,
    lineHeight: 22,
    letterSpacing: 0.4,
  },
});
