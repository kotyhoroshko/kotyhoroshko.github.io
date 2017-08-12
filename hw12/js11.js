var userTry = 0, weHaveWiner = false;
const pointNum = randomNum(0, 10);
var userInput = chooseTag('input.userNum');
const checkButton = chooseTag('input.checkButton');
	  checkButton.addEventListener('click', chekNum);

function chekNum() {
	
	var userPoint = userInput.value;
	if (isValidNum (userPoint)) {
		return alert("Помилка введення! (Приймаються цілі числа від 0 до 10)")};
	userTry++;

	if ( userPoint==pointNum ) { weHaveWiner = true;
								alert(' -=]  BINGO!  [=- ');
								   chekTryTimes(userTry);
								   displayRes(userPoint);
									return }
	if ( userPoint<pointNum ) { alert('Число більше');
								  chekTryTimes(userTry);
								  displayRes(userPoint);
									return } 
								alert('Число менше');
								  chekTryTimes(userTry);
								  displayRes(userPoint);
	}

function chekTryTimes() {
	chooseTag('input.checkButton').value=("Вгадати (" + (3-userTry) + ")");
	if (weHaveWiner) {
		chooseTag('input.checkButton').disabled="yes"; }
	if (userTry>=3) {
		chooseTag('input.checkButton').value="Спроби закінчились :(";
		chooseTag('input.checkButton').disabled="yes";} }

function displayRes(userPoint) {
	var p = document.createElement("p");
	if (weHaveWiner) {
		var t = document.createTextNode(' Варіант' + userTry + ' :  ' + userPoint + ' ВГАДАЛИ!') }
    else { 
    	var t = document.createTextNode(' Варіант' + userTry + ' :  ' + userPoint) }
    p.appendChild(t);
    chooseTag('div.joberZone').appendChild(p); }

function isValidNum(n){
	if ( (isNaN(n)) + (n<0) + (n>10) + (n != parseInt(n, 10)) )
		{ return true } }

function randomNum(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand; }

function chooseTag(tagClass) {
	return document.querySelector(tagClass) }