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

div.innerHTML = '<p style="text-align:center">' + res + '</p>';