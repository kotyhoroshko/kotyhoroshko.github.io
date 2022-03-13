var mainBtn = tagForClick('.mainBtn', function(){moveWindow(0, 0, 50)});
var wndw = tagForClick('.wndw', chooseOption);

function chooseTag(selector){
	return  document.querySelector(selector)
}

function tagForClick(selector, func){
	var tag =  chooseTag(selector);
	tag.addEventListener('click', func);
	return tag
}

function moveWindow(ct, br, t){
	 chooseTag('.bckg').style.cssText="top:"+ct+"; border-radius:"+br+";";
	 chooseTag('.wndw').style.top = t+"%";
}

function chooseOption(e){
	moveWindow(-100, 50, -100);
	if (e.target.className == 'right') {showRes('RIGHT ') }
	else {showRes('LEFT ') }
}

var div = document.createElement("div");
function showRes(option){
	div.innerHTML = '<h2>'+ option +' option was chosen</h2>';
	 chooseTag('.joberZone').appendChild(div);}