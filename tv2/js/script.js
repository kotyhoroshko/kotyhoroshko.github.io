import { LOCATION } from "./config.js";
import { saveLocation, loadSavedLocation, getCachedWeather, cacheWeather } from "./storage.js";
import { getUserGPSPosition, reverseGeocode } from "./geocoding.js";
import { initLocationSearch } from "./locationSearch.js";
import { renderCurrent } from "./current.js";
import { renderHourly } from "./hourly.js";
import { renderDaily } from "./daily.js";

/** false = реальний Open-Meteo; true = дані з js/dummy.json */
const USE_DUMMY_JSON = false;

const MAX_RETRIES = 3;
const RETRY_BASE_MS = 1000;

const API_PARAMS = {
  daily: [
    "weather_code", "temperature_2m_max", "temperature_2m_min", "uv_index_max",
    "wind_speed_10m_max", "wind_gusts_10m_max", "precipitation_hours",
    "precipitation_sum", "sunrise", "sunset",
  ],
  hourly: [
    "temperature_2m", "weather_code", "precipitation_probability", "cloud_cover",
    "wind_gusts_10m", "wind_speed_10m", "uv_index", "apparent_temperature", "precipitation",
  ],
  current: [
    "temperature_2m", "rain", "showers", "snowfall", "weather_code", "wind_speed_10m",
    "wind_gusts_10m", "wind_direction_10m", "apparent_temperature", "is_day",
  ],
};

let currentLocation = { ...LOCATION };

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

function resolveLocation() {
  return loadSavedLocation() || LOCATION;
}

async function geolocateUser() {
  const pos = await getUserGPSPosition();
  const { latitude: lat, longitude: lon } = pos.coords;
  const name = (await reverseGeocode(lat, lon)) || "Моя локація";
  const loc = { lat, lon, name };
  saveLocation(loc);
  return loc;
}

const DUMMY_JSON_URL = new URL("./dummy.json", import.meta.url);

const weatherCard = document.getElementById("weather-card");
const hourlyCard = document.getElementById("hourly-card");
const dailyCard = document.getElementById("daily-card");

async function fetchWithRetry(url, retries = MAX_RETRIES) {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (err) {
      if (attempt === retries - 1) throw err;
      await new Promise((r) => setTimeout(r, RETRY_BASE_MS * (attempt + 1)));
    }
  }
}

async function loadWeatherData(lat, lon) {
  const cached = getCachedWeather(lat, lon);
  if (cached) return cached;

  const url = USE_DUMMY_JSON ? DUMMY_JSON_URL : buildApiUrl(lat, lon);
  const data = await fetchWithRetry(url);
  cacheWeather(lat, lon, data);
  return data;
}

function setCardsLoading() {
  const msg = `<div class="loading">Завантаження...</div>`;
  if (weatherCard) weatherCard.innerHTML = msg;
  if (hourlyCard) hourlyCard.innerHTML = msg;
  if (dailyCard) dailyCard.innerHTML = msg;
}

async function updateWeather() {
  try {
    const data = await loadWeatherData(currentLocation.lat, currentLocation.lon);

    if (weatherCard) weatherCard.innerHTML = renderCurrent(data, currentLocation.name);
    if (hourlyCard) hourlyCard.innerHTML = renderHourly(data);
    if (dailyCard) dailyCard.innerHTML = renderDaily(data);
    document.title = `Погода — ${currentLocation.name}`;
  } catch (error) {
    console.error("Деталі помилки:", error);
    const msg = `<div class="loading">Помилка завантаження. Спробуйте пізніше.</div>`;
    if (weatherCard) weatherCard.innerHTML = msg;
    if (hourlyCard) hourlyCard.innerHTML = msg;
    if (dailyCard) dailyCard.innerHTML = msg;
  }
}

async function init() {
  currentLocation = resolveLocation();
  await updateWeather();
  initLocationSearch(weatherCard, {
    getLocation: () => currentLocation,
    selectLocation: async (loc) => {
      currentLocation = loc;
      saveLocation(loc);
      setCardsLoading();
      await updateWeather();
    },
    geolocateUser: async () => {
      const loc = await geolocateUser();
      currentLocation = loc;
      setCardsLoading();
      await updateWeather();
    },
  });
}

init();
