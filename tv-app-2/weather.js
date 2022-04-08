
document.addEventListener("DOMContentLoaded", function() {
  
  function getWeatherFromAccu(e) {
    fetch(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${e.getAttribute('data-lockey')}?apikey=0tV5rkAIYVjrGg5OsD0wjbr4iGAMiU9A&language=uk-ua&metric=true`)
    .then(response => response.json())  
    .then(json => go(json, e.getAttribute('data-point-name'), e.getAttribute('data-lockey')) )  
    .then(json => console.log("Weather forecast was succesfully loaded"))
    .catch(error => console.log('Weather forecast not loaded'))  
  }

  document.querySelector('.locs').addEventListener('click', function(e) {
    if (e.target.parentElement.className == "locs__item") {

      if ( (7400000 - ((+new Date()) - new Date((JSON.parse(window.localStorage.getItem(e.target.parentElement.getAttribute('data-lockey')+'stamp'))))) )>0) {
        go( 
          JSON.parse(window.localStorage.getItem(e.target.parentElement.getAttribute('data-lockey'))),
          e.target.parentElement.getAttribute('data-point-name'),
          e.target.parentElement.getAttribute('data-lockey'))
        console.log ('Weather was load from LS')
        
      }

      else {
        getWeatherFromAccu(e.target.parentElement)
      }

    }
  })

})

function go(db2, locName, locKey){

  console.log(db2);

  window.localStorage.setItem(locKey, JSON.stringify(db2))
  window.localStorage.setItem(locKey+'stamp', JSON.stringify(new Date()))

  function getDate(date) {
    let clearDate = date.slice(8, 10)+'.'+date.slice(5, 7)+'.'+date.slice(2, 4)
    return clearDate
  }

  function getWeatherColor(temp) {
    let opacity=.66;
    let color = [(255/60*(temp+20)),(255-temp+20),(255-(255/60*(temp+20)))];
        color =color.map(Math.round);
    return `rgba(${color[0]},${color[1]},${color[2]},${opacity})`
  }

  function showMainInfo(){
    document.querySelector('.main-info').innerHTML = `
      <p class="main-info__dates"><span class="loc">Прогноз погоди <span class="loc__name">в ${locName}</span> на</span> <br> ${getDate(db2.DailyForecasts[0].Date)} 
       - 
       ${getDate(db2.DailyForecasts[4].Date)}</p>
      <p class="main-info__desc">${db2.Headline.Text}</p>      
    `
  }

  function showDaysInfo() {
    inn=''
    for (let index = 0; index < 5; index++) {   
      inn+=`
        <div class="days-info__item days-info__item--${index+1}" 
          style="background: linear-gradient(TRANSPARENT 20%, rgba(0,0,0,.66) ), linear-gradient(90deg, 
            ${getWeatherColor(db2.DailyForecasts[index].Temperature.Maximum.Value)}, 
            ${getWeatherColor(db2.DailyForecasts[index].Temperature.Minimum.Value)});"
          >
            <p class="date">${getDate(db2.DailyForecasts[index].Date)}</p>
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
  showMainInfo()
  showDaysInfo()
};
