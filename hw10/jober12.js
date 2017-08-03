// // ===================== #1.2 ======================================
// ​// Пользователь вводит 2 числа. Найти и вывести максимальное из данных двух
// // чисел. Учтите вариант равенства чисел.

var num1 = prompt('Введіть перше число');
var num2 = prompt('Введіть друге число');

num1 = parseFloat(num1);
num2 = parseFloat(num2);

function isNumeric(n) {
  return isNaN(n) + !isFinite(n) + (n == null);}

	if (isNumeric(num1) + isNumeric(num2)) { alert('ОШИБКА! (Ведіть саме числа)')}
	else if (num1 === num2) { alert('Введені числа рівні')}
	else if (num1 > num2) { alert('Перше число ' + num1 + ' є більшим')}
	else { alert('Друге число ' + num2 + ' є більшим')}

console.log('num1: ' + num1, '| num2: ' + num2)