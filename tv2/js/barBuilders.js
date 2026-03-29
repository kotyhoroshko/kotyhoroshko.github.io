import { getTemperatureColor, getWindColor } from "./utils.js";

function rangeBarShell(type, styles) {
  return `
    <div class="range-bar range-bar--${type}">
      <div class="range-bar__track">
        <div class="range-bar__fill" style="${styles}"></div>
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
 * @param {number} amountMm   - кількість опадів у мм
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
      hsl(${hue}deg 100% 50% / ${bottomAlpha})
    )
  `);
}

const UV_BAR_MAX_INDEX = 10;

export function buildUvBar(uvIndex) {
  const heightPct = Math.min(uvIndex * UV_BAR_MAX_INDEX, 100);
  const green = Math.round(Math.max(0, 255 - uvIndex * (255 / UV_BAR_MAX_INDEX)));

  return rangeBarShell("uv", `
    bottom: 0%;
    height: ${heightPct}%;
    background: linear-gradient(to top, rgb(255 255 0), rgb(255 ${green} 0))
  `);
}

export function buildVizBlock(svgHtml, rangeHtml) {
  return `
    <div class="viz-wrap">
      <div class="viz-wrap__bg">${svgHtml}</div>
      <div class="viz-wrap__content">${rangeHtml}</div>
    </div>`;
}
