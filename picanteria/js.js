document.addEventListener("DOMContentLoaded", go);

let a4;
let currentPage = 0;
let touchstartX = 0
let touchendX = 0

document.addEventListener('keydown', function(e) {
    e = e || window.event
    if(e.code=='ArrowRight' || e.code=='ArrowDown') {
        currentPage ++;
        switchPage()
    }
    if(e.code=='ArrowLeft' || e.code=='ArrowUp') {
        currentPage --;
        switchPage()
    }
    
})
    
function checkDirection() {
  if (touchendX < touchstartX-200)  {
    currentPage --
}
  if (touchendX > touchstartX+200)  {
    currentPage ++
}
    console.log(touchendX - touchstartX)
  switchPage()
}

document.addEventListener('touchstart', e => {
  touchstartX = e.changedTouches[0].screenX
})

document.addEventListener('touchend', e => {
  touchendX = e.changedTouches[0].screenX
  checkDirection()
})

function switchPage() {
    if(currentPage >= pages) {
        currentPage = 0
    }
    if(currentPage<0) {
        currentPage = pages-1
    }

    a4.innerHTML = printPage(db[currentPage])
}

function printPage(page) {
    let inner = `<div class="menuList ${currentPage === 0 ? '' : ('menuList--'+(currentPage+1))}">`;
    for (let index = 0; index < page.length; index++) {
        if (page[index].name === "logo") {
            inner += `
                <div class="block block--logo">
                    <img class="logo" src="picanteria-logo-light.svg" alt="logo">
                </div>
            `
        }
        else if (page[index].name === "title") {
            inner += `
                <div class="block block--title">
                    <h3>${page[index].title}</h3>
                </div>
            `
        }
        else
        inner += `
            <div class="block">
                <div class="desc">
                    <h4 class="name">${page[index].name}</h4>
                    <p class="ing">${page[index].ing}</p>
                </div>
                <div class="priceBlock">
                    <input class="price" value="${page[index].price}"/>
                    <p class="grn">грн</p>
                </div>
            </div>
        `        
    }
    inner += `  
        </div>`
        //+` <div class="footer">
        //     <p>Lorem, ipsum dolor.</p>
        //     <p>+38097 9929 999 <br> ipsum dolor.</p>
        //     <p>Lorem ipsum dolor sit.</p>
        // </div>
        // `
    return inner
}

