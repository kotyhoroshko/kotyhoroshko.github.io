document.body.onload= function(){
    var preloder=document.querySelector('.preLoader');
    setTimeout(function(){preloder.style.opacity="0";}, 300);
    setTimeout(function(){preloder.style.display="none";}, 1300);
}

let zagImg=document.querySelector('.zagImg');
let bbImg=document.querySelector('.bbImg');

document.addEventListener('click',
    function(e){
        if( e.target.className=="navBB__img"){
            bbImg.src="bb"+e.target.name+".jpg"
        };


        if(e.target.className=="navZag_img"){
            zagImg.className="zagImg bb"+e.target.name;
            zagImg.src="zagbb"+e.target.name+".png";
            console.log(e.target.name)
        };
})
