document.addEventListener("DOMContentLoaded", function(){

    let balls = document.querySelectorAll('.ball');
    let shadows = document.querySelectorAll('.ball-shadow');

    let turn = document.querySelector('.turn__value');
    let delta = document.querySelector('.delta__value');
    let ballsQty = document.querySelector('.balls-qty__value');

    turn.addEventListener('mousemove', function(){
        changeTurnTime(balls, +turn.value);
        changeTurnTime(shadows, +turn.value);
        document.querySelector('.turn .indicator').textContent=turn.value;
    })
    
    delta.addEventListener('mousemove', function(){
        range(balls, +delta.value);
        range(shadows, +delta.value);
        document.querySelector('.delta .indicator').textContent=delta.value;
    })

    ballsQty.addEventListener('change', function(){
        createBallls(+ballsQty.value);
        document.querySelector('.balls-qty .indicator').textContent=ballsQty.value;
    });

    function range(item, value){
        for (let index = 0; index < item.length; index++) {
            item[index].style.animationDelay= +(value+(value*index))+"ms";            
        }        
    }

    function changeTurnTime(item, value){
        for (let index = 0; index < item.length; index++) {
            item[index].style.animationDuration= +value+"ms";            
        }        
    }

    function createBallls(qty) {
        let inn='';
        for (let index = 0; index < (+qty); index++) {            
            inn+=`<div class="ball-container">
                    <div class="ball ball--${index+1}"></div>        
                    <div class="ball-shadow ball-shadow--${index+1}"></div>
                </div>
            `
        }        
        document.querySelector('.preloader-container').innerHTML=inn;
        balls = document.querySelectorAll('.ball');
        shadows = document.querySelectorAll('.ball-shadow');
        changeTurnTime(balls, +turn.value);
        changeTurnTime(shadows, +turn.value);
        range(balls, +delta.value);
        range(shadows, +delta.value);
    }

}); //end