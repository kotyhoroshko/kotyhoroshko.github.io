import {
  weatherConfig, getIconPath, getGlobalMinMax, UV_THRESHOLD, round1,
  buildTempBar, buildWindBar, buildPrecipBar, buildUvBar,
  buildVizBlock, formatTime,
} from "./config.js";
import { getRainSvg, getWindSvg, getSunSvg } from "./svgAnimations.js";

const PRECIP_BLOCK_THRESHOLD = 20;
const PRECIP_BAR_THRESHOLD = 30;

export function renderHourly(data) {
  const { hourly, daily = {} } = data;
  const sunrise = daily.sunrise?.[0] || "07:00";
  const sunset = daily.sunset?.[0] || "20:00";

  const { min: windMin, max: windMax } = getGlobalMinMax(hourly.wind_speed_10m, hourly.wind_gusts_10m);
  const { min: tempMin, max: tempMax } = getGlobalMinMax(hourly.temperature_2m, hourly.apparent_temperature);
  const maxPrecipProb = Math.max(...hourly.precipitation_probability);
  const maxUv = Math.max(...hourly.uv_index);

  const showPrecipBlock = maxPrecipProb > PRECIP_BLOCK_THRESHOLD;
  const showPrecipBar = maxPrecipProb > PRECIP_BAR_THRESHOLD;
  const showUv = maxUv > UV_THRESHOLD;

  const items = hourly.time.map((time, i) => {
    const config = weatherConfig[hourly.weather_code[i]] || { label: "—" };
    const iconPath = getIconPath(config, time, hourly.weather_code[i], { sunrise, sunset });

    const tempBar = buildTempBar(hourly.temperature_2m[i], hourly.apparent_temperature[i], tempMin, tempMax);
    const windBar = buildWindBar(hourly.wind_speed_10m[i], hourly.wind_gusts_10m[i], windMin, windMax);
    const precipBar = showPrecipBar ? buildPrecipBar(hourly.precipitation[i], hourly.precipitation_probability[i]) : "";
    const uvBar = showUv ? buildUvBar(hourly.uv_index[i]) : "";

    return `
      <div class="hourly-item">
        <span class="hourly-time">${formatTime(time)}</span>
        ${iconPath ? `<img src="${iconPath}" alt="" class="hourly-icon" />` : ""}
        <span class="hourly-desc">${config.label || "—"}</span>
        ${tempBar}
        <span class="hourly-temp">${Math.round(hourly.temperature_2m[i])}°
          <span class="hourly-temp-feels">${Math.round(hourly.apparent_temperature[i])}°</span>
        </span>
        ${showPrecipBlock ? buildVizBlock(getRainSvg(hourly.precipitation[i], "hourly"), precipBar) : ""}
        <span class="hourly-extra ${maxPrecipProb ? "" : "hidden"}">
          ${round1(hourly.precipitation[i])}mm, ${hourly.precipitation_probability[i]}%
        </span>
        ${buildVizBlock(getWindSvg(hourly.wind_speed_10m[i], hourly.wind_gusts_10m[i]), windBar)}
        <span class="hourly-extra" title="Вітер км/год">${round1(hourly.wind_speed_10m[i])} / ${round1(hourly.wind_gusts_10m[i])}</span>
        ${showUv ? buildVizBlock(getSunSvg(), uvBar) : ""}
        <span class="hourly-extra ${showUv ? "" : "hidden"}">УФ: ${round1(hourly.uv_index[i])}</span>
      </div>`;
  });

  return `<div class="hourly">${items.join("")}</div>`;
}
