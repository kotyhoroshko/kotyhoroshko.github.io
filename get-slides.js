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
      "link" : "./gyroscope/index.html",
      "subtitle" : "Gyroscope test",
      "title" : "Gyroscope"
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
    },
    {
      "link" : "./svg/index.html",
      "subtitle" : "Test work",
      "title" : "SVG Animation"
    },
    {
      "link" : "./tv/index.html",
      "subtitle" : "app for kitchen-TV",
      "title" : "TV App"
    },
    {
      "link" : "./tv-app-2/index.html",
      "subtitle" : "Test work",
      "title" : "TV New"
    },
    {
      "link" : "./picanteria/index.html",
      "subtitle" : "Menu",
      "title" : "Picanteria"
    },
    {
      "link" : "./tysq/index.html",
      "subtitle" : "Graph",
      "title" : "tysQ"
    },
    {
      "link" : "./ByteCloud/index.html",
      "subtitle" : "Test Work",
      "title" : "Byte Cloud Tech"
    },
    {
      "link" : "./nice-shop/index.html",
      "subtitle" : "Vue JS",
      "title" : "XoroShop"
    },
    {
      "link" : "./us-zip-codes/index.html",
      "subtitle" : "Vue JS",
      "title" : "US ZIP codes"
    },
    {
      "link" : "./mugs-shop/index.html",
      "subtitle" : "Vue JS",
      "title" : "Mugs shop"
    },
    {
      "link" : "./djinni/index.html",
      "subtitle" : "Test work",
      "title" : "Djinni"
    },
    {
      "link" : "./calendar/index.html",
      "subtitle" : "Vue JS",
      "title" : "Calendar"
    },
    
  ]}

  function displayMainSlide(slideBase) {
    let scene = document.querySelector('.scene');
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

  displayMainSlide(alternateSlideBase().reverse());
  showcase();
  createCircles();
  moove();
})