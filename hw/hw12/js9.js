var undefind = undefined;
var number = 9;
var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function tryGetArrLength(arr) {
 	if (!arguments.length + (typeof(arr) != 'object') )
 		{return alert('ERORR!') }
 	alert(arr.length)  }