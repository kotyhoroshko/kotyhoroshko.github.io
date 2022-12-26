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
        // console.log(page[index].name)
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
        {name:`Піца «4 сири»`, ing:`моцарела, сир пармезан, сир дорблю, сир твердий, вершкова основа. 450г`, price:`150`},
        {name:`Піца «4 сезони»`, ing:`моцарела, печериці, кукурудза, шинка, салямі, томатна основа. 500г`, price:`150`},
        {name:`Піца «Шварценегер»`, ing:`моцарела, мисливські ковбаски, домашня ковбаса, квасоля,  печериці, цибуля, томатна основа. 600г`, price:`170`},
        {name:`Піца «Picanteria»`, ing:`моцарела, пепероні, бекон, печериці, томатна основа. 485г`,  price:`170`},
        {name:`Піца «Гавайська»`, ing:`моцарела, куряче філе, кукурудза, ананас, вершкова основа. 550г`, price:`160`},
        {name:`Піца «Гушошна»`, ing:`моцарела, салямі, бекон, шинка, куряче філе, томат, томатна основа. 600г`, price:`180`},
        {name:`Піца «Капрічіоза»`, ing:`моцарела , шинка, печериці, салямі, томат, томатна основа. 450г`, price:`165`},
        {name:`Піца «Маргарита»`, ing:`моцарела, томат, томатна основа. 470г`, price:`120`},
        {name:`Піца «Ніжна»`, ing:`моцарела, сир твердий, куряче філе, кукурудза, соус вершковий. 490г`, price:`145`},
        {name:`Піца «Пепероні»`, ing:`пепероні, сир моцарела, томатна основа. 460г`, price:`155`},
        {name:`Піца «Салямі»`, ing:`салямі, сир моцарела , томатна основа. 460г`, price:`155`},
        {name:`Піца «Фрішка»`, ing:`картопля фрі, бекон, сир моцарела, томатна основа. 550г`, price:`140`},
        {name:`Піца «Цезар»`, ing:`куряче філе, томат, мікс салатів, сир моцарела, сир пармезан, томатна основа. 550г`, price:`170`},
        {name:`Піца «До пива»`, ing:`моцарела, часникова основа. 300г`, price:`100`},
        {name:`Піца "Курка піканте"`, ing:`моцарела, томатна основа, куряче філе, кукурудза, солодкий соус чилі. 530г`, price:`165`},
        {name:`Піца «Дон Карлеоне»`, ing:`моцарела, сир дорблю, пепероні, томатна основа. 480г`, price:`180`},
        {name:`Піца "Прошуто Фунгі"`, ing:`моцарела, печериці, прошуто, томатна основа. 430г`, price:`160`},
        {name:`Піца «Песто»`, ing:`моцарела, бекон, шинка, болгарський перець, томатна основа, соус песто. 585г`, price:`175`},
        {name:`Піца «Рукола»`, ing:`моцарела, пармезан, томати чері, рукола, томатна основа. 490г`, price:`140`},
        {name:`Піца «Кон пере»`, ing:`моцарела, сир дорблю, груша, волоський горіх, вершкова основа. 490г`, price:`140`},
        {name:`Піца «Базиліката»`, ing:`моцарела, сир фета, маслини, томати, соус песто, вершкова основа. 530г`, price:`160`},
        {name:`Піца «Закарпатська»`, ing:`моцарела, шовдарь копчений, ковбаса копчена, маринований огірок, цибуля, томатна основа.  560г`, price:`180`},

        {name:`title`, title:`Бортик піци`},
        {name:`Сирний бортик `, ing:` `, price:`25`},
        {name:`Кунжутний бортик`, ing:` `, price:`20`},
        {name:`М'ясний бортик`, ing:` `, price:`20`},

        {name:`title`, title:`Соуси`},
        {name:`Кетчуп`, ing:`50г`, price:`20`},
        {name:`Соус часниковий`, ing:`50г`, price:`20`},
        {name:`Соус барбекю`, ing:`50г`, price:`20`},
        {name:`Соус «Цезар»`, ing:`50г`, price:`20`},
        {name:`Соус «Тартар»`, ing:`50г`, price:`20`},
        {name:`Соус солодкий чилі`, ing:`50г`, price:`20`},
    
    ],

    // ========================= 2 ===================================

    [
        {name:`logo`},

        {name:`title`, title:`Фрі`},
        {name:`Нагетси курячі`, ing:`100г`, price:`50`},
        {name:`Крильця в медовому соусі`, ing:`100г`, price:`60`},
        {name:`Курячі ніжки`, ing:`100г`, price:`60`},
        {name:`Корн дог`, ing:`сир моцарела, сосиска. 200г`, price:`59`},
        {name:`Картопля фрі`, ing:`150г`, price:`55`},
        {name:`Картопля по селянськи`, ing:`150г`, price:`55`},
        {name:`Картопля по креольськи`, ing:`150г`, price:`55`},
        {name:`Цибулеві кільця`, ing:`соус на вибір. 200г`, price:`85`},

        {name:`title`, title:`Лаваш`},
        {name:`Лаваш з куркою та овочами`, ing:`куряче філе, огірки, томати, капуста. 300г`, price:`90`},
        {name:`Лаваш з сиром`, ing:`сир селянський, зелень. 300г`, price:`70`},
        {name:`Лаваш «Цезар»`, ing:`куряче філе, сир твердий, томати, салат, соус Цезар. 300г`, price:`80`},
        {name:`Лаваш Закарпатський`, ing:`копченина, цибуля смажена, огірки мариновані. 300г`, price:`90`},
        {name:`Лаваш з яловичиною`, ing:`яловичина, огірки, томати, капуста. 300г `, price:`110`},
    
        {name:`title`, title:`Салати`},
        {name:`Капрезе`, ing:`сир моцарела, томати, орегано. 300г`, price:`120`},
        {name:`Грецький`, ing:`томати, сир фета, перець, маслини, огірки. 250г`, price:`110`},
        {name:`Цезар`, ing:`куряче філе, пармезан, томати , салат. 250г`, price:`120`},
        {name:`Ніжність`, ing:`куряче філе, сир твердий, кукурудза, салат. 250г`, price:`120`},
        {name:`Салат гарбузовий`, ing:`сир горгонзола, сир камамбер, яблука, салат, гарбуз. 300г`, price:`120`},
        {name:`Салат з яловичиною`, ing:`яловичина, мікс салатів, томати чері, кунжут. 300г`, price:`130`},

        {name:`title`, title:`Закуски`},
        {name:`Сирна тарілка`, ing:`сир твердий, дорблю, камамбер, брі, мед, горіхи. 350г`, price:`290`},
        {name:`М’ясна тарілка`, ing:`шовдарь копчений, салямі, пепероні, чорізо, бастурма. 320г`, price:`220`},
        {name:`Закарпатська тарілка`, ing:`шовдарь копчений, сало копчене, ковбаса домашня копчена, помазанка зі шкварок, тости. 400г`, price:`200`},
        {name:`Чорізо`, ing:`100г`, price:`80`},
        {name:`Бастурма`, ing:`70г`, price:`70`},
        {name:`Арахіс`, ing:`100г`, price:`40`},
        {name:`Сир сулугуні косичка`, ing:`120г`, price:`60`},
    ],

    // ========================= 3 ===================================

    [
        {name:`logo`},

        {name:`title`, title:`Сніданки `},
        {name:`Американський сніданок`, ing:`яєшня, сосиски, бекон, тости, квасоля`, price:`120`},
        {name:`Італійський сніданок`, ing:`омлет, багет, бекон, томатна сальса, соус песто`, price:`100`},
        {name:`Французький сніданок`, ing:`яйце пашот, багет, помазанка сирно-часникова`, price:`70`},
        {name:`Закарпатський сніданок`, ing:`хліб бундаш, копчене сало, салат`, price:`75`},
        {name:`Омлет`, ing:`яйця, шинка, сир твердий, тости`, price:`80`},
        {name:`Сирники`, ing:`200г`, price:`80`},

        {name:`title`, title:`Млинці`},
        {name:`Млинці з сиром`, ing:`250г`, price:`60`},
        {name:`Млинці банан-Nutella`, ing:`250г`, price:`75`},
        {name:`Млинці з м’ясною начинкою`, ing:`250г`, price:`80`},
        {name:`Млинці з варенням на вибір`, ing:`250г`, price:`55`},
        {name:`Млинці з грибами`, ing:`250г`, price:`65`},
        {name:`Млинці лосось-філадельфія`, ing:`250г`, price:`120`},
    
        {name:`title`, title:`Паста`},
        {name:`Спагетті карбонара`, ing:`250г`, price:`110`},
        {name:`Паста болоньєзе`, ing:`250г`, price:`120`},
        {name:`Паста з куркою та грибами`, ing:`250г`, price:`120`},
        {name:`Паста по-Закарпатському`, ing:`250г`, price:`100`},
    ],

    // ========================= 4 ===================================

    [
        {name:`title`, title:`Кавова карта`},
        {name:`Еспресо`, ing:`36мл`, price:`20`},
        {name:`Еспресо Зеро`, ing:`36мл`, price:`20`},
        {name:`Дабл еспресо`, ing:`72мл`, price:`40`},
        {name:`Американо`, ing:`86мл`, price:`20`},
        {name:`Мокко`, ing:`дабл еспресо, чорний шоколад, молоко. 280мл`, price:`50`},
        {name:`Раф кава`, ing:`еспресо, вершки, молоко, ванільний цукор. 250мл`, price:`40`},
        {name:`Капучино`, ing:`250мл`, price:`30`},
        {name:`Лате макіато`, ing:`340мл`, price:`35`},
        {name:`Карамельний лате`, ing:`340мл`, price:`40`},
        {name:`Флет Уайт`, ing:`подвійний еспресо з молоком. 250мл`, price:`44`},
        {name:`Баунті`, ing:`лате, кокосовий сироп, кокосова стружка. 340мл`, price:`45`},
        {name:`Бамбл`, ing:`еспресо, апельсиновий сік. 200мл`, price:`35`},
        {name:`Еспресо тонік`, ing:`еспресо, тонік. 250мл`, price:`35`},
        {name:`Рослинне молоко`, ing:``, price: `10`},
        
        {name:`title`, title:`Какао / шоколад`},
        {name:`Гарячий шоколад`, ing:`150мл`, price:`45`},
        {name:`Какао`, ing:`250мл`, price:`30`},

        {name:`title`, title:`Чай`},
        {name:`Зелений чай з імбиром`, ing:`600мл`, price:`60`},
        {name:`Йога-чай з корицею і лакрицею`, ing:`600мл`, price:`60`},
        {name:`Лавандовий чай`, ing:`600мл`, price:`60`},
        {name:`Фруктовий чай Барвиста долина`, ing:`600мл`, price:`60`},
        {name:`Чай Альпійський луг`, ing:`600мл`, price:`60`},
        {name:`Чай Пу-ер Ванільний`, ing:`600мл`, price:`60`},
        {name:`Чай Ройбуш кардамон з лаймом`, ing:`600мл`, price:`60`},
        {name:`Чай Соу-сеп зелений`, ing:`600мл`, price:`60`},
        {name:`Чай Соу-сеп чорний`, ing:`600мл`, price:`60`},
        {name:`Чорний чай Гордість Цейлону`, ing:`600мл`, price:`60`},
        {name:`Чорний чай Манговий рай`, ing:`600мл`, price:`60`},
        {name:`Чорний чай Маракеш`, ing:`600мл`, price:`60`},

        {name:`title`, title:`Чай медово-фруктовий`},
        {name:`Імбир та лемонграс`, ing:`250мл`, price:`30`},
        {name:`Малина та мята`, ing:`250мл`, price:`30`},
        {name:`Чорна смородина`, ing:`250мл`, price:`30`},
        {name:`Обліпиха та імбир`, ing:`250мл`, price:`30`},
        {name:`Ягідний мікс`, ing:`250мл`, price:`30`},
        {name:`Журавлина та імбир`, ing:`250мл`, price:`30`},
        {name:`Апельсин та мята`, ing:`250мл`, price:`30`},
    ],

    // ========================= 5 ===================================

    [
        {name:`logo`},

        {name:`title`, title:`Безалкогольні напої`},
        {name:`Сік натуральний в асортименті`, ing:`0.3л`, price:`30`},
        {name:`Coca-Cola, Fanta, Sprite`, ing:`0.5л`, price:`25`},
        {name:`Вода негазована`, ing:`0.5л`, price:`20`},
        {name:`Вода газована (скло)`, ing:`0.5л`, price:`25`},
        {name:`Тонік Schweppes`, ing:`330мл`, price:`25`},
        {name:`Сік дитячий з трубочкою в асортименті`, ing:`0.2л`, price:`20`},

        {name:`title`, title:`Пиво`},
        {name:`Пиво Carlsberg`, ing:`на розлив 0.5л`, price:`50`},
        {name:`Пиво Carlsberg`, ing:`на розлив 0.3л`, price:`35`},
        {name:`Пиво Kozel`, ing:`ж/б 0.5л`, price:`45`},
        {name:`Пиво Budwar`, ing:`ж/б 0.5л`, price:`47`},
        {name:`Пиво Budwiser`, ing:`ж/б 0.5л`, price:`50`},
        {name:`Пиво Krusovice`, ing:`ж/б 0.5л 10%`, price:`45`},
        {name:`Пиво Krusovice`, ing:`ж/б 0.5л темне`, price:`50`},
        {name:`Пиво Staropramen`, ing:`ж/б 0.5л`, price:`45`},

        {name:`title`, title:`Вино`},
        {name:`Вино Chizay Chersegi`,ing:`біле сухе 0.75л`, price:`225 `},
        {name:`Вино Chizay Cuvee`,ing:`червоне сухе 0.75л`, price:`320`},
        {name:`Вино Chizay GewurzTraminer`,ing:`біле сухе 0.75л`, price:`228`},
        {name:`Вино Chizay Moscato`,ing:`біле напівсолодке 0.75л`, price:`229`},
        {name:`Вино Chizay Ігристе`,ing:`біле напівсолодке 0.75л`, price:`240`},
        {name:`Вино Chizay Brut`,ing:`біле ігристе 0.75л`, price:`240`},
        {name:`Вино Chizay Pinot Noir`,ing:`червоне напівсолодке 0.75л`, price:`229`},
        {name:`Вино Chizay`,ing:`150мл в асортименті`, price:`50`},
    ]
]


let pages = db.length;

function go(){
    a4 = document.querySelector('.a4');
    a4.innerHTML = printPage(db[0])
}