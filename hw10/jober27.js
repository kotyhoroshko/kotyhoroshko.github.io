// ===================== #2.7 ======================================
// Выведите с помощью цикла коды спецсимволов от 1000 до 2000. Напомню, что
// спецсимвол получается комбинацией &#число; ​Например &#1222;


var spn = document.createElement('span');
var specSymbols = '';

for (var i = 1000; i < 2001; i++) {   
    specSymbols += "&#" +i+ "; "  	
}

spn.innerHTML = specSymbols ;
document.querySelector('div.seven').appendChild(spn);