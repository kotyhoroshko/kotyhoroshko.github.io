// // ===================== #1.4 ======================================
// ​// Два поля ввода: Логин и пароль. Есть 3 пользователя:
// // ivan -> 333
// // ssss-> 666
// // gibs ->0000
// // Если введен правильный логин и пароль вывести “Добро пожаловать”, в противном
// // случае - вывести “ошибка”.



var logName = document.querySelector('input[name="login"]');
var pass = document.querySelector('input[name="pass"]');
var logButton = document.querySelector('input[type="submit"]');
	logButton.addEventListener('click', checkUser);

var logPassBase = {
					ivan : 3330,
					ssss : 666,
					gibs : 000
				  }

function checkUser() {		
        if (logPassBase[logName.value] == pass.value ) { alert('Добро пожаловать') }
        	else  alert('ошибка') 
        }
        

        