// ================ with jQuery + shuffleLetters plugin =======================

$(document).ready(function(){
	var height = document.querySelector('input[name="height"]');
	$('.joberZone').append('<p class="res"></p>');
	$('.height').text('Height: '+height.value + ' cm');
	$('input[name="height"]').mouseup( function(){$('.height').text('Height: '+height.value + ' cm')});
    $('.sentBtn').click(function(){
        $.post("http://kotyhoroshko.github.io/hw17/ajax1/a3.php",
        {
          height: height.value,
          sex: $( "input:checked" ).val()
        },
        function(data,status){
        	$('.res').shuffleLetters({"text": data});;
        });
    });
});




// ================ with jQuery ============================

// var height = document.querySelector('input[name="height"]');
// 	height.addEventListener('mousemove', showHeight);

// function showHeight(){
// 	document.querySelector('.height').textContent = height.value +"cm" ;
// }

// showHeight();

// var sentBtn = document.querySelector('.sentBtn');
// 	sentBtn.addEventListener('click', loadDoc);

// var div = document.createElement("div");
// 	div.innerHTML = '<p class="res"></p>';
// document.querySelector('.joberZone').appendChild(div);

// function loadDoc() {
// 	var xhttp = new XMLHttpRequest();
// 	xhttp.onreadystatechange = function() {
// 		if (this.readyState == 4 && this.status == 200) {
// 			document.querySelector(".res").textContent = this.responseText; }
// 	};
// 	xhttp.open("POST", "ajax1/a3.php", true);
// 	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// 	xhttp.send("height="+height.value+"&sex="+document.querySelector('[name="sex"]:checked').value);
// }