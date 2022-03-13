var highlight = function(tag) {
	var tag = inpt.value;	
	if ( !isNaN(parseInt(tag))) {alert('Такого тегу немає!')}
	else if (document.querySelectorAll(inpt.value).length) {
		tagColect = document.querySelectorAll(tag);
		for (let i = 0; i < tagColect.length; i++) {
        	tagColect[i].style.textDecoration = "underline";}}
    else alert('Такого тегу немає!')
    }

const inpt = document.querySelector('input.highTag');
const submt = document.querySelector('button.highTag');
	
	submt.addEventListener('click', highlight);

//Як захистити ввід ввід від ві розділових знаків не прдумав