document.addEventListener("DOMContentLoaded", function() {

    let main = document.querySelector('.main');
    let videoBg = document.querySelector('.video-bg');
    let saverClock = document.querySelector(".saver-clock");
    let nonActiveTime = false;

    document.addEventListener('mousemove', getUp)
    document.addEventListener('touchstart', getUp)

    function getUp(){
      nonActiveTime = false;
      main.style.opacity = "1";
      saverClock.style.opacity = "0";
      videoBg.style.opacity = ".2";
    }

    setInterval(() => {
      nonActiveTime ? screenSaver() : screenSaverStop();
      nonActiveTime = true;
    }, 40000);

    function screenSaver() {
      main.style.opacity = "0";
      saverClock.style.opacity = "1";
      videoBg.style.opacity = "1";
    }

    function screenSaverStop() {
      main.style.opacity = "1";
      nonActiveTime = false;
      saverClock.style.opacity = "0";
      videoBg.style.opacity = ".2";
    }

})