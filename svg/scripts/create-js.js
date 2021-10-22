function create() {
  console.log('Create!')

  paint(2,  [18, 33], 'svg-front', 'blur_front');
  paint(6,  [8, 12], 'svg1', 'blur');
  paint(33, [4, 7],  'svg2', 'blur2');
  paint(66, [1, 3],  'svg3', 'blur3');
  paint(200, [.1, 1], 'svg-back');
  
  function paint(qty, radius, clas, filter=false) {
    filter=false /////////////////////////////////////////temporary
    let svg = document.querySelector(`.${clas}`);
    let inner = `<defs>
                  <radialGradient
                    id="grad-${clas}"
                    cx="0.5" cy="0.5" r="0.5" fx="0.25" fy="0.25" >
                    <stop offset="0%" stop-color="rgba(255,255,255,1)"/>
                    <stop offset="100%" stop-color="rgba(0,0,0,1)"/>
                  </radialGradient>`;
    if (filter) {
      inner += `<filter id="${filter}">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="${(getRandomArbitrary(radius[0],radius[1])/2)}" />
                </filter>
              </defs>`
      }
    else {
      inner += '</defs>'
    }
    
    for (let index = 0; index < qty; index++) {
      let rad = getRandomArbitrary(radius[0],radius[1]);
      inner += `
                <circle
                  id="circle-${clas}_${index+1}"
                  cx="${getRandomArbitrary(100)}%"
                  cy="${getRandomArbitrary(100)}%"
                  r="${rad}%"
                  fill="url(#grad-${clas})"
                  fill="${getRandomColor(1-(rad/15))}"
                  ${filter ? 'filter="url(#'+filter+')"': ''}
                  opacity="${1.25-(rad/33)}"
                />
      `;
    }    
    svg.innerHTML = inner;
  }

  function getRandomArbitrary(min, max=0) {
    return Math.random() * (max - min) + min;
  }

  function getRandomColor(alpha) {
    if (Math.random()>.5) {
      return `rgba(${getRandomArbitrary(150, 255)},${getRandomArbitrary(150, 255)},${getRandomArbitrary(50, 155)},${alpha})`
    }
    else {
      return `rgba(${getRandomArbitrary(150, 255)},${getRandomArbitrary(50, 155)},${getRandomArbitrary(150, 255)},${alpha})`
    }
  }
}
