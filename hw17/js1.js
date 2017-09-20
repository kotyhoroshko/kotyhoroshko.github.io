$(document).ready(function(){
	var num1 = document.querySelector('input[name="num1"]');
	var num2 = document.querySelector('input[name="num2"]');
    $(".sentBtn").click(function(){
        $.post("/ajax1/a1.php",
        {
          num1: num1.value,
          num2: num2.value
        },
        function(data,status){
            alert("Data: " + data + "\nStatus: " + status);
        });
    });
});