window.onload = function() {

    var html = document.querySelector('html');
    var xCor = 0;
    var yCor = 0;
    var yPos = 0;
    var yMov = 0;
    var xMov = 0;
    Move();

    function Move() {
        html.style.background = `
            url(images/c12.png) ${(xMov * 2 - xCor / 3)}px ${(yMov * 2 - (yPos * 4) + yCor / 3)}px repeat, 
            url(images/c22.png) ${(xMov - xCor / 10)}px ${(yMov - (yPos) + yCor / 9)}px repeat, 
            url(images/c32.png) ${(xMov / 2 - xCor / 50)}px ${(yMov / 2 + (yPos * 0.75) + yCor / 40)}px repeat, 
            url(images/c42.png) ${(xMov / 10 - xCor / 120)}px ${(yMov / 7 + (yPos * 0.9) + yCor / 120)}px repeat, 
            rgb(255, 200, 21)
        `
            // , url(images/b3.jpg) fixed
    }

    window.addEventListener('scroll', function() {
        yPos = html.scrollTop;
        Move();
    });

    window.addEventListener('mousemove', getX);

    function getX(e) {
        xCor = e.pageX;
        yCor = e.screenY;
        yPos = html.scrollTop;
        Move();
    }


    //-----------WIND--------------------------------------------------------------------

    var wind = 0;
    var wind0 = rndMove(300);
    var wind1 = rndMove(1000);
    var wind2 = rndMove(200);
    var wind3 = rndMove(200);

    function rndMove(koefic) {
        return Math.floor(Math.random() * koefic);
    }

    var go = 0;

    setInterval(() => {
        // wind++;
        // if (wind < wind0) { xMov++ } else if (wind < (wind0 + wind1)) {} else if (wind < (wind0 + wind1 + wind2)) { xMov-- } else if (wind < (wind0 + wind1 + wind2 + wind3)) {} else {
        //     rndMove();
        //     wind = 0;
        // }
        yMov--;
        Move();

        go ? goNextItem() : {};

    }, 1000 / 30);

    //-----------WIND-^-------------------------------------------------------------------


    function rnd() {
        var itemPos = window.innerWidth - (Math.floor(Math.random() * (window.innerWidth * 2)));
        for (let index = 0; index = 1; index) {
            if ((itemPos < (-1 * window.innerWidth)) || (itemPos > window.innerWidth)) {
                return itemPos;
            } else { itemPos *= 2; }
        }
    }

    var koef = {};
    var frame = 0;
    var koorX;
    var koorY;
    var koefScreenWidth = Math.floor(window.innerWidth / 70);
    var koefScreenHeight = Math.floor(window.innerHeight / 70);
    var portItem = document.querySelectorAll('.portfolioItem');
    var portItemCont = document.querySelectorAll('.portfolioItem__container');

    window.addEventListener('click', moveItem)

    function moveItem() {

        findItems();
        hideItem.call(portItem[pre]);

        koorX = (rnd() - window.innerWidth / 2);
        koorY = (rnd() - window.innerHeight / 2);

        if (Math.abs(koorX) > Math.abs(koorY)) {
            var koefX = Math.abs(koorX / koorY);
            var koefY = 1;
        } else {
            var koefY = Math.abs(koorY / koorX);
            var koefX = 1;
        }

        koef = {
            x: (koefScreenWidth * koefX / 2),
            y: (koefScreenWidth * koefY / 2),
        }

        frame = Math.abs(koorX / 2);
        showItem.call(portItem[j]);
        go = 1;
    }

    function cubic() {
        if (frame < Math.abs(koorX)) {
            koef.x += koef.x / 20;
            koef.y += koef.y / 20;
            console.log("+" + koef.x)
        } else {
            koef.x -= koef.x / 19;
            koef.y -= koef.y / 19;
            console.log("-" + koef.x)
        }
    }

    function showItem() {
        this.style.opacity = ".9";
        this.style.width = "500px";
        this.style.height = "500px";
        this.style.padding = "100px";
    }

    function hideItem() {
        this.style.transition = 'unset';
        portItemCont[j].style.opacity = '0';
    }

    var j = 0,
        pre = 0,
        next = 0;

    function findItems() {
        pre = j;
        j++;
        next = j;
        if (j == portItem.length) {
            j = 0;
            pre = portItem.length - 1;
        }
        //console.log(' j=' + j + " pre= " + pre);
    }

    function goNextItem() {
        cubic();
        if (koorX > koef.x) {
            koorX -= koef.x;
            xMov -= koef.x;
            portItem[j].style.left = ((koorX) + window.innerWidth / 2) + 'px';
            portItem[pre].style.left = parseInt(portItem[pre].style.left) - koef.x + 'px';
        } else if (koorX < 0) {
            koorX += koef.x;
            xMov += koef.x;
            portItem[j].style.left = ((koorX) + window.innerWidth / 2) + 'px';
            portItem[pre].style.left = parseInt(portItem[pre].style.left) + koef.x + 'px';
        } else {
            var repX = 1
        }

        if (koorY > koef.y) {
            koorY -= koef.y;
            yMov -= koef.y;
            portItem[j].style.top = ((koorY) + window.innerHeight / 2) + 'px';
            portItem[pre].style.top = parseInt(portItem[pre].style.top) - koef.y + 'px';
        } else if (koorY < 0) {
            koorY += koef.y;
            yMov += koef.y;
            portItem[j].style.top = ((koorY) + window.innerHeight / 2) + 'px';
            portItem[pre].style.top = parseInt(portItem[pre].style.top) + koef.y + 'px';
        } else {
            var repY = 1
        }

        if (repX && repY) {
            repY = 0;
            repX = 0;

            portItem[j].style.transform = "translate(-50%, -50%) scale(1)";
            portItem[j].style.transition = '.8s cubic-bezier(0.37,-0.19, 0.36, 2.31)';
            portItem[j].style.boxShadow = '6px 4px 33px 18px rgba(255, 255, 255, .95 )';
            portItem[pre].style.transform = "translate(-50%, -50%) scale(0.5)";
            portItemCont[j].style.opacity = '1';
            go = 0;
        }
    }
}