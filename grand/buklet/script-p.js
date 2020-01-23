const wrapper = document.querySelector('.wrapper__gl');
const body = document.querySelector('BODY');
const shirma = document.querySelector('.shirma');
let inner = `            
            <div class="header"></div>
            <div class="wrapper__half">`;

for (let index = 0; index < base.length; index++) {
    //console.log(base[index].desc)
    inner += `
    <div class="item size${base[index].size}">
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
            <span>${base[index].desc.replace("$","<br>").trim().replace("$","<br>").trim()}</span>
        </div>
    </div>
    `
}
inner += ` </div>
        <div class="footer">
            <p>Супермаркет "Гранд" залишає за собою право змінювати ціни в період дії пропозиції та не несе відповідальність за друкарські помилки. Пропозиція діє з ${dataVid}.20 до ${dataDo}.20 (або до закінчення товарних залишків) за адресами: м.Виноградів, вул. Станційна, 1б та вул.Копанська, 221. Фото товарів, розміщених у товарних пропозиціях, можуть відрізнятися від фото товарів, що беруть участь в акції.</p>
        </div>        
        `;

wrapper.innerHTML = inner;

window.onload = function() {

    window.addEventListener("resize", go);

    function go() {
        setTimeout(hideShirma, 100);

        function hideShirma() {
            shirma.style.left = "140vw";
        }
        var footer = document.querySelector('.footer');
        var header = document.querySelector('.header');
        var prevBtn = document.querySelector('.toPrevMode');
        var navi = document.querySelector('.navi');
        navi.style.display = 'flex';
        var wi = document.documentElement.clientWidth / 2480;
        wrapper.style.position = 'absolute';
        wrapper.style.left = '50%';
        wrapper.style.top = '50%';
        wrapper.style.transform = 'translate(-50%, -50%) scale(' + wi * 0.95 + ')';
        body.style.cssText = `width: ${document.documentElement.clientWidth}px;
                            height: ${wrapper.offsetHeight*wi}px;
                            background: url('./image/bg.jpg') center;
                            position: relative;
                            overflow-x: hidden;
                            margin: 0 auto;`;
        prevBtn.addEventListener('click', goPrev);

        function goPrev() {
            shirma.style.left = "0";
            setTimeout(goToPrev, 500)

            function goToPrev() {
                var loc = window.location.toString();
                window.location = loc.slice(0, loc.lastIndexOf("/")) + "/prev/index.html";
            }

        }

        var toTop = document.querySelector('.toTop');
        toTop.addEventListener('click', goTop);

        function goTop() {
            header.scrollIntoView({ behavior: 'smooth' })
        }
        var toBottom = document.querySelector('.toBottom');
        toBottom.addEventListener('click', goBottom);

        function goBottom() {
            footer.scrollIntoView({ behavior: 'smooth' })
        }

        var preloder = document.querySelector('.preLoader');
        setTimeout(function() { preloder.style.opacity = "0"; }, 300);
        setTimeout(function() { preloder.style.display = "none"; }, 1300);
    }
    go();
};