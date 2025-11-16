
const SPOONACULAR_API_KEY = "961d7ad801d144af97da5e99cec2fddd";
const BASE_URL = "https://api.spoonacular.com";

async function apiGet(path, params = {}) {
  const url = new URL(BASE_URL + path);

  Object.entries({
    apiKey: SPOONACULAR_API_KEY,
    ...params,
  }).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.append(key, String(value));
    }
  });

  const res = await fetch(url.toString());

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.log("❌ Spoonacular error:", res.status, text);
    throw new Error(`Spoonacular error ${res.status}`);
  }

  return res.json();
}

export async function getRecipeDetails(recipeId) {
  if (!recipeId) throw new Error("recipeId mungon");

  const data = await apiGet(`/recipes/${recipeId}/information`, {
    includeNutrition: true,
  });

  return data;
}

/**
 * 🔹 RECETA E DITËS
 *
 * - merr ~30 receta "healthy"
 * - zgjedh njërën bazuar në datën e sotme
 * - për me qenë E NJEJTË për krejt ditën dhe me ndrru nesër
 */
export async function getRecipeOfDay() {
  
  const search = await apiGet("/recipes/complexSearch", {
    query: "healthy",
    number: 30,
    addRecipeInformation: false,
    instructionsRequired: true,
  });

  const list = search.results || [];
  if (!list.length) {
    const fallback = await apiGet("/recipes/complexSearch", {
      query: "salad",
      number: 30,
      addRecipeInformation: false,
      instructionsRequired: true,
    });
    if (!fallback.results || !fallback.results.length) return null;
    return getRecipeDetails(fallback.results[0].id);
  }

 
  const today = new Date();
  const idx = today.getDate() % list.length;
  const chosen = list[idx];

  return getRecipeDetails(chosen.id);
}

export async function searchRecipeWithDetails(query) {
  if (!query || !query.trim()) return null;

  const search = await apiGet("/recipes/complexSearch", {
    query: query.trim(),
    number: 10,
    addRecipeInformation: false,
    instructionsRequired: true,
  });

  const list = search.results || [];
  if (!list.length) return null;

  const first = list[0];

  return getRecipeDetails(first.id);
}
