let db = [
    [122, 76, 66], [127, 68, 69], [113,	65, 67],
    [125, 80, 68], [131, 80, 68], [120,	80, 69],
    [122, 76, 66], [124, 77, 67], [127,	78, 68],
    [133, 79, 58], [123, 74, 60], [120,	73, 62],
    [115, 75, 57], [122, 69, 64], [122,	76, 62],
    [130, 75, 59], [0, 0, 0], [107,	72, 66],
    [123, 81, 59], [125, 80, 64], [120,	75, 59],
    [119, 73, 63], [109, 75, 68], [120,	73, 70],
    [125, 78, 63], [000, 00, 00], [122,	85, 75],
    [125, 75, 65], [130, 80, 70], [107,	74, 72],
    [133, 85, 63], [127, 85, 63], [123,	85, 63],
    [112, 74, 63], [123, 82, 74], [132,	80, 70],
    [120, 75, 60], [123, 78, 61], [122,	76, 70],
    [119, 80, 60], [000, 00, 00], [125,	80, 72],
    [125, 78, 67], [115, 74, 60], [121,	80, 72],
    [125, 78, 64], [000, 00, 00], [122,	76, 70],
    [124, 78, 58], [125, 73, 64], [113,	80, 64],
    [000, 00, 00], [110, 73, 62], [106,	64, 66],
    [125, 82, 58], [108, 71, 67], [113,	77, 75],
    [000, 00, 00], [132, 87, 66], [135,	90, 73],
    [126, 79, 58], [000, 00, 00], [119,	74, 64],
    [123, 81, 62], [130, 80, 62], [111,	69, 71],
    [125, 74, 70], [123, 76, 76], [000, 00, 00],
    [128, 77, 69], [131, 86, 66], [110,	75, 66],
    [133, 74, 64], [132, 83, 64], [128,	75, 77],
    [113, 72, 64], [132, 83, 66], [120,	73, 62],
    [000, 00, 00], [141, 87, 72], [126,	87, 68],
    [128, 80, 68], [128, 81, 78], [119,	71, 66],
    [000, 00, 00], [122, 76, 70], [105,	72, 62],
    [114, 75, 65], [117, 75, 66], [120, 80, 66],
    [000, 00, 00], [125, 81, 65], [119,	77, 66],
    [116, 75, 65], [132, 85, 72], [000, 00, 00],
    [150, 90, 67], [143, 82, 76], [115,	70, 60],
    [125, 73, 67], [113, 72, 61], [122,	74, 64],
    [130, 82, 60], [130, 83, 65], [122,	79, 68],
    [130, 84, 66], [138, 87, 70], [125,	87, 68],
    [128, 80, 60], [128, 83, 69], [121,	75, 69],
    [124, 81, 62], [130, 77, 63], [117, 73, 65], [152, 90, 77],
    [140, 84, 63], [134, 90, 61], [135, 85, 62],
    [133, 79, 63], [121, 71, 61], [123, 83, 65],
    [120, 77, 63], [130, 83, 61], [118,	74,	64],
    [131, 85, 62], [135, 87, 63], [110,	70,	58],
    [124, 79, 57], [125, 79, 61], [123,	82,	58],
    [125, 74, 59], [121, 74, 62], [114,	71,	57],
    [111, 77, 62], [129, 81, 60], [120,	73,	55],
    [118, 72, 59], [136, 82, 59], [135, 80, 64],
    [119, 77, 64], [119, 78, 73], [108, 72, 58],
    [121, 74, 57], [117, 72, 60], [122, 70, 70],
    [117, 77, 61], [120, 80, 57], [127, 82, 63],
    [128, 78, 66], [145, 85, 75], [106, 74, 61],
    [127, 79, 65], [0, 0, 0], [127, 73,65],
    [127, 77, 70], [111, 79, 69], [127, 74,70],
    [132, 81, 68], [0, 0, 0], [112, 76,67],
    [136, 86, 63], [0, 0, 0], [114, 71,65],
    [133, 79, 68], [0, 0, 0], [115, 70,65],
    [122, 72, 63], [0, 0, 0], [113, 72, 63],
    [114, 71, 59], [111, 70, 60], [116, 68, 59],
    [111, 76, 58], [128, 77, 61], [122, 75, 62],
    [112, 70, 59], [0, 0, 0], [103, 66, 59],
    [126, 77, 57], [125, 76, 58], [122, 72, 60],
    [119, 76, 59], [122, 75, 62], [112, 65, 61],
    [123, 73, 62], [112, 73, 64], [117, 74, 58],
    [122, 61, 58],
]

