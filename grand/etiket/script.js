document.addEventListener("DOMContentLoaded", go);

let db = [

    {
        title: `Смалець`,
        weight: `250г`, 
        art: '48725',
        sklad: `Склад: сало свине`,
        pozh: `Поживна цінність: Жири 99.7%.`,
        kal: `Калорійність  897.61 кКал.`,
        energy: `Енергетична цінність 3755.7 кДж.`,
        termin: `Термін зберігання 30 діб.`,
        pic:'3'
    },
    {
        title: `Шкварок молотий`,
        weight: `200г`,
        art: '232',
        sklad: `Склад: сало свине`,
        pozh: `Поживна цінність: Жири 99.7%, Білки 0.002, Вуглеводи 0.001`,
        kal: `Калорійність  897.61 кКал.`,
        energy: `Енергетична цінність 3755.7 кДж.`,
        termin: `Термін зберігання 30 діб.`,
        pic:'4'
    },
    {
        title: `Шкварок стакан`,
        weight: `250г`,  
        art: '218',
        sklad: `Склад :сало свине`,
        pozh: `Поживна цінність: Жири 99.7%, Білки 0.002, Вуглеводи 0.001.`,
        kal: `Калорійність  897.61 кКал.`,
        energy: `Енергетична цінність 3755.7 кДж.`,
        termin: `Термін зберігання 30 діб.`,
        pic:'4'
    },
    {
        title: `Смалець стаканчик`,
        weight: `450г`,  
        art: '1698',
        sklad: `Склад: сало свине.`,
        pozh: `Поживна цінність: Жири 99.7%.`,
        kal: `Калорійність  897.61 кКал.`,
        energy: `Енергетична цінність 3755.7 кДж.`,
        termin: `Термін зберігання 30 діб.`,
        pic:'3'
    },
    {
        title: `Салат "Морква\nпо-корейськи"`,
        weight: `450г`,
        art: '58',
        sklad: `Склад: Морква, приправа до моркви по-корейськи, олія, оцет.`,
        pozh: `Поживна цінність в 100г продукту: Білки 1.9, Жири 12.6, Вуглеводи 5.4.`,
        kal: `Калорійність 141 кКал.`,
        termin: `Термін зберігання при температурі від +1°C до +4°С до 72 годин.`,
        pic:'1'
    },  
    {
        title: `Салат "Морква\nпо-корейськи"`,
        weight: `800г`,
        art: '42082',
        sklad: `Склад: Морква, приправа до моркви по-корейськи, олія, оцет.`,
        pozh: `Поживна цінність в 100г продукту: Білки 1.9, Жири 12.6, Вуглеводи 5.4.`,
        kal: `Калорійність 141 кКал.`,
        termin: `Термін зберігання при температурі від +1°C до +4°С до 72 годин.`,
        pic:'1'
    },
    {
        title: `Буряк маринований\nз хріном`,
        weight: `450г`,
        art: '26534',
        sklad: `Склад: Буряк, хрін, сіль, цукор,олія, оцет.`,
        pozh: `Поживна цінність в 100г продукту: Білки 3.98, Жири 7.98, Вуглеводи 8.92.`,
        kal: `Калорійність 117.72.`,
        termin: `Термін зберігання при температурі від +1°C до +4°C до 72 годин.`,
        pic:'2'
    }
]

function go(){        
    var wrapper = document.querySelector('.wrapper');
    var inner = ``;
    for (let index = 0, j = 0, item =0; index < db.length; index++) {        
                   
        inner +=`
            <div class="etiket ${db[index].art}">
                <img class="etiket__logo" src="./img/logo.png" alt="">
                <div class="header">
                    <h2 class="etiket__title">${db[index].title}</h2>
                    <br>
                    <div class="etiket__weight">
                    <p class="etiket__weight-title">Вага:</p>
                    <p class="etiket__weight-value">${db[index].weight}</p>
                    </div>
                    <img class="etiket__bez-gmo" src="./img/bez-gmo.svg" alt="">
                    <p class="etiket__art">Артикул: ${db[index].art}</p>
                </div>

                <div class="footer">
                    <div class="flex">
                        <div class="half">
                            <p class="etiket__data">Дата виготовлення:</p>
                            <p class="rect">14.06.2020</p>
                        </div>
                        <div class="half">    
                            <p class="etiket__team">Бригадир:</p>
                            <p class="rect">team Mate</p>
                        </div>
                    </div>                    
                
                    <div class="ps">
                        <p class="etiket__termin">${db[index].termin}</p>
                        <span class="etiket__pozh">${db[index].pozh}</span>
                        <span class="etiket__kal">${db[index].kal}</span>
                        ${getEnergy(index)}                
                        <p class="etiket__adres">Виробник ТзОВ «Піонер» м.Виноградів, вул.Копанська 221.</p>
                    </div>
                </div>

                <img class="etiket__img" src="img/${db[index].pic}.jpg">
                
            </div>
        `

    }

    function getEnergy(index) {
        if (db[index].energy){
            return `<span class="etiket__energy">${db[index].energy}</span>`
        }
        return ''  
    }

    wrapper.innerHTML = inner;
    
    }
