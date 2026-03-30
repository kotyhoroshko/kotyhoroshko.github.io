const GEOLOCATION_TIMEOUT_MS = 5000;

export function getUserGPSPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject(new Error("Geolocation not supported"));
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: false,
      timeout: GEOLOCATION_TIMEOUT_MS,
      maximumAge: 10 * 60 * 1000,
    });
  });
}

export async function reverseGeocode(lat, lon) {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=uk`;
    const resp = await fetch(url);
    if (!resp.ok) return null;
    const data = await resp.json();
    const addr = data.address || {};
    return addr.city || addr.town || addr.village || addr.municipality || null;
  } catch {
    return null;
  }
}

/**
 * Приблизна локація за IP (рівень міста/регіону; VPN і мобільні мережі можуть помилятися).
 * Працює з браузера (HTTPS + CORS). Якщо сервіс недоступний — null.
 */
export async function locateByIp() {
  try {
    const resp = await fetch("https://ipapi.co/json/", { cache: "no-store" });
    if (!resp.ok) return null;
    const data = await resp.json();
    if (!data || data.error) return null;
    const lat = data.latitude;
    const lon = data.longitude;
    if (typeof lat !== "number" || typeof lon !== "number") return null;
    const place = [data.city || data.region, data.country_name].filter(Boolean).join(", ");
    const name = place || "За IP";
    return { lat, lon, name };
  } catch {
    return null;
  }
}

export async function searchLocations(query, count = 50) {
  try {
    const url =
      `https://geocoding-api.open-meteo.com/v1/search` +
      `?name=${encodeURIComponent(query)}&count=${count}&language=uk&format=json`;
    const resp = await fetch(url);
    if (!resp.ok) return [];
    const data = await resp.json();
    return data.results || [];
  } catch {
    return [];
  }
}
