// ===================== #2.3 ======================================
// Найти сумму чисел от 0 до 100 (включительно). (0+1+2+3+4+5)


function insertInHtml(where, what) {
	document.querySelector(where).appendChild(document.createTextNode(what));
}

var j=0;
var forShow = '';

for (var i = 0; i < 101; i++) {
		forShow += (i+' + ');
	j = j+i;
}
insertInHtml(('span.three'), (forShow + ' = ' + j));