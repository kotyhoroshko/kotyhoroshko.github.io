document.addEventListener("DOMContentLoaded", function() {

    let main = document.querySelector('.main');
    let nonActiveTime = false;

    document.addEventListener('mousemove', function(){
      nonActiveTime = false;
      main.style.opacity = "1"
    })

    setInterval(() => {
      nonActiveTime ? screenSaver() : screenSaverStop();
      nonActiveTime = true;
    }, 10000);

    function screenSaver() {
      main.style.opacity = "0"
    }

    function screenSaverStop() {
      main.style.opacity = "1"
      nonActiveTime = false;
    }

})