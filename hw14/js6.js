var xCoordinate = 0;
const trigerItem = document.querySelector('.triger_item');
	  trigerItem.addEventListener('click', changeLocation );

function changeLocation() {
	if (xCoordinate == 0) { xCoordinate = 38; console.log(1);}
	else if (xCoordinate == 38) { xCoordinate = 76; console.log(2);}
	else { xCoordinate = 0; console.log(0);}
	trigerItem.style.cssText = ("left:"+xCoordinate+"%;"); 	}
