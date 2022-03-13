window.onload=function(){

    let wrap = document.querySelector('.wrap');
    let inner = '';
    let popUp = document.querySelector('.popUp');
    var popUpLayer = document.querySelector('.popUp__layer');
        
    for (let index = 0; index < spiska.length; index++) {
        
        inner+=
            `<div class="item" data-type="${spiska[index].type}">
                <div class="item__foto">
                    <img class="fotoPic" src="../jpg/${zeros(spiska[index].foto)}.jpg">
                </div>
                <div class="item__title">
                    <p class="titleText">${spiska[index].title.replace("$","<br>").trim().replace("$","<br>").trim()}</p>
                </div>
            </div>`
        ;        
    }       

    function zeros(num){
        if (num<10) {num = "00"+num }
        else if (num<100) {num = "0"+num }
        return num
    }    

    wrap.innerHTML = inner;
    var items = document.querySelectorAll('.item');

    /////////////   NAV   //////////////////////////////

    var buttonsArea = document.querySelector('.btns');
    buttonsArea.addEventListener('click', showType);

    function showType(e){
        hideItems(e.target.dataset.type);
    }

    function hideItems(typ){
        for (let index = 0; index < items.length; index++) {
            if (items[index].dataset.type == typ){
                items[index].classList.toggle("hiden")
            }           
        }
    }

    wrap.addEventListener('click', showDetail);
    function showDetail(e){
        var cl = e.target;
        if(cl.classList == 'fotoPic'){
            cl = cl.parentElement.parentElement;
            console.log()
            showPopup(cl, cl.getBoundingClientRect().top, cl.getBoundingClientRect().left)
        }
        else {return false}
    }   

    function showPopup(el, top, left){
        popUp.innerHTML = el.outerHTML;       
        popUpLayer.classList.toggle("hidemove");
        popUpLayer.classList.toggle("showmove");
        popUp.classList.toggle("nulf");
        popUp.classList.toggle("nul"); 
        setTimeout(function(){
            popUpLayer.classList.toggle("hiden")
            },
        450 )
    }

    popUpLayer.addEventListener('click', hidePopup);
    function hidePopup(e){
        if (e.target == popUpLayer){
            popUpLayer.classList.toggle("showmove");
            popUpLayer.classList.toggle("hidemove");
            popUp.classList.toggle("nulf"); 
            popUp.classList.toggle("nul");               
            setTimeout(function(){
                popUpLayer.classList.toggle("hiden")
            },
            450 )
        }
    }

    window.addEventListener('click', showEl);
    function showEl(e){
        console.log("It was: " + e.target.classList);
    }
}