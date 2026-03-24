export const LOCATION = { lat: 48.1573, lon: 23.1377, name: "Королево" };

// iconSource: 'openweather-cdn' | 'wmo' | 'accu'
export const iconSource = "accu";
export const OW_BASE = "https://openweathermap.org/img/wn";

/**
 * Визначає, чи є момент часу днем (між сходом і заходом сонця).
 * Фолбек: 07:00–20:00 якщо sunrise/sunset не передано.
 */
export function isDaytime(dateOrIso, sunriseIso, sunsetIso) {
  const t = dateOrIso ? new Date(dateOrIso).getTime() : Date.now();
  if (sunriseIso && sunsetIso) {
    return t >= new Date(sunriseIso).getTime() && t < new Date(sunsetIso).getTime();
  }
  const hour = new Date(t).getHours();
  return hour >= 7 && hour < 20;
}

// WMO weather code → UI config
export const weatherConfig = {
  0:  { label: "Ясно",                    img: "weather-clear",                imgNight: "weather-clear-night",           ow: "01", color: "#ffce54" },
  1:  { label: "Переважно ясно",          img: "weather-few-clouds",           imgNight: "weather-few-clouds-night",      ow: "01", color: "#f6bb42" },
  2:  { label: "Мінлива хмарність",       img: "weather-few-clouds",           imgNight: "weather-few-clouds-night",      ow: "02", color: "#aab2bd" },
  3:  { label: "Хмарно тотально",         img: "weather-many-clouds",          imgNight: "weather-clouds-night",          ow: "03", color: "#656d78" },
  45: { label: "Туман",                    img: "weather-mist",                                                            ow: "50", color: "#ccd1d9" },
  48: { label: "Паморозь (туман з інеєм)", img: "weather-mist",                                                            ow: "50", color: "#e6e9ed" },
  51: { label: "Легка мряка",             img: "weather-showers-scattered-day", imgNight: "weather-showers-scattered-night", ow: "09", color: "#4fc1e9" },
  53: { label: "Помірна мряка",           img: "weather-showers-scattered-day", imgNight: "weather-showers-scattered-night", ow: "09", color: "#3baeda" },
  55: { label: "Густа мряка",             img: "weather-showers-scattered",                                                 ow: "09", color: "#4a89dc" },
  56: { label: "Легка крижана мряка",     img: "weather-freezing-rain",                                                     ow: "09", color: "#5d9cec" },
  57: { label: "Густа крижана мряка",     img: "weather-freezing-rain",                                                     ow: "09", color: "#4a89dc" },
  61: { label: "Невеликий дощ",           img: "weather-showers-day",          imgNight: "weather-showers-night",          ow: "10", color: "#4fc1e9" },
  63: { label: "Помірний дощ",            img: "weather-showers-day",          imgNight: "weather-showers-night",          ow: "10", color: "#3baeda" },
  65: { label: "Сильний дощ",             img: "weather-showers",                                                           ow: "10", color: "#22313f" },
  66: { label: "Легкий крижаний дощ",     img: "weather-freezing-rain",                                                     ow: "10", color: "#5d9cec" },
  67: { label: "Сильний крижаний дощ",    img: "weather-freezing-rain",                                                     ow: "10", color: "#4a89dc" },
  71: { label: "Невеликий сніг",          img: "weather-snow-scattered-day",   imgNight: "weather-snow-scattered-night",   ow: "13", color: "#e6e9ed" },
  73: { label: "Помірний сніг",           img: "weather-snow-scattered-day",   imgNight: "weather-snow-scattered-night",   ow: "13", color: "#ccd1d9" },
  75: { label: "Сильний сніг",            img: "weather-snow",                                                              ow: "13", color: "#aab2bd" },
  77: { label: "Сніжна крупа",            img: "weather-snow-scattered",                                                    ow: "13", color: "#e6e9ed" },
  80: { label: "Слабкий зливовий дощ",    img: "weather-showers-day",          imgNight: "weather-showers-night",          ow: "09", color: "#4fc1e9" },
  81: { label: "Помірний зливовий дощ",   img: "weather-showers-day",          imgNight: "weather-showers-night",          ow: "09", color: "#3baeda" },
  82: { label: "Сильна злива",            img: "weather-storm-day",            imgNight: "weather-storm-night",            ow: "09", color: "#22313f" },
  85: { label: "Легкий снігопад",         img: "weather-snow-scattered-day",   imgNight: "weather-snow-scattered-night",   ow: "13", color: "#e6e9ed" },
  86: { label: "Сильний снігопад",        img: "weather-snow",                                                              ow: "13", color: "#aab2bd" },
  95: { label: "Гроза",                   img: "weather-storm-day",            imgNight: "weather-storm-night",            ow: "11", color: "#434a54" },
  96: { label: "Гроза з легким градом",   img: "weather-storm",                                                             ow: "11", color: "#37bc9b" },
  99: { label: "Гроза з сильним градом",  img: "weather-hail",                                                              ow: "11", color: "#bf263c" },
};

const WMO_KNOWN_CODES = new Set([0,1,2,3,45,48,51,53,55,56,57,61,63,65,66,67,71,73,75,77,80,81,82,85,86,95,96,99]);

