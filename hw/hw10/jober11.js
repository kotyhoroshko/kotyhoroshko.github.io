
// ===================== #1.1 ======================================
// Пользователь вводит год рождения в input. Пользователь может ввести год
// рождения в двух форматах: 1988 или 02 (имеется ввиду 2002). Программа должна
// вывести количество лет которое исполнилось пользователю.


var yearBirth = prompt('Введіть ваш рік народження');
var CurrentYear = new Date().getFullYear();

function answr(howOld) {
	alert('Вам ' + howOld +', і це прекрасно!')};

function wrongAnswr() {
	alert('Введіть првильний рік ( число має бути ціле)')};

function isNumeric(n) {
  return isNaN(n) + !isFinite(n) + (n == null);}

if (Math.ceil(yearBirth) - yearBirth === 0 && yearBirth <= CurrentYear && yearBirth >= 0) {

		if (yearBirth >= 1900) { answr(CurrentYear - yearBirth) }
	else if ((yearBirth >= 100) + isNumeric(yearBirth) )  {wrongAnswr() }
	else if (yearBirth > 17)  { answr(CurrentYear - 1900 - yearBirth ) }
	else if (yearBirth < 17)  { answr(CurrentYear - 2000 - yearBirth ) }
	else {wrongAnswr()}
}
else { wrongAnswr() }