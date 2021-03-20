window.addEventListener('DOMContentLoaded', function(){

    let wrapper = document.querySelector('.wrapper');    
    let items = Array.from( document.querySelectorAll('.item'));
    let mirrors = Array.from( document.querySelectorAll('.mirror'));
    for (let index = 0; index < items.length; index++) {
        let rndColor = `rgba(${getRndColor()},${getRndColor()},${getRndColor()}`
        items[index].style.background=`linear-gradient(to bottom right, rgba(0, 0, 0, .66), rgba(104, 52, 0, .5)), ${rndColor},1)`
        mirrors[index].style.background=`linear-gradient(to top right, rgba(0, 0, 0, 0) 18%, ${rndColor},.8))`
        
    } 

    let screenSizes = [window.innerWidth, window.innerHeight]
    window.addEventListener('resize', function () {
        screenSizes = [window.innerWidth, window.innerHeight];
        console.log(screenSizes)
    })
    let coor = [ 100 , 90 ]
    Move();

    function Move(){
        coor = [ 100 , 85 ]
        for (let j = 0, index = items.length-1, scale=1, opac=1; index >= 0; index--, j++) {            
            items[index].style.transform = `scale(${scale}) translate(-${60-scale*60}%, -0%)`;
            items[index].style.left = `${coor[0]-(60*scale)}%`;
            items[index].style.top = `${coor[1]-16}%`;
            if (index == items.length-1){
                items[index].style.transform = `scale(1.1) translate(-10%, 10%)`;
                items[index].style.left = `${coor[0]-(66*scale)}%`;
                items[index].style.top = `${coor[1]-(33*scale)}%`;
            }
            items[index].style.opacity = `${opac}`;
            items[index].style.zIndex = `${index}`;
            coor[0] *= .6 ;
            coor[1] *= .6;
            scale *= .8;
            if ( j>items.length-4 ) { opac*=.33 }            
        }        
    }    

    // function getX(e){
    //     mouseCoor = [ (e.pageX/screenSizes[0]) , (e.screenY/screenSizes[1]) ]
    //     wrapper.style.transform=`
    //         skew(${2*(mouseCoor[0]-.5)}deg, ${2*(mouseCoor[1]-.5)}deg) 
    //         scale(${1+(Math.abs(mouseCoor[0])/10)}, ${1+(Math.abs(mouseCoor[1])/10)})`
    //     console.log(`
    //         skew(${10*(mouseCoor[0]-.5)}deg, ${10*(mouseCoor[1]-.5)}deg) 
    //         scale(${1-(Math.abs(mouseCoor[0])/10)}, ${1-(Math.abs(mouseCoor[1])/10)})`, mouseCoor)
    // }
    // //transform: skew(0deg, -1deg)
    // window.addEventListener('mousemove', getX) ;

    function getRndColor() { 
        return Math.floor(Math.random() * 255) 
    }
    
    window.addEventListener('wheel', function(e) {  
        let direction = false;
        e.deltaY > 0 ?  direction = false : direction = true;
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



    //----------------------------- SWIPE START-------------------------

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
                //console.log('left swipe ')
                slide(true)
                xDown=xUp
            }
            if ( xDiff < 0 && Math.abs(xDiff) > screenSizes[0]/5 ) {
                //console.log('right swipe')
                slide(false)
                xDown=xUp
            }                       
        } else {
            if ( yDiff > screenSizes[1]/5 ) {
                //console.log('up swipe ')
                slide(true)
                yDown=yUp
            } 
            if(yDiff < 0 && Math.abs(yDiff)>screenSizes[1]/5) { 
                //console.log('down swipe')
                slide(false)
                yDown=yUp
            }                                                                 
        }                                     
    }; //swipe end

   
}) //end