var error = undefined; //без undefined непрацює
var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function tryGetArrLength(arr) {
 	try { return alert(arr.length) }
 	 catch(arr) {alert("Ошибка!") }
}

