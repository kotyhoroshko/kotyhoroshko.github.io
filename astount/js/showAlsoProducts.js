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