// ================ with jQuery + shuffleLetters plugin =======================

$(document).ready(function(){
	var res = $('<div class="res flex"></div>');
	$('.joberZone').append(res);

	$('.sentBtn').click(function(){	    	
	        $.get("ajax1/goods.php?art=" + $( 'input[name="art"]' ).val(), function(data,status){
        	var answJson = jQuery.parseJSON( data );

        	var goodsDescr='';
        	$('.res').html('<div class="containerDesc"></div>');
        	var j = 0;

			for (item in answJson) {
				if (item == 'img') {var goodsImg = $('<img style="margin:-20px 20px;" src="'
					+ answJson[item] 
					+'" alt="goods image">') }
    			else { j++;
    					$('.res > div').append('<p class="c'+j+'"></p>');
    			$('.res > div > p.c'+j).shuffleLetters({ "text": (item +" : "+ answJson[item]) }); }

    		}
    		$('.res').append(goodsImg);
    		
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