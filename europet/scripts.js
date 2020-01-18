document.addEventListener("DOMContentLoaded", function(){

let uaBlocks = document.querySelectorAll(".ua");
let ruBlocks = document.querySelectorAll(".ru");
let langBtn = document.querySelectorAll(".lang");
    langBtn[1].addEventListener('click', changeLang);
    langBtn[0].addEventListener('click', changeLang)

function changeLang() {
  for (let index = 0; index < ruBlocks.length; index++) {
    ruBlocks[index].classList.toggle('hidden')    
  }
  for (let index = 0; index < uaBlocks.length; index++) {
    uaBlocks[index].classList.toggle('hidden')    
  }
}
 
});