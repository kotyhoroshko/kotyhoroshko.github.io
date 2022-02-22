document.addEventListener("DOMContentLoaded", function() {

    let currentRadio = null;

    document.querySelector('.radio').addEventListener('click', function(e){
        playStopRadio(e.target)
    });

    function playStopRadio(el) {
        if(el.closest('.radio-item')) {
            if (currentRadio) {
                currentRadio.src='';
                currentRadio.parentElement.dataset.active = false
            }
            currentRadio = el.closest('.radio-item').querySelector('audio')
            currentRadio.src = currentRadio.dataset.src
            currentRadio.play()
            currentRadio.parentElement.dataset.active = true
        }
    }
})

// let radioBase = {
//     https://ice2.somafm.com/secretagent-128-mp3
//     https://ice2.somafm.com/bootliquor-320-mp3
//     https://ice2.somafm.com/christmas-256-mp3
//     https://ice2.somafm.com/dubstep-256-mp3
//     https://ice2.somafm.com/folkfwd-128-mp3
//     https://ice2.somafm.com/illstreet-128-mp3
//     https://ice2.somafm.com/gsclassic-128-mp3
//     https://ice2.somafm.com/jollysoul-128-mp3
//     https://ice2.somafm.com/live-128-mp3
//     https://ice2.somafm.com/reggae-256-mp3
//     https://ice2.somafm.com/seventies-320-mp3
//     https://ice2.somafm.com/spacestation-128-mp3
//     https://ice2.somafm.com/suburbsofgoa-128-mp3
//     https://ice2.somafm.com/xmasinfrisko-128-mp3
// }