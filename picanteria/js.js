document.addEventListener("DOMContentLoaded", go);

let a4;
let currentPage = 0;
let touchstartX = 0
let touchendX = 0

document.addEventListener('keydown', function(e) {
    e = e || window.event
    if(e.code=='ArrowRight' || e.code=='ArrowDown') {
        currentPage ++
    }
    if(e.code=='ArrowLeft' || e.code=='ArrowUp') {
        currentPage --
    }
    switchPage()
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
                <p class="price">${page[index].price}</p>
            </div>
        `        
    }
    inner += `  
        </div>
        <div class="footer">
            <p>Lorem, ipsum dolor.</p>
            <p>+38097 9929 999 <br> ipsum dolor.</p>
            <p>Lorem ipsum dolor sit.</p>
        </div>
    `
    return inner
}

let db =[
    [
    {name:`logo`},
    {name:`title`, title:`Піца`},
    {name:`4 сири`, ing:`сир моцарела, сир пармезан, сир дорблю, сир голандський, вершкова основа`, price:`100`},
    {name:`4 сезони`, ing:`сир моцарела, гриби шампіньйони, кукурудза, шинка, салямі, томатна основа`, price:`100`},
    {name:`Шварцнегер`, ing:`сир моцарела, мисливські ковбаски, домашня ковбаска, фасоль, гриби шампіньйони, цибуля, томатна основа`, price:`100`},
    {name:`Picanteria`, ing:`сирмоцарела, папероні, бекон, гриби шампіньйони, томатна основа`, price:`100`},
    {name:`Гавайська`, ing:`сир моцарела, куряче філе, кукурудза, ананас, вершкова основа`, price:`100`},
    {name:`Гушошна`, ing:`сир моцарела, салямі,бекон, шинка, куряче філе, помідор, томатна основа`, price:`100`},
    {name:`Капрічіоза`, ing:`сир моцарела, шинка, гриби шампіньйони, салямі, помідор, томатна основа`, price:`100`},
    {name:`Маргарита`, ing:`сир моцарела, помідор, томатна основа`, price:`100`},
    {name:`ніжна`, ing:`сир моцарела, сир голандський, куряче філе, кукурудза, соус вершковий`, price:`100`},
    {name:`Папероні`, ing:`папероні, сир моцарела, томатна основа`, price:`100`},
    {name:`Салямі`, ing:`салямі, сир моцарела, томатна основа`, price:`100`},
    {name:`Фрішка`, ing:`картопля фрі, бекон, сир моцарела, томатна основа`, price:`100`},
    {name:`Цезар`, ing:`куряче філе, помідор, мікс салатів, сир моцарела, сир пармезан, томатна основа`, price:`100`},
    {name:`до пива`, ing:`сир моцарела, часникова основа`, price:`100`},
    {name:`title`, title:`Додатки до піци`},
    {name:`Кунжутний бортик`, ing:` `, price:`20`},
    {name:`Сирний бортик `, ing:` `, price:`25`},
    {name:`М'ясний бортик`, ing:` `, price:`30`},
    ],
    [
    {name:`title`, title:`Чай`},
    {name:`Зелений чай з імбиром`, ing:`600ml`, price:`50`},
    {name:`Йога-чай з корицею і лакрицею`, ing:`600ml`, price:`50`},
    {name:`Лавандовий чай`, ing:`600ml`, price:`50`},
    {name:`Фруктовий чай Барвиста долина`, ing:`600ml`, price:`50`},
    {name:`Альпійський луг`, ing:`600ml`, price:`50`},
    {name:`Пу-ер Ванільний`, ing:`600ml`, price:`50`},
    {name:`Ройбуш кардамон з лаймом`, ing:`600ml`, price:`50`},
    {name:`Соу-сеп зелений`, ing:`600ml`, price:`50`},
    {name:`Соу-сеп чорний`, ing:`600ml`, price:`50`},
    {name:`Чорний чай Гордість Цейлону`, ing:`600ml`, price:`50`},
    {name:`Чорний чай з женьшенем`, ing:`600ml`, price:`50`},
    {name:`Чорний чай Маракеш`, ing:`600ml`, price:`50`},
    {name:`title`, title:`Кава`},
    {name:`Еспресо`, ing:`36ml`, price:`20`},
    {name:`Допіо`, ing:`подвійний еспресо. 72ml`, price:`40`},
    {name:`Американо`, ing:`100ml`, price:`20`},
    {name:`Мокко`, ing:`американо, шоколадний сироп, взбиті вершки, ваніль. 250ml`, price:`35`},
    {name:`Раф`, ing:`еспресо та вершки. 250ml`, price:`30`},
    {name:`Капучино`, ing:`250ml`, price:`35`},
    {name:`Лате макіато`, ing:`340ml`, price:`40`},
    {name:`Флет Уайт`, ing:`подвійний еспресо з молоком. 250ml`, price:`55`},
    {name:`Мокачино`, ing:`американо, молочна піна, шоколадний сироп, шоколад. 340ml`, price:`40`},
    {name:`Капучино по Віденськи`, ing:`капучино, взбиті вершки, кориця. 340ml`, price:`45`},
    {name:`Баунті`, ing:`лате, кокосовий сироп, кокосова стружка. 340ml`, price:`55`},
    {name:`Медовий лате`, ing:`лате, мед, кориця. 340ml`, price:`50`},
    {name:`title`, title:`Коктейлі`},
    {name:`Гарячий шоколад`, ing:`250ml`, price:`50`},
    {name:`Какао`, ing:`250ml`, price:`30`},
    {name:`Молочний коктейль`, ing:`250ml`, price:`35`},
    ]
]

let pages = db.length;

function go(){
    a4 = document.querySelector('.a4');
    a4.innerHTML = printPage(db[0])
}