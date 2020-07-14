var n = 0;
var textArea = document.querySelector('textarea[name="textarea"]')

var formZone = tagForClick('.formZone', removeInput);
var btnAdd = tagForClick('button.addNew', addNewInput);
var btnPickUp = tagForClick('input[type="submit"]', PickUpValue);	

function tagForClick(selector, func){
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
			console.log(inpt[i].parentNode); 
			if (inpt[i].value == ''){inpt[i].parentNode.className = "error"}
			else (inpt[i].parentNode.className = "")
			textForShow +=inpt[i].value + '\n';
	}
	textArea.value = textForShow;
}