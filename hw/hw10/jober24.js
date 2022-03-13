// ===================== #2.4 ======================================
// Задайте два input. В первый вводится число, во второе его степень. С помощью
// цикла возведите число в степень. Напечатайте результат.
		
function chooseTag(tagClass) {
	return document.querySelector(tagClass)
}

var count = function() {
			chooseTag('span.four').innerText = ''; //ОЧИСТКА
			var res = 1;
			var dig1 = digit1.value;
			
		if (+digit2.value !== parseInt(digit2.value, 10)) {
			alert('Степінь має бути цілим числом!');
			digit2.value = parseInt(digit2.value, 10);
			}
			var dig2 = digit2.value;			

		if (dig2 < 0) {
			for (let i = 0; i < (dig2*(-1)); i++) {
				res = res / dig1
				}}
		else for (let i = 0; i < dig2; i++) {
				res = res * dig1 }
				
		document.querySelector('span.four').appendChild(document.createTextNode(dig1 + ' в степені ' + dig2 + ' = ' + res + '.\n'));
	}

const digit1 = chooseTag('input[name="digit1"]');
const digit2 = chooseTag('input[name="digit2"]');
const submt = chooseTag('input[type="submit"]');
	  submt.addEventListener('click', count);

