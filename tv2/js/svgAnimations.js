/**
 * SVG-анімації для фону візуалізацій погоди (дощ, вітер, сонце).
 * Класи .svg-bg-rain, .svg-bg-wind, .svg-bg-sun — обгортки для стилів у CSS.
 */

export function getRainSvg(precipAmount = 0, type = 'hourly') {
  if (precipAmount <= 0) {
    return `<svg class="svg-bg svg-bg-rain" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"></svg>`;
  }

  let drops = '';
  // Максимум опадів: для погодинного 10мм = 150 крапель, для денного 30мм = 150 крапель
  const maxPrecip = type === 'daily' ? 30 : 10;
  
  // Розраховуємо кількість крапель
  let dropCount = Math.round((precipAmount / maxPrecip) * 150);
  
  // Мінімум 10 крапель (оскільки опади > 0), максимум 150
  dropCount = Math.min(150, Math.max(10, dropCount));

  for (let i = 0; i < dropCount; i++) {
    const x = (Math.random() * 160 - 30).toFixed(1); // від -30 до 130
    const y = -20; // вище верхнього краю
    const delay = (Math.random() * 2).toFixed(2); // випадкова затримка
    const duration = (0.5 + Math.random() * 0.5).toFixed(2); // випадкова швидкість
    
    // Нахил: x зміщується на -1, y на 10
    const x2 = (parseFloat(x) - 1).toFixed(1);
    const y2 = y + 10;

    drops += `  <line class="drop" x1="${x}" y1="${y}" x2="${x2}" y2="${y2}" style="animation-delay: ${delay}s; animation-duration: ${duration}s;" />\n`;
  }
  
  return `
<svg class="svg-bg svg-bg-rain" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
${drops}</svg>`;
}

export function getWindSvg(windSpeed = 0, windGust = 0) {
  // windSpeed in km/h. Minimal wind lines for 0-5 km/h.
  let lines = '';
  
  if (windSpeed < 2 && windGust < 2) {
    return `<svg class="svg-bg svg-bg-wind" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"></svg>`;
  }

  // Кількість ліній залежить від базової швидкості вітру
  // 120 км/год = 40 ліній
  let lineCount = Math.round((windSpeed / 120) * 40);
  lineCount = Math.min(40, Math.max(3, lineCount)); // від 3 до 40 ліній

  // Швидкість анімації залежить від поривів вітру (чим сильніший порив, тим швидше)
  const speedFactor = Math.max(5, Math.min(120, windGust || windSpeed));

  for (let i = 0; i < lineCount; i++) {
    const y = (Math.random() * 100).toFixed(1);
    const length = (10 + Math.random() * 30).toFixed(1); // Довжина від 10 до 40
    
    // Базовий розрахунок тривалості анімації (чим більший speedFactor, тим менша тривалість)
    // 120 км/год -> ~0.2с, 5 км/год -> ~5с
    const duration = (25 / speedFactor + Math.random() * 0.5).toFixed(2);
    const delay = (Math.random() * 2).toFixed(2);
    
    const strokeWidth = (0.3 + Math.random() * 1.2).toFixed(1);
    const opacity = (0.2 + Math.random() * 0.6).toFixed(2);

    lines += `  <line class="wind-line" x1="-${length}" y1="${y}" x2="0" y2="${y}" style="stroke-width: ${strokeWidth}; --line-opacity: ${opacity}; animation-delay: ${delay}s; animation-duration: ${duration}s;" />\n`;
  }

  return `
<svg class="svg-bg svg-bg-wind" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
${lines}</svg>`;
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
