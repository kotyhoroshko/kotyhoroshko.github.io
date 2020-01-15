document.addEventListener("DOMContentLoaded", function(){

  fetch("products.json")
    .then(response => response.json())  
    .then(json => displayMainProduct(json.products, 0))
    .then(response => response ? false : console.log("Load JSON productBase") )
    .catch(error => displayMainProduct(alternateProductBase(), 0))

});

function alternateProductBase(){
  console.log("Load alternate productBase (not JSON)");
  return [
    {
      "art": 701642853695,
      "title": "For gamers by gamers TEE",
      "desc": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
      "img": "7b",
      "price": 29.50,
      "spPrice": 19.99,
      "size": ["xs", "s", "m"],
      "color": ["77d8e7", "96c795", "ce92a1", "0093cf"],
      "rate": 4
    },
    {
      "art": 701642853696,
      "title": "For gamers by gamers TEE",
      "desc": "Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
      "img": "1",
      "price": 29.99,
      "spPrice": 19.99,
      "size": ["xs", "s", "m"],
      "color": ["77d8e7", "966d05", "cc55aa", "aa99cc"],
      "rate": 1.5
    },
    {
      "art": 701642853697,
      "title": "PRO gamer SLASH HOODIE",
      "desc": "Lorem ipsum amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
      "img": "2",
      "price": 49.99,
      "spPrice": false,
      "size": ["xs", "s", "m", "l"],
      "color": ["77ddee", "cc0000", "00ff00", "ff33ff"],
      "rate": 4.95
    },
    {
      "art": 701642853698,
      "title": "spectroom GAMER TEE",
      "desc": "Dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
      "img": "3",
      "price": 24.99,
      "spPrice": false,
      "size": ["s", "m", "l", "xl"],
      "color": ["ff00ff", "000000", "ff9911", "aa93cf"],
      "rate": 4.2
    },
    {
      "art": 701642853699,
      "title": "GAMING FOR GOOD TEE",
      "desc": "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
      "img": "4",
      "price": 29.90,
      "spPrice": 19.99,
      "size": ["xs", "s", "m"],
      "color": ["770022", "00cc11",  "966d05", "667766"],
      "rate": 2.51
    },
    {
      "art": 701642853700,
      "title": "GAMING FOR GOOD TEE",
      "desc": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
      "img": "5",
      "price": 60,
      "spPrice": false,
      "size": ["s", "m", "l"],
      "color": ["776655", "ff0033"],
      "rate": 4.82
    },
    {
      "art": 701642853701,
      "title": "spectroom varsity hoodie",
      "desc": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
      "img": "6",
      "price": 54.00,
      "spPrice": false,
      "size": ["xs", "s", "m", "l"],
      "color": ["0000ee", "33ff33", "c9c9c9", "aa0000"],
      "rate": 3.33
    }
  ];  
}
function getAlsoProducts(products, exceptArt) {
    let returnHtml ='';
    for (let index = 0; index < products.length; index++) {
      if (products[index].art!=exceptArt){  
        returnHtml += `
        <div class="also-product" id="${products[index].art}">
          <img class="also-product__img" src="img/${products[index].img}.png" alt="${products[index].title}">
          <div class="also-product-price">
              <span class="also-product-price__value ${checkSpecialPrice(products[index].spPrice)}">$${products[index].price.toFixed(2)}</span>
              <span class="also-product-price__value also-product-price__value--special">${getSpPrice(products[index].spPrice)}</span>
          </div>
          <h3 class="also-product__title">${products[index].title}</h3>
        </div>
        `
      }
    }   

    let alsoProducts = document.querySelector('.also-products');
    alsoProducts.classList.add("hide");
    setTimeout(() => {
      alsoProducts.innerHTML = returnHtml;
      alsoProducts.classList.remove("hide");
      slideNavigate(alsoProducts);
      showProductOnClick(products);
    }, 150);
}

