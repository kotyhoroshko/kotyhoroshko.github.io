const placeForShow = chooseTag('div.joberZone');
const buttonForAction = chooseTag('input[type="submit"]');
	  buttonForAction.addEventListener('click', dispImgs);
const divForShowArr = document.createElement("div");
const divForShowImg = document.createElement("div");

(function createAndShowFotoArr() {
	window.fotoArr = [];

	for (let i = 0; i < 10; i++) {
		fotoArr[i] = ('foto0'+(i+1));
		}
	divForShowArr.innerHTML = '<p>So, we have array: <b> fotoArr [' + fotoArr + ']</b>.</p><hr>';
	placeForShow.appendChild(divForShowArr);
}())


function dispImgs() {	
	let htmlCodeForInsert = '';	

	for (let i = 0; i < fotoArr.length; i++) {
		htmlCodeForInsert +=('<img src="img/' + fotoArr[i] + '.jpg" class="img_center" alt="rnd foto">');
		}
	divForShowImg.innerHTML = htmlCodeForInsert;
	placeForShow.appendChild(divForShowImg);
}


function chooseTag(tagClass) {
	return document.querySelector(tagClass);
}