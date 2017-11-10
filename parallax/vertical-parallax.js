
$(document).ready(function() {
	var xCor=0;
	var yCor=0;
	var yPos=0;
	Move();

	function Move(){		
		$('html').css({"background" : "url(images/c1.png) "+xCor+"px " + (0-(yPos*4)+yCor ) +
						"px repeat, url(images/c2.png) "+xCor/3+"px " + (0-(yPos)+yCor/3 ) +
						"px repeat, url(images/c3.png) "+xCor/16+"px " + ((yPos*0.75)+yCor/16 ) + 
						"px repeat, url(images/c4.png) "+xCor/60+"px " + ((yPos*0.9)+yCor/60 ) +
						"px repeat, url(images/b3.jpg) fixed"});
	}
		
	$(window).bind('scroll', function(){ //when the user is scrolling...
		yPos = $(window).scrollTop();
		Move();
	});

	window.addEventListener('mousemove', getX)	

	function getX(e){
		xCor = e.pageX;
		yCor = e.screenY;
		yPos = $(window).scrollTop();
		Move();
	}	

	if	($('.portfolio--item').width()>$('.portfolio--item').height()) {
		var wdth = $('.portfolio--item').width();}
	else var wdth = $('.portfolio--item').height();
	var q = Math.sqrt(((wdth/2)*(wdth/2))*2);
	var pad = (wdth-q)
	$('.portfolio--item').css('padding', pad);
	$('.portfolio--item').height($('.portfolio--item').width())
});