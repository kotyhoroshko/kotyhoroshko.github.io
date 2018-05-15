
const textForShow = chooseTag('div.joberZone');
const p = document.createElement("div");
var inputText = chooseTag('input[type="text"]');
var submt = chooseTag('input[type="submit"]');
	submt.addEventListener('click', getStrLength);

function getStrLength(){
	strLength = (inputText.value).length;
	displayRes(strLength); }

function displayRes(res) {	
	p.innerHTML = '<p>Довжина введеного тексту становить: <b>' + res + '</b></p>';
	textForShow.appendChild(p); }

function chooseTag(tagClass) {
	return document.querySelector(tagClass); }