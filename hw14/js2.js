var i = 0;
var block = document.querySelector('div.closed');
	block.addEventListener('dblclick', changeFolder);
		
function changeFolder(){
	block.classList.toggle("open"); }