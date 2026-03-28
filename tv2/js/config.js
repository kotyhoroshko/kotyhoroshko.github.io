export const LOCATION = { lat: 48.1573, lon: 23.1377, name: "Королево" };
export const UV_THRESHOLD = 5;

export const ICON_SOURCE = "accu";
export const OW_BASE = "https://openweathermap.org/img/wn";

export const WIND_LEVELS = [
  [15,  "Штиль", "Спокійний"],
  [35,  "Помірний", "Відчутний вітер, безпечно"],
  [55,  "Свіжий", "Хитаються дерева, важко з парасолькою"],
  [75,  "Сильний", "Гілки ламаються, літає сміття"],
  [100, "Штормовий", "Повалені дерева, затримки транспорту"],
  [Infinity, "Ураганний", "Екстремальна небезпека, руйнування"],
];

export const UV_LEVELS = [
  [2,  "Низький", "Мінімальний ризик. Захист потрібен лише для чутливої шкіри"],
  [5,  "Помірний", "Сонце небезпечне для відкритої шкіри. SPF 15–30, капелюх, окуляри, тінь близько полудня"],
  [7,  "Високий", "Є ризик опіку. SPF 30–50, довгий рукав, уникати сонця 10:00–16:00"],
  [10, "Дуже високий", "Опік за 15–20 хв. Крем кожні 2 год, шукайте тінь, максимальний захист"],
  [Infinity, "Екстремальний", "Краще не виходити. Шкіра горить за лічені хвилини"],
];

export const PRECIP_LEVELS_HOURLY = [
  [0,    "Без опадів", "Сухо, парасолька не потрібна"],
  [0.5,  "Незначні", "Ледь помітна волога"],
  [2,    "Слабкі", "Легкий дощик, парасолька бажана"],
  [5,    "Помірні", "Стабільний дощ, потрібна парасолька або дощовик"],
  [10,   "Сильні", "Промокнете швидко, краще перечекати вдома"],
  [20,   "Дуже сильні", "Зливи, можливі підтоплення вулиць"],
  [Infinity, "Екстремальні", "Стіна води, ризик повеней"],
];

export const PRECIP_LEVELS_DAILY = [
  [0,    "Без опадів", "Сухий день, парасолька не потрібна"],
  [1,    "Незначні", "Мінімальна волога протягом дня"],
  [5,    "Слабкі", "Невеликий дощ, парасолька бажана"],
  [15,   "Помірні", "Помітні опади, тримайте парасольку"],
  [30,   "Сильні", "Багато вологи, краще обмежити прогулянки"],
  [50,   "Дуже сильні", "Зливи, можливі підтоплення вулиць"],
  [Infinity, "Екстремальні", "Ризик повеней, небезпечно виходити"],
];

export const TEMP_COLOR_STOPS = [
  { temp: -26, r: 0,   g: 0,   b: 255 },
  { temp: 0,   r: 126, g: 127, b: 127 },
  { temp: 13,  r: 0,   g: 255, b: 0 },
  { temp: 26,  r: 255, g: 255, b: 0 },
  { temp: 40,  r: 255, g: 0,   b: 0 },
];

export const weatherConfig = {
  0:  { label: "Ясно",                    img: "weather-clear",                imgNight: "weather-clear-night",           ow: "01" },
  1:  { label: "Переважно ясно",          img: "weather-few-clouds",           imgNight: "weather-few-clouds-night",      ow: "01" },
  2:  { label: "Мінлива хмарність",       img: "weather-few-clouds",           imgNight: "weather-few-clouds-night",      ow: "02" },
  3:  { label: "Хмарно тотально",         img: "weather-many-clouds",          imgNight: "weather-clouds-night",          ow: "03" },
  45: { label: "Туман",                    img: "weather-mist",                                                            ow: "50" },
  48: { label: "Паморозь (туман з інеєм)", img: "weather-mist",                                                            ow: "50" },
  51: { label: "Легка мряка",             img: "weather-showers-scattered-day", imgNight: "weather-showers-scattered-night", ow: "09" },
  53: { label: "Помірна мряка",           img: "weather-showers-scattered-day", imgNight: "weather-showers-scattered-night", ow: "09" },
  55: { label: "Густа мряка",             img: "weather-showers-scattered",                                                 ow: "09" },
  56: { label: "Легка крижана мряка",     img: "weather-freezing-rain",                                                     ow: "09" },
  57: { label: "Густа крижана мряка",     img: "weather-freezing-rain",                                                     ow: "09" },
  61: { label: "Невеликий дощ",           img: "weather-showers-day",          imgNight: "weather-showers-night",          ow: "10" },
  63: { label: "Помірний дощ",            img: "weather-showers-day",          imgNight: "weather-showers-night",          ow: "10" },
  65: { label: "Сильний дощ",             img: "weather-showers",                                                           ow: "10" },
  66: { label: "Легкий крижаний дощ",     img: "weather-freezing-rain",                                                     ow: "10" },
  67: { label: "Сильний крижаний дощ",    img: "weather-freezing-rain",                                                     ow: "10" },
  71: { label: "Невеликий сніг",          img: "weather-snow-scattered-day",   imgNight: "weather-snow-scattered-night",   ow: "13" },
  73: { label: "Помірний сніг",           img: "weather-snow-scattered-day",   imgNight: "weather-snow-scattered-night",   ow: "13" },
  75: { label: "Сильний сніг",            img: "weather-snow",                                                              ow: "13" },
  77: { label: "Сніжна крупа",            img: "weather-snow-scattered",                                                    ow: "13" },
  80: { label: "Слабкий зливовий дощ",    img: "weather-showers-day",          imgNight: "weather-showers-night",          ow: "09" },
  81: { label: "Помірний зливовий дощ",   img: "weather-showers-day",          imgNight: "weather-showers-night",          ow: "09" },
  82: { label: "Сильна злива",            img: "weather-storm-day",            imgNight: "weather-storm-night",            ow: "09" },
  85: { label: "Легкий снігопад",         img: "weather-snow-scattered-day",   imgNight: "weather-snow-scattered-night",   ow: "13" },
  86: { label: "Сильний снігопад",        img: "weather-snow",                                                              ow: "13" },
  95: { label: "Гроза",                   img: "weather-storm-day",            imgNight: "weather-storm-night",            ow: "11" },
  96: { label: "Гроза з легким градом",   img: "weather-storm",                                                             ow: "11" },
  99: { label: "Гроза з сильним градом",  img: "weather-hail",                                                              ow: "11" },
};

export const WMO_KNOWN_CODES = new Set([
  0, 1, 2, 3, 45, 48, 51, 53, 55, 56, 57,
  61, 63, 65, 66, 67, 71, 73, 75, 77,
  80, 81, 82, 85, 86, 95, 96, 99,
]);

export const GPS_BUTTON_HTML = `<button type="button" class="location__gps-btn" title="Визначити моє місцезнаходження" aria-label="Визначити моє місцезнаходження"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0 0 13 3.06V1h-2v2.06A8.994 8.994 0 0 0 3.06 11H1v2h2.06A8.994 8.994 0 0 0 11 20.94V23h2v-2.06A8.994 8.994 0 0 0 20.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/></svg></button>`;