let tysqVerkh = [];
let tysqNyz = [];
let pulse = [];
let desc = '';

for (let index = 0; index < db.length; index++) {

    if(db[index][0]==0) {
        tysqVerkh[index] = (db[(index-1)][0]+db[(index+1)][0])/2;
        tysqNyz[index] = (db[(index-1)][1]+db[(index+1)][1])/2;
        pulse[index] = (db[(index-1)][2]+db[(index+1)][2])/2;
    }
    else {
        tysqVerkh[index] = db[index][0]
        tysqNyz[index] = db[index][1]
        pulse[index] = db[index][2]
    }
}

let viewBox = {x:150, y:300}
let step = viewBox.y/(db.length-1);

let inner = `
<svg viewBox="0 120 ${viewBox.y} ${viewBox.x}" preserveAspectRatio="none" style="background:#000000;">`

let tysQ = ``
let pulseLine = ``

for (let index = 0; index < tysqVerkh.length; index++) {
    tysQ +=` ${(step*index).toFixed(2)},${viewBox.y-tysqVerkh[index]}
    `
    pulseLine += ` ${step*index},${viewBox.y-pulse[index]} `
    desc += `
        <g class="desc">
            <line x1="${(step*index).toFixed(2)}" y1="${viewBox.y-tysqVerkh[index]}" x2="${(step*index).toFixed(2)}" y2="${viewBox.y-tysqNyz[index]}" style="stroke: rgba(255,255,255,1);stroke-width:1" />
            <circle cx="${(step*index).toFixed(2)}" cy="${viewBox.y-tysqVerkh[index]}" r="2" stroke="black" stroke-width=".5" fill="yellow" />
            <circle cx="${(step*index).toFixed(2)}" cy="${viewBox.y-tysqNyz[index]}" r="2" stroke="black" stroke-width=".5" fill="yellow" />
            <text x="${(step*index).toFixed(2)}" y="${viewBox.y-tysqVerkh[index]-5}" stroke="black" stroke-width="2">${tysqVerkh[index]}/${tysqNyz[index]}, ${pulse[index]}</text>
            <text x="${(step*index).toFixed(2)}" y="${viewBox.y-tysqVerkh[index]-5}" fill="white" stroke-width="0">${tysqVerkh[index]}/${tysqNyz[index]}, ${pulse[index]}</text>
        </g>`
}

for (let index = tysqVerkh.length-1; index >= 0; index--) {
    tysQ +=` ${(step*index).toFixed(2)},${viewBox.y-tysqNyz[index]}
    `
}

inner += `
<polygon style="stroke:#ffff00;stroke-width:0.5;fill:rgba(255,255,0,.42);" points="${tysQ}"/>
<polyline points="${pulseLine}" style="fill:none;stroke:#ff66ff;stroke-width:2" />
${desc}
<line x1="0" y1="${viewBox.y-120}" x2="300" y2="${viewBox.y-120}" style="stroke:rgba(255,255,255,.4);stroke-width:1" />
<text x="0" y="${viewBox.y-120-1}" fill="white" stroke-width="0">120</text>
<line x1="0" y1="${viewBox.y-140}" x2="300" y2="${viewBox.y-140}" style="stroke:rgba(255,255,255,.4);stroke-width:1" />
<text x="0" y="${viewBox.y-140-1}" fill="white" stroke-width="0">140</text>
<line x1="0" y1="${viewBox.y-80}" x2="300" y2="${viewBox.y-80}" style="stroke:rgba(255,255,255,.4);stroke-width:1" />
<text x="0" y="${viewBox.y-80-1}" fill="white" stroke-width="0">80</text>
<line x1="0" y1="${viewBox.y-60}" x2="300" y2="${viewBox.y-60}" style="stroke:rgba(255,255,255,.4);stroke-width:1" />
<text x="0" y="${viewBox.y-60-1}" fill="white" stroke-width="0">60</text>

Sorry, your browser does not support inline SVG.
</svg>`

document.querySelector('.graf').innerHTML = inner
