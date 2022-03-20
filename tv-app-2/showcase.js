let styleSheet = document.querySelector('#stylesheet');
let maxValue = {x:200, y:0, z:200, r:15};
let innerStyle = '';
let items = null;
let halfItemsQty = null;

function addStyles() {
    innerStyle += `[data-slide-number="1"] {transform: translate3d(0, 0, 0);}`
    for (let index = 1, xStep = (maxValue.x/halfItemsQty)+20, zStep = (maxValue.z/halfItemsQty)+20;
        index < halfItemsQty+1; index++) {
        innerStyle += `[data-slide-number="${index+1}"] {transform: translate3d(-${xStep}vmin, 0, -${zStep}vmin) rotateY(-${maxValue.r}deg);}                `
        xStep += maxValue.x/halfItemsQty;
        zStep += maxValue.x/halfItemsQty;
    }

    for (let index = items.length, xStep = (maxValue.x/halfItemsQty)+20, zStep = (maxValue.z/halfItemsQty)+20;
        index >= halfItemsQty+2; index--) {
        innerStyle += `[data-slide-number="${index}"] {transform: translate3d(${xStep}vmin, 0, -${zStep}vmin) rotateY(${maxValue.r}deg);}                    `
        xStep += maxValue.x/halfItemsQty;
        zStep += maxValue.x/halfItemsQty;
    }

    styleSheet.innerHTML = innerStyle;
}

function getRndColor() { 
    return Math.floor(Math.random() * 100) 
}

////////////////////////////////////////////////////////////////
/////////////////////////// moves //////////////////////////////

document.addEventListener('wheel', schroll);

function schroll(e) {
    e.deltaY>0 ? moveForward() : moveBack()
}

function moveForward() {
    for (let index = 0; index < items.length; index++) {        
        if (Number(items[index].dataset.slideNumber) == 1 ) {
            items[index].dataset.slideNumber = items.length;
        }
        else{
            items[index].dataset.slideNumber = Number(items[index].dataset.slideNumber)-1;
        }
    }
}

function moveBack() {
    for (let index = 0; index < items.length; index++) {
        if (Number(items[index].dataset.slideNumber) == items.length ) {
            items[index].dataset.slideNumber = 1;
        }
        else{
            items[index].dataset.slideNumber = Number(items[index].dataset.slideNumber)+1;
        }
    }
}