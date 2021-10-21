function moove() {
  console.log('Moove!')

  let xMouseCoor = 0;
  let yMouseCoor = 0;
  let bg0 = document.querySelectorAll('.svg0 > circle');
  let bg1 = document.querySelectorAll('.svg1 > circle');
  let bg2 = document.querySelectorAll('.svg2 > circle');
  let bg3 = document.querySelectorAll('.svg3 > circle');

  function step(bg) {
    for (let index = 0; index < bg.length; index++) {

      let rad = bg[index].r.baseVal.valueInSpecifiedUnits;
      let x = bg[index].cx.baseVal.valueInSpecifiedUnits
      let y = bg[index].cy.baseVal.valueInSpecifiedUnits

      bg[index].cy.baseVal.valueInSpecifiedUnits += (5-yMouseCoor)/5*(rad);
      bg[index].cx.baseVal.valueInSpecifiedUnits += (5-xMouseCoor)/5*(rad);

      if (y > 100 + rad) {
        bg[index].cy.baseVal.valueInSpecifiedUnits = 0 - rad;
        bg[index].cx.baseVal.valueInSpecifiedUnits = 100 - x;
      }
      if (y < 0 - rad) {
        bg[index].cy.baseVal.valueInSpecifiedUnits = 100 + rad;
        bg[index].cx.baseVal.valueInSpecifiedUnits = 100 - x;
      }
      if (x > 100 + rad) {
        bg[index].cx.baseVal.valueInSpecifiedUnits = 0 - rad;
        bg[index].cy.baseVal.valueInSpecifiedUnits = 100 - y;
      }
      if (x < 0 - rad) {
        bg[index].cx.baseVal.valueInSpecifiedUnits = 100 + rad;
        bg[index].cy.baseVal.valueInSpecifiedUnits = 100 - y;
      }
    }

  }

  (function go(){
    step(bg1);
    step(bg2);
    step(bg3);
    step(bg0);
    
    window.requestAnimationFrame(go)
  })()

  window.addEventListener('mousemove', getX);

  function getX(e) {
    xMouseCoor = e.pageX/window.innerWidth * 10;
    yMouseCoor = e.screenY/window.innerHeight * 10;
  }


}
