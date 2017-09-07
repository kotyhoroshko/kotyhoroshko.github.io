var n = 0; //кількість додаткових input
var textArea = document.querySelector('textarea[name="textarea"]')

var formZone = TagForClick('.formZone', removeInput);
var btnAdd = TagForClick('button.addNew', addNewInput);
var btnPickUp = TagForClick('input[type="submit"]', PickUpValue);

function TagForClick(selector, func){
	var tag = document.querySelector(selector);
	tag.addEventListener('click', func);
	return tag
}
	
function addNewInput(){
	if (n<4) {
		div = document.createElement("div");
		div.innerHTML = '<input type="text"><button class="remover">&nbsp;&nbsp;-&nbsp;&nbsp;</button>';
		formZone.appendChild(div);
		n++; }
}

function removeInput(event){
	if (event.target.className =='remover') {
		formZone.removeChild(event.target.parentNode);
		n--; }
}

function PickUpValue(){
	var textForShow ='';
	var inpt = document.querySelectorAll('input[type="text"]');
		for (var i = 0; i < inpt.length; i++) {
			textForShow +=inpt[i].value + '\n';
	}
	textArea.value = textForShow;
}