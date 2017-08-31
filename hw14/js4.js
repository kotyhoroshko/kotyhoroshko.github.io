const wrapper = document.querySelector('.wrapper_14_4');
const listenZone = document.querySelector('.joberZone');
	  listenZone.addEventListener('click', changeBckg );

function changeBckg(event) {
	if (event.target.className =="bckg") {
		var loc= event.target.src;
		wrapper.style.cssText = ("background-image:url("+loc+");background-size:contain");
	}}