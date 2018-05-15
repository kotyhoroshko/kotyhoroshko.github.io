var xCoordinate = 0;
var msg = 0;
const trigerItem = document.querySelector('.triger_item');
	  trigerItem.addEventListener('click', changeLocation );

function changeLocation()
	{
	xCoordinate++;
	trigerItem.style.cssText = ("left:"+ ( (xCoordinate%3)*38 ) +"%;");
	console.log((xCoordinate%3));
	}