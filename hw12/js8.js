

function checkOld(age) {
	age = document.querySelector('input.userOld').value;

	if ( (age === undefined) || (age == '') || (age === null) ) { 
		return alert('Введите возраст')
		};
	if( (isNaN(parseInt(age))) + (age<=0) + (age>120) + (age != parseInt(age, 10)) ) {
		alert('Ошибка! Перевірте введення (натуральне число від 1 до 120)')
		}
	else if (age >= 16) { alert('добро пожаловать') }

	else { alert('вы еще молоды') }	
}
