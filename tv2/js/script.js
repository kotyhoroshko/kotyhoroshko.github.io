// Мапер кодів Open-Meteo WMO → зображення
// iconSource: 'openweather-cdn' | 'wmo' | 'accu'
//   openweather-cdn — іконки з openweathermap.org (CDN)
//   wmo — локальні SVG з img/wmo/ (WorldWeatherSymbols)
//   accu — локальні PNG з img/accu/ (AccuWeather-стиль)
const iconSource = "accu";

const OW_BASE = "https://openweathermap.org/img/wn";

function isDaytime(dateOrIso) {
  const d = dateOrIso ? new Date(dateOrIso) : new Date();
  const hour = d.getHours();
  return hour >= 6 && hour < 20;
}

// WMO → OpenWeather icon IDs (день/ніч) — маппінг з https://gist.github.com/stellasphere/9490c195ed2b53c707087c8c2db4ec0c
const weatherConfig = {
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

function getIconPath(config, dateOrIso, weatherCode) {
  if (!config) return "";
  if (iconSource === "openweather-cdn" && config.ow) {
    const suffix = isDaytime(dateOrIso) ? "d" : "n";
    return `${OW_BASE}/${config.ow}${suffix}@4x.png`;
  }
  if (iconSource === "wmo" && weatherCode != null) {
    const knownCodes = [0,1,2,3,45,48,51,53,55,56,57,61,63,65,66,67,71,73,75,77,80,81,82,85,86,95,96,99];
    const code = knownCodes.includes(weatherCode) ? String(weatherCode).padStart(2, "0") : "03";
    return `img/wmo/WeatherSymbol_WMO_PresentWeather_ww_${code}.svg`;
  }
  if (iconSource === "accu") {
    const img = isDaytime(dateOrIso) ? (config.img || config.imgNight) : (config.imgNight || config.img);
    return img ? `img/accu/${img}.png` : "";
  }
  return "";
}

async function updateWeather() {
  const lat = 48.1573;
  const lon = 23.1377;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=48.1573&longitude=23.1377&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,wind_speed_10m_max,wind_gusts_10m_max,precipitation_sum,precipitation_hours&hourly=temperature_2m,weather_code,precipitation,precipitation_probability,cloud_cover,wind_gusts_10m,wind_speed_10m,uv_index,apparent_temperature&current=temperature_2m,rain,showers,snowfall,weather_code,wind_speed_10m,wind_gusts_10m,wind_direction_10m,apparent_temperature&timezone=auto&forecast_days=3&forecast_hours=6`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const curr = data.current;
    const code = curr.weather_code;
    const config = weatherConfig[code] || {
      label: "Невідомо",
      img: "weather-many-clouds",
      color: "#000",
    };

    const imgPath = getIconPath(config, curr.time, code);

    const dirLabel = (deg) => {
      const dirs = ["Пн", "ПнСх", "Сх", "ПдСх", "Пд", "ПдЗх", "Зх", "ПнЗх"];
      return dirs[Math.round(deg / 45) % 8];
    };

    const formatTime = (iso) => {
      const d = new Date(iso);
      return d.toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" });
    };
    const formatDate = (iso) => {
      const d = new Date(iso);
      return d.toLocaleDateString("uk-UA", { weekday: "short", day: "numeric", month: "short" });
    };

    // Поточна погода — всі поля current
    const currentDetails = `
      <div class="details details--wide">
        <div class="detail-item"><span class="detail-label" title="км/год">Вітер</span><span class="detail-value">${curr.wind_speed_10m}</span></div>
        <div class="detail-item"><span class="detail-label" title="км/год">Пориви</span><span class="detail-value">${curr.wind_gusts_10m}</span></div>
        <div class="detail-item"><span class="detail-label" title="${curr.wind_direction_10m}°">Напрям</span><span class="detail-value">${dirLabel(curr.wind_direction_10m)}</span></div>
        <div class="detail-item"><span class="detail-label" title="(mm)">Дощ</span><span class="detail-value">${curr.rain ?? 0}</span></div>
        <div class="detail-item"><span class="detail-label" title="(mm)">Зливи</span><span class="detail-value">${curr.showers ?? 0}</span></div>
        <div class="detail-item"><span class="detail-label" title="(cm)">Сніг</span><span class="detail-value">${curr.snowfall ?? 0}</span></div>
      </div>
    `;

    // Погодинний прогноз — hourly
    const hourly = data.hourly;
    let hourlyHtml = '<div class="hourly">';
    for (let i = 0; i < hourly.time.length; i++) {
      const hc = weatherConfig[hourly.weather_code[i]] || { label: "—" };
      const himgPath = getIconPath(hc, hourly.time[i], hourly.weather_code[i]);
      hourlyHtml += `
        <div class="hourly-item">
          <span class="hourly-time">${formatTime(hourly.time[i])}</span>
          ${himgPath ? `<img src="${himgPath}" alt="" class="hourly-icon" />` : ""}
          <span class="hourly-temp">${Math.round(hourly.temperature_2m[i])}° <span class="hourly-temp-feels">${Math.round(hourly.apparent_temperature[i])}°</span></span>
          <span class="hourly-desc">${hc.label || "—"}</span>
          <span class="hourly-extra">Вітер: ${hourly.wind_speed_10m[i]} / ${hourly.wind_gusts_10m[i]} км/год</span>
          <span class="hourly-extra">Хмарність ${hourly.cloud_cover[i]}%</span>
          <span class="hourly-extra">Опади: ${hourly.precipitation[i]}mm, ${hourly.precipitation_probability[i]}%</span>
        </div>
      `;
    }
    hourlyHtml += "</div>";

    document.getElementById("hourly-card").innerHTML = hourlyHtml;

    // Денний прогноз — daily
    const daily = data.daily;
    let dailyHtml = '<div class="daily">';
    for (let i = 0; i < daily.time.length; i++) {
      const dc = weatherConfig[daily.weather_code[i]] || { label: "—" };
      const dailyNoon = daily.time[i] + "T12:00:00"; // денний прогноз → денна іконка
      const dimgPath = getIconPath(dc, dailyNoon, daily.weather_code[i]);
      dailyHtml += `
        <div class="daily-item">
          <span class="daily-date">${formatDate(daily.time[i])}</span>
          ${dimgPath ? `<img src="${dimgPath}" alt="" class="daily-icon" />` : ""}
          <span class="daily-desc">${dc.label || "—"}</span>
          <span class="daily-temp">${Math.round(daily.temperature_2m_max[i])}° / ${Math.round(daily.temperature_2m_min[i])}°</span>
          <span class="daily-extra">УФ ${daily.uv_index_max[i]} · вітер ${daily.wind_speed_10m_max[i]} км/год (пориви ${daily.wind_gusts_10m_max[i]})</span>
          <span class="daily-precip">опади ${daily.precipitation_sum[i]} mm за ${daily.precipitation_hours[i]} год</span>
        </div>
      `;
    }
    dailyHtml += "</div>";

    document.getElementById("daily-card").innerHTML = dailyHtml;

    const card = document.getElementById("weather-card");
    card.innerHTML = `
      <div class="location">Королево</div>
      <div class="date">${new Date().toLocaleDateString("uk-UA", { weekday: "long", day: "numeric", month: "long" })}
      
      <img src="${imgPath}" alt="${config.label}" class="main-icon" />
      <div class="temp-container">
        <div class="current-temp">${Math.round(curr.temperature_2m)}°</div>
        <div class="feels-like">${Math.round(curr.apparent_temperature)}°</div>
      </div>
      <div class="description">${config.label}</div>
      <span class="time-stamp">Станом на ${formatTime(curr.time)}</span>
      ${currentDetails}
    `;
  } catch (error) {
    document.getElementById("weather-card").innerHTML = "Помилка завантаження";
    document.getElementById("hourly-card").innerHTML = "Помилка завантаження";
    document.getElementById("daily-card").innerHTML = "Помилка завантаження";
  }
}

updateWeather();
