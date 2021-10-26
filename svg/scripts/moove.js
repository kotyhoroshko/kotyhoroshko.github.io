function moove() {

  let xMouseCoor = 0;
  let yMouseCoor = 0;
  let circles = document.querySelectorAll('.svg > circle');

  function step(bg) {
    for (let index = 0; index < bg.length; index++) {

      let radius = bg[index].r.baseVal.valueInSpecifiedUnits;
      let x = bg[index].cx.baseVal.valueInSpecifiedUnits
      let y = bg[index].cy.baseVal.valueInSpecifiedUnits

      bg[index].cy.baseVal.valueInSpecifiedUnits += (50-yMouseCoor)/150*(radius);
      bg[index].cx.baseVal.valueInSpecifiedUnits += (50-xMouseCoor)/150*(radius);

      if (y > 100 + radius*2) {
        bg[index].cy.baseVal.valueInSpecifiedUnits = 0 - radius;
        bg[index].cx.baseVal.valueInSpecifiedUnits = getRnd(0, 100);
      }
      if (y < 0 - radius*2) {
        bg[index].cy.baseVal.valueInSpecifiedUnits = 100 + radius;
        bg[index].cx.baseVal.valueInSpecifiedUnits = getRnd(0, 100);
      }
      if (x > 100 + radius*2) {
        bg[index].cx.baseVal.valueInSpecifiedUnits = 0 - radius;
        bg[index].cy.baseVal.valueInSpecifiedUnits = getRnd(0, 100);
      }
      if (x < 0 - radius*2) {
        bg[index].cx.baseVal.valueInSpecifiedUnits = 100 + radius;
        bg[index].cy.baseVal.valueInSpecifiedUnits = getRnd(0, 100);
      }
    }
  }

  window.addEventListener('mousemove', getCoor);

  function getCoor(e) {
    xMouseCoor = e.pageX/window.innerWidth * 100;
    yMouseCoor = e.screenY/window.innerHeight * 100;
  }

  function getRnd(min, max=0) {
    return (Math.random() * (max - min) + min).toFixed(2);
  }

  (function go(){
    step(circles);
    window.requestAnimationFrame(go)
  })()
}
