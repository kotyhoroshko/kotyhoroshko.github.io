// ================ with jQuery + shuffleLetters plugin =======================

$(document).ready(function(){
	var year = document.querySelector('input[name="year"]');
		$('.joberZone').append('<p class="res"></p>');
	    $(".sentBtn").click(function(){
	        $.post("ajax1/a2.php", { year: year.value }, function(data,status){
	        	$('.res').shuffleLetters({"text": data});;
	        });
	    });
});



// ================ withOut jQuery ============================

// var year = document.querySelector('input[name="year"]');
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
// 	xhttp.open("POST", "ajax1/a2.php", true);
// 	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// 	xhttp.send("year="+year.value);
// }