document.addEventListener("DOMContentLoaded", function() {
  let fullScreen = document.querySelector('.full-screen-btn')

    fullScreen.addEventListener("click", toggleFullScreen);

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