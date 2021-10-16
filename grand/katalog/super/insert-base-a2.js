let content = document.querySelector('.content');

function page6() {
    // let inner = `<h2 class="title">${base.h6}</h2>`;
    let inner = '';
    for (let index = 0; index < base.length; index++) {
        
        inner += `<div class="item item--4 ${base[index].pic=='58'? 'double' : false}">
                    <div class="item__pic item__pic--4">
                        <img src="./img/${base[index].pic}.png">
                    </div>
                    <div class="item__desc item__desc--4">
                        <p>${base[index].desc}</p>
                    </div>
                </div>`
    }
    content.innerHTML = inner;
}
page6()