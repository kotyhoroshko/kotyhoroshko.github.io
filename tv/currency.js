document.addEventListener("DOMContentLoaded", function() {

    function getCurrency() {
        fetch(`https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5`)
        .then(response => response.json())
        .then(json => operateCurrency(json))
        .then(json => console.log("Currency was succesfully loaded"))
        .catch(error => console.log('ERROR. Currency not loaded'))
    }

    function operateCurrency(json){
        let currencyContainer = document.querySelector('.currency');
        currencyContainer.innerHTML= `
            <p><b>${json[0].ccy} </b>${(+json[0].buy).toFixed(2)} | ${(+json[0].sale).toFixed(2)}</p>
            <p><b>${json[1].ccy} </b>${(+json[1].buy).toFixed(2)} | ${(+json[1].sale).toFixed(2)}</p>
        `
    }

    setInterval(() => {
        getCurrency()
    }, 3600000);

    getCurrency();

})