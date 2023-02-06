const storageRange = document.querySelector("#storage");
const storageValue = document.querySelector("#storage-value");
storageValue.textContent = storageRange.value + '$';
storageRange.addEventListener('input', function(e) {
    storageValue.textContent = getvalue(e)
})

const transferRange = document.querySelector("#transfer");
const transferValue = document.querySelector("#transfer-value");
transferValue.textContent = transferRange.value + '$';
transferRange.addEventListener('input', function(e) {
    transferValue.textContent = getvalue(e)
})

function getvalue(e) {
    return e.target.value + '$';
}

function getDataBase() {
    fetch( 'db.json' )
      .then( function( response ){
        if( response.status != 200 ){
          console.log( 'DB was not received. Status: '+response.status );
        } else {
          response.json().then( function( data ){
            console.log( 'DB was received' );
            this.db = data;
            console.table(this.db)
          }.bind(this));
        }
      }
      .bind(this))
  }
getDataBase()