import { TMDB_API_KEY, TMDB_BASE_URL } from "../lib/constants";

const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000;

function getCacheKey(endpoint, params) {
  const sorted = Object.keys(params || {})
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  return `${endpoint}?${sorted}`;
}

async function fetchTMDB(endpoint, params = {}) {
  const key = getCacheKey(endpoint, params);
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  url.searchParams.set("api_key", TMDB_API_KEY);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") {
      url.searchParams.set(k, String(v));
    }
  });

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`TMDB error: ${res.status}`);
  const data = await res.json();
  cache.set(key, { data, timestamp: Date.now() });
  return data;
}

export function fetchMoviesByCategory(category, page = 1) {
  return fetchTMDB(`/movie/${category}`, { page, language: "en-US" });
}

export function discoverMovies({ page = 1, genre, sortBy, yearFrom, yearTo } = {}) {
  const params = { page, language: "en-US", sort_by: sortBy || "popularity.desc" };
  if (genre) params.with_genres = genre;
  if (yearFrom) params["primary_release_date.gte"] = `${yearFrom}-01-01`;
  if (yearTo) params["primary_release_date.lte"] = `${yearTo}-12-31`;
  return fetchTMDB("/discover/movie", params);
}

export function fetchGenres() {
  return fetchTMDB("/genre/movie/list", { language: "en-US" });
}

export function fetchMovieDetails(id) {
  return fetchTMDB(`/movie/${id}`, {
    language: "en-US",
    append_to_response: "videos,credits,recommendations,reviews",
  });
}

export function fetchMovieVideos(id) {
  return fetchTMDB(`/movie/${id}/videos`, { language: "en-US" });
}

export function fetchMovieCredits(id) {
  return fetchTMDB(`/movie/${id}/credits`, { language: "en-US" });
}

export function fetchMovieRecommendations(id) {
  return fetchTMDB(`/movie/${id}/recommendations`, { page: 1, language: "en-US" });
}

export function fetchMovieReviews(id, page = 1) {
  return fetchTMDB(`/movie/${id}/reviews`, { page, language: "en-US" });
}

export function searchMovies(query, page = 1) {
  return fetchTMDB("/search/movie", { query, page, language: "en-US", include_adult: false });
}

export function clearTMDBCache() {
  cache.clear();
}