let db =[
    [
    {name:`logo`},

    {name:`title`, title:`Піца`},
    {name:`4 сири`, ing:`сир моцарела, сир пармезан, сир дорблю, сир твердий, вершкова основа`,price:`150`},
    {name:`4 сезони`, ing:`сир моцарела, печериці, кукурудза, шинка, салямі, томатна основа `,price:`150`},
    {name:`Шварценегер`, ing:`сир моцарела, мисливські ковбаски, домашня ковбаса, квасоля,  печериці, цибуля, томатна основа`,price:`170`},
    {name:`Picanteria`, ing:`сир моцарела, пепероні, бекон, печепиці, томатна основа`, price:`170`},
    {name:`Гавайська`, ing:`сир моцарела, куряче філе, кукурудза, ананас, вершкова основа`,price:`160`},
    {name:`Гушошна`, ing:`сир моцарела, салямі, бекон, шинка, куряче філе, томат, томатна основа`,price:`170`},
    {name:`Капрічіоза`, ing:`сир моцарела , шинка, печериці, салямі, томат, томатна основа`,price:`165`},
    {name:`Маргарита`, ing:`сир моцарела, томат , томатна основа`,price:`120`},
    {name:`ніжна`, ing:`сир моцарела, сир твердий, куряче філе, кукурудза, соус вершковий`,price:`145`},
    {name:`Пепероні`, ing:`пепероні, сир моцарела, томатна основа.`,price:`155`},
    {name:`Салямі`, ing:`салямі, сир моцарела , томатна основа.`,price:`155`},
    {name:`Фрішка`, ing:`картопля фрі, бекон, сир моцарела, томатна основа.`,price:`140`},
    {name:`Цезар`, ing:`куряче філе, томат, мікс салатів, сир моцарела, сир пармезан, томатна основа.`,price:`170`},
    {name:`до пива`, ing:`сир моцарела, часникова основа.`,price:`100`},

    {name:`title`, title:`Додатки до піци`},
    {name:`Кунжутний бортик`, ing:` `, price:`20`},
    {name:`Сирний бортик `, ing:` `, price:`25`},
    {name:`М'ясний бортик`, ing:` `, price:`30`},

    {name:`title`, title:`Соуси до піци`},
    {name:`Соус тартар`, ing:'',price:'20'},
    {name:`Соус часниковий`, ing:'',price:'20'},
    {name:`Кетчуп`, ing:'',price:'20'},
    ],
    [
        {name:`title`, title:`Кава`},
        {name:`Еспресо`, ing:`36ml`, price:"20"},
        {name:`Дабл еспресо`,ing:`подвійний еспресо. 72ml`, price:"40"},
        {name:`Американо`, ing:`86ml`,  price:"20"},
        {name:`Мокко`, ing:`подвійний еспресо,чорний шоколад, молоко. 280ml`, price:"50"},
        {name:`Раф`, ing:`еспресо, вершки, молоко, ванільний цукор. 250ml`, price:"40"},
        {name:`Капучино`, ing:`250ml`,  price:"30"},
        {name:`Лате макіато`, ing:`340ml`, price:"35"},
        {name:`Флет Уайт`,ing:`подвійний еспресо з молоком. 250ml`, price:"44"},
        {name:`Баунті`,ing:`лате, кокосовий сироп,кокосова стружка. 340ml`, price:"45"},
        {name:`Бамбл`, ing:`еспресо, апельсиновий сік. 200ml`,  price:"30"},
        {name:`Еспресо тонік`, ing:`еспресо, тонік. 250ml`, price:"35"},
        {name:`Гарячий шоколад`, ing:`250ml`,  price:"45"},
        {name:`Какао`, ing:`250ml`, price:"30"},
        {name:`Молочний коктель класичний`, ing:`250ml`,  price:"40"},
        {name:`Молочний коктель шоколадний`, ing:`250ml`,  price:"50"},
        
        {name:`title`, title:`Добавки`},
        {name:`Сироп`, ing:`15ml`,  price:"10"},
        {name:`Вершки`, ing:`10ml`,  price:"5"},
        {name:`Молоко`, ing:`50ml`,  price:"5"},
        
        {name:`title`, title:`Чаї`},
        {name:`Зелений чай з імбиром`, ing:`600ml`,  price:"50"},
        {name:`Йога-чай з корицею і лакрицею`, ing:`600ml`, price:"50"},
        {name:`Лавандовий чай`, ing:`600ml`, price:"50"},
        {name:`Фруктовий чай Барвиста долина`, ing:`600ml`, price:"50"},
        {name:`Чай Альпійський луг`, ing:`600ml`, price:"50"},
        {name:`Чай Пу-ер Ванільний`, ing:`600ml`,  price:"50"},
        {name:`Чай Ройбуш кардамон з лаймом`, ing:`600ml`, price:"50"},
        {name:`Чай Соу-сеп зелений`, ing:`600ml`, price:"50"},
        {name:`Чай Соу-сеп чорний`, ing:`600ml`, price:"50"},
        {name:`Чорний чай Гордість Цейлону`, ing:`600ml`, price:"50"},
        {name:`Чорний чай з женьшенем`, ing:`600ml`,  price:"50"},
        {name:`Чорний чай Маракеш`, ing:`600ml`, price:"50"},

        {name:`Імбир та лемонграс`, ing:`250ml`, price:'30'},
        {name:`Малина та мята`, ing:`250ml`, price:'30'},
        {name:`Чорна смородина`, ing:`250ml`, price:'30'},
        {name:`Обліпиха та імбир`, ing:`250ml`, price:'30'},
        {name:`Ягідний мікс`, ing:`250ml`, price:'30'},
        {name:`Журавлина та імбир`, ing:`250ml`, price:'30'},
        {name:`Апельсин та мята`, ing:`250ml¬`, price:'30'},
        {name:`Глінтвейн`, ing:`250ml`, price:'30'},
        

    ],
    [
        {name:`title`, title:`Меню фрі`},
        {name:`Нагетси курячі`, ing:`200г`, price:`80`},
        {name:`Картопля фрі`, ing:`150г`, price:`55`},
        {name:`Крильця в медовому соусі`, ing:`200г`, price:`120`},
        {name:`Корн дог`, ing:'сосиска, моцарела. 200г', price:`69`},
    
        {name:`title`, title:`Сніданки`},
        {name:`Сирники`, ing:'сир, сметана, повидло. 200г', price:"60"},
        {name:`Омлет`, ing:'яйця, шинка, сир твердий. 200г',price:"80"},
        {name:`Сендвіч з шинкою`, ing:'тости, соус, шинка, сир твердий. 150г',price:"50"},
    
        {name:`title`, title:`Салати`},
        {name:`Капрезе`,ing:`сир моцарела, томати,орегано. 300г`, price:`120`},
        {name:`Грецький`,ing:`томати, сир фета, перець, маслини, огірок. 250г`, price:`110`},
        {name:`Цезар`,ing:`куряче філе, пармезан, томати , салат. 250г` , price:`120`},
        {name:`Ніжність`,ing:`куряче філе, сир твердий, кукурудза, салат. 250г`, price:`120`},

        {name:`title`, title:`Холодні напої`},
        {name:`Соки "Rich" в асортименті`, ing:`1000ml`,  price:"70"},
        {name:`Соки "Rich" в асортименті`, ing:`300ml`,  price:"30"},
        {name:`"Coca-Cola", "Fanta", "Sprite"`, ing:`500ml`,  price:"25"},
        {name:`Вода "Бонаква" негазована`, ing:`500ml`,  price:"20"},
        {name:`Вода "Шаянська" газована`, ing:`500ml`,  price:"25"},

    ]
]


let pages = db.length;

function go(){
    a4 = document.querySelector('.a4');
    a4.innerHTML = printPage(db[0])
}