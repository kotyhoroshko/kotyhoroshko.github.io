document.addEventListener("DOMContentLoaded", function() {

    let main = document.querySelector('.main');
    let saverClock = document.querySelector(".saver-clock");
    let nonActiveTime = false;

    document.addEventListener('mousemove', function(){
      nonActiveTime = false;
      main.style.opacity = "1"
      saverClock.style.opacity = "0"
    })

    setInterval(() => {
      nonActiveTime ? screenSaver() : screenSaverStop();
      nonActiveTime = true;
    }, 20000);

    function screenSaver() {
      main.style.opacity = "0"
      saverClock.style.opacity = "1"
    }

    function screenSaverStop() {
      main.style.opacity = "1"
      nonActiveTime = false;
      saverClock.style.opacity = "0"
    }

})