function getShowNowProductArt(products, showNowProductArt) {
    for (let index = 0; index < products.length; index++) {     
      if ( products[index].art == showNowProductArt) {
        return index;
      }      
    }
    return 0;
}
function displayMainProduct(products, ShowNowProductArt) {
    let product = products[getShowNowProductArt(products, ShowNowProductArt)];
    document.querySelector('.product').classList.add("hide");
    setTimeout(() => {
      document.querySelector('.product').innerHTML=`
      <h1 class="product-title">${product.title}</h1>
      <div class="product-image">
        <img src="img/${product.img}.png" alt="${product.title}">
      </div>
      <p class="product-art">item #: ${product.art}</p>
      <div class="product-price">
        <span class="product-price__value ${checkSpecialPrice(product.spPrice)}">$${product.price.toFixed(2)}</span>
        <span class="product-price__value product-price__value--special">${getSpPrice(product.spPrice)}</span>
      </div>        
      <div class="product-rate" title="${(product.rate)}"
        style="background: linear-gradient(to right, #ce2c52 ${(product.rate)*20}%, rgb(171, 171, 171) ${(product.rate)*20}%);">
      </div>
      <span class="product-share-title">Share it!</span>
      <div class="product-share">
        <a href="#fb" class="product-share__item product-share__item--fb"></a>
        <a href="#tw" class="product-share__item product-share__item--tw"></a>
        <a href="#pi" class="product-share__item product-share__item--pi"></a>
        <a href="#yt" class="product-share__item product-share__item--yt"></a>
        <span class="product-share__item product-share__item--close"></span>
      </div>
      <div class="product-detail">
        <h2 class="product-detail__title">Details:</h2>
        <p class="product-detail__desc">${product.desc}</p>
      </div>
      <form class="product-form-wrapper" action="javascript:alert(showCart())" name="productAttr">     
        <div class="product-size">
          <span class="product-size__title"><span>Select a </span>size:</span>
          <div class="product-size__items">
            ${getAttrItems("size", product.size)}
          </div>
        </div>
        <div class="product-color">
          <span class="product-color__title"><span>Select a </span>color:</span>
          <div class="product-color__items">               
            ${getAttrItems("color", product.color)}
          </div>
        </div>
        <input class="addtocart-btn" type="submit" value="Add to cart">
      </form>
      `
      getAlsoProducts(products, product.art);
      hideShowShareBlock();
      document.querySelector('.product').classList.remove("hide")
    }, 300);
}

function getSpPrice(spPrice) {
    if(spPrice) {    
      return ("$"+spPrice.toFixed(2));
    }
    return ""
}

function checkSpecialPrice(spPrice) {
    if(spPrice) {
      return "outdated";
    }
    return ""
}

function getAttrItems(attr, arr, returnHtml='') {

    function checkAttr(index) {
        if (attr=="color"){
        return `style="background-color: #${arr[index]}">`
        }
        return `>${arr[index]}`
    }

    for (let index = 0; index < arr.length; index++) {
        returnHtml += `
        <div class="product-${attr}-item">
        <input type="radio" name="${attr}" value="${arr[index]}" id="${attr}-${arr[index]}" checked>
        <label class="product-${attr}__item" for="${attr}-${arr[index]}" ${checkAttr(index)}</label>
        </div>`;
    }
    return returnHtml;
}

function hideShowShareBlock() {
    document.querySelector('.product-share-title').addEventListener('click', toggleShowClass);
    document.querySelector('.product-share__item--close').addEventListener('click', toggleShowClass);
    function toggleShowClass() {
      document.querySelector('.product-share').classList.toggle('show')
    }
}

function showCart() {
    let checkedColor = document.querySelector('.product-color-item input:checked').value;
    let checkedSize = document.querySelector('.product-size-item input:checked').value;
    let checkedArt = document.querySelector('.product-art').textContent;

    return `Product ${checkedArt} now in cart!
             - color: #${checkedColor};
             - size: ${checkedSize}.`
    
}
function showProductOnClick(products) {    
    document.querySelectorAll('.also-product').forEach(function(item) {
      item.addEventListener('click', function(e){
        displayMainProduct(products, e.target.parentElement.id)
      })
    })
  }

  function slideNavigate(sliderContainer){    
    sliderContainer.style.left="0%";
    let alsoProducts = document.querySelectorAll('.also-product');
    alsoProducts.forEach(function(item, index) {
      item.slideNum = index
    })
  }

  document.querySelector('.also-nav').addEventListener('click', function(e){   
    moveSlider(e.target.className, document.querySelector('.also-products'), document.querySelectorAll('.also-product').length)
  });

  function moveSlider(className, sliderContainer, slideQty) {
    let sliderContainerPos = parseFloat(sliderContainer.style.left); 
    if((className=="also-nav__next")&&(sliderContainerPos > (100-(slideQty*100)))) {
      sliderContainer.style.left = sliderContainerPos-100+"%";
    }
    else if ((className=="also-nav__prev")&&(sliderContainerPos < 0)){
      sliderContainer.style.left = sliderContainerPos+100+"%";     
    }    
  }