

function checkOld(age) {
	age = document.querySelector('input.us2').value;

	if ( (age === undefined) || (age == '') || (age === null) ) { 
		return alert('значення прийнято та оброблено хоч і <input type="number" min="0" max="120" step="1"')
		};
	if( (isNaN(parseInt(age))) + (age<=0) + (age>120) + (age != parseInt(age, 10)) ) {
		alert('значення прийнято та оброблено хоч і <input type="number" min="0" max="120" step="1"')
		}
	else  alert('Це значення input мав пропустити') 	
}
