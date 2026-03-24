import { LOCATION } from "./config.js";
import { renderCurrent } from "./current.js";
import { renderHourly } from "./hourly.js";
import { renderDaily } from "./daily.js";

/** false = реальний Open-Meteo; true = дані з js/dummy.json */
const USE_DUMMY_JSON = true;

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

const API_URL =
  `https://api.open-meteo.com/v1/forecast` +
  `?latitude=${LOCATION.lat}&longitude=${LOCATION.lon}` +
  `&daily=${API_PARAMS.daily.join(",")}` +
  `&hourly=${API_PARAMS.hourly.join(",")}` +
  `&current=${API_PARAMS.current.join(",")}` +
  `&timezone=auto&forecast_hours=6`;

const DUMMY_JSON_URL = new URL("./dummy.json", import.meta.url);

const weatherCard = document.getElementById("weather-card");
const hourlyCard = document.getElementById("hourly-card");
const dailyCard = document.getElementById("daily-card");

async function loadWeatherData() {
  if (USE_DUMMY_JSON) {
    const response = await fetch(DUMMY_JSON_URL);
    if (!response.ok) throw new Error(`dummy.json HTTP ${response.status}`);
    return response.json();
  }
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

async function updateWeather() {
  try {
    const data = await loadWeatherData();

    if (weatherCard) weatherCard.innerHTML = renderCurrent(data);
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

updateWeather();
