function moove() {
  console.log('Moove!')

  // let bg0 = document.querySelectorAll('.svg0 > circle');
  // let bg1 = document.querySelectorAll('.svg1 > circle');
  // let bg2 = document.querySelectorAll('.svg2 > circle');
  let bg3 = document.querySelectorAll('.svg3 > circle');

  // setInterval(() => {
  //   step(bg1, 20/10);
  //   step(bg2, 10/10);
  //   step(bg3, 4/10);
  //   step(bg0, 2/10);
  // }, 1000/25);

  // function step(bg, step) {
  //   for (let index = 0; index < bg.length; index++) {
  //     bg[index].cy.baseVal.valueInSpecifiedUnits += step;
  //     if (bg[index].cy.baseVal.valueInSpecifiedUnits>100+bg[index].r.baseVal.valueInSpecifiedUnits) {
  //       bg[index].style.transition="none";
  //       bg[index].cy.baseVal.valueInSpecifiedUnits = 0-bg[index].r.baseVal.valueInSpecifiedUnits;
  //       bg[index].cx.baseVal.valueInSpecifiedUnits = 100-bg[index].cx.baseVal.valueInSpecifiedUnits
  //       bg[index].style.transition=".01s ease";
  //     }
  //   }
  // }

  function stepTr(bg, step) {
    for (let index = 0; index < bg.length; index++) {
      bg[index].cy.baseVal.valueInSpecifiedUnits += step;
      if (bg[index].cy.baseVal.valueInSpecifiedUnits>100+bg[index].r.baseVal.valueInSpecifiedUnits) {
        bg[index].style.transition="none";
        bg[index].cy.baseVal.valueInSpecifiedUnits = 0-bg[index].r.baseVal.valueInSpecifiedUnits;
        bg[index].cx.baseVal.valueInSpecifiedUnits = 100-bg[index].cx.baseVal.valueInSpecifiedUnits
        bg[index].style.transition=".01s ease";
      }
    }
  }

  // setInterval(() => {
  //   console.log(bg3[0].cy.baseVal.valueInSpecifiedUnits)
  // }, 1000/25);

}
