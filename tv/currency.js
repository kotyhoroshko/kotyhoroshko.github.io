document.addEventListener("DOMContentLoaded", function() {

    function getCurrency() {
        let init = {
            // method: 'GET', // *GET, POST, PUT, DELETE, etc.
            // mode: '*cors', // no-cors, *cors, same-origin
            // // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // // credentials: 'same-origin', // include, *same-origin, omit
            // headers: {
            //   'Content-Type': 'application/json'
            //   // 'Content-Type': 'application/x-www-form-urlencoded',
            // }
        }
        
        fetch(`https://api.monobank.ua/bank/currency`, init )
        .then(response => response.json())
        .then(json => operateCurrency(json))
        .then(json => console.log("Currency was succesfully loaded"))
        .catch(error => console.log('ERROR. Currency not loaded'))
        
    }

    function operateCurrency(json){
        let currencyContainer = document.querySelector('.currency');
        currencyContainer.innerHTML= `
            <p><b>USD </b>${(+json[0].rateBuy).toFixed(2)} | ${(+json[0].rateSell).toFixed(2)}</p>
            <p><b>EUR </b>${(+json[1].rateBuy).toFixed(2)} | ${(+json[1].rateSell).toFixed(2)}</p>
        `
    }

    setInterval(() => {
        getCurrency()
    }, 3600000);

    getCurrency();

})