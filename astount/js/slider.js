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