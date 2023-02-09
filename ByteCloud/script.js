let storage
const storageRange = document.querySelector("#storage");
const storageValue = document.querySelector("#storage-value");
storageValue.textContent = storageRange.value + '$';
storageRange.addEventListener('input', function(e) {
    storage = getvalue(e)
    storageValue.textContent = getvalue(e) + "GB"
    paintGraf()
})

let transfer
const transferRange = document.querySelector("#transfer");
const transferValue = document.querySelector("#transfer-value");
transferValue.textContent = transferRange.value + '$';
transferRange.addEventListener('input', function(e) {
    transfer = getvalue(e)
    transferValue.textContent = getvalue(e) + "GB"
    paintGraf()
})

let maxValue;
let grafItemsValue = {};
let grafItemsLevel = {};
let grafArea = document.querySelector('.graf');

function getMaxValue() {
  let maxValues = [];
  for (let index = 0; index < db.length; index++) {
    if(db[index.max]){
      maxValues[index] = db[index.max]/1000
    }
    else if (typeof db[index].storage == 'object') {      
      maxValues[index] = Number(Math.max(...Object.values(db[index].storage))) + Number(db[index].transfer)
    } else {
      maxValues[index] = Number(db[index].storage) + Number(db[index].transfer)
    }
  }
  return Math.max(...maxValues)*1000
}

function getvalue(e) {
    return e.target.value;
}

let db = [];
function getDataBase() {
    fetch( 'db.json' )
      .then( function( response ){
        if( response.status != 200 ){
          console.log( 'DB was not received. Status: '+response.status );
        } else {
          response.json().then( function( data ){
            console.log( 'DB successfuly received' );
            db = data.db;
            console.table(db)
            maxValue = getMaxValue()
            showGraf()
          }.bind(this)
          );
        }
      }
      .bind(this)
    )
}
getDataBase()

function paintGraf() {
  let currentValues = [];
  for (let index = 0; index < grafItemsValue.length; index++) {
    let finalVal;
    if (db[index].free != "false" ) {
      if(transfer<Number(db[index].free)){
        transfer = 0
      }
      if(storage<Number(db[index].free)){
        storage = 0
      }
    }
    if (typeof db[index].storage == 'object') {
      finalVal = transfer*db[index].transfer + storage*db[index].storage.current;
    } else {
      finalVal = transfer*db[index].transfer + storage*db[index].storage;
    }
    finalVal = minMaxCheck(finalVal, db[index].max, db[index].min );
    finalVal = Number(finalVal).toFixed(2);
    currentValues[index] = +finalVal;
    grafItemsValue[index].textContent = finalVal +"$";
    drawGraf(index, finalVal);
    storage = storageRange.value;
    transfer = transferRange.value;
  }  
  findMinPrice(currentValues)
}

function drawGraf(index, finalVal) {
  if(window.innerWidth < 767) {
    grafItemsLevel[index].style.height = finalVal*100/maxValue+"%";
    grafItemsLevel[index].style.width = "100%";

  } else {
    grafItemsLevel[index].style.width = finalVal*100/maxValue+"%";
    grafItemsLevel[index].style.height = "50px";
  }
}

function findMinPrice(currentValues) {
  let min = Infinity
  let minIndex = ''
  for (let index = 0; index < currentValues.length; index++) {
    if(currentValues[index] < min){
      min = currentValues[index];
      minIndex = index
    }    
  }
  paintMinPice(minIndex)
  grafItemsLevel[minIndex].style
}

function paintMinPice(minIndex) {
  for (let index = 0; index < grafItemsLevel.length; index++) {
    if (index == minIndex) {
      grafItemsLevel[index].style.backgroundColor = grafItemsLevel[index].dataset.color
    } else {
      grafItemsLevel[index].style.backgroundColor="gray"
    }
  }
}

function minMaxCheck(val, max, min){
  if (max && val > max) {
    return max
  }
  if (min && val < min) {
    return min
  }
  return val
}

grafArea.addEventListener('click', switchStorage);

function switchStorage(e) {
  if (e.target.dataset.num) {
    storage = storageRange.value;
    transfer = transferRange.value;
    db[e.target.dataset.num].storage.current=e.target.value;
    paintGraf()
  }
}

function showGraf() {
  let grafArea = document.querySelector(".graf");
  let inner = '';
  for (let index = 0; index < db.length; index++) {
    inner += `
      <div class="graf-item">
      <div class="graf-item__desc">
        <span class="graf-item__title">${db[index].name}</span>
      `
    if (typeof db[index].storage == 'object') {
      inner += `<div class="graf-item__switchers">`
      let count = 0
      for (const key in db[index].storage) {        
        inner += `<div class="graf-item__switcher">
                    <input type="radio"
                      name="${db[index].name}"
                      value="${db[index].storage[key]}"
                      id="${key}"
                      data-num="${index}"
                      ${count===0 ? 'checked' : ''}>
                    <label for="${key}">${key}</label>
                  </div>`
        if (count === 0) {
          db[index].storage.current=db[index].storage[key];
        }
        count++
      }
      inner += `
          </div>
          `
        }
        inner += `
        </div>
        <img src="${db[index].logo}" alt="" class="graf-item__img">
        <div class="graf-item__level-wrapper">
          <div class="graf-item__level" data-color="${db[index].color}">
          <span class="graf-item__value"></span>
          </div>
          </div>
      </div>
    `
  }

  grafArea.innerHTML=inner;
  grafItemsValue = document.querySelectorAll(".graf-item__value")
  grafItemsLevel = document.querySelectorAll(".graf-item__level")
  storage = storageRange.value;
  transfer = transferRange.value;
  paintGraf()
}

window.addEventListener("resize", paintGraf)