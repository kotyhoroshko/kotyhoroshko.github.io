var side = []; //array with rezult, example: [t,h,h]
var hhh = 0,
    ttt = 0,
    tht = 0;
var coin = document.querySelectorAll('div.coin'); //array with coin in HTML

var tttDisp = document.querySelector('td.ttt'); // get place in table for insert rezult
var tttPercentDisp = document.querySelector('td.tttPercent'); // get place in table for insert rezult
var hhhDisp = document.querySelector('td.hhh'); // get place in table for insert rezult
var hhhPercentDisp = document.querySelector('td.hhhPercent'); // get place in table for insert rezult
var thtDisp = document.querySelector('td.tht'); // get place in table for insert rezult
var thtPercentDisp = document.querySelector('td.thtPercent'); // get place in table for insert rezult
var totalDisp = document.querySelector('td.total'); // get place in table for insert rezult
var totalPercentDisp = document.querySelector('td.totalPercent'); // get place in table for insert rezult

var btn = document.querySelector('button.toss');
btn.addEventListener('click', toss)

function getRndNumber() { //  function for get 0 or 1
    return Math.floor(Math.random() * 2)
}

function toss() {
    var sum = 0;
    for (let i = 0; i <= 2; i++) {
        side[i] = getRndNumber() //  get 1 or 0 and save in arr
        sum += side[i];
        spinCoin(coin[i], side[i]) //  decorative spining coin animate function
    }
    if (sum == 3) { ttt++ } else if (sum) { tht++ } else { hhh++ } // cheking for TTT, HHH or other
    showRezult(); // show/writing rezult in table
}

function showRezult() { // showing rezult in table
    let total = ttt + hhh + tht;
    tttDisp.textContent = ttt;
    tttPercentDisp.textContent = Math.round(ttt / total * 100) + '%'
    hhhDisp.textContent = hhh;
    hhhPercentDisp.textContent = Math.round(hhh / total * 100) + '%'
    thtDisp.textContent = tht;
    thtPercentDisp.textContent = Math.round(tht / total * 100) + '%'
    totalDisp.textContent = total;
}


// =====================VIEW===============================

var rotate = 0;

function spinCoin(coin, side) {
    coin.className = "side" + side;
    coin.parentNode.className = "scale";
    coin.style.background = "url('img/" + side + ".png') center no-repeat";
    setTimeout(function() {
        coin.className = "coin";
        coin.parentNode.className = "coinBg";
    }, 600)
    rotate += Math.random() * 2;
    coin.parentNode.style.transform = "rotate(" + rotate + "rad)";
}

moreTossBtn.addEventListener('click',
    function moreToss() {
        for (let index = 0; index < manyToss.value; index++) {
            toss();
        }
    })