const placeForShow = chooseTag('div.joberZone');
var userInput = chooseTag('input[type="text"]');
const buttonForAction = chooseTag('input[type="submit"]');
	  buttonForAction.addEventListener('click', getDomain);
const divForShowRes = document.createElement("div");

function getDomain() {

	/* ================ ВАРІАНТ №1 ==========================*/
	// let strUser = userInput.value;
	// let strPure = (strUser.replace('https://','')).replace('http://','');

	/* ================= ВАРІАНТ №2 ==========================*/
	let strUser = ( (userInput.value).split('//')[1] );
	if (strUser) { strPure = strUser;}		 
	else strPure = userInput.value;

	divForShowRes.innerHTML = '<p><b> ' + strPure + '</b></p><hr>';
	placeForShow.appendChild(divForShowRes);
}

function chooseTag(tagClass) {
	return document.querySelector(tagClass);
}