$(document).ready(function() {

    var xCor = 0;
    var yCor = 0;
    var yPos = 0;
    var yMov = 0;
    var xMov = 0;
    Move();

    function Move() {
        $('html').css({
            "background": "url(images/c12.png) " + (xMov * 2 - xCor / 3) + "px " + (yMov * 2 - (yPos * 4) + yCor / 3) +
                "px repeat, url(images/c22.png) " + (xMov - xCor / 10) + "px " + (yMov - (yPos) + yCor / 9) +
                "px repeat, url(images/c32.png) " + (xMov / 2 - xCor / 50) + "px " + (yMov / 2 + (yPos * 0.75) + yCor / 40) +
                "px repeat, url(images/c42.png) " + (xMov / 10 - xCor / 120) + "px " + (yMov / 7 + (yPos * 0.9) + yCor / 120) +
                "px repeat, url(images/b3.jpg) fixed"
        });
    }

    $(window).bind('scroll', function() { //when the user is scrolling...
        yPos = $(window).scrollTop();
        Move();
    });

    window.addEventListener('mousemove', getX);

    function getX(e) {
        xCor = e.pageX;
        yCor = e.screenY;
        yPos = $(window).scrollTop();
        Move();
    }


    //-----------WIND--------------------------------------------------------------------

    var wind0 = 0;
    var wind1 = 0;
    var wind2 = 0;
    var wind3 = 0;

    function rndMove() {
        wind0 = Math.floor(Math.random() * 300);
        wind1 = Math.floor(Math.random() * 1000);
        wind2 = Math.floor(Math.random() * 200);
        wind3 = Math.floor(Math.random() * 200);
    }

    var wind = 0;
    setInterval(() => {
        wind++;
        if (wind < wind0) { xMov++ } else if (wind < (wind0 + wind1)) {} else if (wind < (wind0 + wind1 + wind2)) { xMov-- } else if (wind < (wind0 + wind1 + wind2 + wind3)) {} else {
            rndMove();
            wind = 0;
        }
        yMov--;
        Move();
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

        var koef = {
            x: (koefScreenWidth * koefX / 2),
            y: (koefScreenWidth * koefY / 2),
        }
        var frame = Math.abs(koorX / 2);

        function cubic() {
            if (frame < Math.abs(koorX)) {
                koef.x *= 1.04;
                koef.y *= 1.04;
                //console.log("+" + koef.x)
            } else {
                koef.x /= 1.045;
                koef.y /= 1.045;
                //console.log("-" + koef.x)
            }
        }

        var findItem = setInterval(() => {
            cubic();
            if (koorX > koef.x) {
                koorX -= koef.x;
                xMov -= koef.x;
                portItem[j].style.left = (Math.floor(koorX) + window.innerWidth / 2) + 'px';
                portItem[pre].style.left = parseInt(portItem[pre].style.left) - koef.x + 'px';
            } else if (koorX < 0) {
                koorX += koef.x;
                xMov += koef.x;
                portItem[j].style.left = (Math.floor(koorX) + window.innerWidth / 2) + 'px';
                portItem[pre].style.left = parseInt(portItem[pre].style.left) + koef.x + 'px';
            } else {
                var repX = 1
            }

            if (koorY > koef.y) {
                koorY -= koef.y;
                yMov -= koef.y;
                portItem[j].style.top = (Math.floor(koorY) + window.innerHeight / 2) + 'px';
                portItem[pre].style.top = parseInt(portItem[pre].style.top) - koef.y + 'px';
            } else if (koorY < 0) {
                koorY += koef.y;
                yMov += koef.y;
                portItem[j].style.top = (Math.floor(koorY) + window.innerHeight / 2) + 'px';
                portItem[pre].style.top = parseInt(portItem[pre].style.top) + koef.y + 'px';
            } else {
                var repY = 1
            }

            if (repX && repY) {
                repY = 0;
                repX = 0;
                clearInterval(findItem);
                //portItem[j].transform = "translate(-50%, -50%) scale(0.5)"
                //portItem[j].style.transition = 'unset';
                portItem[j].style.transform = "translate(-50%, -50%) scale(1)";
                portItem[j].style.transition = '.8s cubic-bezier(0.37,-0.19, 0.36, 2.31)';
                portItem[j].style.boxShadow = '6px 4px 33px 18px rgba(255, 255, 255, .95 )';
                portItem[pre].style.transform = "translate(-50%, -50%) scale(0.5)";
                //console.log()
                portItemCont[j].style.opacity = '1';
                //console.log(ee + ' разів', "frame=" + frame, 'koorX=' + koorX)
            }

            showItem.call(portItem[j]);
            Move();

        }, 1000 / 60);
    }

    function showItem() {
        this.style.opacity = ".9";
        this.style.width = "500px";
        this.style.height = "500px";
        this.style.padding = "100px";
    }

    function hideItem() {
        //this.style.opacity = "0";
        //this.style.boxShadow = 'unset';
        this.style.transition = 'unset';
        //this.style.transition = 'scale .1s cubic-bezier(0.37,-0.19, 0.36, 2.31) .7s';
        //this.style.transition = 'translate .1s cubic-bezier(0.37,-0.19, 0.36, 2.31) .7s';
        //this.style.transition = 'scale .1s cubic-bezier(0.37,-0.19, 0.36, 2.31) .7s';
        //this.style.transform = "translate(-50%, -50%) scale(0.5)";
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
});