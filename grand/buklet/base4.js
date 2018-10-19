let dataVid='08.10'
let dataDo = '31.10';
let base = [
    {
        color: "leaf2",
        size: "1",
        pic: "46",
        desc: 'Торт "Творожний"$100г',	
        priceO: "1299",	
        priceN: "799",	
        disc: "40%"
    }
    ,{
        color: "leaf3",
        size: "1",
        pic: "17",
        desc: 'Торт "Лісова ягода"$100г',	
        priceO: "1199",	
        priceN: "719",	
        disc: "40%"
    }
    ,{
        color: "leaf",
        size: "1",
        pic: "47",
        desc: 'Тістечко "Коктельне"$100г',	
        priceO: "1249",	
        priceN: "749",	
        disc: "40%"
    }
    ,{
        color: "leaf3",
        size: "1",
        pic: "16",
        desc: 'Слойка зі смородиною$100г',	
        priceO: "999",	
        priceN: "499",	
        disc: "50%"
    }
    ,{
        color: "leaf",
        size: "1",
        pic: "24",
        desc: 'Булочка "Плюшка"$100г',	
        priceO: "499",	
        priceN: "299",	
        disc: "40%"
    }
    ,{
        color: "leaf2",
        size: "1",
        pic: "30",
        desc: 'Батон "Бездріжджовий подовий" в/г$400г',	
        priceO: "1299",	
        priceN: "899",	
        disc: "30%"
    }
    ,{
        color: "leaf3",
        size: "1",
        pic: "15",
        desc: 'Блулочка "З кетчупом та сиром"$80г',	
        priceO: "649",	
        priceN: "325",	
        disc: "50%"
    }
    ,{
        color: "leaf",
        size: "1",
        pic: "48",
        desc: 'Чізбургер "GRAND FOOD"$300г',                                 	
        priceO: "2299",	
        priceN: "1399",	
        disc: "40%"
    }
    ,{
    color: "leaf2",
    size: "1",
    pic: "32",
    desc: 'Картопля',                                           	
    priceO: "",	
    priceN: "",	
    disc: "XIT"
    }
    ,{
    color: "leaf3",
    size: "1",
    pic: "33",
    desc: 'Помідори',                                            	
    priceO: "",	
    priceN: "",	
    disc: "XIT"
}
,{
    color: "leaf",
    size: "1",
    pic: "34",
    desc: 'Яблука',                                  	
    priceO: "",	
    priceN: "",	
    disc: "XIT"
}
,{
    color: "leaf3",
    size: "1",
    pic: "36",
    desc: 'Сир "Королівський"$(Скарби Прикарпаття)$100г',                 	
    priceO: "1500",	
    priceN: "1260",	
    disc: "15%"
}
,{
    color: "leaf",
    size: "1",
    pic: "37",
    desc: 'Сир "Моцарелла"$(Ферма)$250г',                                	
    priceO: "4299",	
    priceN: "3699",	
    disc: "15%"
}
,{
    color: "leaf2",
    size: "1",
    pic: "38",
    desc: 'Сир кисломолочний$100г',                           	
    priceO: "479",	
    priceN: "439",	
    disc: "XIT"
}
,{
    color: "leaf",
    size: "1",
    pic: "22",
    desc: 'Йогурт "Біла лінія" 1,5%$в асортименті$900г',                    	
    priceO: "3449",	
    priceN: "2849",	
    disc: "15%"
}
,{
    color: "leaf3",
    size: "1",
    pic: "12",
    desc: 'Сир "Фета" Преміаль$250г',                              	
    priceO: "4399",	
    priceN: "3399",	
    disc: "25%"
}
,{
    color: "leaf",
    size: "1",
    pic: "25",
    desc: 'Сметана "Президент" 20%$350г',                         	
    priceO: "3199",	
    priceN: "2499",	
    disc: "25%"
}
,{
    color: "leaf3",
    size: "1",
    pic: "39",
    desc: 'Сосиски"Хот-дог"$(Глобино)$100г',	
    priceO: "769",	
    priceN: "649",	
    disc: "15%"
}
,{
    color: "leaf2",
    size: "1",
    pic: "40",
    desc: 'Ковбаса "Посольська"$(Інко Фуд)$100г',    	
    priceO: "1009",	
    priceN: "859",	
    disc: "15%"
}
,{
    color: "leaf",
    size: "1",
    pic: "19",
    desc: 'Ковбаса "Бутербродна" 500г$(Бащинський)$1шт',                    	
    priceO: "3990",	
    priceN: "3190",	
    disc: "20%"
}
,{
    color: "leaf2",
    size: "1",
    pic: "21",
    desc: 'Вода мінер."Шаянська"$сильногазована (Маріам)$1,5л',               	
    priceO: "800",	
    priceN: "660",	
    disc: "20%"
}
,{
    color: "leaf3",
    size: "1",
    pic: "41",
    desc: 'Hапій "Пепсі"$2л',                                            	
    priceO: "2974",	
    priceN: "2499",	
    disc: "15%"
}
,{
    color: "leaf",
    size: "1",
    pic: "20",
    desc: 'Пиво "Туборг Грін"$0.5л',        	
    priceO: "1964",	
    priceN: "1449",	
    disc: "25%"
},
{
    color: "leaf3",
    size: "1",
    pic: "29",
    desc: 'Пиво "ППБ" Крушовіце$світле та темне$0.5л',            	
    priceO: "1984",	
    priceN: "1649",	
    disc: "15%"
}
,{
    color: "leaf2",
    size: "1",
    pic: "18",
    desc: 'Соус "Чумак" Наполітана$з орегано та базиліком$340г', 	
    priceO: "2374",	
    priceN: "1774",	
    disc: "25%"
}
,{
    color: "leaf",
    size: "1",
    pic: "45",
    desc: 'Макарони "Чумак" спагеті$400г',            	
    priceO: "2359",	
    priceN: "1759",	
    disc: "25%"
}
,{
    color: "leaf3",
    size: "1",
    pic: "31",
    desc: 'Чіпси "Празникі"$в асортименті$150г',                       	
    priceO: "4049",	
    priceN: "3149",	
    disc: "25%"
}
,{
    color: "leaf3",
    size: "1",
    pic: "26",
    desc: 'Сухий сніданок "Старт"$в асортименті$500г',                 	
    priceO: "5824",	
    priceN: "4700",	
    disc: "20%"
}
,{
    color: "leaf",
    size: "1",
    pic: "28",
    desc: 'Шоколад "Мілка"$бабл, без додатків, полуниця$90г',                           	
    priceO: "2699",	
    priceN: "2099",	
    disc: "25%"
}
,{
    color: "leaf2",
    size: "1",
    pic: "42",
    desc: 'Бісквіт Барні (7+1)$з шоколадною начинкою$240г',	
    priceO: "5099",	
    priceN: "3999",	
    disc: "25%"
}
,{
    color: "leaf",
    size: "1",
    pic: "14",
    desc: 'Печиво "Алвіен" летсгов$шоколад баркейк$50г',        	
    priceO: "749",	
    priceN: "580",	
    disc: "25%"
}
,{
    color: "leaf2",
    size: "1",
    pic: "27",
    desc: 'Кекс "Гіквей" мрамор$з малиновою начинкою$60г',     	
    priceO: "769",	
    priceN: "669",	
    disc: "15%"
}
,{
    color: "leaf3",
    size: "1",
    pic: "43",
    desc: 'Салака х/к з/г$(Галс)$100г',                                   	
    priceO: "669",	
    priceN: "579",	
    disc: "15%"
}
,{
    color: "leaf3",
    size: "1",
    pic: "44",
    desc: 'Тріска морожена б/г$100г',                                        	
    priceO: "899",	
    priceN: "799",	
    disc: "XIT"
}
,{
    color: "leaf",
    size: "1",
    pic: "23",
    desc: 'Приправа "Любисток"$перець горош. / мелен.$20г',            	
    priceO: "1269",	
    priceN: "829",	
    disc: "35%"
}
,{
    color: "leaf",
    size: "1",
    pic: "13",
    desc: 'Рушники "Прок"$паперові білі 2шт$упаковка',                            	
    priceO: "2244",	
    priceN: "1944",	
    disc: "15%"
}
,{
    color: "leaf2",
    size: "1",
    pic: "11",
    desc: 'Губки кухонні "ФрекенБок"$максима 5шт$упаковка',                       	
    priceO: "2084",	
    priceN: "1499",	
    disc: "30%"
}
,{
    color: "leaf",
    size: "1",
    pic: "35",
    desc: 'Засіб для миття посуду$"Друг" в асортименті$500мл',                 	
    priceO: "1499",	
    priceN: "1199",	
    disc: "20%"
},


{
    color: "leaf2",
    size: "1",
    pic: "4",
    desc: 'Салат "Олівє"$100г',                               	
    priceO: "999",	
    priceN: "599",	
    disc: "35%"
}
,{
    color: "leaf3",
    size: "1",
    pic: "2",
    desc: 'Квасоля "По-Закарпатськи"$100г',                                	
    priceO: "549",	
    priceN: "389",	
    disc: "30%"
},
{
    color: "leaf",
    size: "1",
    pic: "1",
    desc: 'Голубці "По-Закарпатськи"$100г',                               	
    priceO: "599",	
    priceN: "449",	
    disc: "25%"
}

,{
    color: "leaf3",
    size: "1",
    pic: "6",
    desc: 'Шинка свинна охолоджена$100г',                                	
    priceO: "1449",	
    priceN: "1249",	
    disc: "15%"
}
,{
    color: "leaf2",
    size: "1",
    pic: "7",
    desc: 'Шашлик з курячого стейка$охолоджений$100г',	
    priceO: "999",	
    priceN: "850",	
    disc: "15%"
}
,{
    color: "leaf2",
    size: "1",
    pic: "8",
    desc: 'Шкіра свинна$охолоджена$100г',                                 	
    priceO: "099",	
    priceN: "090",	
    disc: "XIT"
}

,{
    color: "leaf",
    size: "1",
    pic: "3",
    desc: 'Четвертина куряча запечена$100г',                              	
    priceO: "1499",	
    priceN: "899",	
    disc: "40%"
}
,{
    color: "leaf3",
    size: "1",
    pic: "9",
    desc: 'Авіньйон четвертина "Наша Ряба" куряча$100г',                  	
    priceO: "899",	
    priceN: "699",	
    disc: "25%"
}
,{
    color: "leaf",
    size: "1",
    pic: "5",
    desc: 'Четвертина "Наша Ряба"$курчат бройлерів охолодж.$100г',      	
    priceO: "509",	
    priceN: "449",	
    disc: "15%"
}

,
{
    color: "leaf4",
    size: "1",
    pic: "10",
    desc: 'Багет з шашликом"$230г',                                 	
    priceO: "",	
    priceN: "1599",	
    disc: ""
}

]