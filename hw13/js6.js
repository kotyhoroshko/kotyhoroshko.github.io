
var userInput = chooseTag('input[name="symbol"]');
const buttonForAction = chooseTag('button.btn');
	  buttonForAction.addEventListener('click', GetCharCode);

const placeForShow = chooseTag('div.joberZone');
const divForShowRes = document.createElement("div");

function GetCharCode() {
	if (userInput.value.length == 1) {
		var charCode = userInput.value.charCodeAt(0);
		divForShowRes.innerHTML = '<p>Код символу <b>'+ userInput.value +' : '+ charCode +'</b>.</p>';
		placeForShow.appendChild(divForShowRes);}
	else {alert('Error !') }
}

function chooseTag(tagClass) {
	return document.querySelector(tagClass);
}


