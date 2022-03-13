
function chooseTag(tagClass) {
	return document.querySelector(tagClass);
}
var inputName = chooseTag('input[name="name"]');
var inputSurname = chooseTag('input[name="surname"]');
var inputPass = chooseTag('input[type="password"]');
var inputEmail = chooseTag('input[type="email"]');

const btnSbmt = chooseTag('button.btn');
	  btnSbmt.addEventListener('click', checkForm);

function checkForm() {

	inputName.value = checkSpace(inputName.value);
	inputSurname.value = checkSpace(inputSurname.value);
	inputPass.value = checkSpace(inputPass.value);
	inputEmail.value = checkSpace(inputEmail.value);

	if (inputName.value == '') {
		error(inputName);
		return false }
	valid(inputName);

	if (inputSurname.value == '') {
		error(inputSurname);
		return false }
	valid(inputSurname);

	if (inputPass.value.length<5) {
		error(inputPass);
		return false }
	valid(inputPass);

	if ((inputEmail.value.indexOf(' ')+1) + !(inputEmail.value.indexOf('@')+1) ) {
		error(inputEmail);
		return false }
	valid(inputEmail);

	alert('true');
	res();
	return true
}

function checkSpace(str) {
	while ( (str[str.length-1] == ' ') + (str[0] == ' ') ) {			
		if (str[0] == ' ') { str = str.slice(1);}
		if (str[str.length-1] == ' ') {str = str.slice(0,str.length-1);}
	}
	return str;
}


//============= paint notValid input in pink (неОбовязкове) ===============
function error(input){
	input.className = "error"; }

function valid(input){
	input.className = ""; }


//============= crerate and display user-JSON-obj (неОбовязкове) =========
function res(){
	var user = {
		"name":inputName.value,
		"surname":inputSurname.value,
		"password":inputPass.value,
		"email":inputEmail.value
	}
var userJSON = JSON.stringify(user);
var showValue = userJSON.replace(/,/g,'<br>');
showValue = showValue.replace(/"/g,' ');
showValue = showValue.replace(/:/g,'  :  ');
showValue = showValue.replace(/{/g,'');
showValue = showValue.replace(/}/g,'');

const divForShowRes = document.createElement("div");
divForShowRes.innerHTML = '<p><b>User: <br>' + showValue + '</b></p><hr>';
chooseTag('div.joberZone').appendChild(divForShowRes);
}

