const oForm = document.querySelector('div.orderForm');
const dForm = document.querySelector('div.dateForm');
const hForm = document.querySelector('div.orderHide');
	  hForm.addEventListener('click', feedBackHide);

var submtO = document.querySelector('a.hp-header-primary-button');
var submtO1 = document.querySelector('a.button.big.yellow.dark-text');
var submtO2 = document.querySelector('a.button.big.yellow.dark-text');
	if (submtO) {submtO.addEventListener('click', function(){ feedBack(oForm) } );
				isubmtO1.addEventListener('click', function(){ feedBack(oForm) } );
				submtO2.addEventListener('click', function(){ feedBack(oForm) } );}

var submtD = document.querySelector('a.hp-header-secondary-button');	
	submtD.addEventListener('click', function(){ feedBack(dForm) } );	

hForm.style.top = "-100%";
oForm.style.top = "-100%";
dForm.style.top = "-100%";

function feedBackHide(){
	hForm.style.top = "-100%";
	oForm.style.top = "-100%";
	dForm.style.top = "-100%";}

function feedBack(form){
	hForm.style.top = "0";
	form.style.top = "50%";}

//--------part View---------------

const bigPartPic = document.querySelector('.bigPartPic')
var listenZone = document.querySelector('.miniPartPic');
	  listenZone.addEventListener('mouseover', changebigPartPic);

function changebigPartPic(event) {
		if (event.target.className =="miniPicPart") {
		var loc= event.target.src;
		bigPartPic.style.cssText=("width:400px; height:400px; background-image:url("+loc+")");
	}}
	