import {
  weatherConfig,
  getIconPath,
  getGlobalMinMax,
  buildRangeBarHTML,
  formatDate,
} from "./config.js";

export function renderDaily(data) {
  const daily = data.daily;

  const maxDailyPrecip = Math.max(...daily.precipitation_sum, 0.001);
  const maxDailyUv = Math.max(...daily.uv_index_max, 0.001);

  const { min: dailyTempMin, max: dailyTempMax } = getGlobalMinMax(
    daily.temperature_2m_min,
    daily.temperature_2m_max
  );
  const { min: dailyWindMin, max: dailyWindMax } = getGlobalMinMax(
    daily.wind_speed_10m_max,
    daily.wind_gusts_10m_max
  );

  const items = [];
  const len = daily.time.length;
  for (let i = 0; i < len; i++) {
    const dc = weatherConfig[daily.weather_code[i]] || { label: "—" };
    const dailyNoon = daily.time[i] + "T12:00:00";
    const dimgPath = getIconPath(dc, dailyNoon, daily.weather_code[i]);

    const dailyTempRangeHtml = buildRangeBarHTML(
      daily.temperature_2m_min[i],
      daily.temperature_2m_max[i],
      dailyTempMin,
      dailyTempMax,
      "temp"
    );
    const dailyWindRangeHtml = buildRangeBarHTML(
      daily.wind_speed_10m_max[i],
      daily.wind_gusts_10m_max[i],
      dailyWindMin,
      dailyWindMax,
      "wind"
    );
    const dailyPrecipRangeHtml = buildRangeBarHTML(
      0,
      daily.precipitation_sum[i],
      0,
      maxDailyPrecip,
      "precip-sum"
    );
    const dailyUvRangeHtml = buildRangeBarHTML(
      0,
      daily.uv_index_max[i],
      0,
      maxDailyUv,
      "uv-daily"
    );

    items.push(`
      <div class="daily-item">
        <span class="daily-date">${formatDate(daily.time[i])}</span>
        ${dimgPath ? `<img src="${dimgPath}" alt="" class="daily-icon" />` : ""}
        <span class="daily-desc">${dc.label || "—"}</span>
        ${dailyTempRangeHtml}
        <span class="daily-temp">${Math.round(daily.temperature_2m_max[i])}° / ${Math.round(daily.temperature_2m_min[i])}°</span>
        ${dailyPrecipRangeHtml}
        <span class="daily-precip">${daily.precipitation_sum[i]}mm / ${daily.precipitation_hours[i]}год</span>
        ${dailyWindRangeHtml}
        <span class="daily-extra" title="Вітер км/год">${daily.wind_speed_10m_max[i]} / ${daily.wind_gusts_10m_max[i]}</span>
        ${dailyUvRangeHtml}
        <span class="daily-extra">УФ ${daily.uv_index_max[i]}</span>
      </div>
    `);
  }

  document.getElementById("daily-card").innerHTML = `<div class="daily">${items.join("")}</div>`;
}
