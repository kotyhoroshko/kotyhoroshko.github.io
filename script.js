window.addEventListener('DOMContentLoaded', function(){


    let items = Array.from( document.querySelectorAll('.item'));
    for (let index = 0; index < items.length; index++) {
        items[index].style.background=`linear-gradient(to bottom right, rgba(0, 0, 0, .66), rgba(51, 51, 51, .5)), rgba(${getRndColor()},${getRndColor()},${getRndColor()},1)`
        
    } 

    let screenSizes = [window.innerWidth, window.innerHeight]
    let coor=[50, 50]
    Move();

    function Move(){
        for (let j = 0, index = items.length-1, scale=1, opac=1; index >= 0; index--, j++) {
            proe = coor[0]*3
            // items[index].style.transform = `translate(${coor[0]-55}%, ${coor[1]-50}%) scale(${scale})`;
            items[index].style.transform = `scale(${scale})`;
            items[index].style.left = `${coor[0]}%`;
            items[index].style.top = `${coor[1]}%`;

            items[index].style.opacity = `${opac}`;
            items[index].style.zIndex = `${index}`;
            coor[0] *= .9 ;
            coor[1] *= .66;
            scale *= .8;
            if (j>items.length-4){opac*=.6}
            // console.log(coor[0])
        }
    }    

    function getX(e){
        coor = [ (e.pageX/screenSizes[0]*50) , (e.screenY/screenSizes[1]*50) ]		
        Move();
    }

    function getRndColor() { 
        return Math.floor(Math.random() * 255) 
    }

    window.addEventListener('mousemove', getX);
    window.addEventListener('wheel', function(e) {         
        slide(e)
    })
    window.addEventListener('touchstart', function(e) {         
        slide(e)
    })

    function slide(e) {
        if (e.deltaY>0) {
            items.push(items[0])
            items.shift()
        }
        else {
            items.unshift(items[items.length-1])
            items.pop()
        }
        console.log (e)     
       getX(e)
    }


   
}) //end