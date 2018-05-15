const placeForShow = chooseTag('div.joberZone');
var userInput = chooseTag('input[type="text"]');
const buttonForAction = chooseTag('input[type="submit"]');
	  buttonForAction.addEventListener('click', getDomain);
const divForShowRes = document.createElement("div");

function getDomain() {
	let strUser = userInput.value;
	let strCheckWww = strUser.indexOf("//www");
	let strCheckHttp = strUser.indexOf("//");

	if (strCheckWww+1) {strPure = strUser.slice(strCheckWww+6);}
	else if (strCheckHttp+1) {strPure = strUser.slice(strCheckHttp+2);}
	else strPure = strUser;
	
	divForShowRes.innerHTML = '<p><b> ' + strPure + '</b></p><hr>';
	placeForShow.appendChild(divForShowRes);
}

function chooseTag(tagClass) {
	return document.querySelector(tagClass);
}