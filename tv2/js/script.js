import { LOCATION } from "./config.js";
import { renderCurrent } from "./current.js";
import { renderHourly } from "./hourly.js";
import { renderDaily } from "./daily.js";

/** false = реальний Open-Meteo; true = дані з js/dummy.json */
const USE_DUMMY_JSON = false;
const GEOLOCATION_TIMEOUT_MS = 5000;

const API_PARAMS = {
  daily: [
    "weather_code",
    "temperature_2m_max",
    "temperature_2m_min",
    "uv_index_max",
    "wind_speed_10m_max",
    "wind_gusts_10m_max",
    "precipitation_hours",
    "precipitation_sum",
    "sunrise",
    "sunset",
  ],
  hourly: [
    "temperature_2m",
    "weather_code",
    "precipitation_probability",
    "cloud_cover",
    "wind_gusts_10m",
    "wind_speed_10m",
    "uv_index",
    "apparent_temperature",
    "precipitation",
  ],
  current: [
    "temperature_2m",
    "rain",
    "showers",
    "snowfall",
    "weather_code",
    "wind_speed_10m",
    "wind_gusts_10m",
    "wind_direction_10m",
    "apparent_temperature",
    "is_day",
  ],
};

const STORAGE_KEY = "tv2-location";

function saveLocation(loc) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ lat: loc.lat, lon: loc.lon, name: loc.name }));
  } catch { /* private mode / quota */ }
}

function loadSavedLocation() {
  try {
    const loc = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (loc?.lat && loc?.lon && loc?.name) return loc;
  } catch { /* corrupt data */ }
  return null;
}

let currentLocation = { ...LOCATION };

// --- API ---

