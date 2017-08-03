
// ===================== #2.6 ======================================
 // С помощью цикла вывести произведение чисел от 1 до 50

var numbers = [];
var textForShow = '' ;


for (var i = 1; i < 51; i++) {   	
    textForShow += (i + ' * ');
    numbers[i-1] = i;
}

function getProduct(total, num) {
    return (total * num);
}

var res = numbers.reduce(getProduct);
document.querySelector('span.six').appendChild(document.createTextNode(textForShow +' = ' + res)); 