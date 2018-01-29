'use strict'

var url = 'https://my-json-server.typicode.com/kotyhoroshko/demo/themes';
var themes = {
    num: 911,
    title: "Додана тема POST",
    hours: 911,
    deadline: "29.02.2021",
    text: "-!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-"
}
var post = {
    method: 'post',
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(themes)
}
var status = function(response) {
    if (response.status !== 200) {
        return Promise.reject(new Error(response.statusText))
    }
    return Promise.resolve(response)
}
var json = function(response) {
    return response.json()
}

const getBtn = document.querySelector('.getBtn');
getBtn.addEventListener('click', function() {
    fetch(url)
        .then(status)
        .then(json)
        .then(function(data) {
            console.log('GET data:', data);
            showRez(data);
        })
        .catch(function(error) {
            console.log('error', error)
        })
})

const postBtn = document.querySelector('.postBtn');
postBtn.addEventListener('click', function() {
    fetch(url, post)
        .then(status)
        .then(json)
        .then(function(data) {
            console.log('POST data:', data);
            var prymitka = { 'УВАГА ': 'позицію "ID" додав сервер! (у вихідних даних його не було)' };
            data = [data, prymitka];
            showRez(data);
        })
        .catch(function(error) {
            console.log('error', error)
        })
})


// ==========================SHOW REZULT=================================================== //

var rezultArea = document.querySelector('.showRez');

function showRez(data) {
    var key;
    var txt = '';
    var rez = '';
    for (var i = 0; i < data.length; i++) {
        for (key in data[i]) {
            txt += '<p><b>' + key + ': </b>' + (data[i])[key] + '</p>';
        }
        rez += '<div>' + txt + '</div>';
        txt = ''
    }
    rezultArea.innerHTML = rez;
}