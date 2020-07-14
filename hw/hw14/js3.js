const wrapp = document.querySelector('.wrapper');
wrapp.addEventListener('mouseover', br50) ;
wrapp.addEventListener('mouseout', br50);

(function create300Div() {
	var div = '';
	for (let i = 0; i <= 300; i++) {
		div += '<div class="simple"></div>'; }
	wrapp.innerHTML = div; })()

function br50(event) {
	if (event.target.className !="wrapper") {event.target.classList.toggle("br50"); 
	}}