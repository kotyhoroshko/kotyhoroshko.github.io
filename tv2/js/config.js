// Мапер кодів Open-Meteo WMO → зображення
// iconSource: 'openweather-cdn' | 'wmo' | 'accu'
export const iconSource = "accu";
export const OW_BASE = "https://openweathermap.org/img/wn";

export function isDaytime(dateOrIso) {
  const d = dateOrIso ? new Date(dateOrIso) : new Date();
  const hour = d.getHours();
  return hour >= 7 && hour < 20;
}

// WMO → OpenWeather icon IDs (день/ніч)
export const weatherConfig = {
  0: { label: "Ясно", img: "weather-clear", imgNight: "weather-clear-night", ow: "01", color: "#ffce54" },
  1: { label: "Переважно ясно", img: "weather-few-clouds", imgNight: "weather-few-clouds-night", ow: "01", color: "#f6bb42" },
  2: { label: "Мінлива хмарність", img: "weather-few-clouds", imgNight: "weather-few-clouds-night", ow: "02", color: "#aab2bd" },
  3: { label: "Хмарно тотально", img: "weather-many-clouds", imgNight: "weather-clouds-night", ow: "03", color: "#656d78" },
  45: { label: "Туман", img: "weather-mist", ow: "50", color: "#ccd1d9" },
  48: { label: "Паморозь (туман з інеєм)", img: "weather-mist", ow: "50", color: "#e6e9ed" },
  51: { label: "Легка мряка", img: "weather-showers-scattered-day", imgNight: "weather-showers-scattered-night", ow: "09", color: "#4fc1e9" },
  53: { label: "Помірна мряка", img: "weather-showers-scattered-day", imgNight: "weather-showers-scattered-night", ow: "09", color: "#3baeda" },
  55: { label: "Густа мряка", img: "weather-showers-scattered", ow: "09", color: "#4a89dc" },
  56: { label: "Легка крижана мряка", img: "weather-freezing-rain", ow: "09", color: "#5d9cec" },
  57: { label: "Густа крижана мряка", img: "weather-freezing-rain", ow: "09", color: "#4a89dc" },
  61: { label: "Невеликий дощ", img: "weather-showers-day", imgNight: "weather-showers-night", ow: "10", color: "#4fc1e9" },
  63: { label: "Помірний дощ", img: "weather-showers-day", imgNight: "weather-showers-night", ow: "10", color: "#3baeda" },
  65: { label: "Сильний дощ", img: "weather-showers", ow: "10", color: "#22313f" },
  66: { label: "Легкий крижаний дощ", img: "weather-freezing-rain", ow: "10", color: "#5d9cec" },
  67: { label: "Сильний крижаний дощ", img: "weather-freezing-rain", ow: "10", color: "#4a89dc" },
  71: { label: "Невеликий сніг", img: "weather-snow-scattered-day", imgNight: "weather-snow-scattered-night", ow: "13", color: "#e6e9ed" },
  73: { label: "Помірний сніг", img: "weather-snow-scattered-day", imgNight: "weather-snow-scattered-night", ow: "13", color: "#ccd1d9" },
  75: { label: "Сильний сніг", img: "weather-snow", ow: "13", color: "#aab2bd" },
  77: { label: "Сніжна крупа", img: "weather-snow-scattered", ow: "13", color: "#e6e9ed" },
  80: { label: "Слабкий зливовий дощ", img: "weather-showers-day", imgNight: "weather-showers-night", ow: "09", color: "#4fc1e9" },
  81: { label: "Помірний зливовий дощ", img: "weather-showers-day", imgNight: "weather-showers-night", ow: "09", color: "#3baeda" },
  82: { label: "Сильна злива", img: "weather-storm-day", imgNight: "weather-storm-night", ow: "09", color: "#22313f" },
  85: { label: "Легкий снігопад", img: "weather-snow-scattered-day", imgNight: "weather-snow-scattered-night", ow: "13", color: "#e6e9ed" },
  86: { label: "Сильний снігопад", img: "weather-snow", ow: "13", color: "#aab2bd" },
  95: { label: "Гроза", img: "weather-storm-day", imgNight: "weather-storm-night", ow: "11", color: "#434a54" },
  96: { label: "Гроза з легким градом", img: "weather-storm", ow: "11", color: "#37bc9b" },
  99: { label: "Гроза з сильним градом", img: "weather-hail", ow: "11", color: "#bf263c" },
};

const WMO_KNOWN_CODES = new Set([0,1,2,3,45,48,51,53,55,56,57,61,63,65,66,67,71,73,75,77,80,81,82,85,86,95,96,99]);

