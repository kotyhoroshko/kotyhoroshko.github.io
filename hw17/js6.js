// ================ with jQuery + shuffleLetters plugin =======================

$(document).ready(function(){
	var res = $('<p class="res"></p>').css({"display": "flex", "justify-content": "center"});
	$('.joberZone').append(res);
	$('.sentBtn').click(function(){	    	
	        $.get("ajax1/goods.php?art=" + $( 'input[name="art"]' ).val(), function(data,status){        	
        	var answJson = jQuery.parseJSON( data );
        	$('.res').text('');
			for (item in answJson) {
				if (item == 'img') {$('.joberZone').append('<img style="margin:-20px 20px;" src="'+ answJson[item] +'" alt="goods image">') }
    			else { $('.res').shuffleLetters({"text": (item +" : "+ answJson[item] + "\n")}); }
    		}
    		   		
        });
    });
});



// ================ with jQuery ============================


// var art = document.querySelector('input[name="art"]');
// var sentBtn = document.querySelector('.sentBtn');
// 	sentBtn.addEventListener('click', loadDoc);

// var div = document.createElement("div");
// document.querySelector('.joberZone').appendChild(div);

// function loadDoc() {
// 	var xhttp = new XMLHttpRequest();
// 	xhttp.onreadystatechange = function() {
// 		if (this.readyState == 4 && this.status == 200) {
// 			var answJson = JSON.parse(this.responseText);
// 			var goodsDescr = '';
// 			for (item in answJson) {
// 				if (item == 'img') {goodsDescr += '<img style="margin:-20px 20px;" src="'+ answJson[item] +'" alt="goods image">' }
//     			else {goodsDescr += item +" : "+ answJson[item] + "<br>";}
//     		}
//     		div.innerHTML = '<p class="res">'+goodsDescr+'</p>';
//     		document.querySelector('.res').style.cssText = "display: flex;justify-content: center;"
// 		}
// 	};
// 	xhttp.open("GET", "ajax1/goods.php?art=" + art.value , true);
// 	xhttp.send();
// }