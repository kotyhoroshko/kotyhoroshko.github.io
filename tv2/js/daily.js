import {
  weatherConfig,
  getIconPath,
  getGlobalMinMax,
  buildRangeBarHTML,
  formatDate,
} from "./config.js";
import { getRainSvg, getWindSvg, getSunSvg } from "./svgAnimations.js";

export function renderDaily(data) {
  const daily = data.daily;
  let isWeekUvEnough = Math.max(...daily.uv_index_max, 0) < 5;
  let isWeekPrecipEnough = Math.max(...(daily.precipitation_sum || []), 0) < 0.5;
  // isWeekPrecipEnough = false;

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
    const dimgPath = getIconPath(dc, daily.time[i] + "T12:00:00", daily.weather_code[i]);

    // daily.temperature_2m_min[i] = i*5;
    // daily.temperature_2m_max[i] = i*5 + 10;
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
    // daily.precipitation_sum[i] = i*5
    const dailyPrecipRangeHtml = buildRangeBarHTML(
      0,
      daily.precipitation_sum[i],
      0,
      30, //maxDailyPrecipRange
      "precip-sum"
    );
    const dailyUvRangeHtml = buildRangeBarHTML(
      0,
      daily.uv_index_max[i],
      0,
      10, // maxDailyUvRange
      "uv-daily"
    );

    const precipBlock = `<div class="viz-wrap ${isWeekPrecipEnough ? "hidden" : ""}"><div class="viz-wrap__bg">${getRainSvg()}</div><div class="viz-wrap__content">${dailyPrecipRangeHtml}</div></div>`;
    const windBlock = `<div class="viz-wrap"><div class="viz-wrap__bg">${getWindSvg()}</div><div class="viz-wrap__content">${dailyWindRangeHtml}</div></div>`;
    const uvBlock = `<div class="viz-wrap ${isWeekUvEnough ? "hidden" : ""}"><div class="viz-wrap__bg">${getSunSvg()}</div><div class="viz-wrap__content">${dailyUvRangeHtml}</div></div>`;

    items.push(`
      <div class="daily-item">
        <span class="daily-date">${formatDate(daily.time[i])}</span>
        ${dimgPath ? `<img src="${dimgPath}" alt="" class="daily-icon" />` : ""}
        <span class="daily-desc">${dc.label || "—"}</span>
        ${dailyTempRangeHtml}
        <span class="daily-temp">${Math.round(daily.temperature_2m_max[i])}° / ${Math.round(daily.temperature_2m_min[i])}°</span>
        ${precipBlock}
        <span class="daily-precip ${isWeekPrecipEnough ? "hidden" : ""}">${daily.precipitation_sum[i]}мм / ${daily.precipitation_hours[i]}год</span>
        ${windBlock}
        <span class="daily-extra" title="Вітер км/год">${daily.wind_speed_10m_max[i]} / ${daily.wind_gusts_10m_max[i]}</span>
        ${uvBlock}
        <span class="daily-extra ${isWeekUvEnough ? "hidden" : ""}">УФ ${daily.uv_index_max[i]}</span>
      </div>
    `);
  }

  return `<div class="daily">${items.join("")}</div>`;
}
