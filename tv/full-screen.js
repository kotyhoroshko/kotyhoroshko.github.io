document.addEventListener("DOMContentLoaded", function() {

    document.addEventListener("click", function(e) {
        if (e.target.dataset.fullScreen) {
          toggleFullScreen();
        }
    }, false);

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