function moove() {
  console.log('Moove!')

  let bg0 = document.querySelectorAll('.svg0 > circle');
  let bg1 = document.querySelectorAll('.svg1 > circle');
  let bg2 = document.querySelectorAll('.svg2 > circle');
  let bg3 = document.querySelectorAll('.svg3 > circle');

  function step(bg, step) {
    for (let index = 0; index < bg.length; index++) {
      bg[index].cy.baseVal.valueInSpecifiedUnits += step;
      if (bg[index].cy.baseVal.valueInSpecifiedUnits>100+bg[index].r.baseVal.valueInSpecifiedUnits) {
        // bg[index].style.transition="none";
        bg[index].cy.baseVal.valueInSpecifiedUnits = 0-bg[index].r.baseVal.valueInSpecifiedUnits;
        bg[index].cx.baseVal.valueInSpecifiedUnits = 100-bg[index].cx.baseVal.valueInSpecifiedUnits
        // bg[index].style.transition=".01s ease";
      }
    }
  }

  function go(){
    step(bg1, 20/30);
    step(bg2, 10/30);
    step(bg3, 4/30);
    step(bg0, 2/30);
    
    window.requestAnimationFrame(go)
  }

  go()

}
