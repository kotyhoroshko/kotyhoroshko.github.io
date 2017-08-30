const wrapper = document.querySelector('.wrapper_14_4');
const listenZone = document.querySelector('.joberZone');
	  listenZone.addEventListener('click', changeBckg );

function changeBckg(n) {
	if (event.target.className =="bckg") {
		var lctn = event.target.src;
		wrapper.style.cssText = ("background-image:url("+lctn+");background-size:contain");
	}}