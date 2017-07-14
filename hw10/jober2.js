
// ===================== #2.1 ======================================
// Вывести четные числа от 0 до 101.


	for (var i = 2; i < 101; i=i+2) {
	document.querySelector('span.one').appendChild(document.createTextNode(i+', '))
}



// ===================== #2.2 ======================================
// Вывести числа в следущей последовательности: 200 199 198 ... 0

for (var i = 200; i > 0; i--) {
	document.querySelector('span.two').appendChild(document.createTextNode(i+', '))
}




// ===================== #2.3 ======================================
// Найти сумму чисел от 0 до 100 (включительно). (0+1+2+3+4+5)

	var j=0;

for (var i = 0; i < 101; i++) {
	document.querySelector('span.three').appendChild(document.createTextNode(i+' + '))	
	j = j+i
}
document.querySelector('span.three').appendChild(document.createTextNode(' = '+j));



// ===================== #2.4 ======================================
// Задайте два input. В первый вводится число, во второе его степень. С помощью
// цикла возведите число в степень. Напечатайте результат.

const digit1 = document.querySelector('input[name="digit1"]');
const digit2 = document.querySelector('input[name="digit2"]');
const submt = document.querySelector('input[type="submit"]');
	submt.addEventListener('click', count);

function count(){
	document.querySelector('span.four').innerText = ''; //ОЧИСТКА
	dig1 = parseInt(digit1.value, 10);
    dig2 = parseInt(digit2.value, 10);
    var res = 1;
	for (let i = 0; i < dig2; i++) {
		res = res * dig1
}
document.querySelector('span.four').appendChild(document.createTextNode(dig1 + ' в степені ' + dig2 + ' = ' + res + '.\n'));
}

// ===================== #2.5 ======================================
// С помощью цикла напечатайте таблицу умножения на 7 от 1 до 9.

var p, t;

for (var i = 1; i < 11; i++) {

	p = document.createElement('p');
    t = document.createTextNode(i+' * 7 = '+(i*7));
    p.appendChild(t);
    document.querySelector('div.five').appendChild(p);
}

 	

// ===================== #2.6 ======================================
 // С помощью цикла вывести произведение чисел от 1 до 50

 for (var i = 1; i < 51; i++) {
   	document.querySelector('span.six').appendChild(document.createTextNode(i+' * '))
        j = j*i
}
	document.querySelector('span.six').appendChild(document.createTextNode(' = '+j)); 





// ===================== #2.7 ======================================

// Выведите с помощью цикла коды спецсимволов от 1000 до 2000. Напомню, что
// спецсимвол получается комбинацией &#число; ​Например &#1222;

var m = document.querySelector('div.seven')
var spn;

for (var i = 1000; i < 2001; i++) {

    spn = document.createElement('span');
  	spn.innerHTML = "&#" +i+ "; ";
  	m.appendChild(spn);
}
