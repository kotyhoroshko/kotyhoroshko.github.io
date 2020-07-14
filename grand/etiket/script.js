document.addEventListener("DOMContentLoaded", go);

let db = [

    {
        title: `Смалець`,
        weight: `250г`, 
        art: '48725',
        sklad: `Склад: сало свине`,
        pozh: `Поживна цінність: Жири 99.7%`,
        kal: `Калорійність  897.61 кКал.`,
        energy: `Енергетична цінність 3755.7 кДж.`,
        termin: `Термін зберігання 30 діб.`,
        pic:'0'
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
        pic:'0'
    },
    {
        title: `Шкварок стакан`,
        weight: `250г`,  
        art: '218',
        sklad: `Склад :сало свине`,
        pozh: `Поживна цінність: Жири 99.7%,Білки 0.002, Вуглеводи 0.001`,
        kal: `Калорійність  897.61 кКал.`,
        energy: `Енергетична цінність 3755.7 кДж.`,
        termin: `Термін зберігання 30 діб.`,
        pic:'0'
    },
    {
        title: `Смалець стаканчик`,
        weight: `450г`,  
        art: '1698',
        sklad: `Склад: сало свине.`,
        pozh: `Поживна цінність: Жири 99.7%`,
        kal: `Калорійність  897.61 кКал.`,
        energy: `Енергетична цінність 3755.7 кДж.`,
        termin: `Термін зберігання 30 діб.`,
        pic:'0'
    },
    {
        title: `Салат «Морква по-корейськи`,
        weight: `450г`,
        art: '58',
        sklad: `Склад: Морква, приправа до моркви по-корейськи, олія, оцет.`,
        pozh: `Поживна цінність в 100г продукту: Білки 1.9,Жири 12.6,Вуглеводи 5.4`,
        kal: `Калорійність 141 кКал.`,
        termin: `Термін зберігання при t = 2+4С до 72 годин.`,
        pic:'0'
    },  
    {
        title: `Салат «Морква по-корейськи`,
        weight: `800г`,
        art: '42082',
        sklad: `Склад: Морква, приправа до моркви по-корейськи, олія, оцет.`,
        pozh: `Поживна цінність в 100г продукту: Білки 1.9,Жири 12.6,Вуглеводи 5.4.`,
        kal: `Калорійність 141 кКал.`,
        termin: `Термін зберігання при t = 2+4С до 72 годин.`,
        pic:'0'
    },
    {
        title: `Буряк маринований з хріном`,
        weight: `450г`,
        art: '26534',
        sklad: `Склад: Буряк, хрін, сіль, цукор,олія, оцет.`,
        pozh: `Поживна цінність в 100г продукту: Білки 3.98, Жири 7.98, Вуглеводи 8.92.`,
        kal: `Калорійність 117.72.`,
        termin: `Термін зберігання при t = 2+4C до 6 годин.`,
        pic:'0'
    }
]

function go(){        
    var wrapper = document.querySelector('.wrapper');
    var inner = ``;
    for (let index = 0, j = 0, item =0; index < db.length; index++) {        
                   
        inner +=`
            <div class="etiket ${db[index].art}">
                <h2 class="etiket__title">${db[index].title}</h2>
                <p class="etiket__weight-title">Вага:</p>
                <p class="etiket__weight">${db[index].weight}</p>
                <p class="etiket__art">Артикул: ${db[index].art}</p>            
                <img class="etiket__img" src="img/${db[index].pic}.jpg">
                <p class="etiket__pozh">${db[index].pozh}</p>
                <p class="etiket__kal">${db[index].kal}</p>
                ${getEnergy(index)}
                <p class="etiket__termin">${db[index].termin}</p>
                <p class="etiket__data">Дата виготовлення:</p>
                <p class="rect">14.06.2020</p>
                <p class="etiket__team">Бригадир</p>
                <p class="rect">team Mate</p>
                <p class="etiket__adres">Виробник ТзОВ «Піонер» м.Виноградів, вул.Копанська 221.
            </div>
        `

    }

    function getEnergy(index) {
        if (db[index].energy){
            return `<p class="etiket__energy">${db[index].energy}</p>`
        }
        return ''  
    }

    wrapper.innerHTML = inner;
    
    }
