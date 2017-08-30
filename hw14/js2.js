var i = 0;
var block = document.querySelector('div.closed');
	block.addEventListener('dblclick', changeFolder);
	
function changeFolder(){
	i++;
	if (i >= 2) { block.className = "closed";
		i = 0;}
	else {block.className = "open";
	}
}