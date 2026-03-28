/**
 * SVG-анімації для фону візуалізацій погоди (дощ, вітер, сонце).
 * Класи .svg-bg-rain, .svg-bg-wind, .svg-bg-sun — обгортки для стилів у CSS.
 */

const MAX_RAIN_DROPS = 150;
const MAX_WIND_LINES = 30;

const EMPTY_RAIN = `<svg class="svg-bg svg-bg-rain" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"></svg>`;
const EMPTY_WIND = `<svg class="svg-bg svg-bg-wind" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"></svg>`;

export function getRainSvg(precipAmount = 0, type = "hourly") {
  if (precipAmount <= 0) return EMPTY_RAIN;

  const maxPrecip = type === "daily" ? 30 : 10;
  const dropCount = Math.min(MAX_RAIN_DROPS, Math.max(5, Math.round((precipAmount / maxPrecip) * MAX_RAIN_DROPS)));

  let drops = "";
  for (let i = 0; i < dropCount; i++) {
    const x = (Math.random() * 160 - 30).toFixed(1);
    const y = -20;
    const delay = (Math.random() * 2).toFixed(2);
    const duration = (0.5 + Math.random() * 0.5).toFixed(2);
    const x2 = (parseFloat(x) - 1).toFixed(1);
    const y2 = y + 10;

    drops += `  <line class="drop" x1="${x}" y1="${y}" x2="${x2}" y2="${y2}" style="animation-delay:${delay}s;animation-duration:${duration}s" />\n`;
  }

  return `\n<svg class="svg-bg svg-bg-rain" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">\n${drops}</svg>`;
}

export function getWindSvg(windSpeed = 0, windGust = 0) {
  if (windSpeed < 2 && windGust < 2) return EMPTY_WIND;

  const lineCount = Math.min(MAX_WIND_LINES, Math.max(3, Math.round((windSpeed / 120) * MAX_WIND_LINES)));
  const speedFactor = Math.max(5, Math.min(120, windGust || windSpeed));

  let lines = "";
  for (let i = 0; i < lineCount; i++) {
    const y = (Math.random() * 100).toFixed(1);
    const length = (10 + Math.random() * 30).toFixed(1);
    const duration = (25 / speedFactor + Math.random() * 0.5).toFixed(2);
    const delay = (Math.random() * 2).toFixed(2);
    const strokeWidth = (0.3 + Math.random() * 1.2).toFixed(1);
    const opacity = (0.2 + Math.random() * 0.6).toFixed(2);

    lines += `  <line class="wind-line" x1="-${length}" y1="${y}" x2="0" y2="${y}" style="stroke-width:${strokeWidth};--line-opacity:${opacity};animation-delay:${delay}s;animation-duration:${duration}s" />\n`;
  }

  return `\n<svg class="svg-bg svg-bg-wind" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">\n${lines}</svg>`;
}

export function getSunSvg() {
  return `
<svg class="svg-bg svg-bg-sun" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g class="sun-group">
    <circle class="sun-core" fill="#ffdc6c" r="27" cy="50" cx="50" />
    <g fill="#f8b26a">
      <path d="M50 19.3c1.2 0 2.3.1 3.5.2L50 7.5l-3.5 12c1.2-.1 2.3-.2 3.5-.2z" />
      <path d="M37.7 21.9l-9-8.7 3 12.1c1.9-1.4 3.9-2.5 6-3.4z" />
      <path d="M25.3 31.8l-12.1-3 8.7 9c.9-2.2 2-4.2 3.4-6z" />
      <path d="M92.5 50l-12-3.5c.1 1.1.2 2.3.2 3.5s-.1 2.3-.2 3.5l12-3.5z" />
      <path d="M78.1 37.7l8.7-9-12.1 3c1.4 1.9 2.5 3.9 3.4 6z" />
      <path d="M68.2 25.3l3-12.1-9 8.7c2.2.9 4.2 2 6 3.4z" />
      <path d="M62.3 78.1l9 8.7-3-12.1c-1.9 1.4-3.9 2.5-6 3.4z" />
      <path d="M74.7 68.2l12.1 3-8.7-9c-.9 2.2-2 4.2-3.4 6z" />
      <path d="M50 80.7c-1.2 0-2.3-.1-3.5-.2l3.5 12 3.5-12c-1.2.1-2.3.2-3.5.2z" />
      <path d="M21.9 62.3l-8.7 9 12.1-3c-1.4-1.9-2.5-3.9-3.4-6z" />
      <path d="M31.8 74.7l-3 12.1 9-8.7c-2.2-.9-4.2-2-6-3.4z" />
      <path d="M19.3 50c0-1.2.1-2.3.2-3.5L7.5 50l12 3.5c-.1-1.2-.2-2.3-.2-3.5z" />
    </g>
  </g>
</svg>`;
}
