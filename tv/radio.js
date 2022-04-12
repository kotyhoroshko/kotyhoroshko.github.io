document.addEventListener("DOMContentLoaded", function() {

    var currentRadio = null;
    var prevRadio = null;
    var volume = document.querySelector('.volume');
    volume.addEventListener('input', function(){
        currentRadio.volume = volume.value;
    })

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
            if(!prevRadio || prevRadio.dataset.src != currentRadio.dataset.src) {
                currentRadio.src = currentRadio.dataset.src;
                currentRadio.parentElement.dataset.active = true;
                currentRadio.volume = volume.value;
                currentRadio.play();
                prevRadio = currentRadio
            }
            else {
                prevRadio= false
            }            
        }
    }
})
