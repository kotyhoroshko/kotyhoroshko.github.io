function create() {
  console.log('Create!')


  paint(50, [.2, 1], .9, 'svg0', 'blur0', 1, 30);
  paint(5, [8, 11], .33, 'svg1', 'blur', 10, 6);
  paint(20, [4, 7], .66, 'svg2', 'blur2', 6, 12);
  paint(33, [1, 3], .85, 'svg3', 'blur3', 3, 20);

  function paint(qty, radius, alpha, clas, filter='', fValue=0, dur) {
    let svg = document.querySelector(`.${clas}`);
    let inner = '';

    if (filter) {
      inner =`<filter id="${filter}">
                <feGaussianBlur in="SourceGraphic" stdDeviation="${fValue}" />
              </filter>`;      
    }
    
    for (let index = 0; index < qty; index++) {
      let rad = getRandomArbitrary(radius[0],radius[1]);
      inner += `<circle
                  id="${clas}_${index+1}"
                  cx="${getRandomArbitrary(100)}%"
                  cy="${0-rad}%"
                  r="${rad}%"
                  fill="${getRandomColor(alpha)}"
                  ${filter ? 'filter="url(#'+filter+')"': ''}
                />
                <animate 
                  xlink:href="#${clas}_${index+1}"
                  attributeName="cy"
                  dur="${dur}s"
                  to="${100+rad}%"
                  begin="${getRandomArbitrary(100)*10*dur}ms"
                  repeatCount="indefinite"
                  fill="freeze"
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

  moove()
}
