let arrName = document.querySelector('input.arrName');
let showAliveGuilty = document.querySelector('.showAlive');
let showArea = document.querySelector('.showArr');
let joberZone = document.querySelector('.joberZone');
joberZone.addEventListener('click', showCreatedArr);
let arrLength = document.querySelector('#length');
arrLength.addEventListener('click', createArr);
let bellBtn = document.querySelector('.bell');
bellBtn.addEventListener('click', findAlive);
let pRes = document.createElement("p");
pRes.style.fontSize = "24px";
let guiltys = [];
createArr()

function createArr() {
    let inptsForCreateArr = '';
    for (let i = 0; i < arrLength.value; i++) {
        inptsForCreateArr += '<input class="arrItem" type="number" min="0" step="1" placeholder="Введите лину когтя L' + (i + 1) + '">';
    }
    showArea.innerHTML = inptsForCreateArr;
    showCreatedArr()
}

function showCreatedArr() {
    guiltys.length = 0;
    let arrItems = document.querySelectorAll('.arrItem');
    for (let j = 0; j < arrItems.length; j++) {
        guiltys[j] = arrItems[j].value || 0;
    }
    pRes.textContent = 'guiltys' + ' [ ' + guiltys + ' ]';
    showArea.appendChild(pRes);
}

function showAlive(alive) {
    showAliveGuilty.innerHTML = '<p class="rezult">В живых осталось <span>' + alive + '</span> человек</p>';
}