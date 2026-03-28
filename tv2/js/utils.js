import {
  WIND_LEVELS, UV_LEVELS, PRECIP_LEVELS_HOURLY, PRECIP_LEVELS_DAILY,
  TEMP_COLOR_STOPS, WMO_KNOWN_CODES, ICON_SOURCE, OW_BASE,
} from "./config.js";

export function round1(n) {
  return Math.round(n * 10) / 10;
}

export function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function windTitle(speed, gust) {
  const peak = Math.max(speed, gust);
  const level = WIND_LEVELS.find(([max]) => peak <= max);
  return `${level[1]} вітер до ${Math.round(peak)}км/год. ${level[2]}`;
}

export function uvTitle(index) {
  const level = UV_LEVELS.find(([max]) => index <= max);
  return `${level[1]}. ${level[2]}`;
}

export function precipTitle(amountMm, probability, type = "hourly") {
  const levels = type === "daily" ? PRECIP_LEVELS_DAILY : PRECIP_LEVELS_HOURLY;
  const level = levels.find(([max]) => amountMm <= max);
  const probText = probability != null ? ` Ймовірність ${probability}%.` : "";
  return `${level[1]} (${round1(amountMm)}мм).${probText} ${level[2]}`;
}

/** Фолбек: 07:00–20:00 якщо sunrise/sunset не передано. */
export function isDaytime(dateOrIso, sunriseIso, sunsetIso) {
  const t = dateOrIso ? new Date(dateOrIso).getTime() : Date.now();
  if (sunriseIso && sunsetIso) {
    return t >= new Date(sunriseIso).getTime() && t < new Date(sunsetIso).getTime();
  }
  const hour = new Date(t).getHours();
  return hour >= 7 && hour < 20;
}

export function getIconPath(config, dateOrIso, weatherCode, options = {}) {
  if (!config) return "";
  const day = typeof options.isDay === "boolean"
    ? options.isDay
    : isDaytime(dateOrIso, options.sunrise, options.sunset);
  if (ICON_SOURCE === "openweather-cdn" && config.ow) {
    const suffix = day ? "d" : "n";
    return `${OW_BASE}/${config.ow}${suffix}@4x.png`;
  }
  if (ICON_SOURCE === "wmo" && weatherCode != null) {
    const code = WMO_KNOWN_CODES.has(weatherCode) ? String(weatherCode).padStart(2, "0") : "03";
    return `img/wmo/WeatherSymbol_WMO_PresentWeather_ww_${code}.svg`;
  }
  if (ICON_SOURCE === "accu") {
    const img = day ? (config.img || config.imgNight) : (config.imgNight || config.img);
    return img ? `img/accu/${img}.png` : "";
  }
  return "";
}

/** Безпечний min/max без spread (не впаде на великих масивах). */
export function getGlobalMinMax(...seriesArrays) {
  let min = Infinity;
  let max = -Infinity;
  for (const arr of seriesArrays) {
    for (const v of arr) {
      if (v < min) min = v;
      if (v > max) max = v;
    }
  }
  return { min, max };
}

export function formatTime(iso) {
  return new Date(iso).toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" });
}

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString("uk-UA", { weekday: "short", day: "numeric", month: "short" });
}

const WIND_HUE_BASE = 200;
const WIND_HUE_SCALE = 1.33;

export function getTemperatureColor(temp) {
  const lo = TEMP_COLOR_STOPS[0];
  const hi = TEMP_COLOR_STOPS.at(-1);
  const clamped = Math.max(lo.temp, Math.min(hi.temp, temp));
  let i = 0;
  while (i < TEMP_COLOR_STOPS.length - 1 && TEMP_COLOR_STOPS[i + 1].temp < clamped) i++;
  const lower = TEMP_COLOR_STOPS[i];
  const upper = TEMP_COLOR_STOPS[i + 1];
  const range = upper.temp - lower.temp || 1;
  const factor = (clamped - lower.temp) / range;
  const r = Math.round(lower.r + (upper.r - lower.r) * factor);
  const g = Math.round(lower.g + (upper.g - lower.g) * factor);
  const b = Math.round(lower.b + (upper.b - lower.b) * factor);
  return `rgba(${r},${g},${b},1)`;
}

/** Швидкість вітру (км/год) → HSL hue: 200 (штиль, синій) → ~360 (ураган, червоний) */
export function getWindColor(windSpeed, opacity = 1) {
  const hue = Math.round(windSpeed * WIND_HUE_SCALE + WIND_HUE_BASE);
  return `hsl(${hue} 100% 50% / ${opacity})`;
}
