var num1 = document.querySelector('input[name="num1"]');
var num2 = document.querySelector('input[name="num2"]');

// ================ with jQuery + shuffleLetters plugin =======================

$(document).ready(function(){
	$('.joberZone').append('<p class="res"></p>');
    $(".sentBtn").click(function(){
        $.post("ajax1/a1.php",
        {
          num1: num1.value,
          num2: num2.value
        },
        function(data,status){
        	$('.res').shuffleLetters({"text": data});;
        });
    });
});




// ================ with jQuery ============================

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
// 	xhttp.open("POST", "ajax1/a1.php", true);
// 	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// 	xhttp.send("num1="+num1.value+"&num2="+num2.value);
// }