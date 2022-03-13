
var num = prompt('Введіть число')
num = parseInt(num);
alert(returnNum(num))

function returnNum(ch) {
	//if (isValidNum(ch)) { return('Ошибка') }
	if (ch>10) { return (ch*ch) };
	if (ch === 7 || ch === 8) { return (ch-1) };
	if (ch<7) { return ('число меньше 7') };
	return('ОШИБКА! Приймаються лише числа менше7, 8, 9 і більше 10' )
}

var display = document.querySelector('div.result');
display.innerHTML = '<p> '+' Ви ввели:  <b>'+ num +'</b></p>';

// function isValidNum(n){
// 	 return ((isNaN(n)) + (n != parseInt(n, 10)) )}