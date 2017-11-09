/*
JavaScript for the demo: jQuery Vertical Parallax Background
Demo: jQuery Vertical Parallax Background

Demo URL: http://www.ianlunn.co.uk/demos/jquery-vertical-parallax-background/
Tutorial URL: http://www.ianlunn.co.uk/blog/code-tutorials/jquery-vertical-parallax-background/
*/


$(document).ready(function() { //when the document is ready
				
		// windowHeight = $(window).height(); //get the height of the window
		// city = windowHeight * 0.675; //create a variable that contains the starting position for r1.png
		// hills = windowHeight * 0.625; //do the same for r2.png
		// mountains = windowHeight * 0.350; //do the same for r3.png
		// sky = 0; //sky starts at the top (0px)
		
		// //change the css of the <html> element to give it multiple backgrounds using CSS3. This contains the variables we just worked out for each individual background
		// $('html').css({"background" : "url(images/r1.png) 0 " + city +
		//  "px repeat-x, url(images/r2.png) 0 " + hills +
		//   "px repeat-x, url(images/r3.png) 0 " + mountains + 
		//   "px repeat-x, url(images/r4.png) 0 -" + sky + "px repeat-x #336600"});
		
		
		function Move(){ //set up a function to be called whenever the window is scrolled or resized
			windowHeight = $(window).height(); //get the height of the window
			pos = $(window).scrollTop(); //get the position of the scrollbar
			//change the css of the <html> element to give it multiple backgrounds using CSS3. The variables contained will change for every pixel the window is resized or scrolled
			$('html').css({"background" : "url(images/r1.png) 0 " + (0-(pos*4)) +
							"px repeat, url(images/r2.png) 0 " + (0-(pos)) +
							"px repeat, url(images/r3.png) 0 " + ((pos*0.75)) + 
							"px repeat, url(images/r4.png) 0 " + ((pos*0.9)) + "px repeat, url(images/bg-sky.jpg) fixed"});
		}
		
	$(window).resize(function(){ //when the window is resized...
		Move(); //call the Move() function
	});		
	
	$(window).bind('scroll', function(){ //when the user is scrolling...
		Move(); //call the Move() function
	});
	
});