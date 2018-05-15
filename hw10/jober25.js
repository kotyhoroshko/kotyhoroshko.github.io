// ===================== #2.5 ======================================
// С помощью цикла напечатайте таблицу умножения на 7 от 1 до 9.


var forShow = '' ;

for (var i = 1; i < 11; i++) {	
    forShow += ('<p>' + i +' * 7 = ' + (i*7) + '</p>' )    
}
document.querySelector('.five_ins').innerHTML = forShow;