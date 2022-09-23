document.addEventListener("DOMContentLoaded", function() {

  function getWeatherFromAccu() {
    fetch(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/1214319?apikey=0tV5rkAIYVjrGg5OsD0wjbr4iGAMiU9A&language=uk-ua&metric=true`)
    .then(response => response.json())  
    .then(json => go(json, '1214319'))  
    .then(json => console.log("Weather forecast was succesfully loaded"))
    .catch(error => console.log('ERROR. Weather forecast not loaded'))
  }

  function checkWeatherUpd() {
    if ( (7400000 - (new Date() - new Date(JSON.parse(window.localStorage.getItem('timestamp'))) ) )>0) {
      go(
        JSON.parse(window.localStorage.getItem('1214319')),
        '1214319'
      )
      console.log('Weather forecast was loaded from Locale Storage');
    }
    else {
      getWeatherFromAccu()
      window.localStorage.setItem('timestamp', JSON.stringify(new Date()))
    }
  }
  
  checkWeatherUpd()

  document.querySelector('.reweather').addEventListener('click', checkWeatherUpd);

  setInterval(() => {
    checkWeatherUpd()
}, 3600000);

})

function go(db2, locKey){

  window.localStorage.setItem(locKey, JSON.stringify(db2))

  function getDate(date) {
    let clearDate = date.slice(8, 10)+'.'+date.slice(5, 7)+'.'+date.slice(2, 4)
    return clearDate
  }

  function showMainInfo(){
    document.querySelector('.main-info').innerHTML = `
      <p class="main-info__desc">${db2.Headline.Text}</p>
    `
  }

  function showDaysInfo() {
    inn=''
    for (let index = 0; index < 5; index++) {   
      inn+=`
        <div class="days-info__item days-info__item--${index+1}">
            <p class="date">${getDayName(db2.DailyForecasts[index].Date)}</p>
            <p class="date--day">${getDate(db2.DailyForecasts[index].Date)}</p>
            <div class="temperatures">
              <p class="temperatures__item">${db2.DailyForecasts[index].Temperature.Maximum.Value}&#176;</p>              
              <p class="temperatures__item">${db2.DailyForecasts[index].Temperature.Minimum.Value}&#176;</p>
            </div>
            <div class="day">
              <img src="img/${db2.DailyForecasts[index].Day.Icon}-s.png" class="icon" />
              <p class="phrase">${db2.DailyForecasts[index].Day.IconPhrase}</p>
            </div>
            <div class="night">
              <img src="img/${db2.DailyForecasts[index].Night.Icon}-s.png" class="icon" />
              <p class="phrase">${db2.DailyForecasts[index].Night.IconPhrase}</p>
            </div>
        </div>
      `
    }
    document.querySelector('.days-info').innerHTML = inn;
  }

  let dayName = [
    "Неділя",
    "Понеділок",
    "Вівторок",
    "Середа",
    "Четвер",
    "Пятниця",
    "Субота"
  ]
  function getDayName(date) {
    return dayName[new Date(date).getDay()]
  }

  showMainInfo()
  showDaysInfo()
};
