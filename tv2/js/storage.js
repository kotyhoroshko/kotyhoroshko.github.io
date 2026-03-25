const LOCATION_KEY = "tv2-location";
const WEATHER_CACHE_KEY = "tv2-weather";
const WEATHER_CACHE_TTL_MS = 60_000;

export function saveLocation(loc) {
  try {
    localStorage.setItem(LOCATION_KEY, JSON.stringify({
      lat: loc.lat, lon: loc.lon, name: loc.name,
    }));
  } catch { /* private mode / quota */ }
}

export function loadSavedLocation() {
  try {
    const loc = JSON.parse(localStorage.getItem(LOCATION_KEY));
    if (typeof loc?.lat === "number" && typeof loc?.lon === "number" && loc?.name) {
      return loc;
    }
  } catch { /* corrupt data */ }
  return null;
}

export function getCachedWeather(lat, lon) {
  try {
    const raw = sessionStorage.getItem(WEATHER_CACHE_KEY);
    if (!raw) return null;
    const cached = JSON.parse(raw);
    if (cached.lat === lat && cached.lon === lon && Date.now() - cached.ts < WEATHER_CACHE_TTL_MS) {
      return cached.data;
    }
  } catch { /* corrupt */ }
  return null;
}

export function cacheWeather(lat, lon, data) {
  try {
    sessionStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify({ lat, lon, data, ts: Date.now() }));
  } catch { /* quota */ }
}
