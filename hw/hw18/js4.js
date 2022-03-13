if (window.localStorage.agree !== 'true') {
    setTimeout(function(){ showPopup() }, 4000);
}

let popup = document.querySelector('.popup');
let agree = document.querySelector('#agree');
let submitBtn = document.querySelector('button[name="submitBtn"]');

 function showPopup(){
    popup.style.top = "50%"
 }

 function hidePopup(){
    popup.style.top = "-50%"
 }

popup.addEventListener('click', activateSubmiteBtn);

function activateSubmiteBtn() {
    if (agree.checked){
        submitBtn.addEventListener('click', agreeAndHidePopup);
        submitBtn.style.backgroundColor="#cd0000"; }
    else {submitBtn.style.backgroundColor="gray";
        submitBtn.removeEventListener('click', agreeAndHidePopup);
    }
}

function agreeAndHidePopup() {
    localStorage.setItem("agree", "true");
    hidePopup();
    setTimeout(function(){ popup.style.display = "none" }, 500);
}

if ( typeof(Storage) === "undefined" ) {
    alert("Your browser not support Locale Storage.\nSorry, this aplication not for you.")}