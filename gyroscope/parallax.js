document.addEventListener("DOMContentLoaded", function(){

  let tablo = document.querySelector('.table');

  if(window.DeviceOrientationEvent) {    

    function norm(value){
        Math.abs(value) > 90 ? value=4 : value=value*4/190
        return value
    }

    window.addEventListener("deviceorientation", function(e){
        var absolute = e.absolute;
        var z = (e.alpha);
        var y = (e.beta);
        var x = (e.gamma);
        tablo.innerHTML= `
          <p>absolute:<b> ${e.absolute}</b></p>
          <p>alpha:<b> ${z.toFixed(2)}</b></p>
          <p>beta:<b> ${y.toFixed(2)}</b></p>
          <p>gamma:<b> ${x.toFixed(2)}</b></p>        
        `
    })
  }


})