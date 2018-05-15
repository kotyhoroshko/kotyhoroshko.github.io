var height = document.querySelector('input[name="height"]');


// ================ with jQuery + shuffleLetters plugin =======================

$(document).ready(function(){
	$('.joberZone').append('<p class="res"></p>');
    $(".sentBtn").click(function(){
        $.post("ajax1/a3.php",
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