let dataVid='08.10'
let dataDo = '31.10';
let base = [
    {
    color:"leaf",
    size: "1",
    pic: "31",
    desc: 'Торт "Премєра"$100г',	
    disc: "35%",	
    priceO: "999",	
    priceN: "649"
    },
{
    color:"leaf2",
    size: "1",
    pic: "22",
    desc: 'Торт "Лісова ягода"$100г',	
    disc: "45%",	
    priceO: "1199",	
    priceN: "659"
    },
{
    color:"leaf2",
    size: "1",
    pic: "21",
    desc: 'Рулет "Горіховий"$100г',	
    disc: "35%",	
    priceO: "1499",	
    priceN: "979"
    },
{
    color:"leaf",
    size: "1",
    pic: "25",
    desc: 'Булочка"конверт$ з яблуками 110гр$1шт',	
    disc: "40%",	
    priceO: "549",	
    priceN: "329"
    },
{
    color:"leaf3",
    size: "1",
    pic: "29",
    desc: 'Палочка з тмином 80г$1шт',	
    disc: "50%",	
    priceO: "399",	
    priceN: "199"
    },
{
    color:"leaf2",
    size: "1",
    pic: "24",
    desc: 'Хліб "Сонечко"$подовий 600г$1шт',	
    disc: "30%",	
    priceO: "1699",	
    priceN: "1199"
    },
{
    color:"leaf",
    size: "1",
    pic: "26",
    desc: 'Слойка з "вишнею" 100г$1шт',	
    disc: "30%",	
    priceO: "999",	
    priceN: "699"
    },
{
    color:"leaf3",
    size: "1",
    pic: "28",
    desc: 'Хот-дог"GRAND FOOD" "Гріль"$240г',       	
    disc: "40%",	
    priceO: "1999",	
    priceN: "1199"
    },
{
    color:"leaf",
    size: "1",
    pic: "27",
    desc: 'Хот-дог"GRAND FOOD"$180г',      	
    disc: "40%",	
    priceO: "1499",	
    priceN: "899"
    },
{
    color:"leaf2",
    size: "1",
    pic: "46",
    desc: 'Сир "Білозгар" екстра 45% ТМ"ЛМЗ"$100г',	
    disc: "20%",	
    priceO: "1897",	
    priceN: "1537"
    },
{
    color:"leaf",
    size: "1",
    pic: "41",
    desc: 'Сир "Ферма"$в асортименті$180г',	
    disc: "25%",	
    priceO: "4354",	
    priceN: "3354"
    },
{
    color:"leaf2",
    size: "1",
    pic: "35",
    desc: 'Сметанковий продукт$"Моліка" 25%$400г',	
    disc: "XIT",
    priceO: "",	
    priceN: "1100"
    },
{
    color:"leaf",
    size: "1",
    pic: "5",
    desc: 'Еліт-йогурт "Галичина"$в асортименті 2,5%$300г',	
    disc: "15%",	
    priceO: "1899",	
    priceN: "1599"
    },
{
    color:"leaf3",
    size: "1",
    pic: "4",
    desc: 'Масло Селянське 73%$ТМ"Глобино"$180г',	
    disc: "XIT",
    priceO: "",	
    priceN: "3347"
    },
{
    color:"leaf",
    size: "1",
    pic: "33",
    desc: 'Сосиски підкопчені$ТМ"Світ Мяса"$100г',	
    disc: "15%",	
    priceO: "645",	
    priceN: "555"
    },
{
    color:"leaf",
    size: "1",
    pic: "23",
    desc: 'Ковбаса "Тульчинська" вар.з мол.(вектор)ТМ"Тульчин"$1шт',
    disc: "25%",	
    priceO: "6747",	
    priceN: "4990"
    },
{
    color:"leaf2",
    size: "1",
    pic: "44",
    desc: 'Ковбаса "Салямі зі Свинини"$ТМ"Глобино"$100г',	
    disc: "15%",	
    priceO: "999",	
    priceN: "829"
    },
{
    color:"leaf2",
    size: "1",
    pic: "30",
    desc: 'Вареники "Макуха" з картоплею$1кг',	
    disc: "25%",	
    priceO: "3650",	
    priceN: "2650"
    },
{
    color:"leaf3",
    size: "1",
    pic: "8",
    desc: 'Пиво "ППБ" Свіжий розлив$0,65л',	
    disc: "15%",	
    priceO: "1399",	
    priceN: "1200"
    },
{
    color:"leaf",
    size: "1",
    pic: "9",
    desc: 'Вода мінеральна "Моршинська" негазована$0,75л',	
    disc: "25%",	
    priceO: "1100",	
    priceN: "830"
    },
{
    color:"leaf",
    size: "1",
    pic: "10",
    desc: 'Hапій "Легенда"$в асортименті;$2л',	
    disc: "15%",	
    priceO: "2029",	
    priceN: "1699"
    },
{
    color:"leaf",
    size: "1",
    pic: "3",
    desc: 'Кетчуп "Чумак" лагідний$300г',	
    disc: "25%",	
    priceO: "1249",	
    priceN: "949"
    },
{
    color:"leaf",
    size: "1",
    pic: "2",
    desc: 'Майонез "Королівський Смак"$на перепелиних яйцях 72%$380г',	
    disc: "20%",	
    priceO: "2299",	
    priceN: "1899"
    },
{
    color:"leaf3",
    size: "1",
    pic: "45",
    desc: 'Соус "Щедро"$тартар, папрік, сирний$200г',	
    disc: "20%",	
    priceO: "1799",	
    priceN: "1499"
    },
{
    color:"leaf",
    size: "1",
    pic: "48",
    desc: 'Чай "Ахмад"$фруктовий смак$20шт x 2г',	
    disc: "20%",	
    priceO: "3557",	
    priceN: "2899"
    },
{
    color:"leaf3",
    size: "1",
    pic: "20",
    desc: 'Сухий сніданок "Старт"$в асортименті$850г',	
    disc: "21%",	
    priceO: "7549",	
    priceN: "5999"
    },
{
    color:"leaf2",
    size: "1",
    pic: "47",
    desc: 'Крекер "Ярич"$Ніжний та Вершковий$180г',	
    disc: "15%",	
    priceO: "1154",	
    priceN: "954"
    },
{
    color:"leaf2",
    size: "1",
    pic: "34",
    desc: 'Тістечко "Тімі"$в асортименті$50г',	
    disc: "20%",	
    priceO: "699",	
    priceN: "550"
    },
{
    color:"leaf3",
    size: "1",
    pic: "36",
    desc: 'Шпроти "Флотилія" в олії$190г',	
    disc: "20%",	
    priceO: "2699",	
    priceN: "2249"
    },
{
    color:"leaf3",
    size: "1",
    pic: "1",
    desc: 'Асорті "Добра риба"$закусочна в оліі$180г',	
    disc: "20%",	
    priceO: "2950",	
    priceN: "2450"
    },
{
    color:"leaf",
    size: "1",
    pic: "7",
    desc: 'Макарони "Паста Пріма"$800г',	
    disc: "15%",	
    priceO: "1999",	
    priceN: "1699"
    },
{
    color:"leaf2",
    size: "1",
    pic: "32",
    desc: 'Печиво "Сікілоп" сендвіч$з маршмеллоу у какао$216г',	
    disc: "15%",	
    priceO: "2965",	
    priceN: "2465"
    },
{
    color:"leaf3",
    size: "1",
    pic: "42",
    desc: 'Cвічка-лампадка$скло$1шт',
    disc: "XIT",
    priceO: "",	
    priceN: "550"
    },
{
    color:"leaf2",
    size: "1",
    pic: "43",
    desc: 'Колготи "Леді Діана"$в асортименті$1шт',	
    disc: "25%",	
    priceO: "2250",	
    priceN: "1699"
    },
{
    color:"leaf",
    size: "1",
    pic: "37",
    desc: 'Пральний порошок "Персіл"$свіжість від Cілан$450г',	
    disc: "35%",	
    priceO: "3999",	
    priceN: "2599"
    },
{
    color:"leaf2",
    size: "1",
    pic: "6",
    desc: 'Засіб для миття посуду$"Джаст" в асортименті$500мл', 	
    disc: "15%",	
    priceO: "2337",	
    priceN: "1999"
    },
{
    color:"leaf",
    size: "1",
    pic: "38",
    desc: 'Капуста',	
    disc: "XIT",
    priceO: "",	
    priceN: ""
    },
{
    color:"leaf3",
    size: "1",
    pic: "40",
    desc: 'Морква',	
    disc: "XIT",
    priceO: "",	
    priceN: ""
    },
{
    color:"leaf2",
    size: "1",
    pic: "39",
    desc: 'Яблуко зелене',	
    disc: "XIT",
    priceO: "",	
    priceN: ""
    },
{
    color:"leaf3",
    size: "1",
    pic: "16",
    desc: 'Салат "Увертюра"$100г',	
    disc: "40%",	
    priceO: "1599",	
    priceN: "959"
    },
{
    color:"leaf",
    size: "1",
    pic: "15",
    desc: 'Плов з мясом курки$100г',
    disc: "40%",
    priceO: "799",
    priceN: "479"
    },
{
    color:"leaf",
    size: "1",
    pic: "14",
    desc: 'Гуляш "Сегединський"$100г',
    disc: "40%",
    priceO: "1899",
    priceN: "1149"
    },
{
    color:"leaf2",
    size: "1",
    pic: "17",
    desc: 'Крила курячі запечені$100г',	
    disc: "40%",	
    priceO: "1599",	
    priceN: "959"
    },
{
    color:"leaf3",
    size: "1",
    pic: "19",
    desc: 'Голова свинна$100г', 	
    disc: "35%",	
    priceO: "299",	
    priceN: "199"
    },
{
    color:"leaf2",
    size: "1",
    pic: "18",
    desc: 'Шкіра свинна охолоджена$100г',	
    disc: "XIT",
    priceO: "",	
    priceN: "070"
    },    
{
    color:"leaf3",
    size: "1",
    pic: "11",
    desc: 'Корейка свинна охолоджена$100г',	
    disc: "XIT",
    priceO: "",	
    priceN: "1349"
    },
{
    color:"leaf2",
    size: "1",
    pic: "13",
    desc: 'Крило "Наша Ряба" курячат бройлерів охолодж.$100г',	
    disc: "15%",	
    priceO: "579",	
    priceN: "499"
    },
{
    color:"leaf",
    size: "1",
    pic: "12",
    desc: 'Шашлик "Класичний"$свинний з шовдиря$100г',	
    disc: "20%",	
    priceO: "1649",	
    priceN: "1319"
    }

]
