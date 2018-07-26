const wrapper = document.querySelector('.wrapper__half');
var inner = '';

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

wrapper.innerHTML = inner;

