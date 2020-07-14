var yCoordinate = 0;
const block = document.querySelector('.div-14_5');
	  block.addEventListener('click', changeLocation );

function changeLocation() {
	if (yCoordinate > 500) { yCoordinate -= 600; }
	else { yCoordinate += 100; }
	block.style.cssText = ("top:"+yCoordinate+"px;"); }
