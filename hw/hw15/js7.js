window.addEventListener('mouseover', chekTag);

var div = document.createElement("div");
div.className = "info";
div.style.cssText = "width:66%;position:fixed;left:50%;bottom:2%;transform:translate(-50%,0);background-color:rgba(245,245,245,.8);box-shadow: 2px 2px 12px rgba(0,0,0,.6);padding-left:5px;";
document.body.appendChild(div);

function chekTag(e){
	if (e.target.tagName == 'A')   { getInfoA(e) }
	if (e.target.tagName == 'IMG') { getInfoImg(e) }	
}

function checkUndefined(target){
	if (target) {return '</p>'};
	return '<span style="font-weight:800;color:red;"><b>MISSING DATA !!!</b></span></p>'
}

function getInfoA(e){
	var hrefA = '<p><b>href:</b> ' + e.target.href + checkUndefined(e.target.href);
	var titleA = '<p><b>title:</b> '+ e.target.title + checkUndefined(e.target.title);
	var targetA = '<p><b>target:</b> '+ e.target.target + checkUndefined(e.target.target);
	div.innerHTML = hrefA + titleA + targetA;	
}	

function getInfoImg(e){
	var srcImg = '<p><b>src:</b> '+ e.target.src + checkUndefined(e.target.src);
	var altImg = '<p><b>alt:</b> '+ e.target.alt + checkUndefined(e.target.alt);
	div.innerHTML = srcImg + altImg;
}