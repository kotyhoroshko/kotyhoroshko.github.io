window.addEventListener('DOMContentLoaded', function(){


    let items = Array.from( document.querySelectorAll('.item'));
    for (let index = 0; index < items.length; index++) {
        items[index].style.background=`linear-gradient(to bottom right, rgba(0, 0, 0, .66), rgba(51, 51, 51, .5)), rgba(${getRndColor()},${getRndColor()},${getRndColor()},1)`
        
    } 

    let screenSizes = [window.innerWidth, window.innerHeight]
    window.addEventListener('resize', function () {
        screenSizes = [window.innerWidth, window.innerHeight];
        console.log(screenSizes)
    })
    let coor = [ 100 , 90 ]
    Move();

    function Move(){
        coor = [ 100 , 90 ]
        for (let j = 0, index = items.length-1, scale=1, opac=1; index >= 0; index--, j++) {
            // items[index].style.transform = `translate(${coor[0]-55}%, ${coor[1]-50}%) scale(${scale})`;
            items[index].style.transform = `scale(${scale}) translate(-${60-scale*60}%, -0%)`;
            items[index].style.left = `${coor[0]-(60*scale)}%`;
            items[index].style.top = `${coor[1]-(33*scale)}%`;
            items[index].style.opacity = `${opac}`;
            items[index].style.zIndex = `${index}`;
            coor[0] *= .6 ;
            coor[1] *= .66;
            scale *= .8;
            if ( j>items.length-4 ) { opac*=.33 }
        }
    }    

    function getX(e){
        // coor = [ (e.pageX/screenSizes[0]*100) , (e.screenY/screenSizes[1]*50) ]
        Move();
    }
    //window.addEventListener('mousemove', getX);

    function getRndColor() { 
        return Math.floor(Math.random() * 255) 
    }

    
    window.addEventListener('wheel', function(e) {  
        let direction = false;
        e.deltaY > 0 ?  direction = true : direction = false;
        slide(direction)
    })

    function slide(forward) {
        if (forward) {
            items.push(items[0])
            items.shift()
        }
        else {
            items.unshift(items[items.length-1])
            items.pop()
        }
        Move()
    }




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
            if ( xDiff > screenSizes[0]/10 ) {
                //console.log('left swipe ', xDiff, xDown +" - "+ xUp)
                slide(true)
                xDown=xUp
            }
            if ( xDiff < 0 && Math.abs(xDiff) > screenSizes[0]/10 ) {
                console.log('right swipe', xDiff, xDown +" - "+ xUp)
                slide(false)
                xDown=xUp
            }                       
        } else {
            // if ( yDiff > 0 ) {
            //     console.log('up swipe ', xDiff, yDiff)
            //     slide(true)
            // } else { 
            //     console.log('down swipe', xDiff, yDiff)
            //     slide(false)
            // }                                                                 
        }
        /* reset values */
        // xDown = null;
        // yDown = null;                                             
    };


   
}) //end