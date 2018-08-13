function go(){

    var wrap = document.querySelector('.wrap');
    var shirma = document.querySelector('.shirma');
    var front = document.querySelector('.front');
    var back = document.querySelector('.back');
    var page = document.querySelector('.page');
    var next = document.querySelector('.next');
    var prev = document.querySelector('.prev');
    var book = document.querySelector('.book');
    var constr = document.querySelector('.const');
    var pages = document.querySelector('.pages');
    var card = document.querySelector('.card');
    var p = document.querySelectorAll('.p');
    var pageNum = document.querySelector('.pageNum')
    var gr=0, i=0;


    constr.addEventListener("click", goConst)
        function goConst(){
            shirma.style.left="0";
            setTimeout(goToConstr, 500)
            function goToConstr(){
                window.location = window.location.toString().slice(0, -15)+"index.html";}
        }        
    

    pages.addEventListener("click", function(){        
        book.style.display='inline-block';
        front.style.display='flex';
        back.style.display='flex';
        page.style.display='none';
        pages.style.display='none';
        pageNum.style.display='none'; 
    })

    function rot(){
        front.style.transform = "rotateY("+gr+"deg)";
        back.style.transform = "rotateY("+(gr+180)+"deg)";       
    }
    
    function prevC(){
        gr-=180;
        rot();
    }    
    function nextC(){
        gr+=180;
        rot();
    }

    prev.addEventListener("click", prevC)
    next.addEventListener("click", nextC)
    
    book.addEventListener("click", function(){
        pages.style.display='inline-block';
        page.style.display='flex';
        pageNum.style.display='inline-block';
        book.style.display='none';        
        front.style.display='none';
        back.style.display='none';
        
        prev.addEventListener("click", prevP);
        next.addEventListener("click", nextP);

        p[1].style.zIndex = "0";
        p[2].style.zIndex = "0";
        p[3].style.zIndex = "0";
        p[0].style.zIndex = "10";
        i=0;
        })    

    function prevP(){
        getOut(0, i);
        i--;
        i<0 ? i=3 : false
        p[i].style.zIndex = "10";
        changePageNum(i)
    }    
    function nextP(){
        getOut(1, i);
        i++;
        i>3 ? i=0 : false;               
        p[i].style.zIndex = "10"; 
        changePageNum(i)       
    }

    function getOut(napr, i){
        napr ? j="150%" : j="-50%"
        p[i].style.left=j;
        p[i].style.opacity="0";        
        setTimeout(function(){
            p[i].style.zIndex = "0";
            p[i].style.left="50%";
            p[i].style.opacity="1";
        }, 600)
    }

    function changePageNum(i){
        pageNum.textContent = (i+1)+"cтр"
        console.log(i);
    }


    document.onkeydown = checkKey;
    function checkKey(e) {
        e = e || window.event;    
        if (e.keyCode == '37') {
            prevP()
            prevC()
        }
        if (e.keyCode == '39') {
            nextP()
            nextC()
        }    
    }

    setTimeout(hideShirma, 100);
    function hideShirma(){
        shirma.style.left="101%";
    }
}

document.addEventListener("DOMContentLoaded", go);

