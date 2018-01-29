'use strict'
let vacansies = {
    backEndDeveloper: {
        html: 8,
        php: 10,
        laravel: 9,
        javaScript: 6,
        git: 8,
        sql: 9
    },
    frontEndDeveloper: {
        html: 9,
        css: 8,
        javaScript: 8,
        git: 6,
        angular: 5
    },
    htmlDeveloper: {
        html: 10,
        css: 9,
        sass: 9,
        git: 6,
        jQuery: 8
    },
    nodeJsDeveloper: {
        html: 7,
        nodeJs: 9,
        npm: 8,
        exprezultsJs: 9,
        mongoDB: 8,
        sql: 7
    },
    angularDeveloper: {
        angular: 10,
        javaScript: 9,
        mongoDB: 8,
        git: 8,
        html: 8,
        typeScript: 10,
    },
    fullStackDeveloper: {
        javaScript: 10,
        php: 10,
        nodeJs: 10,
        typeScript: 10,
        html: 10,
        angular: 10,
        react: 10,
        mongoDB: 10,
        sql: 10
    }
}

// =============================================================== //

const getStatBtn = document.querySelector('.getStat');
getStatBtn.addEventListener('click', getStatistic);

function getStatistic() {
    let rezult = [];
    let candidats = document.querySelectorAll('input.quantity');
    let arr = Array.from(candidats).filter(x => x.value > 0);
    for (let index = 0; index < arr.length; index++) {
        let title = arr[index].name;
        let val = arr[index].value;
        for (const j in vacansies[title]) {
            rezult[j] = rezult[j] + vacansies[title][j] * val || vacansies[title][j] * val
        }
    }
    let sortedArr = [];
    for (let skill in rezult) {
        sortedArr.push([skill, rezult[skill]]);
    }

    sortedArr.sort(function(a, b) {
        return b[1] - a[1];
    });

    let totalRezHtml = '';
    for (const key in sortedArr) {
        totalRezHtml += '<p>' + sortedArr[key][0] + '(' + sortedArr[key][1] + ') ' + '</p>'
    }

    let totalRezult = document.querySelector('.rezultArea');
    totalRezult.innerHTML = totalRezHtml;
    console.log(sortedArr)
}

// ==========================v=VIEW=v==================================

let txt = '',
    vacansHtml = '';

for (let key in vacansies) {
    for (let kei in vacansies[key]) {
        txt += '<p><b>' + kei + ': </b>' + (vacansies[key])[kei] + '</p>'
    }
    vacansHtml += '<div><h2>' + key + '</h2>' + txt + inputName(key) + '</div>';
    txt = '';
}
const vacansArea = document.querySelector('.vacansArea');
vacansArea.innerHTML = vacansHtml;

function inputName(vacansiTitle) {
    vacansiTitle = '<div class="candidates"><span>Candidates:</span><input class="quantity" name="' + vacansiTitle + '" type="number" min="0" step="1" value="0"></div>';
    return vacansiTitle;
}