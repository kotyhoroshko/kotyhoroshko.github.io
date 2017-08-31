var xCoordinate = 0;
const trigerItem = document.querySelector('.triger_item');
	  trigerItem.addEventListener('click', changeLocation );

function changeLocation() {
	xCoordinate += 38;
	trigerItem.style.cssText = ("left:"+ ( xCoordinate%(114) ) +"%;"); }