function buildApiUrl(lat, lon) {
  return (
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${lat}&longitude=${lon}` +
    `&daily=${API_PARAMS.daily.join(",")}` +
    `&hourly=${API_PARAMS.hourly.join(",")}` +
    `&current=${API_PARAMS.current.join(",")}` +
    `&timezone=auto&forecast_hours=6`
  );
}

// --- Geolocation ---

function getUserGPSPosition() {
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

async function reverseGeocode(lat, lon) {
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

async function searchLocations(query, count = 5) {
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

async function resolveLocation() {
  const saved = loadSavedLocation();
  if (saved) return saved;

  try {
    const pos = await getUserGPSPosition();
    const { latitude: lat, longitude: lon } = pos.coords;
    const name = (await reverseGeocode(lat, lon)) || "Моя локація";
    const loc = { lat, lon, name };
    saveLocation(loc);
    return loc;
  } catch {
    return LOCATION;
  }
}

// --- DOM ---

const weatherCard = document.getElementById("weather-card");
const hourlyCard = document.getElementById("hourly-card");
const dailyCard = document.getElementById("daily-card");

const DUMMY_JSON_URL = new URL("./dummy.json", import.meta.url);
const WEATHER_CACHE_KEY = "tv2-weather";
const WEATHER_CACHE_TTL_MS = 60_000;

function getCachedWeather(lat, lon) {
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

function cacheWeather(lat, lon, data) {
  try {
    sessionStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify({ lat, lon, data, ts: Date.now() }));
  } catch { /* quota */ }
}

async function loadWeatherData(lat, lon) {
  const cached = getCachedWeather(lat, lon);
  if (cached) return cached;

  let data;
  if (USE_DUMMY_JSON) {
    const response = await fetch(DUMMY_JSON_URL);
    if (!response.ok) throw new Error(`dummy.json HTTP ${response.status}`);
    data = await response.json();
  } else {
    const response = await fetch(buildApiUrl(lat, lon));
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    data = await response.json();
  }
  cacheWeather(lat, lon, data);
  return data;
}

async function updateWeather() {
  try {
    const data = await loadWeatherData(
      currentLocation.lat,
      currentLocation.lon,
    );

    if (weatherCard)
      weatherCard.innerHTML = renderCurrent(data, currentLocation.name);
    if (hourlyCard) hourlyCard.innerHTML = renderHourly(data);
    if (dailyCard) dailyCard.innerHTML = renderDaily(data);
  } catch (error) {
    console.error("Деталі помилки:", error);
    const msg = "Помилка завантаження";
    if (weatherCard) weatherCard.innerHTML = msg;
    if (hourlyCard) hourlyCard.innerHTML = msg;
    if (dailyCard) dailyCard.innerHTML = msg;
  }
}

// --- Location search UI ---

function initLocationSearch() {
  if (!weatherCard) return;

  weatherCard.addEventListener("click", (e) => {
    const locationEl = e.target.closest(".location");
    if (!locationEl || locationEl.querySelector(".location-input")) return;

    const input = document.createElement("input");
    input.type = "text";
    input.className = "location-input";
    input.placeholder = "Введіть місто...";

    const dropdown = document.createElement("div");
    dropdown.className = "location-dropdown";

    locationEl.textContent = "";
    locationEl.appendChild(input);
    locationEl.appendChild(dropdown);
    input.focus();

    let debounceTimer = null;
    let results = [];
    let activeIndex = -1;

    function renderDropdown() {
      if (!results.length) {
        dropdown.innerHTML = input.value.trim().length >= 2
          ? `<div class="location-dropdown__empty">Нічого не знайдено</div>`
          : "";
        return;
      }
      dropdown.innerHTML = results.map((r, i) => {
        const detail = [r.admin1, r.country].filter(Boolean).join(", ");
        return `
          <div class="location-dropdown__item ${i === activeIndex ? "location-dropdown__item--active" : ""}" data-index="${i}">
            <span class="location-dropdown__name">${r.name}</span>
            ${detail ? `<span class="location-dropdown__detail">${detail}</span>` : ""}
          </div>`;
      }).join("");
    }

    async function fetchSuggestions(query) {
      if (query.length < 2) {
        results = [];
        activeIndex = -1;
        renderDropdown();
        return;
      }
      results = await searchLocations(query);
      activeIndex = -1;
      renderDropdown();
    }

    async function selectResult(r) {
      currentLocation = { lat: r.latitude, lon: r.longitude, name: r.name };
      saveLocation(currentLocation);
      input.disabled = true;
      input.value = r.name;
      dropdown.innerHTML = "";
      clearTimeout(debounceTimer);
      await updateWeather();
    }

    function restoreText() {
      if (locationEl.contains(input)) {
        clearTimeout(debounceTimer);
        locationEl.textContent = currentLocation.name;
      }
    }

    // Debounced search on typing
    input.addEventListener("input", () => {
      input.classList.remove("location-input--error");
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => fetchSuggestions(input.value.trim()), 300);
    });

    // Keyboard: arrows, enter, escape
    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (results.length) {
          activeIndex = (activeIndex + 1) % results.length;
          renderDropdown();
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (results.length) {
          activeIndex = activeIndex <= 0 ? results.length - 1 : activeIndex - 1;
          renderDropdown();
        }
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (activeIndex >= 0 && results[activeIndex]) {
          selectResult(results[activeIndex]);
        } else if (results.length) {
          selectResult(results[0]);
        } else {
          const query = input.value.trim();
          if (!query) { restoreText(); return; }
          input.disabled = true;
          input.value = "Пошук...";
          searchLocations(query, 1).then((res) => {
            if (res.length) {
              selectResult(res[0]);
            } else {
              input.disabled = false;
              input.value = query;
              input.focus();
              input.classList.add("location-input--error");
            }
          });
        }
      } else if (e.key === "Escape") {
        restoreText();
      }
    });

    // Click on suggestion (mousedown fires before blur)
    dropdown.addEventListener("mousedown", (e) => {
      e.preventDefault();
      const item = e.target.closest(".location-dropdown__item[data-index]");
      if (!item) return;
      const r = results[parseInt(item.dataset.index, 10)];
      if (r) selectResult(r);
    });

    // Cancel on blur
    input.addEventListener("blur", () => {
      setTimeout(() => {
        if (!input.disabled) restoreText();
      }, 150);
    });
  });
}

// --- Init ---

async function init() {
  currentLocation = await resolveLocation();
  await updateWeather();
  initLocationSearch();
}

init();
