function DropShadowImg() {
	let imgArr = document.querySelectorAll("img");
    for (let i = 0; i < imgArr.length; i++) {
        imgArr[i].style.boxShadow = "5px 5px 16px rgba(0,0,0,.8)";
    }
}