let tableBody = document.querySelector('.table-body');
let db = [];
let newBtn = document.querySelector('[data-role="new"]');
    newBtn.addEventListener('click', function(){
        document.querySelector('.add-row').classList.toggle('hidden');
    });
let delBtn = document.querySelector('[data-role="del"]');
    delBtn.addEventListener('click', function(){   
       let checked = document.querySelectorAll('.row [type="checkbox"]');
       for (let index = 0; index < checked.length; index++) {
           checked[index].checked ? db.splice(index, 1) : false;           
       }
       displayTable();
    });
let demoBtn = document.querySelector('[data-role="demo"]');
    demoBtn.addEventListener('click', function(){
        createRndName();
        creadteRndQty();
        creadteRndAvlbl();
        addNewRow();
    });
let clearBtn = document.querySelector('[data-role="clear"]');
    clearBtn.addEventListener('click', function(){
        db = [];
        displayTable();
    });

let dbJson;
let jsonImport = document.querySelector('.import-json');
let jsonPrev = document.querySelector('.import-json__prev');
let exportBtn = document.querySelector('[data-role="export"]');
    exportBtn.addEventListener('click', function(){
        dbJson = JSON.stringify(db);
        jsonPrev.textContent = dbJson;
        jsonImport.classList.remove('hidden');
    });
let jsonImportBtn = document.querySelector('.import-json__btn');
    jsonImportBtn.addEventListener('click', function(){
        alert(dbJson)
    })


let newNameInput = document.querySelector('#new-name');
let newQtyInput = document.querySelector('#new-qty');
let newnAvalblInput = document.querySelector('#new-avalbl');
let createRndNameBtn = document.querySelector('#create-new-name');
    createRndNameBtn.addEventListener('click', createRndName);
let addRowBtn = document.querySelector('#add-new-row');
    addRowBtn.addEventListener('click', addNewRow);

function getRndValue(maxValue){
    return(Math.floor(Math.random() * maxValue))
}

function createRndName() {
    let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let newName = '';
    for (let index = 0; index < 5+getRndValue(6); index++) {
        newName += letters[(Math.floor(Math.random() * letters.length))]            
    }  
    newNameInput.value = newName;
}

function creadteRndQty(){
    newQtyInput.value = getRndValue(9999)
}

function creadteRndAvlbl(){
    newnAvalblInput.checked = getRndValue(2)
}

function availability(item) {
    if (item) {return "Yes"}
    else     { return "No" }
}

function displayTable() {
    let inner = '';
    for (let index = 0; index < db.length; index++) {        
        inner +=`<div class="row">
                    <span>${db[index].id}</span>
                    <span>${db[index].name}</span>
                    <span>${db[index].qty}</span>
                    <span>${availability(db[index].avlbl)}</span>
                    <span><input type="checkbox" id="${db[index].id}"></span>
                </div>
                `
    }
    tableBody.innerHTML = inner;
}

function addNewRow(productId) {   
    db.push({id: getFreeId(db.length+1), name: newNameInput.value, qty: (+newQtyInput.value), avlbl: newnAvalblInput.checked})
    displayTable();
}

function getFreeId(productId) {
    for (let index = 0; index < db.length; index++) {
        if (db[index].id == productId) {
            
            productId=1;
            for (let i = 0; i < db.length; i++) {
                if (db[i].id == productId) {
                    productId++;
                    i=0-1;
                }
            }            
            return productId
        }        
    }
    return productId
}

let sortByIdBtn = document.querySelector('.sort--id');
let sortByIdBtnRev = document.querySelector('.sort--id-rev');
    sortByIdBtn.addEventListener('click', function(){
        sortProductsById();
        sortByIdBtnRev.classList.toggle('hidden');
        sortByIdBtn.classList.toggle('hidden');
    });
    sortByIdBtnRev.addEventListener('click', function(){
        sortProductsById("revers");
        sortByIdBtnRev.classList.toggle('hidden');
        sortByIdBtn.classList.toggle('hidden');
    });
let sortByNameBtn = document.querySelector('.sort--name');
let sortByNameBtnRev = document.querySelector('.sort--name-rev');
    sortByNameBtn.addEventListener('click', function(){
        sortProductsByName();
        sortByNameBtnRev.classList.toggle('hidden');
        sortByNameBtn.classList.toggle('hidden');
    });
    sortByNameBtnRev.addEventListener('click', function(){
        sortProductsByName("revers");
        sortByNameBtnRev.classList.toggle('hidden');
        sortByNameBtn.classList.toggle('hidden');
    });
let sortByQtyBtn = document.querySelector('.sort--qty');
let sortByQtyBtnRev = document.querySelector('.sort--qty-rev');
    sortByQtyBtn.addEventListener('click', function(){
        sortProductsByQty();
        sortByQtyBtnRev.classList.toggle('hidden');
        sortByQtyBtn.classList.toggle('hidden');
    });
    sortByQtyBtnRev.addEventListener('click', function(){
        sortProductsByQty("revers");
        sortByQtyBtnRev.classList.toggle('hidden');
        sortByQtyBtn.classList.toggle('hidden');
    });
let sortByAvlblBtn = document.querySelector('.sort--avlbl');
let sortByAvlblBtnRev = document.querySelector('.sort--avlbl-rev');
    sortByAvlblBtn.addEventListener('click', function(){
        sortProductsByAvlbl();
        sortByAvlblBtnRev.classList.toggle('hidden');
        sortByAvlblBtn.classList.toggle('hidden');
    });
    sortByAvlblBtnRev.addEventListener('click', function(){
        sortProductsByAvlbl("revers");
        sortByAvlblBtnRev.classList.toggle('hidden');
        sortByAvlblBtn.classList.toggle('hidden');
    });

function sortProductsById(revers) {
    db.sort(function(a, b){
        return a.id - b.id
    });    
    if (revers=="revers") {db.reverse()}
    displayTable();
}
function sortProductsByName(revers) {
    db.sort(function(a, b){
        let x = a.name.toLowerCase();
        let y = b.name.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      });
    if (revers=="revers") {db.reverse()}
    displayTable();
}
function sortProductsByQty(revers) {
    db.sort(function(a, b){
        return a.qty - b.qty
    });
    if (revers=="revers") {db.reverse()}
    displayTable();
}
function sortProductsByAvlbl(revers) {
    db.sort(function(a, b){
        return a.avlbl - b.avlbl
    });
    if (revers=="revers") {db.reverse()}
    displayTable();
}