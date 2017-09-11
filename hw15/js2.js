var btnAdd =  tagForClick('button.addNew', addNewInput);
var radioZone = tagForClick('.radioForm', getNumberType);
var formZone = tagForClick('form', removeInput);
var btnPickUp = tagForClick('input[type="submit"]', PickUpValue);

var n = 0; //кількість додаткових input

var textArea = document.querySelector('textarea[name="textarea"]');

function tagForClick(selector, func){
	var tag = document.querySelector(selector);
	tag.addEventListener('click', func);
	return tag
}

function addNewInput(){
	if (n < 4) {
		div = document.createElement("div");
		div.innerHTML = '<input type="text"><button class="remover">&nbsp;&nbsp;-&nbsp;&nbsp;</button>';
		formZone.insertBefore(div, btnPickUp);
		n++; }
}

function removeInput(event){
	if (event.target.className =='remover') {
		formZone.removeChild(event.target.parentNode);
		n--; }
}

var j = 0; //початковий елеменнт input для виводу ( 1-парні, 0-непарні )
var step = 1; //крок для виводу елеменнтів input ( 1-всі, 2-парні,непарні )

function getNumberType(e){
	j=0; step=1;
	if (e.target.value==1) {j=1; step=2;}
	else if (e.target.value==2) {j=0; step=2;}
}

function PickUpValue(){
	var textForShow ='';
	var inpt = document.querySelectorAll('input[type="text"]');
	for (var i=j ; i < inpt.length; i += step) {
		textForShow +=inpt[i].value + '\n';
		}
	textArea.value = textForShow;
	}