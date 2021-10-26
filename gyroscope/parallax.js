document.addEventListener("DOMContentLoaded", function(){

  let tablo = document.querySelector('.table');

  if(window.DeviceOrientationEvent) {    

    function norm(value){
        Math.abs(value) > 90 ? value=4 : value=value*4/190
        return value
    }

    window.addEventListener("deviceorientation", function(e){
        var absolute = e.absolute;
        var z = e.alpha;
        var y = e.beta;
        var x = e.gamma;
        tablo.innerHTML= `
          <p style="background: linear-gradient(90deg, rgba(255,255,255,1) ${(z/36*10)}%, rgba(4,255,29,1) ${(z/36*10)+1}%)">alpha:<b>${z ? z.toFixed() : 'none'}</b></p>
          <p style="background: linear-gradient(90deg, rgba(255,255,255,1) ${(y/36*10)}%, rgba(4,255,29,1) ${(y/36*10)+1}%)">beta:<b>${y ? y.toFixed() : 'none'}</b>^</p>
          <p style="background: linear-gradient(90deg, rgba(255,255,255,1) ${(x/36*10)}%, rgba(4,255,29,1) ${(x/36*10)+1}%)">gamma:<b>${x ? x.toFixed() : 'none'}</b></p>
        `
    })
  }
  else {
    tablo.innerHTML= `DeviceOrientationEvent is not working`
  }


})