function PaintInRedAllP() {
    let pArr = document.querySelectorAll("p");
    for (let i = 0; i < pArr.length; i++) {
        pArr[i].style.backgroundColor = "red";
    }
}

