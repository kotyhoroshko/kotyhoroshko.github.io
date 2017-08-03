// ===================== #2.2 ======================================
// Вывести числа в следущей последовательности: 200 199 198 ... 0


var forShow = '';
for (var i = 200; i >= 0; i--) {
	forShow += (i+', ');
}
document.querySelector('span.two').appendChild(document.createTextNode(forShow));