var styleBtn = document.querySelectorAll('.style');    
    styleBtn.forEach(addEvnt);

function addEvnt(item, index) {
    styleBtn[index].addEventListener('click', function(){chooseCss(index+1)} );
}

function chooseCss(cssNum) {
   document.querySelector ('link').href= 'css/css'+cssNum+'.css';
   localStorage.setItem("style", cssNum);
}

if ( typeof(Storage) !== "undefined" ) {
    if ( localStorage.getItem("style") ) {
        document.querySelector('link').href='css/css'+localStorage.getItem("style")+'.css'; }
    } 
else {
    console.log('Locale storage NOT EXIST!')
}