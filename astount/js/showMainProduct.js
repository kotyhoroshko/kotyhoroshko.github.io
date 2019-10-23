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
      <form class="product-form-wrapper" action="/action_page.php">     
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
        <input type="radio" name="${attr}" value="${arr[index]}" id="${attr}-${arr[index]}">
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