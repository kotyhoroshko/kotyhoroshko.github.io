document.addEventListener("DOMContentLoaded", function() {

  let fullScreen = document.querySelector('.full-screen-btn')
  
  fullScreen.addEventListener("click", function(e) {
        if (e.target.dataset.fullScreen) {
          toggleFullScreen();
        }
    }, false);

    fullScreen.addEventListener("keypress", function(e) {
      if (e.key === "Enter" || e.key === " ") {
        toggleFullScreen()
      }
    })

    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
        }
    }

})