var wrapper = document.querySelector('.wrapper');
var inner = "";
for (let index = 1; index <= 167; index++) {
    if (index < 10) {
        inner += `
    <div class="item"><img class="item__img" src="jpg/00${index}.jpg"><span class="item__num">${index}</span></div>
    `
    } else if (index >= 100) {
        inner += `
    <div class="item"><img class="item__img" src="jpg/${index}.jpg"><span class="item__num">${index}</span></div>
    `
    } else {
        inner += `
        <div class="item"><img class="item__img" src="jpg/0${index}.jpg"><span class="item__num">${index}</span></div>
        `
    }
}

wrapper.innerHTML = inner;