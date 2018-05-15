$('.joberZone').html(''+
	'<input type="text" placeholder="insert url here" value="https://www.soundcloud.com/">'+
	'<button>Process data</button>' +
	'<p class="showRes"><p>');
$('.joberZone button').click(showRes);

function showRes() {
	$('.showRes').text(addRndSymbols()).css({"font-size": "200%"})
}

function addRndSymbols() {
    var rndSymbols = replaceLetter();
    var allSymbols = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for( var i=0; i<4 ; i++ )
        rndSymbols += allSymbols.charAt(Math.floor(Math.random() * allSymbols.length));
    return rndSymbols
}

function replaceLetter(){
	return delZone().replace(/o/gi,"0").replace(/l/g,"1").replace(/i/gi,"3").replace(/s/gi,"5");
}

function delZone(){
	var s = delHttp();
	return s.slice(0, s.indexOf("."));
}

function delHttp(){
	var insUrl = $('input[type="text"]').val();
	var chekInsUrl = insUrl.indexOf("/www.")+1 || insUrl.indexOf("://")+1 || 0;
	if (!chekInsUrl ) { return insUrl }
	if (chekInsUrl>6) { return insUrl.slice(chekInsUrl+4) }
	return insUrl.slice(chekInsUrl+2);
}





