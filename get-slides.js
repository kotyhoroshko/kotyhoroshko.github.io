document.addEventListener("DOMContentLoaded", function(){

  // fetch("slides.json")
  //   .then(response => response.json())  
  //   .then(json => displayMainSlide(json.slides))
  //   .then(response => response ? false : console.log("Load JSON slides Base") )
  //   .catch(error => displayMainSlide(alternateSlideBase()))

  function alternateSlideBase() {
    console.log("Load alternate slides tBase (not JSON)");
    return [
    {
      "link" : "./hw/index.html",
      "subtitle" : "HomeWorks",
      "title" : "GO IT Homeworks"
    },        
    {
      "link" : "otakoyi/otakoyi.html",
      "subtitle" : "Test work",
      "title" : "OTTAKOYI"
    },        
    {
      "link" : "./visi/index.html",
      "subtitle" : "Visit card showcase",
      "title" : "Farmasi"
    },        
    {
      "link" : "./coins/index.html",
      "subtitle" : "Test work",
      "title" : "TOSS COINS"
    },        
    {
      "link" : "./scrumi-test/index.html",
      "subtitle" : "Test work",
      "title" : "Scrumi Test"
    },        
    {
      "link" : "./purecss/index.html",
      "subtitle" : "Test work",
      "title" : "Pure CSS"
    },        
    {
      "link" : "./parallax/index.html",
      "subtitle" : "Test work",
      "title" : "Paralax"
    },        
    {
      "link" : "./parallax3/index.html",
      "subtitle" : "Test work",
      "title" : "Paralax3"
    },        
    {
      "link" : "./europet/index.html",
      "subtitle" : "Symple landing",
      "title" : "Europet"
    },        
    {
      "link" : "./op/index.html",
      "subtitle" : "Osoznanoe pitanie",
      "title" : "Landing"
    },        
    {
      "link" : "./grand/index.html",
      "subtitle" : "Showcase",
      "title" : "SM Grand"
    },        
    {
      "link" : "./balls/index.html",
      "subtitle" : "Test work",
      "title" : "Balls"
    },        
    {
      "link" : "./grid/index.html",
      "subtitle" : "Test work",
      "title" : "Grid Gallery"
    },
    {
      "link" : "./weather/index.html",
      "subtitle" : "GC forecast",
      "title" : "Weather"
    },
    {
      "link" : "./3d-slider/index.html",
      "subtitle" : "Test work",
      "title" : "3d-Slider"
    }
  ]}

  function displayMainSlide(slideBase) {
    let scene = document.querySelector('.scene');
    let itemsQty = slideBase.length;
    let inner = '';
    for (let index = 0; index < slideBase.length; index++) {
        inner +=`<div class="item item__${index+1}">
        <a href="${slideBase[index].link}">
          <span> ${slideBase[index].subtitle}</span>
          <h2>${slideBase[index].title}</h2>
        </a>
        </div>`
    }
    // inner+=`<div class="ground"></div>`
    scene.innerHTML = inner;
  }

  let items = null;
  let scene = document.querySelector('.scene');
  displayMainSlide(alternateSlideBase());
  showcase();
  parallax();
})