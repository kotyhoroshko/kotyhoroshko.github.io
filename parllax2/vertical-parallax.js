
$(document).ready(function() {
	var xCor=0;
	var yCor=0;
	var yPos=0;
	var yMov=0;
	var xMov=0;
	Move();

	function Move(){		
		$('html').css({"background" : "url(images/c12.png) "+xMov + xCor/3+"px " + (yMov*2-(yPos*4)+yCor/10 ) +
						"px repeat, url(images/c22.png) "+xMov/2 + xCor/10+"px " + (yMov-(yPos)+yCor/30 ) +
						"px repeat, url(images/c32.png) "+xMov/10 + xCor/50+"px " + (yMov/2+(yPos*0.75)+yCor/120 ) + 
						"px repeat, url(images/c42.png) "+xMov/20 + xCor/120+"px " + (yMov/7+(yPos*0.9)+yCor/400 ) +
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
	var pad = (wdth-q)/2+20;
	$('.portfolio--item').css('padding', pad);
	$('.portfolio--item').height($('.portfolio--item').width())

	setInterval(() => {
		yMov--;
		//if (Math.floor(Math.random()*10) > 4){xMov=xMov+0.5}
		//else xMov=xMov-0.5;
		//console.log(xMov)
		Move();		
	}, 25);
	
});