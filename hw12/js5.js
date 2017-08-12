function chooseTag(tagClass) {
	return document.querySelector(tagClass)
}

function count() {
	var res = Math.pow(digit1.value, digit2.value);
	displayRes(res)
}

function isValidNum(n){
	 return ((isNaN(n)) + (n != parseInt(n, 10)) )}

const digit1 = chooseTag('input[name="digit1"]');
const digit2 = chooseTag('input[name="digit2"]');
const submt = chooseTag('input[type="submit"]');
	  submt.addEventListener('click', count);


function displayRes(res) {
	var p = document.createElement("p");
	var t = document.createTextNode(digit1.value+' в степені '+digit2.value+' = '+res);
	p.appendChild(t);
    chooseTag('div.joberZone').appendChild(p)}