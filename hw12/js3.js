function pNum() {
    let pArr = document.querySelectorAll("p");
    let numer;
    for (let i = 0; i < pArr.length; i++) {
    	numer = document.createTextNode((i+1) + '. ');
    	pArr[i].insertBefore(numer, pArr[i].firstChild )
    }
}
