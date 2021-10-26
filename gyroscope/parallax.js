document.addEventListener("DOMContentLoaded", function(){

  let tablo = document.querySelector('.table');
  // var z = e.alpha;
  var y = 0;
  var x = 0;

  if(window.DeviceOrientationEvent) {    

    function norm(value){
        Math.abs(value) > 90 ? value=4 : value=value*4/190
        return value
    }

    window.addEventListener("deviceorientation", function(e){
        y = e.beta;
        x = e.gamma;
    })
  }
  else {
    tablo.innerHTML= `DeviceOrientationEvent is not working`
  }

  (function go(){
    parseInt();
    window.requestAnimationFrame(go)
  })()
  

  function paint() {
    tablo.innerHTML= `
      <p>beta:<b>${y ? (y/36*10).toFixed() : 'none'}</b>^</p>
      <p>gamma:<b>${x ? (x/36*10).toFixed() : 'none'}</b></p>
      <span style="
              background: red;
              position: fixed;
              width: 3vw;
              height: 3vw;
              top:${y ? (y/36*10).toFixed(): 50}%;
              left:${x ? (x/36*10).toFixed(): 50}%
            "
      >+</span>
    `
  }

})