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
    }, 1000 / 40);


    //-----------WIND-^-------------------------------------------------------------------


    window.addEventListener('click', moveItem);

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
    var koefScreenWidth = Math.floor(window.innerWidth / 133);


    var portItem = document.querySelectorAll('.portfolioItem');
    var portItemCont = document.querySelectorAll('.portfolioItem__container');

    var j = 0;

    function findItems() {
        j++;
        if (j == portItem.length) {
            j = 0;
        }
        console.log('find j=' + j)

    }

    function moveItem() {

        hideItem(j - 1);
        findItems();

        koorX = (rnd() - window.innerWidth / 2);
        koorY = (rnd() - window.innerHeight / 2);


        if (Math.abs(koorX) > Math.abs(koorY)) {
            var koefX = Math.abs(koorX / koorY);
            var koefY = 1;
        } else {
            var koefY = Math.abs(koorY / koorX);
            var koefX = 1;
        }

        var findItem = setInterval(() => {

            if (koorX > koefScreenWidth * koefX) {
                koorX -= koefScreenWidth * koefX;
                xMov -= koefScreenWidth * koefX;
                portItem[0].style.left = Math.floor(koorX) + window.innerWidth / 2 + 'px';
            } else if (koorX < 0) {
                koorX += koefScreenWidth * koefX;
                xMov += koefScreenWidth * koefX;
                portItem[0].style.left = Math.floor(koorX) + window.innerWidth / 2 + 'px';
            } else { var repX = 1 }

            if (koorY > koefScreenWidth * koefY) {
                koorY -= koefScreenWidth * koefY;
                yMov -= koefScreenWidth * koefY;
                portItem[0].style.top = Math.floor(koorY) + window.innerHeight / 2 + 'px';
            } else if (koorY < 0) {
                koorY += koefScreenWidth * koefY;
                yMov += koefScreenWidth * koefY;
                portItem[0].style.top = Math.floor(koorY) + window.innerHeight / 2 + 'px';
            } else { var repY = 1 }

            if (repX && repY) {
                repY = 0;
                repX = 0;
                clearInterval(findItem);
                showItem();
                //console.log(koorX, koorY, ('screen:' + koefScreenWidth), 'j=' + j)
            }

            Move();
        }, 1 / 5);
    }

    function showItem() {
        portItem[0].style.opacity = '.9';
        portItem[0].style.width = '500px';
        portItem[0].style.height = '500px';
        portItem[0].style.padding = '100px';
        portItem[0].style.boxShadow = '6px 4px 9px 3px rgba(0, 0, 0, .25)';
        portItem[0].style.transition = '.4s ease';
        portItem[0].style.transitionDelay = '.1s';

        portItemCont[j].style.opacity = '1';
        portItemCont[j].style.transitionDelay = '.6s';
        console.log('j show= ' + j)
    };

    function hideItem(spec) {
        if (spec < 0) { spec = portItem.length - 1 }
        console.log('j hide= ' + spec)
        portItem[0].style.cssText = "opacity: 0.9; width: 200px; height: 200px;";
        portItemCont[spec].style.opacity = '0';

    }

});