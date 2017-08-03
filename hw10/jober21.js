
// ===================== #2.1 ======================================
// Вывести четные числа от 0 до 101.


var forShow = '';

for (var i = 2; i <= 100; i=i+2) {
	forShow +=(i+', ')
	}
document.querySelector('span.one').appendChild(document.createTextNode(forShow))
