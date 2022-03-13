 //----------------------------- SWIPE START-------------------------
 let screenSizes = [window.innerWidth, window.innerHeight]
 document.addEventListener('touchstart', handleTouchStart, false);        
 document.addEventListener('touchmove', handleTouchMove, false);

 var xDown = null;                                                        
 var yDown = null;

 function getTouches(evt) {
 return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
 }                                                     

 function handleTouchStart(evt) {
     const firstTouch = getTouches(evt)[0];                                      
     xDown = firstTouch.clientX;                                      
     yDown = firstTouch.clientY;                                      
 };                                                

 function handleTouchMove(evt) {
     if ( ! xDown || ! yDown ) {
         return;
     }

     var xUp = evt.touches[0].clientX;                                    
     var yUp = evt.touches[0].clientY;

     var xDiff = xDown - xUp;
     var yDiff = yDown - yUp;

     if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
         if ( xDiff > screenSizes[0]/5 ) {
             console.log('left swipe ')
             moveBack()
             xDown=xUp
         }
         if ( xDiff < 0 && Math.abs(xDiff) > screenSizes[0]/5 ) {
             console.log('right swipe')
             moveForward()
             xDown=xUp
         }                       
     } else {
         if ( yDiff > screenSizes[1]/5 ) {
             console.log('up swipe ')
            //  slide(true)
             yDown=yUp
         } 
         if(yDiff < 0 && Math.abs(yDiff)>screenSizes[1]/5) { 
             console.log('down swipe')
            //  slide(false)
             yDown=yUp
         }                                                                 
     }                                     
 }; //swipe end