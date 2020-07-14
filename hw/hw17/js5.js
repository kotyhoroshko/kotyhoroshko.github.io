// ================ with jQuery + shuffleLetters plugin =======================

$(document).ready(function(){
	var height = document.querySelector('input[name="height"]');
	$('.joberZone').append('<p class="res"></p>');
	    $('.sentBtn').click(function(){
        $.post("ajax1/mail.php",
        {
          fio: $( '[type="text"]' ).val(),
          email: $( '[type="email"]' ).val(),
          phone : $( '[type="tel"]' ).val()
        },
        function(data,status){
        	$('.res').shuffleLetters({"text": data});
        });
    });
});




// ================ with jQuery ============================

// var name = document.querySelector('input[type="text"]');
// var email = document.querySelector('input[type="email"]');
// var tel = document.querySelector('input[type="tel"]');
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
// 	xhttp.open("POST", "ajax1/mail.php", true);
// 	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// 	xhttp.send("fio="+name.value+"&email="+email.value+"&phone="+tel.value);
// }