export function getIconPath(config, dateOrIso, weatherCode, options = {}) {
  if (!config) return "";
  const day = typeof options.isDay === "boolean"
    ? options.isDay
    : isDaytime(dateOrIso, options.sunrise, options.sunset);
  if (iconSource === "openweather-cdn" && config.ow) {
    const suffix = day ? "d" : "n";
    return `${OW_BASE}/${config.ow}${suffix}@4x.png`;
  }
  if (iconSource === "wmo" && weatherCode != null) {
    const code = WMO_KNOWN_CODES.has(weatherCode) ? String(weatherCode).padStart(2, "0") : "03";
    return `img/wmo/WeatherSymbol_WMO_PresentWeather_ww_${code}.svg`;
  }
  if (iconSource === "accu") {
    const img = day ? (config.img || config.imgNight) : (config.imgNight || config.img);
    return img ? `img/accu/${img}.png` : "";
  }
  return "";
}

// --- Утиліти ---

export function getGlobalMinMax(...seriesArrays) {
  const allValues = seriesArrays.flat();
  return { min: Math.min(...allValues), max: Math.max(...allValues) };
}

export function formatTime(iso) {
  return new Date(iso).toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" });
}

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString("uk-UA", { weekday: "short", day: "numeric", month: "short" });
}

// --- Кольори ---

const TEMP_COLOR_STOPS = [
  { temp: -26, r: 0,   g: 0,   b: 255 },
  { temp: 0,   r: 126, g: 127, b: 127 },
  { temp: 13,  r: 0,   g: 255, b: 0 },
  { temp: 26,  r: 255, g: 255, b: 0 },
  { temp: 40,  r: 255, g: 0,   b: 0 },
];

export function getTemperatureColor(temp) {
  const clamped = Math.max(-26, Math.min(40, temp));
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

/** Швидкість вітру (км/год) → HSL hue: 200 (штиль, синій) → 360 (ураган, червоний) */
export function getWindColor(windSpeed, opacity = 1) {
  const hue = Math.round(windSpeed * 1.33 + 200);
  return `hsl(${hue} 100% 50% / ${opacity})`;
}

// --- Range bar builders ---

function rangeBarShell(type, styles) {
  return `
    <div class="hourly-range hourly-range--${type}">
      <div class="hourly-range-track">
        <div class="hourly-range-fill" style="${styles}"></div>
      </div>
    </div>`;
}

export function buildTempBar(temp, apparent, globalMin, globalMax) {
  const low = Math.min(temp, apparent);
  const high = Math.max(temp, apparent);
  const range = globalMax - globalMin || 1;
  const bottomPct = Math.round(((low - globalMin) / range) * 100);
  const heightPct = Math.round(((high - low) / range) * 100);

  return rangeBarShell("temp", `
    bottom: ${bottomPct}%;
    height: ${heightPct}%;
    background: linear-gradient(to top, ${getTemperatureColor(low)}, ${getTemperatureColor(high)})
  `);
}

export function buildWindBar(speed, gust, globalMin, globalMax) {
  const low = Math.min(speed, gust);
  const high = Math.max(speed, gust);
  const range = globalMax - globalMin || 1;
  const startPct = Math.round(((low - globalMin) / range) * 100);
  const endPct = Math.round(((high - globalMin) / range) * 100);

  return rangeBarShell("wind", `
    bottom: 0%;
    height: 100%;
    background: linear-gradient(to top,
      ${getWindColor(globalMin)} 0%,
      ${getWindColor(low)} ${startPct}%,
      ${getWindColor(low, 0.66)} ${startPct}%,
      ${getWindColor(high, 0.33)} ${endPct}%,
      transparent ${endPct + 1}%
    )
  `);
}

/**
 * @param {number} amountMm  - кількість опадів у мм
 * @param {number} probability - ймовірність 0–100
 * @param {number} [maxMm=10]  - кількість мм, при якій бар заповнений на 100%
 */
export function buildPrecipBar(amountMm, probability, maxMm = 10) {
  const heightPct = Math.min((amountMm / maxMm) * 100, 100);
  const colorIntensity = (amountMm / maxMm) * 100;
  const hue = colorIntensity + 230;
  const bottomAlpha = probability / 100;

  return rangeBarShell("precip", `
    bottom: 0%;
    height: ${heightPct}%;
    background: linear-gradient(to top,
      rgba(0, 122, 255, ${bottomAlpha}),
      hsl(${hue}deg 100% 50% / ${probability})
    )
  `);
}

export function buildUvBar(uvIndex) {
  const heightPct = Math.min(uvIndex * 10, 100);
  const green = Math.round(Math.max(0, 255 - uvIndex * 25.5));

  return rangeBarShell("uv", `
    bottom: 0%;
    height: ${heightPct}%;
    background: linear-gradient(to top, rgb(255 255 0), rgb(255 ${green} 0))
  `);
}

// --- Viz block wrapper (спільний для hourly / daily) ---

export function buildVizBlock(svgHtml, rangeHtml) {
  return `
    <div class="viz-wrap">
      <div class="viz-wrap__bg">${svgHtml}</div>
      <div class="viz-wrap__content">${rangeHtml}</div>
    </div>`;
}
