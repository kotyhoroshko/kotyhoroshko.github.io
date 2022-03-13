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