function createCircles() {

  createCircles(100);

  function createCircles(qty) {
    let circlesRads = [];

    for (let index = 0; index < qty; index++) {
      if ((qty*.6) > index){
        circlesRads[index] = getRnd(.1, 1)
      }
      else if ((qty*.9) > index) {
        circlesRads[index] = getRnd(1, 3)
      }
      else if ((qty*.97) > index){
        circlesRads[index] = getRnd(3, 8)
      }
      else {
        circlesRads[index] = getRnd(9, 18)
      }
    }

    circlesRads.sort(function(a, b) {
      return a - b;
    });

    paint(circlesRads, 'svg-rnd');
  }

  
  function paint(rads, clas) {
    let svg = document.querySelector(`.${clas}`);
    let inner = ``;       //////////////////////// Here insert gradient or filter ///////////////////
    
    for (let index = 0; index < rads.length; index++) {      
      inner += `
                <circle
                  id="circle-${clas}_${index+1}"
                  cx="${getRnd(100)}%"
                  cy="${getRnd(100)}%"
                  r="${rads[index]}%"
                  fill="${getRndColor(1-(rads[index]/15))}"
                  fill="url(#grad-${clas})"
                  opacity="${1.25-(rads[index]/20)}"
                />
      `;
    }    
    svg.innerHTML = inner;
  }

  function getRnd(min, max=0) {
    return (Math.random() * (max - min) + min).toFixed(2);
  }

  function getRndColor(alpha) {
    if (Math.random()>.5) {
      return `rgba(${getRnd(150, 255)},${getRnd(150, 255)},${getRnd(50, 155)},${alpha})`
    }
    else {
      return `rgba(${getRnd(150, 255)},${getRnd(50, 155)},${getRnd(150, 255)},${alpha})`
    }
  }
}

/* <filter id="${filter}">
  <feGaussianBlur in="SourceGraphic" stdDeviation="${radius}" />
</filter> */

/* <defs>
  <radialGradient
    id="grad-${clas}"
    cx="0.5" cy="0.5" r="0.5" fx="0.25" fy="0.25" >
    <stop offset="0%" stop-color="rgba(255,255,255,.9)"/>
    <stop offset="100%" stop-color="rgba(0,0,0,1)"/>
  </radialGradient>
</defs> */