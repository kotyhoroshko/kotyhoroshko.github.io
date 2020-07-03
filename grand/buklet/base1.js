let dataVid = '07.07'
let dataDo = '28.07';
let base = [

{size:'l-desc', pic: '22', desc:`Торт "Малиновий"$100г`, disc: '40%', priceO: '1700', priceN:"990"},
{size:'l-desc', pic: '24', desc:`Торт "Графський"$100г`, disc: '40%', priceO: '1600', priceN:"990"},
{size:'l-desc', pic: '23', desc:`Торт "Батончик фруктовий"$100г`, disc: '40%', priceO: '1600', priceN:"990"},
{size:'l-desc', pic: '21', desc:`Тістечко "Тіраміссу"$65г`, disc: '40%', priceO: '1700', priceN:"990"},
{size:'', pic: '36', desc:`Круасан"GRAND FOOD" з пломбіром$100г`, disc: '40%', priceO: '1100', priceN:"660"},
{size:'', pic: '29', desc:`Круасан "GRAND FOOD" з шинкою/ковбасою/Гурман$200г`, disc: '20%', priceO: '2000', priceN:"1590"},
{size:'', pic: '35', desc:`Булочка "Ватрушка"$120г`, disc: '40%', priceO: '1100', priceN:"660"},
{size:'', pic: '34', desc:`Хліб "Пшенично солодовий" подовий$600г`, disc: '30%', priceO: '2190', priceN:"1550"},
{size:'l-desc', pic: '37', desc:`Стегенце куряче запечене$100г`, disc: '40%', priceO: '1699', priceN:"999"},
{size:'l-desc', pic: '7', desc:`Гомілка куряча запечена$100г`, disc: '35%', priceO: '1499', priceN:"999"},
{size:'l-desc', pic: '8', desc:`Крило куряче запечене$100г`, disc: '35%', priceO: '1499', priceN:"999"},
{size:'l-desc', pic: '6', desc:`Четвертина куряча запечена$100г`, disc: '25%', priceO: '1299', priceN:"999"},
{size:'l-desc', pic: '31', desc:`Гурка$100г`, disc: '30%', priceO: '1090', priceN:"770"},
{size:'l-desc', pic: '33', desc:`Шойт$100г`, disc: '40%', priceO: '1290', priceN:"770"},
{size:'l-desc', pic: '1', desc:`Стейк свинний охолоджений$100г`, disc: '35%', priceO: '1499', priceN:"999"},
{size:'l-desc', pic: '5', desc:`Стейк "Арізона" свинний$100г`, disc: '30%', priceO: '1799', priceN:"1299"},
{size:'l-desc', pic: '2', desc:`Бекон свинний з підчеревком$100г`, disc: '20%', priceO: '999', priceN:"799"},
{size:'l-desc', pic: '4', desc:`Печінка свинна охолоджена$100г`, disc: '30%', priceO: '349', priceN:"245"},
{size:'l-desc', pic: '39', desc:`Фарш (свинно-яловичий)$100г`, disc: '25%', priceO: '1199', priceN:"899"},
{size:'l-desc', pic: '3', desc:`Набір кулінарний курячий$100г`, disc: '55%', priceO: '199', priceN:"089"},
{size:'last', pic: '', desc:``, disc: '', priceO: '', priceN:""},

{size:'b-height', pic: '27', desc:`Персики, кг`, disc: 'XIT', priceO: ' ', priceN:" "},
{size:'b-height', pic: '25', desc:`Нектарин, кг`, disc: 'XIT', priceO: ' ', priceN:" "},
{size:'b-height', pic: '26', desc:`Лохина, кг`, disc: 'XIT', priceO: ' ', priceN:" "},
{size:'b-height', pic: '15', desc:`Сир плавлений "Лактіма"$в асортименті$130г`, disc: '25%', priceO: '2300', priceN:"1690"},
{size:'b-height', pic: '11a', desc:`Сир "Сулугуні"$100г`, disc: '30%', priceO: '1700', priceN:"1190"},
{size:'b-height', pic: '17', desc:`Йогурт "Савушкин Продукт"$в асортименті 2%$350г`, disc: '25%', priceO: '2800', priceN:"2090"},
{size:'b-height', pic: '16a', desc:`Морозиво "Бліззард" шоколад печиво$500мл`, disc: '30%', priceO: '9990', priceN:"6990"},
{size:'b-height', pic: '28', desc:`Морозиво "Полтавський" Каштан ТМ"Рудь"$70г`, disc: '45%', priceO: '1690', priceN:"890"},
{size:'b-height', pic: '12', desc:`Кетчуп "Мадеро"$пікантний, лагідний$560г`, disc: '30%', priceO: '3800', priceN:"2590"},
{size:'b-height', pic: '32', desc:`Ковбаски "Баварські" TM"Світ мяса"$100г`, disc: '20%', priceO: '1250', priceN:"990"},
{size:'b-height', pic: '30', desc:`Смалець$500г`, disc: '35%', priceO: '3000', priceN:"1900"},
{size:'b-height', pic: '41', desc:`Ікра червона лососева ТМ"Авача"$140г`, disc: '50%', priceO: '19500', priceN:"9900"},
{size:'b-height', pic: '19', desc:`Печиво "Конті" День і Ніч$100г`, disc: '30%', priceO: '720', priceN:"499"},
{size:'b-height', pic: '14', desc:`Мікропопкорн "Моді"$в асортименті$100г`, disc: '35%', priceO: '1500', priceN:"990"},
{size:'b-height', pic: '13', desc:`Напій "Біола" Мохіто$1,5л`, disc: '35%', priceO: '2400', priceN:"1590"},
{size:'b-height', pic: '40', desc:`Мінеральна вода "Свалявська"$1,5л`, disc: '30%', priceO: '1090', priceN:"790"},
{size:'b-height', pic: '20', desc:`Пиво "ППБ" Закарпатське оригінальне$0,5л `, disc: '25%', priceO: '1550', priceN:"1190"},
{size:'b-height', pic: '18', desc:`Антисептик "Галакс"$500г`, disc: 'XIT', priceO: ' ', priceN:" "},
{size:'b-height', pic: '10', desc:`Рушники кухонні "Перфекс"$мега боні 2шар$2шт`, disc: '25%', priceO: '4300', priceN:"3300"},
{size:'b-height', pic: '9',  desc:`Конд-р д/білизни "Коколіно"$в асортименті$960мл / 1,68мл`, disc: '20%', priceO: '10500', priceN:"8400"},



  
]