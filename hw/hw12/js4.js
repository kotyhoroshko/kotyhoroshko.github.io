var presTimesButton1 = 0;
var presTimesButton2 = 0;
var presTimesSumm = function(presTimesButton1, presTimesButton2){
 return (presTimesButton2 + presTimesButton1);}

function chooseTag(tagClass) {
	return document.querySelector(tagClass) }

function presTimesBut1() {
	presTimesButton1++;
	displayRes() }

function presTimesBut2() {
	presTimesButton2++;
	displayRes() }

function displayRes(){
  	chooseTag("span.button1").innerHTML = presTimesButton1;
  	chooseTag("span.button2").innerHTML = presTimesButton2;
  	chooseTag("span.summ").innerHTML = presTimesSumm(presTimesButton1, presTimesButton2) }

const button1 = document.querySelector('button.button1');
const button2 = document.querySelector('button.button2');
	  button1.addEventListener('click', presTimesBut1);
	  button2.addEventListener('click', presTimesBut2);