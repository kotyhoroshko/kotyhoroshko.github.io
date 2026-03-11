import { renderCurrent } from "./current.js";
import { renderHourly } from "./hourly.js";
import { renderDaily } from "./daily.js";

const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=48.1573&longitude=23.1377&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,wind_speed_10m_max,wind_gusts_10m_max,precipitation_sum,precipitation_hours&hourly=temperature_2m,weather_code,precipitation_probability,cloud_cover,wind_gusts_10m,wind_speed_10m,uv_index,apparent_temperature,precipitation&current=temperature_2m,rain,showers,snowfall,weather_code,wind_speed_10m,wind_gusts_10m,wind_direction_10m,apparent_temperature,is_day&timezone=auto&forecast_hours=6`;

async function updateWeather() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    renderCurrent(data);
    renderHourly(data);
    renderDaily(data);
  } catch (error) {
    console.error("Деталі помилки:", error);
    document.getElementById("weather-card").innerHTML = "Помилка завантаження";
    document.getElementById("hourly-card").innerHTML = "Помилка завантаження";
    document.getElementById("daily-card").innerHTML = "Помилка завантаження";
  }
}

updateWeather();
