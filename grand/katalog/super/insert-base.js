let content = document.querySelectorAll('.content');

function page1(){
    // let inner = `<h2 class="title">${base.h1}</h2>`;
    let inner = '';
    for (let index = 0; index < base.p1.length; index++) {
        inner += `<div class="item">
                    <div class="item__pic">
                        <img src="./img/${ base.p1[index].pic}.png">
                    </div>
                    <div class="item__desc">
                        <p>${ base.p1[index].desc}</p>
                    </div>
                </div>`
    }
    content[0].innerHTML = inner;
}
page1()

// ----------------------------------------------------------------------------------

function page2(){
    // let inner = `<h2 class="title">${base.h2[0]}</h2>`;
    let inner = '';
    for (let index = 0; index < 4; index++) {
        inner += `<div class="item">
                    <div class="item__pic">
                        <img src="./img/${ base.p2[index].pic}.png">
                    </div>
                    <div class="item__desc">
                        <p>${ base.p2[index].desc}</p>
                    </div>
                </div>`
    }

    // inner += `<h2 class="title">${base.h2[1]}</h2>`;
    for (let index = 4; index < base.p2.length; index++) {
        inner += `<div class="item">
                    <div class="item__pic">
                        <img src="./img/${ base.p2[index].pic}.png">
                    </div>
                    <div class="item__desc">
                        <p>${ base.p2[index].desc}</p>
                    </div>
                </div>`
    }
    content[1].innerHTML = inner;
}
page2()

// ----------------------------------------------------------------------------------

function page3(){
    // let inner = `<h2 class="title">${base.h3[0]}</h2>`;
    let inner = '';
    for (let index = 0; index < 3; index++) {
        inner += `<div class="item item--table">
                    <div class="item__pic item__pic--table">
                        <img src="./img/${base.p3[index].pic}.png">
                    </div>
                    <div class="item__desc item__desc--table">
                        <p>${ base.p3[index].desc}</p>
                    </div>
                </div>`
    }

    // inner += `<h2 class="title">${base.h3[1]}</h2>`;
    for (let index = 3; index < 6; index++) {
        inner += `<div class="item item--table">
                    <div class="item__pic item__pic--table">
                        <img src="./img/${ base.p3[index].pic}.png">
                    </div>
                    <div class="item__desc item__desc--table">
                        <p>${base.p3[index].desc}</p>
                    </div>
                </div>`
    }
    
    // inner += `<h2 class="title">${base.h3[2]}</h2>`;
    for (let index = 6; index < base.p3.length; index++) {
        inner += `<div class="item item--3">
                    <div class="item__pic item__pic--3">
                        <img src="./img/${ base.p3[index].pic}.png">
                    </div>
                    <div class="item__desc item__desc--3">
                        <p>${base.p3[index].desc}</p>
                    </div>
                </div>`
    }
    content[2].innerHTML = inner;
}
page3()

// --------------------------------------------------------------------------?
function page4() {
    // let inner = `<h2 class="title">${base.h4}</h2>`;
    let inner = '';
    for (let index = 0; index < base.p4.length; index++) {
        if(index==4 || index==6){
            inner += `<div class="item item--3">
                    <div class="item__pic item__pic--3">                        
                    </div>
                    <div class="item__desc item__desc--3">                        
                    </div>
                </div>`
        }
        inner += `<div class="item item--3">
                    <div class="item__pic item__pic--3">
                        <img src="./img/${ base.p4[index].pic}.png">
                    </div>
                    <div class="item__desc item__desc--3">
                        <p>${base.p4[index].desc}</p>
                    </div>
                </div>`
    }
    inner += `<div class="logo"><img src="./img/logo.png"></div>`
    content[3].innerHTML = inner;
}
page4()

// ----------------------------------------------------------------------------

function page5() {
    let inner = `<h2 class="title">${base.h5[0]}</h2>`;
    // let inner = '';
    for (let index = 0; index < base.p5.length; index++) {
        if(index==6){
            inner += `<h2 class="title">${base.h5[1]}</h2>`;
        }
        inner += `<div class="item item--3">
                    <div class="item__pic item__pic--3">
                        <img src="./img/${ base.p5[index].pic}.png">
                    </div>
                    <div class="item__desc item__desc--3">
                        <p>${base.p5[index].desc}</p>
                    </div>
                </div>`
    }
    content[4].innerHTML = inner;
}
page5()


// ----------------------------------------------------------------------------

function page6() {
    let inner = `<h2 class="title">${base.h6}</h2>`;
    // let inner = '';
    for (let index = 0; index < base.p6.length; index++) {
        if(index==6){
            inner += `<div class="rozd"></div>`;
        }
        inner += `<div class="item item--4">
                    <div class="item__pic item__pic--4">
                        <img src="./img/${ base.p6[index].pic}.png">
                    </div>
                    <div class="item__desc item__desc--4">
                        <p>${base.p6[index].desc}</p>
                    </div>
                </div>`
    }
    content[5].innerHTML = inner;
}
page6()