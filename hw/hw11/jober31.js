var Arr = [];

function chooseTag(tagClass) {
	return document.querySelector(tagClass) }

var shovArr = function(nameArr){
	var textForShow = ' | ';
	for (let i = 0; i < nameArr.length; i++) {
		textForShow += nameArr[i] + ' '+' | '+' ';
	}
	if (textForShow == ' | ')
		{chooseTag("#new").innerHTML = ''}
	else {chooseTag("#new").innerHTML = textForShow}
}

function count(){	
	Arr[index.value] = val.value;
	shovArr(Arr)
}

function pop() {
    Arr.pop();
    shovArr(Arr);
}

function shift() {
    Arr.shift();
    shovArr(Arr);
}

function push() {	
	Arr.push(pushValue.value);
    shovArr(Arr);
}

const index = chooseTag('input[name="index"]');
const val = chooseTag('input[name="val"]');
const ok = chooseTag('input[type="submit"]');
	  ok.addEventListener('click', count);

const popButton = chooseTag('button.pop');
	  popButton.addEventListener('click', pop);
const shiftButton = chooseTag('button.shift');
	  shiftButton.addEventListener('click', shift);

const pushValue = chooseTag('input[name="pushValue"]');
const pushButton = chooseTag('button.push');
	  pushButton.addEventListener('click', push);
	  



