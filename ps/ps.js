var post = {
    method: 'post',
    body: 'test=1'
}
var url = 'https://my-json-server.typicode.com/kotyhoroshko/demo/themes';

var status = function(response) {
    if (response.status !== 200) {
        return Promise.reject(new Error(response.statusText))
    }
    return Promise.resolve(response)
}
var json = function(response) {
    return response.json()
}

fetch(url, post)
    .then(status)
    .then(json)
    .then(function(data) {
        console.log('data', data)
    })
    .catch(function(error) {
        console.log('error', error)
    })



// ============================================================================================= //


// const url = 'https://my-json-server.typicode.com/kotyhoroshko/demo/themes';

// fetch(url, myInit).then(function(resp) {
//         alert('status:' + resp.status);
//         return resp.json();
//     })
//     .then(function(data) {
//         var ttl, txt = [];
//         for (var i = 0; i < data.length; i++) {
//             for (ttl in data[i]) {
//                 txt[i] += ttl + ": " + (data[i])[ttl] + " ";
//             }
//         }
//         alert(txt)
//     })
//     // .catch(function() {
//     //     alert('...А ВОТ ХУЙ ТАМ, ВАСИЛЬКУ!');
//     // });