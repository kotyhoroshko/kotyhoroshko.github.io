import {
  weatherConfig,
  getIconPath,
  getGlobalMinMax,
  buildRangeBarHTML,
  formatTime,
} from "./config.js";

export function renderHourly(data) {
  const hourly = data.hourly;

  const { min: windMin, max: windMax } = getGlobalMinMax(
    hourly.wind_speed_10m,
    hourly.wind_gusts_10m
  );

  const { min: tempMin, max: tempMax } = getGlobalMinMax(
    hourly.temperature_2m,
    hourly.apparent_temperature
  );

  const maxPrecipProbability = Math.max(...hourly.precipitation_probability);
  const maxUv = Math.max(...hourly.uv_index);

  const items = [];
  const len = hourly.time.length;
  for (let i = 0; i < len; i++) {
    const hc = weatherConfig[hourly.weather_code[i]] || { label: "—" };
    const himgPath = getIconPath(hc, hourly.time[i], hourly.weather_code[i]);

    const windRangeHtml = buildRangeBarHTML(
      hourly.wind_speed_10m[i],
      hourly.wind_gusts_10m[i],
      windMin,
      windMax,
      "wind"
    );

    const tempRangeHtml = buildRangeBarHTML(
      hourly.temperature_2m[i],
      hourly.apparent_temperature[i],
      tempMin,
      tempMax,
      "temp"
    );

    const precipRangeHtml = buildRangeBarHTML(
      hourly.precipitation[i],
      hourly.precipitation_probability[i],
      maxPrecipProbability,
      10,
      "precip"
    );

    const uvRangeHtml = buildRangeBarHTML(
      hourly.uv_index[i],
      0,
      maxUv,
      10,
      "uv"
    );

    items.push(`
      <div class="hourly-item">
        <span class="hourly-time">${formatTime(hourly.time[i])}</span>
        ${himgPath ? `<img src="${himgPath}" alt="" class="hourly-icon" />` : ""}
        <span class="hourly-desc">${hc.label || "—"}</span>
        ${tempRangeHtml}
        <span class="hourly-temp">${Math.round(hourly.temperature_2m[i])}°
          <span class="hourly-temp-feels">${Math.round(hourly.apparent_temperature[i])}°</span>
        </span>
        ${precipRangeHtml}
        <span class="hourly-extra ${!maxPrecipProbability ? "hidden" : ""}">
          ${hourly.precipitation[i]}mm, ${hourly.precipitation_probability[i]}%
        </span>
        ${windRangeHtml}
        <span class="hourly-extra" title="Вітер км/год">${hourly.wind_speed_10m[i]} / ${hourly.wind_gusts_10m[i]}</span>
        ${uvRangeHtml}
        <span class="hourly-extra ${!maxUv ? "hidden" : ""}">УФ індекс: ${hourly.uv_index[i]}</span>
      </div>
    `);
  }

  document.getElementById("hourly-card").innerHTML = `<div class="hourly">${items.join("")}</div>`;
}
