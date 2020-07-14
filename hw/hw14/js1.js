function chooseTag(tagClass) {
	return document.querySelector(tagClass); }

var block = chooseTag('div.block');
	block.addEventListener('mousemove', getCoordinate);
	block.addEventListener('mouseout', clearCoordinate);

var coordinat = chooseTag('p.location');

function getCoordinate(event){
	offSet = block.getBoundingClientRect();
	var x = event.clientX - Math.floor(offSet.left);
    var y = event.clientY - Math.round(offSet.top);
    coordinat.textContent = ("X: " + x + ", Y: " + y); }

function clearCoordinate(){
	coordinat.textContent = ' - OUT - ' }