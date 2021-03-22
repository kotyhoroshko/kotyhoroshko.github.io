function parallax() {
    let scene = document.querySelector('.scene');

    if(window.DeviceOrientationEvent) {
        let xNorm = 0, yNorm = 0

        setTimeout(() => {
            xNorm=0
            yNorm=0
        }, 300);

        function norm(value){
            Math.abs(value) > 90 ? value=4 : value=value*4/190
            return value
        }

        window.addEventListener("deviceorientation", function(e){
            // var absolute = event.absolute;
            // var z = e.alpha;
            var y = e.beta;
            var x = e.gamma;
            //var coor = norm(x, y);
            scene.style.transform = `
                rotateY(${norm( x )}deg)
                rotateX(${norm( y )}deg)`;
        }, true);
    }

    window.addEventListener('mousemove', function(e){
    console.log(((e.screenY/window.innerWidth)-.5)*10, (((e.screenY/window.innerHeight)-.5)*5));
    scene.style.transform = `
        rotateY(${((e.screenX/window.innerWidth)-.5)*5}deg)
        rotateX(${((e.screenY/window.innerHeight)-.5)*5}deg)`
    });
}