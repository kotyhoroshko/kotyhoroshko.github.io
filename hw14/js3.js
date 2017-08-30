const wrapp = document.querySelector('.wrapper');
wrapp.addEventListener('mouseover', function(){ chngBrdRad('50') } );
wrapp.addEventListener('mouseout', function(){ chngBrdRad('0') } );

(function create300Div() {
	var div = '';
	for (let i = 0; i <= 300; i++) {
		div += '<div class="simple"></div>'; }
	wrapp.innerHTML = div; })()

function chngBrdRad(n) {
	if (event.target.className == "simple") {
		event.target.style.cssText = ("border-radius:" + n + "%;"); 
} }
