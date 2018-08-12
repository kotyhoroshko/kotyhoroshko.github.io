const wrapper = document.querySelector('.wrapper__gl');
const body = document.querySelector('BODY');
var inner = `<div class="header"></div>
            <div class="wrapper__half">`;

for (let index = 0; index < base.length; index++) {
    inner += `
    <div class="item size${base[index].size}">
        <div class="item__pic">
            <img src="img/${base[index].pic}.jpg" alt="">
        </div>

        <span class="item__discount">${base[index].disc}</span>
        <div class="line"></div>   
        <div class="item__price">
            <span class="item__price--n">${base[index].priceN.slice(0, -2)}</span>
            <div class="cop">
                <p class="item__price--n-cop">${base[index].priceN.slice(-2)}</p>
                <div class="cop right">
                    <p class="item__price--o right">${base[index].priceO.slice(0, -2)}</p>
                    <span class="item__price--o-cop right">${base[index].priceO.slice(-2)}</span>
                </div>
            </div>            
        </div>
        <div class="item__desc">
            <span>${base[index].desc.replace("$","<br>").trim().replace("$","<br>").trim()}</span>
        </div>
    </div>
    `
}
inner+= `</div>
        <div class="footer">
            <p>Супермаркет "Гранд" залишає за собою право змінювати ціни в період дії пропозиції та не несе відповідальність за друкарські помилки. Пропозиція діє з ${dataVid}.2018 до ${dataDo}.2018 (або до закінчення товарних залишків) за адресами: м.Виноградів, вул. Станційна, 1б та вул.Копанська, 221. Фото товарів, розміщених у товарних пропозиція, можуть відрізнятися від фото товарів, що беруть участь в акції.</p>
        </div>`;
wrapper.innerHTML = inner;

document.addEventListener("DOMContentLoaded", go);

function go(){
    var wi=document.documentElement.clientWidth/2480;
    wrapper.style.position='absolute';
    wrapper.style.left='50%';
    wrapper.style.top='50%';
    wrapper.style.transform='translate(-50%, -50%) scale('+wi*0.95+')';
    body.style.cssText=`width: ${document.documentElement.clientWidth}px;
                        height: ${wrapper.offsetHeight*wi}px;
                        background: url(./img/bg2.jpg) center;
                        position: relative;
                        overflow-x: hidden;
                        margin: 0 auto;`
}

