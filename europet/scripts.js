document.addEventListener("DOMContentLoaded", function(){

  let uaBlocks = document.querySelectorAll(".ua");
  let ruBlocks = document.querySelectorAll(".ru");
  let langBtn = document.querySelectorAll(".lang__item");
      langBtn[0].addEventListener('click', setUa);
      langBtn[1].addEventListener('click', setRu);

  function setUa() {
    for (let index = 0; index < uaBlocks.length; index++) {      
      ruBlocks[index].classList.add('hidden');
      uaBlocks[index].classList.remove('hidden');
      localStorage.lang="ua";
    }
  }

  function setRu() {
    for (let index = 0; index < ruBlocks.length; index++) {
      ruBlocks[index].classList.remove('hidden');
      uaBlocks[index].classList.add('hidden');
      localStorage.lang="ru"
    }
  }

  (function getPreviousLang() {
    if(localStorage.lang=="ru") {   
      setRu();
    } 
  })()
 
});