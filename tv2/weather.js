document.addEventListener("DOMContentLoaded", function () {
  checkWeatherUpd();

  const renewBtn = document.querySelector(".reweather");
  renewBtn.addEventListener("click", checkWeatherUpd);
  renewBtn.addEventListener("keypress", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      checkWeatherUpd();
    }
  });
});

function getWeatherFromAccu() {
  fetch(
    `https://dataservice.accuweather.com/forecasts/v1/daily/5day/1214319?apikey=0tV5rkAIYVjrGg5OsD0wjbr4iGAMiU9A&language=uk-ua&metric=true`
  )
    .then((response) => response.json())
    .then((json) => go(json, "1214319"))
    .then((json) => console.log("Weather forecast was succesfully loaded"))
    .catch((error) => console.error("ERROR. Weather forecast not loaded"));
}

function checkWeatherUpd() {
  let timeStamp = JSON.parse(window.sessionStorage.getItem("timestamp"));

  if (new Date() - new Date(timeStamp) < 7200000) {
    go(JSON.parse(window.sessionStorage.getItem("1214319")), "1214319");
    console.log("Weather forecast was loaded from Locale Storage");
  } else {
    getWeatherFromAccu();
    window.sessionStorage.setItem("timestamp", JSON.stringify(new Date()));
  }
}
function go(db2, locKey) {
  window.sessionStorage.setItem(locKey, JSON.stringify(db2));

  function getDate(date) {
    let clearDate =
      date.slice(8, 10) + "." + date.slice(5, 7) + "." + date.slice(2, 4);
    return clearDate;
  }

  function showMainInfo() {
    document.querySelector(".main-info").innerHTML = `
      <p class="main-info__desc">${db2.Headline.Text}</p>
    `;
  }

  function showDaysInfo() {
    let inn = "";
    let data = db2.DailyForecasts;
    for (let index = 0; index < 5; index++) {
      inn += `
        <div class="days-info__item days-info__item--${index + 1}">
            <p class="date">${getDayName(data[index].Date)}</p>
            <p class="date--day">${getDate(data[index].Date)}</p>
            <div class="temperatures">
              <p class="temperatures__item">${
                data[index].Temperature.Maximum.Value
              }&#176;</p>              
              <p class="temperatures__item">${
                data[index].Temperature.Minimum.Value
              }&#176;</p>
            </div>
            <div class="day">
              <img src="img/${data[index].Day.Icon}-s.png" class="icon" />
              <p class="phrase">${data[index].Day.IconPhrase}</p>
            </div>
            <div class="night">
              <img src="img/${data[index].Night.Icon}-s.png" class="icon" />
              <p class="phrase">${data[index].Night.IconPhrase}</p>
            </div>
        </div>
      `;
    }
    document.querySelector(".days-info").innerHTML = inn;
  }

  function getDayName(date) {
    const dayName = [
      "Неділя",
      "Понеділок",
      "Вівторок",
      "Середа",
      "Четвер",
      "Пятниця",
      "Субота",
    ];
    return dayName[new Date(date).getDay()];
  }

  showMainInfo();
  showDaysInfo();
}

setInterval(() => {
  checkWeatherUpd();
}, 7200000);
