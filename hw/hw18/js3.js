let arrName = document.querySelector('input.arrName');
let findedArr = document.querySelector('.showFindedArr');
let lsFindName = document.querySelector('input.lsFindName');
let showArea = document.querySelector('.showArr');
let joberZone = document.querySelector('.joberZone');
    joberZone.addEventListener('keyup', showCreatedArr);
let arrLength = document.querySelector('#length');
    arrLength.addEventListener('mousemove', showArrLength);
    arrLength.addEventListener('click', showArrLength);
    arrLength.addEventListener('click', createArr);
let saveToLsBtn = document.querySelector('.saveToLs');    
let showFromLsBtn = document.querySelector('.showFromLs');

if ( typeof(Storage) !== "undefined" ) {
    saveToLsBtn.addEventListener('click', savArrToLs);
    showFromLsBtn.addEventListener('click', showArrFromLs);}
else {  saveToLsBtn.style.backgroundColor="gray"
        showFromLsBtn.style.backgroundColor="gray"
        lsFindName.disabled = true;
        findedArr.textContent= 'Locale storage NOT EXIST!';
    }

let pRes = document.createElement("p");
    pRes.style.fontSize = "24px";
let resultArray = [];

createArr()

function showArrLength(){
 document.querySelector('.length').textContent = 'Set array length: '+arrLength.value ;
}

function createArr() {
    let inptsForCreateArr = '';
    for (let i = 0; i < arrLength.value; i++) {
        inptsForCreateArr += '<input class="arrItem" type="text" placeholder="insert value '+i+'">';
        }
    showArea.innerHTML = inptsForCreateArr;
    showCreatedArr()
}

function showCreatedArr() {
    resultArray.length = 0;
    let arrItems = document.querySelectorAll('.arrItem');        
    for (let j = 0; j < arrItems.length; j++) {        
        resultArray[j] = arrItems[j].value;
        }
    pRes.textContent = arrName.value +' [ '+ resultArray + ' ]';
    showArea.appendChild(pRes);
}

function savArrToLs() {    
    localStorage.setItem(arrName.value, resultArray);
}

function showArrFromLs() {
    if (lsFindName.value == '') {
        return findedArr.textContent= 'Insert name of array!'}
    let showFoundArr = localStorage.getItem(lsFindName.value);
    if (showFoundArr) {
    findedArr.textContent=lsFindName.value+' [ '+showFoundArr+' ] ';
        }        
    else {findedArr.textContent= 'There is no array with name "'+lsFindName.value+'" in local storage'}
}