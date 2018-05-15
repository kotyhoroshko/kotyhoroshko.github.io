// ===================== #1.5 ======================================
// Пользователь вводит 3* числа. Найти и вывести максимальное из данных трех
// чисел

var numers = [];
var k = prompt('Скільки чисел хочете порівняти?')
k = parseFloat(k);
if (isNumeric(k) + (Math.ceil(k) - k !== 0) + (k <= 0) )
	{alert ('Кількість чисел має бути натуральним числом!');
		}

for (var i = 1; i < ( parseFloat(k)+1 ); i++) {
	numers[i-1] = prompt('Введіть значення числа №' + i);
	numers[i-1] = parseFloat(numers[i-1]);
	if (isNumeric(numers[i-1])) {
		alert ('Вводимо саме числа! (без букв і знаків)');
		break }
	inserInHtml(('span.ex15'), (numers[i-1]+' '+' '+' | '+' '+' '))
}

function isNumeric(n) {
  return isNaN(n) + !isFinite(n) + (n == null);}

function inserInHtml(tagClass, content) {
  document.querySelector(tagClass).appendChild(document.createTextNode(content))
}

 var res = Math.max.apply(null, numers);
 if ( isNumeric(res)) { alert ('Спробуйте ще разок! (F5)') }
 else { inserInHtml(('p.ex15_res'), ('Найбільше число: ' + res))
	}