export function getIconPath(config, dateOrIso, weatherCode) {
  if (!config) return "";
  if (iconSource === "openweather-cdn" && config.ow) {
    const suffix = isDaytime(dateOrIso) ? "d" : "n";
    return `${OW_BASE}/${config.ow}${suffix}@4x.png`;
  }
  if (iconSource === "wmo" && weatherCode != null) {
    const code = WMO_KNOWN_CODES.has(weatherCode) ? String(weatherCode).padStart(2, "0") : "03";
    return `img/wmo/WeatherSymbol_WMO_PresentWeather_ww_${code}.svg`;
  }
  if (iconSource === "accu") {
    const img = isDaytime(dateOrIso) ? (config.img || config.imgNight) : (config.imgNight || config.img);
    return img ? `img/accu/${img}.png` : "";
  }
  return "";
}

export function getGlobalMinMax(...seriesArrays) {
  const allValues = seriesArrays.flat();
  const min = Math.min(...allValues);
  const max = Math.max(...allValues);
  return { min, max };
}

const TEMP_COLOR_STOPS = [
  { temp: -26, r: 0, g: 0, b: 255 },   // #0000ff і нижче
  { temp: 0, r: 126, g: 127, b: 127 }, // #7e7f7f
  { temp: 13, r: 0, g: 255, b: 0 },   // #00ff00
  { temp: 26, r: 255, g: 255, b: 0 }, // #ffff00
  { temp: 40, r: 255, g: 0, b: 0 },   // #ff0000 і вище
];

export function getTemperatureColor(temp) {
  const t = Math.max(-26, Math.min(40, temp));
  let i = 0;
  while (i < TEMP_COLOR_STOPS.length - 1 && TEMP_COLOR_STOPS[i + 1].temp < t) i++;
  const a = TEMP_COLOR_STOPS[i];
  const b = TEMP_COLOR_STOPS[i + 1];
  const range = b.temp - a.temp || 1;
  const f = (t - a.temp) / range;
  const r = Math.round(a.r + (b.r - a.r) * f);
  const g = Math.round(a.g + (b.g - a.g) * f);
  const bl = Math.round(a.b + (b.b - a.b) * f);
  return `rgba(${r},${g},${bl},1)`;
}

export function getWindColor(wind, opacity = 1) {
  let color = ((1.4 * wind) + 200);
  color = Math.round(color);
  return `hsl(${color} 100% ${80 - wind/4}% / ${opacity})`;
}

export function buildRangeBarHTML(value1, value2, globalMin, globalMax, extraClass = "") {
  const low = Math.min(value1, value2);
  const high = Math.max(value1, value2);

  const range = globalMax - globalMin || 1;
  const startPercent = Math.round(((low - globalMin) / range) * 100);
  const endPercent = Math.round(((high - globalMin) / range) * 100);
  const deltaPercent = Math.round(((high - low) / range) * 100);
  let styles;

  if ((extraClass === 'precip' || extraClass === 'uv') && globalMin === 0) {
    return '';
  }

  if (extraClass === 'temp') {
    styles = `
        bottom:${startPercent}%;
        height:${deltaPercent}%;
        background:
            linear-gradient(to top,
                ${getTemperatureColor(low)},
                ${getTemperatureColor(high)}
            )
        `;
  } else if (extraClass === 'wind') {
    styles = `
        bottom: 0%;
        height: 100%;
        background:
            linear-gradient(to top,
                ${getWindColor(globalMin)} 0%,
                ${getWindColor(low)} ${startPercent}%,
                ${getWindColor(low, .66)} ${startPercent}%,
                ${getWindColor(high, 0.066)} ${endPercent}%,
                transparent ${endPercent + 1}%,
                transparent
            )
        `;
  } else if (extraClass === 'precip') {
    styles = `
            bottom: 0%;
            height: ${value1*10}%;
            background: linear-gradient(to top,
            hsl(192.67deg 100% 49.22% / ${value2}),
            hsl(${value1*9+190}deg 100% 45.88% / ${value2})
          );
        `;
  } else if (extraClass === 'uv') {
    styles = `
            bottom: 0%;
            height: ${value1*10}%;
            background: linear-gradient(to top,
              hsl(260 66% 45% / 1), hsl(${260+value1*10} 66% 45% / 1));
        `;
  } else if (extraClass === 'precip-sum') {
    styles = `
            bottom: 0%;
            height: ${deltaPercent}%;
            background: linear-gradient(to top, hsl(192 100% 49% / 0.9), hsl(200 100% 45% / 0.9));
        `;
  } else if (extraClass === 'uv-daily') {
    styles = `
            bottom: 0%;
            height: ${deltaPercent}%;
            background: linear-gradient(to top, hsl(260 66% 45%), hsl(280 66% 45%));
        `;
  } else {
    styles = '';
  }

  return `
    <div class="hourly-range hourly-range--${extraClass}">
      <div class="hourly-range-track">
        <div class="hourly-range-fill"
            style="${styles}">
        </div>
      </div>
    </div>
  `;
}

export function formatTime(iso) {
  const d = new Date(iso);
  return d.toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" });
}

export function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("uk-UA", { weekday: "short", day: "numeric", month: "short" });
}
