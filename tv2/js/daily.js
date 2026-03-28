import { weatherConfig, UV_THRESHOLD } from "./config.js";
import { getIconPath, getGlobalMinMax, round1, formatDate, windTitle, uvTitle, precipTitle } from "./utils.js";
import { buildTempBar, buildWindBar, buildPrecipBar, buildUvBar, buildVizBlock } from "./barBuilders.js";
import { getRainSvg, getWindSvg, getSunSvg } from "./svgAnimations.js";

const PRECIP_THRESHOLD_MM = 0.5;
const DAILY_MAX_PRECIP_MM = 30;

export function renderDaily(data) {
  const { daily } = data;
  const showUv = Math.max(...daily.uv_index_max, 0) > UV_THRESHOLD;
  const showPrecip = Math.max(...(daily.precipitation_sum || []), 0) > PRECIP_THRESHOLD_MM;

  const { min: tempMin, max: tempMax } = getGlobalMinMax(daily.temperature_2m_min, daily.temperature_2m_max);
  const { min: windMin, max: windMax } = getGlobalMinMax(daily.wind_speed_10m_max, daily.wind_gusts_10m_max);

  const items = daily.time.map((time, i) => {
    const config = weatherConfig[daily.weather_code[i]] || { label: "—" };
    const iconPath = getIconPath(config, time + "T12:00:00", daily.weather_code[i]);

    const tempBar = buildTempBar(daily.temperature_2m_min[i], daily.temperature_2m_max[i], tempMin, tempMax);
    const windBar = buildWindBar(daily.wind_speed_10m_max[i], daily.wind_gusts_10m_max[i], windMin, windMax);
    const precipBar = showPrecip ? buildPrecipBar(daily.precipitation_sum[i], 100, DAILY_MAX_PRECIP_MM) : "";
    const uvBar = showUv ? buildUvBar(daily.uv_index_max[i]) : "";

    return `
      <div class="daily-item">
        <span class="daily-date">${formatDate(time)}</span>
        ${iconPath ? `<img src="${iconPath}" alt="" class="daily-icon" />` : ""}
        <span class="daily-desc">${config.label || "—"}</span>
        ${tempBar}
        <span class="daily-temp">${Math.round(daily.temperature_2m_max[i])}° / ${Math.round(daily.temperature_2m_min[i])}°</span>
        ${showPrecip ? buildVizBlock(getRainSvg(daily.precipitation_sum[i], "daily"), precipBar) : ""}
        ${showPrecip ? `<span class="daily-precip tip" tabindex="0" data-tip="${precipTitle(daily.precipitation_sum[i], null, "daily")}">${round1(daily.precipitation_sum[i])}мм / ${daily.precipitation_hours[i]}год</span>` : ""}
        ${buildVizBlock(getWindSvg(daily.wind_speed_10m_max[i], daily.wind_gusts_10m_max[i]), windBar)}
        <span class="daily-extra tip" tabindex="0" data-tip="${windTitle(daily.wind_speed_10m_max[i], daily.wind_gusts_10m_max[i])}">${Math.round(daily.wind_speed_10m_max[i])} / ${Math.round(daily.wind_gusts_10m_max[i])} км/год</span>
        ${showUv ? buildVizBlock(getSunSvg(), uvBar) : ""}
        ${showUv ? `<span class="daily-extra tip" tabindex="0" data-tip="${uvTitle(daily.uv_index_max[i])}">УФ ${round1(daily.uv_index_max[i])}</span>` : ""}
      </div>`;
  });

  return `<div class="daily">${items.join("")}</div>`;
}
