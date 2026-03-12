/**
 * SVG-анімації для фону візуалізацій погоди (дощ, вітер, сонце).
 * Класи .svg-bg-rain, .svg-bg-wind, .svg-bg-sun — обгортки для стилів у CSS.
 */

export function getRainSvg() {
  return `
<svg class="svg-bg svg-bg-rain" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path class="drop drop1" d="M67 66.1c0 16.1-7.4 23.2-16.4 23.2s-16.4-7.1-16.4-23.2 16.4-35.8 16.4-35.8S67 50.1 67 66.1z" />
  <path class="drop drop2" d="M90 34.5C90 45.2 85.2 50 79.2 50c-6 0-10.8-4.7-10.8-15.4s10.8-23.8 10.8-23.8S90 23.8 90 34.5z" />
  <path class="drop drop3" d="M27.8 52.8c0 9.9-4 14.3-8.9 14.3S10 62.8 10 52.8s8.9-22.1 8.9-22.1 8.9 12.2 8.9 22.1z" />
</svg>`;
}

export function getWindSvg() {
  return `
<svg class="svg-bg svg-bg-wind" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g transform="scale(0.8) translate(10, 10)">
    <path class="wind w1" d="M29.5 46.3c4.6-3.9 10.7-5.9 16.6-5.5 7.1.5 13.9 4.1 20.9 3.3 2-.2 4-.8 5.6-2 2.3-1.7 3.7-4.7 3.3-7.6-.4-2.9-2.7-5.4-5.5-6-2.8-.6-6 1-7.1 3.7-.7 1.7-.5 3.9.8 5.2 1.3 1.3 3.7 1.5 5 .1" />
    <path class="wind w2" d="M25.9 53.9c4.7-3.5 10-6.2 15.6-8" />
    <path class="wind w3" d="M36.4 54.7c4.6-3.8 10.6-5.9 16.5-5.9 9.5 0 18.3 5.2 27.8 5.2 2.7 0 5.7-.6 7.6-2.6 2.1-2.2 2.3-6.1.3-8.3-2.1-2.3-6.2-2.2-8.1.2-1 1.3-1.3 3.3-.2 4.6s3.5 1.2 4.2-.3" />
    <path class="wind w4" d="M10 67.1c4.4 3.2 10.7 2.5 15.9.7 6.2-2.2 11.9-5.7 17.8-8.8 2.2-1.2 4.4-2.3 6.8-2.9 3.2-.8 6.6-.7 9.7.4 1.6.6 3.1 1.4 4.2 2.6 2.1 2.3 2.5 6 1 8.7-1.6 2.7-5 4.2-8 3.5-.8-.2-1.7-.5-2.3-1.1-2.3-2.2-1.5-7.3 2.4-7 1.1.1 2.1.7 2.6 1.7" />
  </g>
</svg>`;
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
