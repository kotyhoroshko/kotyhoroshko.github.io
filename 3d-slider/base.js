let scene = document.querySelector('.scene');
let itemsQty = 21;
let inner = '';

for (let index = 1; index <= itemsQty; index++) {
    inner +=`<div class="item item__${index}">Slide ${index}</div>`    
}

scene.innerHTML = inner;