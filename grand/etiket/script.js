document.addEventListener("DOMContentLoaded", go);

let db = [

    
    {
        title: `Шкварок молотий`,
        weight: `200г`,
        art: '232',
        sklad: `Склад: сало свине`,
        pozh: `Поживна цінність: Жири 99.7%, Білки 0.002, Вуглеводи 0.001`,
        kal: `Калорійність  897.61 кКал.`,
        energy: `Енергетична цінність 3755.7 кДж.`,
        termin: `Термін зберігання 30 діб.`,
        pic:'4',
        size: 0
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
        pic:'4',
        size: 0
    },
    {
        title: `Смалець`,
        weight: `250г`, 
        art: '48725',
        sklad: `Склад: сало свине`,
        pozh: `Поживна цінність: Жири 99.7%.`,
        kal: `Калорійність  897.61 кКал.`,
        energy: `Енергетична цінність 3755.7 кДж.`,
        termin: `Термін зберігання 30 діб.`,
        pic:'3',
        size: 0
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
        pic:'3',
        size: 1
    },
    {
        title: `Салат "Морква\nпо-корейськи"`,
        weight: `450г`,
        art: '58',
        sklad: `Склад: Морква, приправа до моркви по-корейськи, олія, оцет.`,
        pozh: `Поживна цінність в 100г продукту: білки 1.9, жири 12.6, вуглеводи 5.4.`,
        kal: `Калорійність 141 кКал.`,
        termin: `Термін зберігання при температурі від +1°C до +4°С до 72 годин.`,
        pic:'1',
        size: 1
    },  
    {
        title: `Салат "Морква\nпо-корейськи"`,
        weight: `800г`,
        art: '42082',
        sklad: `Склад: Морква, приправа до моркви по-корейськи, олія, оцет.`,
        pozh: `Поживна цінність в 100г продукту: білки 1.9, жири 12.6, вуглеводи 5.4.`,
        kal: `Калорійність 141 кКал.`,
        termin: `Термін зберігання при температурі від +1°C до +4°С до 72 годин.`,
        pic:'1',
        size: 1
    },
    {
        title: `Буряк маринований\nз хріном`,
        weight: `450г`,
        art: '26534',
        sklad: `Склад: Буряк, хрін, сіль, цукор,олія, оцет.`,
        pozh: `Поживна цінність в 100г продукту: білки 3.98, жири 7.98, вуглеводи 8.92.`,
        kal: `Калорійність 117.72.`,
        termin: `Термін зберігання при температурі від +1°C до +4°C до 72 годин.`,
        pic:'2',
        size: 1
    },
    {
        title: `Капуста квашена\nбілокачанна\nз морквою`,
        weight: `900г`,
        art: '000',
        sklad: `Склад: капуста, морква, сіль, перець.`,
        pozh: `Поживна цінність на 100 г продукту: білки 1,5г, жири 0,3 г, вуглеводи 0,8г.`,
        kal: `Калорійність 16,01кКал`,
        termin: `Термін придатності при вологості повітря 75-78% 29 діб при t від-1 до +4 С.`,
        pic:'6a',
        size: 1
    },
    {
        title: `Капуста квашена\nбілокачанна\nз морквою\nта буряком`,
        weight: `900г`,
        art: '000',
        sklad: `Склад: капуста, морква, буряк, сіль, перець.`,
        pozh: `Поживна цінність на 100 г продукту: білки 1,5г, жири 0,3 г, вуглеводи 0,8г.`,
        kal: `Калорійність 16,01кКал`,
        termin: `Термін придатності при вологості повітря 75-78% 29 діб при t від-1 до +4 С.`,
        pic:'5a',
        size: 1
    }
]

function go(){        
    var wrapper = document.querySelector('.wrapper');
    var inner = ``;
    for (let index = 0, j = 0, item =0; index < db.length; index++) {        
                   
        inner +=`
            <div class="etiket ${db[index].size?'big':''}">
                <img class="etiket__logo" src="./img/logo${db[index].size?'2':'-big'}.png" alt="">
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
                            <p class="rect">14.06.2020 14.06.2020</p>
                        </div>
                        <div class="half">    
                            <p class="etiket__team">Бригадир:</p>
                            <p class="rect">team Mate team Mate</p>
                        </div>
                    </div>                    
                
                    <div class="ps">
                        <p class="etiket__termin">${db[index].termin}</p>
                        <span class="etiket__pozh">${db[index].pozh}</span>
                        <span class="etiket__kal">${db[index].kal}</span>
                        ${getEnergy(index)}                
                        <p class="etiket__adres">Виробник ТзОВ «Піонер» м.Виноградів, вул.Копанська 221. Тел.+380999749918.</p>
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
