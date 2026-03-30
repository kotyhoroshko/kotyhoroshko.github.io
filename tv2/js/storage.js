const LOCATION_KEY = "tv2-location";
const RECENT_LOCATIONS_KEY = "tv2-recent-locations";
const MAX_RECENT_LOCATIONS = 3;
const WEATHER_CACHE_KEY = "tv2-weather";
const WEATHER_CACHE_TTL_MS = 60_000;

function pushRecentLocation(loc) {
  try {
    const prev = loadRecentLocations();
    const filtered = prev.filter((p) => p.lat !== loc.lat || p.lon !== loc.lon);
    const next = [{ lat: loc.lat, lon: loc.lon, name: loc.name }, ...filtered].slice(0, MAX_RECENT_LOCATIONS);
    localStorage.setItem(RECENT_LOCATIONS_KEY, JSON.stringify(next));
  } catch { /* private mode / quota */ }
}

export function loadRecentLocations() {
  try {
    const raw = JSON.parse(localStorage.getItem(RECENT_LOCATIONS_KEY));
    if (!Array.isArray(raw)) return [];
    return raw.filter((l) => typeof l?.lat === "number" && typeof l?.lon === "number" && typeof l?.name === "string");
  } catch {
    return [];
  }
}

export function saveLocation(loc) {
  try {
    localStorage.setItem(LOCATION_KEY, JSON.stringify({
      lat: loc.lat, lon: loc.lon, name: loc.name,
    }));
  } catch { /* private mode / quota */ }
  pushRecentLocation(loc);
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
