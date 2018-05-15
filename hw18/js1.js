// if(window.localStorage) {
if ( typeof(Storage) !== "undefined" ) {
    console.log('Locale storage EXIST!');
} else {
    console.log('Locale storage NOT EXIST!');
}