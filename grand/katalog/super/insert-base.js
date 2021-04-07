let content = document.querySelectorAll('.content');
let inner = '<h2 class="title">Багети</h2>';

for (let index = 0; index < base.p1.length; index++) {
    inner += `<div class="item">
                <div class="item__pic">
                    <img src="./img/${ base.p1[index].pic}.png">
                </div>
                <div class="item__desc">
                    <p>${ base.p1[index].desc}</p>
                </div>
            </div>`
}
content[0].innerHTML = inner;