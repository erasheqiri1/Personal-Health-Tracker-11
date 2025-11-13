import { FontAwesome } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const COLORS = {
  green: "#355E3B",
  page: "#F7F4E9",
  card: "#E6DFC5",
  cardSoft: "#EFE8CF",
  textDark: "#2E2E2E",
};

export default function RecetaScreen() {
  const router = useRouter();
  const { mode } = useLocalSearchParams(); // "lose" | "gain" | "maintain"
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [results, setResults] = useState([]);
  const [meal, setMeal] = useState(null);

  const placeholder = useMemo(() => {
    if (mode === "gain") return "Kërko përbërës me kalori/proteinë (p.sh. chicken, rice)";
    if (mode === "lose") return "Kërko përbërës light/volum (p.sh. salad, tuna, oats)";
    return "Kërko sipas përbërësit (p.sh. apple, egg, yogurt)";
  }, [mode]);

  // Meal of the Day (random)
  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
        const j = await r.json();
        setMeal(j.meals?.[0] ?? null);
      } catch {
        // ignore
      }
    })();
  }, []);

  async function onSearch() {
    if (!q.trim()) return;
    setLoading(true);
    setErr(null);
    setResults([]);
    setMeal(null);
    try {
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(
        q.trim()
      )}`;
      const r = await fetch(url);
      const j = await r.json();
      setResults(j.meals ?? []);
    } catch {
      setErr("Gabim gjatë kërkimit");
    } finally {
      setLoading(false);
    }
  }

  async function loadDetails(idMeal) {
    try {
      setLoading(true);
      const r = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(idMeal)}`
      );
      const j = await r.json();
      setMeal(j.meals?.[0] ?? null);
      setResults([]);
    } catch {
      setErr("S’u ngarkua receta");
    } finally {
      setLoading(false);
    }
  }

  function ingredients(m) {
    if (!m) return [];
    const arr = [];
    for (let i = 1; i <= 20; i++) {
      const ing = m[`strIngredient${i}`];
      const meas = m[`strMeasure${i}`];
      if (ing && ing.trim()) arr.push({ ing, meas: meas || "" });
    }
    return arr;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.page }}>
      <Stack.Screen options={{ title: "Receta të shëndetshme" }} />

      {/* Header */}
      <View style={s.header}>
        <Pressable onPress={() => router.back()} style={s.backBtn}>
          <FontAwesome name="arrow-left" size={20} color="#fff" />
        </Pressable>
        <Text style={s.headerTitle}>Receta</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Search */}
        <View style={s.card}>
          <TextInput
            placeholder={placeholder}
            value={q}
            onChangeText={setQ}
            style={s.input}
          />
          <Pressable onPress={onSearch} style={s.searchBtn}>
            <Text style={{ color: "#fff", fontWeight: "700" }}>Kërko</Text>
          </Pressable>
          {loading && <ActivityIndicator style={{ marginTop: 8 }} />}
          {err && <Text style={{ color: "crimson", marginTop: 8 }}>{err}</Text>}
        </View>

        {/* Rezultatet */}
        {results.length > 0 && (
          <View style={s.card}>
            <Text style={s.title}>Rezultatet</Text>
            {results.map((it) => (
              <Pressable key={it.idMeal} onPress={() => loadDetails(it.idMeal)} style={s.resultRow}>
                <Image source={{ uri: it.strMealThumb }} style={s.thumb} />
                <Text style={{ flex: 1, fontWeight: "600", color: COLORS.textDark }}>
                  {it.strMeal}
                </Text>
              </Pressable>
            ))}
          </View>
        )}

        {/* Meal of the Day ose receta e zgjedhur */}
        {meal && (
          <View style={s.cardSoft}>
            <Text style={s.title}>
              {results.length === 0 ? "Meal of the Day" : "Receta"}
            </Text>
            <Image source={{ uri: meal.strMealThumb }} style={s.hero} />
            <Text style={s.mealName}>{meal.strMeal}</Text>
            <Text style={s.meta}>
              {meal.strCategory ? `Kategoria: ${meal.strCategory} • ` : ""}
              {meal.strArea ? `Origjina: ${meal.strArea}` : ""}
            </Text>

            <Text style={s.subtitle}>Përbërësit</Text>
            {ingredients(meal).map((x, idx) => (
              <Text key={idx} style={s.ingredient}>
                • {x.ing} {x.meas ? `- ${x.meas}` : ""}
              </Text>
            ))}

            {!!meal.strInstructions && (
              <>
                <Text style={s.subtitle}>Udhëzimet</Text>
                <Text style={s.instructions}>{meal.strInstructions}</Text>
              </>
            )}
          </View>
        )}

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: COLORS.green,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { color: "#fff", fontWeight: "800", fontSize: 16 },

  card: {
    backgroundColor: COLORS.card,
    padding: 12,
    borderRadius: 14,
    marginBottom: 12,
  },
  cardSoft: {
    backgroundColor: COLORS.cardSoft,
    padding: 12,
    borderRadius: 14,
    marginTop: 6,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchBtn: {
    backgroundColor: COLORS.green,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 10,
  },
  title: { color: COLORS.green, fontWeight: "800", fontSize: 16, marginBottom: 8 },
  resultRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 10,
    marginBottom: 8,
  },
  thumb: { width: 64, height: 64, borderRadius: 8 },
  hero: { width: "100%", height: 200, borderRadius: 12, marginBottom: 8 },
  mealName: { fontSize: 18, fontWeight: "800", color: COLORS.textDark },
  meta: { color: COLORS.textDark, opacity: 0.8, marginTop: 2, marginBottom: 8 },
  subtitle: { fontWeight: "800", color: COLORS.textDark, marginTop: 8, marginBottom: 6 },
  ingredient: { color: COLORS.textDark, lineHeight: 20 },
  instructions: { color: COLORS.textDark, lineHeight: 20 },
});
