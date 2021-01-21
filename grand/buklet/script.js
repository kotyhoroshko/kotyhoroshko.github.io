const wrapper = document.querySelector('.wrapper__gl');
var inner = `<div class="header"></div>
            <div class="wrapper__half">`;

            for (let index = 0; index < base.length; index++) {
                //console.log(base[index].desc)
                if (!base[index].descSPO) {
                    base[index].descSPO='';
                    classSPO = 'hidden';
                }
                else {
                    classSPO = 'spo';
                }
                inner += `
                <div class="item ${base[index].size}">
                    <div class="item__pic">
                        <img src="image/${base[index].pic}.jpg" alt="">
                        </div>` +
            
                    // `<img src="./img/${base[index].color}.png" class="discBg">`
                    `
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
                        <span class="${classSPO}">${base[index].descSPO.replace("$","<br>").trim().replace("$","<br>").trim()}</span>
                        <span>${base[index].desc.replace("$","<br>").trim().replace("$","<br>").trim()}</span>
                    </div>
                </div>
                `
                classSPO = 'hidden';
            }
            inner += ` </div>
                    <div class="footer">
                        <p>Супермаркет "Гранд" залишає за собою право змінювати ціни в період дії пропозиції та не несе відповідальність за друкарські помилки. Пропозиція діє з ${dataVid}.21 до ${dataDo}.21 (або до закінчення товарних залишків) за адресами: м.Виноградів, вул. Станційна, 1б та вул.Копанська, 221. Фото товарів, розміщених у товарних пропозиціях, можуть відрізнятися від фото товарів, що беруть участь в акції.</p>
                    </div>        
                    `;
wrapper.innerHTML = inner;


var preloader = document.querySelector('.preLoader');
preloader.style.display = "none";

var shirma = document.querySelector('.shirma');
shirma.style.display = "none";