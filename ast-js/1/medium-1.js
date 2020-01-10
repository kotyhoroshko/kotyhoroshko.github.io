let main = document.querySelector('.main');
    main.addEventListener('click',addClick);
let genrateBtn = document.querySelector('[role="generate"]');
    genrateBtn.addEventListener('click', function(e){generateRndClicks(e)});
let showBtn = document.querySelector('[role="show"]');
    showBtn.addEventListener('click',displaySquares);
let resetBtn = document.querySelector('[role="reset"]');
    resetBtn.addEventListener('click',resetSquares);

let squares = new Array(100);
(function createSquares() {
    for (let index = 0; index < squares.length; index++) {
        squares[index] = 0;
    }  
})()

function displaySquares() {    
    let inner = '';
    for (let index = 0; index < squares.length; index++) {        
        inner += `<span num="${index+1}" class="square ${addSquaresClass(squares[index])}">${squares[index]}</span>`;
    }
    main.innerHTML = inner;    
}

function addSquaresClass(clicks) { 
    if (clicks>100){
        return "more100";
    }
    if (clicks>25){ 
        return findBg()
    }
    return "";
    function findBg(){
        if(clicks>75){
            return "more75";
        }
        if(clicks>50){
            return "more50";
        }
        return ("more25");          
    }
}

function generateRndClicks(){   
    for (let index = 0; index < 100; index++) {        
        squares[getRndSquaresNumber()] += 1 ;
    }
}

function getRndSquaresNumber() {
    return (Math.floor(Math.random() * 100))
}

function addClick(el){
    if (el.target.getAttribute("num")) {        
        squares[el.target.getAttribute("num")-1]++;
        //el.target.textContent = +el.target.textContent + 1;
        displaySquares()
    }
}

function resetSquares() {   
    for (let index = 0; index < squares.length; index++) {        
        squares[index]=0;       
    }
}

//============ Aditional =============================

let autoGenerateClicks;
let startBtn = document.querySelector('[role="auto"]');
let stopBtn = document.querySelector('[role="stop"]');

    startBtn.addEventListener('click', function() {
        autoGenerateClicks = setInterval(() => {
            generateRndClicks();
            displaySquares();
        }, 300);
        stopBtn.style.display="block";
        startBtn.style.display="none";
    });


    stopBtn.addEventListener('click', function(){
        clearInterval(autoGenerateClicks);
        stopBtn.style.display="none";
        startBtn.style.display="block";
    })
