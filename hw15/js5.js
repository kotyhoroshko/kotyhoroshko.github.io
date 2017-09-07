function TagForClick(selector, func){
	var tag = document.querySelector(selector);
	tag.addEventListener('click', func);
	return tag
}

var tag = TagForClick('.z155', paintRed);
var btn = TagForClick('button', addNewTag);

function paintRed(ev){
	ev.target.classList.toggle("paintRed");
	showClickedTag(ev.target.tagName);
}

function addNewTag(){
	var newTag = document.querySelector('.insTag').value;
	newTag = document.createElement(newTag);
	document.querySelector('.z155').appendChild(newTag);
}

function showClickedTag(tag){	
	placeForShow.innerHTML = '<span> last clicked on: <strong>'+tag+'</strong></span>';
	document.querySelector('.joberZone').appendChild(placeForShow);}

var placeForShow = document.createElement("div");
placeForShow.style.cssText="text-transform:lowercase;display:inline-block;right:10px;position:absolute;"