let items = document.querySelectorAll('.item');
let halfItemsQty = (items.length-1-(items.length-1)%2)/2;
let styleSheet = document.querySelector('#stylesheet');
let innerStyle = '';
let maxValue = {x:200, y:0, z:200, r:15};

function addStyles() {
    innerStyle += `[data-slide-number="1"] {transform: translate3d(0, 0, 12vmin)}`
    for (let index = 1, xStep = (maxValue.x/halfItemsQty)+20, zStep = (maxValue.z/halfItemsQty)+20;
        index < halfItemsQty+1; index++) {
        innerStyle += `[data-slide-number="${index+1}"] {transform: translate3d(-${xStep}vmin, 0, -${zStep}vmin) rotateY(-${maxValue.r}deg);}`
        xStep += maxValue.x/halfItemsQty;
        zStep += maxValue.x/halfItemsQty;
    }

    for (let index = items.length, xStep = (maxValue.x/halfItemsQty)+20, zStep = (maxValue.z/halfItemsQty)+20;
        index >= halfItemsQty+2; index--) {
        innerStyle += `[data-slide-number="${index}"] {transform: translate3d(${xStep}vmin, 0, -${zStep}vmin) rotateY(${maxValue.r}deg);}`
        xStep += maxValue.x/halfItemsQty;
        zStep += maxValue.x/halfItemsQty;
    }

    styleSheet.innerHTML = innerStyle;
}
addStyles()

function getRndColor() {
    return Math.floor(Math.random() * 255);
}

items.forEach((element, index) => {
    element.dataset.bgColor = `0 2vmin 10vmin rgb(${getRndColor()},${getRndColor()},${getRndColor()}, 66%)`;
    element.dataset.slideNumber = `${index+1}`
});