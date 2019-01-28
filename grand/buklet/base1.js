let dataVid='01.02'
let dataDo = '24.02';
let base = [
{
    pic: "21",
    desc: 'Торт "Бонжур"$100г',
    disc: "30%",
    priceO: "1299",
    priceN: "899",
    size: "",
    heart: ""
    },
{
    pic: "45",
    desc: 'Торт"Снікерс"$100г',
    disc: "30%",
    priceO: "1199",
    priceN: "849",
    size: "",
    heart: ""
    },
{
    pic: "22",
    desc: 'Тістечко "Полуничка"$85г',
    disc: "30%",
    priceO: "1699",
    priceN: "1199",
    size: "",
    heart: ""
    },
{
    pic: "40",
    desc: 'Тістечко "Картошка"$75г',
    disc: "25%",
    priceO: "799",
    priceN: "599",
    size: "",
    heart: ""
    },
{
    pic: "39",
    desc: 'Рулетик "З заварним кремом"$90г',
    disc: "25%",
    priceO: "699",
    priceN: "529",
    size: "",
    heart: ""
    },
{
    pic: "37",
    desc: 'Булочка "Ватрушка"$120г',
    disc: "30%",
    priceO: "899",
    priceN: "654",
    size: "",
    heart: ""
    },
{
    pic: "41",
    desc: 'Слойка "GRAND FOOD"$з вишнею$90г',
    disc: "25%",
    priceO: "999",
    priceN: "749",
    size: "",
    heart: ""
    },
{
    pic: "27",
    desc: 'Слойка "GRAND FOOD"$з персиком$90г',
    disc: "30%",
    priceO: "1099",
    priceN: "790",
    size: "",
    heart: ""
    },
{
    pic: "36",
    desc: 'Хліб "Пшеничний" подовий$600г',
    disc: "25%",
    priceO: "1699",
    priceN: "1299",
    size: "",
    heart: ""
    },
{
    pic: "42",
    desc: 'Хурма, кг',
    disc: "XIT",
    priceO: "",
    priceN: "",
    size: "",
    heart: ""
},
{
    pic: "44",
    desc: 'Лимони, кг',
    disc: "XIT",
    priceO: "",
    priceN: "",
    size: "",
    heart: ""
},
{
    pic: "51",
    desc: 'Сир плавлений "Янтар" 60%$ТМ "Моліс"$175г',
    disc: "20%",
    priceO: "1550",
    priceN: "1250",
    size: "",
    heart: ""
    },
{
    pic: "15",
    desc: 'Йогурт "Дольче" 2,5%$в асортименті$290г',
    disc: "20%",
    priceO: "1850",
    priceN: "1450",
    size: "",
    heart: ""
    },
{
    pic: "50",
    desc: 'Сир "Російський" 50%$TM "Калинка"$100г',
    disc: "20%",
    priceO: "1419",
    priceN: "1130",
    size: "",
    heart: ""
    },
{
    pic: "14",
    desc: 'Кефір "Ферма" 2,5% термостатний$900г',
    disc: "15%",
    priceO: "2799",
    priceN: "2399",
    size: "",
    heart: ""
    },
{
    pic: "49",
    desc: 'Ковбаса "Фірмова з телятини"$TM "Тульчин"$505г',
    disc: "30%",
    priceO: "4780",
    priceN: "3280",
    size: "",
    heart: ""
    },
{
    pic: "48",
    desc: 'Ковбаска "Лікарська" варена$TM "Родина"$100г',
    disc: "20%",
    priceO: "999",
    priceN: "829",
    size: "",
    heart: ""
    },
{
    pic: "1",
    desc: 'Сосиски "Хот-дог"$TM "Глобино"$100г',
    disc: "20%",
    priceO: "859",
    priceN: "689",
    size: "",
    heart: ""
    },
{
    pic: "19",
    desc: 'Пиво "ППБ" Закарпатське$0,5л',
    disc: "25%",
    priceO: "1287",
    priceN: "990",
    size: "",
    heart: ""
    },
{
    pic: "20",
    desc: 'Пиво "Старопрамен"$0,5л',
    disc: "30%",
    priceO: "1999",
    priceN: "1399",
    size: "",
    heart: ""
    },
{
    pic: "10",
    desc: 'Нектари "Річ"$персик та яблучний$1л',
    disc: "20%",
    priceO: "2600",
    priceN: "2100",
    size: "",
    heart: ""
    },
{
    pic: "18",
    desc: 'Hапій "Біола" на мін. воді$в асортименті$2л',
    disc: "25%",
    priceO: "2399",
    priceN: "1799",
    size: "",
    heart: ""
    },
{
    pic: "9",
    desc: 'Мінеральна вода "Крайна"$в асортименті$1,5л',
    disc: "40%",
    priceO: "999",
    priceN: "599",
    size: "",
    heart: ""
    },
{
    pic: "8",
    desc: 'Шоколад "Студентcька"$в асортименті$180г',
    disc: "15%",
    priceO: "4499",
    priceN: "3749",
    size: "",
    heart: ""
    },
{
    pic: "7",
    desc: 'Шоколад "Чарівний вечір"$молочний$100г',
    disc: "30%",
    priceO: "1070",
    priceN: "770",
    size: "",
    heart: ""
    },
{
    pic: "12",
    desc: 'Печиво "Світ Арт"$сендвіч блек і вайт$100г',
    disc: "30%",
    priceO: "780",
    priceN: "530",
    size: "",
    heart: ""
    },
{
    pic: "11a",
    desc: 'Цукерки "Пташине молоко"$ТМ "Родина"$100г',
    disc: "25%",
    priceO: "824",
    priceN: "599",
    size: "",
    heart: ""
    },
{
    pic: "47",
    desc: 'Кульки "Старт" Дуо 250$кульки з какао$250г',
    disc: "30%",
    priceO: "3799",
    priceN: "2699",
    size: "",
    heart: ""
    },
{
    pic: "17",
    desc: 'Чай "Белін"$в асортименті, 20 x 40г$упаковка',
    disc: "30%",
    priceO: "2027",
    priceN: "1399",
    size: "",
    heart: ""
    },
{
    pic: "5",
    desc: 'Мед "З пасіки"$натуральний$185г',
    disc: "25%",
    priceO: "1999",
    priceN: "1499",
    size: "",
    heart: ""
    },
{
    pic: "46",
    desc: 'Вареники "Макуха"$з картоплею$100г',
    disc: "35%",
    priceO: "399",
    priceN: "269",
    size: "",
    heart: ""
    },
{
    pic: "34",
    desc: 'Салат "Галс"$Курильський$100г',
    disc: "25%",
    priceO: "475",
    priceN: "365",
    size: "",
    heart: ""
    },
{
    pic: "13",
    desc: 'Копчені шпроти в олії$TM "Лосось"$170г',
    disc: "25%",
    priceO: "3890",
    priceN: "2990",
    size: "",
    heart: ""
    },
{
    pic: "4",
    desc: 'Насіння "Семкі"$соняшникове$180г',
    disc: "40%",
    priceO: "2574",
    priceN: "1529",
    size: "",
    heart: ""
    },
{
    pic: "3",
    desc: 'Соус "Чумак"$в асортименті$200мл',
    disc: "25%",
    priceO: "2199",
    priceN: "1599",
    size: "",
    heart: ""
    },
{
    pic: "6",
    desc: 'Макарони "Чумак"$спагетті$400г',
    disc: "25%",
    priceO: "2590",
    priceN: "1990",
    size: "",
    heart: ""
    },
{
    pic: "16",
    desc: 'Крем-гель для душу$"ФрешДжус" в асортименті$400мл',
    disc: "20%",
    priceO: "4499",
    priceN: "3499",
    size: "",
    heart: ""
    },
{
    pic: "35",
    desc: 'Серветка "Рута"$40шт + носовичок',
    disc: "20%",
    priceO: "1664",
    priceN: "1364",
    size: "",
    heart: ""
    },
{
    pic: "2",
    desc: 'Мило "Дуру"$в асортименті$90Г',
    disc: "30%",
    priceO: "1390",
    priceN: "990",
    size: "",
    heart: ""
    },
{
    pic: "38",
    desc: 'Булочка "З сезамом"$80г',
    disc: "30%",
    priceO: "549",
    priceN: "399",
    size: "",
    heart: ""
    },
{
    pic: "25",
    desc: 'Салат "Маїс"$100г',
    disc: "40%",
    priceO: "1099",
    priceN: "659",
    size: "",
    heart: ""
    },
{
    pic: "43",
    desc: 'Бургер "GRAND FOOD"$в асортименті$220г',
    disc: "35%",
    priceO: "2099",
    priceN: "1399",
    size: "",
    heart: ""
    },
{
    pic: "26",
    desc: 'Плов з м`ясом курки$100г',
    disc: "50%",
    priceO: "799",
    priceN: "399",
    size: "",
    heart: ""
    },
{
    pic: "23",
    desc: 'Гурка запечена$100г',
    disc: "40%",
    priceO: "1349",
    priceN: "819",
    size: "",
    heart: ""
    },
{
    pic: "28",
    desc: 'Гуляш "Сегединський"$100г',
    disc: "45%",
    priceO: "1899",
    priceN: "1049",
    size: "",
    heart: ""
    },
{
    pic: "24",
    desc: 'Курча "Табака"$100г',
    disc: "30%",
    priceO: "1249",
    priceN: "849",
    size: "",
    heart: ""
    },
{
    pic: "29",
    desc: 'Лопатка свинна охолоджена$100г',
    disc: "20%",
    priceO: "1399",
    priceN: "1099",
    size: "",
    heart: ""
    },
{
    pic: "33",
    desc: 'Шашлик в маринаді "Арізона"$свинний з шовдиря$100г',
    disc: "15%",
    priceO: "1849",
    priceN: "1569",
    size: "",
    heart: ""
    },
{
    pic: "32",
    desc: 'Ребра свинні копчені$100г',
    disc: "30%",
    priceO: "1999",
    priceN: "1399",
    size: "",
    heart: ""
    },
{
    pic: "31",
    desc: 'Філе куряче охолоджене$100г',
    disc: "XIT",
    priceO: "",
    priceN: "",
    size: "",
    heart: ""
    },
{
    pic: "30",
    desc: 'Ковбаса куряча охолоджена$100г',
    disc: "20%",
    priceO: "999",
    priceN: "799",
    size: "",
    heart: ""
}
]