var div = document.createElement("div");
div.className = "info";
div.style.cssText = "width:66%;position:fixed;left:50%;bottom:2%;transform:translate(-50%,0);background-color:rgba(245,245,245,.8);box-shadow: 2px 2px 12px rgba(0,0,0,.6);padding-left:5px;";
document.body.appendChild(div);

var h = [];
var res = '';

for (var i = 0; i < 6; i++) {	
	h[i] = document.querySelectorAll('h'+(i+1)).length;
	if (h[i] == 0) {h[i]='<span style="color:red;">MISS!</span>'}
	res += ' &nbsp; h'+(i+1)+' :<b> '+h[i]+'</b>&nbsp;&nbsp;&nbsp;'
}
var title = document.querySelector('meta[name="title"]');
var description = document.querySelector('meta[name="description"');
var keywords = document.querySelector('meta[name="keywords"]');

title = 'title: <b>'+chekUndef(title);
description = '&nbsp;&nbsp; description: <b>'+chekUndef(description);
keywords = '&nbsp;&nbsp; keywords: <b>'+chekUndef(keywords);

div.innerHTML = '<p style="text-align:center">' + res + '</p><p style="text-align:center">'+title+description+keywords+'</p>';

function chekUndef(elem) {
	if (!elem){ return '<span style="color:red;">MISS!</span></b>'};
	if (elem == keywords) { return elem.content.split(",").length +'</b> words' }; 
	return elem.content.length +'</b> symbols';
}