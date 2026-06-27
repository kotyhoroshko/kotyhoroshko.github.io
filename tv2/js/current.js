import { weatherConfig, LOCATION, GPS_BUTTON_HTML } from "./config.js";
import { getIconPath, formatTime, escapeHtml, round1, windTitle } from "./utils.js";

function dirLabel(deg) {
  const dirs = ["Пн", "ПнСх", "Сх", "ПдСх", "Пд", "ПдЗх", "Зх", "ПнЗх"];
  return dirs[Math.round(deg / 45) % 8];
}

export function renderCurrent(data, locationName = LOCATION.name) {
  const curr = data.current;
  const code = curr.weather_code;
  const config = weatherConfig[code] || {
    label: "Невідомо",
    img: "weather-many-clouds",
  };

  const daily = data.daily || {};
  const sunrise0 = daily.sunrise?.[0];
  const sunset0 = daily.sunset?.[0];
  const iconOpts =
    typeof curr.is_day === "number"
      ? { isDay: curr.is_day === 1 }
      : { sunrise: sunrise0, sunset: sunset0 };
  const imgPath = getIconPath(config, curr.time, code, iconOpts);

  const sunTimesHtml =
    sunrise0 && sunset0
      ? `<div class="sun-times"><span>Схід ${formatTime(sunrise0)}</span><span class="sun-times__sep">·</span><span>Захід ${formatTime(sunset0)}</span></div>`
      : "";

  return `
    <div class="location">
      ${GPS_BUTTON_HTML}
      <span class="location__name">${escapeHtml(locationName)}</span>
    </div>
    <div class="date">${new Date().toLocaleDateString("uk-UA", { weekday: "long", day: "numeric", month: "long" })}</div>
    <span class="time-stamp">Станом на ${formatTime(curr.time)}</span>
    <div class="description">${config.label}</div>
    <div class="main-info">
      <img src="${imgPath}" alt="${escapeHtml(config.label)}" class="main-icon" />
      <div class="temp-container">
        <div class="current-temp">${Math.round(curr.temperature_2m)}°</div>
        <div class="feels-like">${Math.round(curr.apparent_temperature)}°</div>
      </div>
      ${sunTimesHtml}
    </div>
    <div class="details">
      <div class="detail-item tip" tabindex="0" data-tip="${windTitle(curr.wind_speed_10m, curr.wind_gusts_10m)}"><span class="detail-label">Вітер</span><span class="detail-value">${Math.round(curr.wind_speed_10m)} км/год</span></div>
      <div class="detail-item tip" tabindex="0" data-tip="${windTitle(curr.wind_speed_10m, curr.wind_gusts_10m)}"><span class="detail-label">Пориви</span><span class="detail-value">${Math.round(curr.wind_gusts_10m)} км/год</span></div>
      <div class="detail-item"><span class="detail-label" title="${curr.wind_direction_10m}°">Напрям</span><span class="detail-value">${dirLabel(curr.wind_direction_10m)}</span></div>
      <div class="detail-item"><span class="detail-label" title="(mm)">Дощ</span><span class="detail-value">${round1(curr.rain ?? 0)}</span></div>
      <div class="detail-item"><span class="detail-label" title="(mm)">Зливи</span><span class="detail-value">${round1(curr.showers ?? 0)}</span></div>
      <div class="detail-item"><span class="detail-label" title="(cm)">Сніг</span><span class="detail-value">${round1(curr.snowfall ?? 0)}</span></div>
    </div>
  `;
}
