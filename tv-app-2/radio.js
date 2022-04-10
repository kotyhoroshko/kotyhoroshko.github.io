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
                currentRadio.parentElement.dataset.active = false;
                // currentRadio.parentElement.style.boxShadow = '0 4vmin 4vmin rgb(0 0 0 / 33%)';
            }
            currentRadio = el.closest('.radio-item').querySelector('audio')
            if(!prevRadio || prevRadio.dataset.src != currentRadio.dataset.src) {
                currentRadio.src = currentRadio.dataset.src;
                currentRadio.volume = volume.value;
                currentRadio.parentElement.dataset.active = true;
                // lightBox(currentRadio.parentElement);
                currentRadio.play()
                prevRadio = currentRadio
            }
            else {
                prevRadio= false
            }            
        }
    }

    function lightBox(item) {
        item.style.boxShadow = item.dataset.bgColor;
    }

})

