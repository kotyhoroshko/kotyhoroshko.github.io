"use strict";
(function excercise1() {
    console.log('--= excercise1 =--');
    let greeting = 'Hello World!';
    console.log(greeting);
})();
//2. loop which prints string to console n times
(function excercise2() {
    console.log('--= excercise2 =--');
    let repeatTimes = 3;
    let greetingText = "Hello!";
    while (repeatTimes > 0) {
        console.log(greetingText);
        repeatTimes--;
    }
})();
// 3. code that generates array of numbers - from n to m
function excercise3(n, m) {
    console.log('--= excercise3 =--');
    let result = [];
    if (n > m) {
        [n, m] = [m, n];
    }
    for (let index = 0; n <= m; index++) {
        result[index] = n;
        n++;
    }
    console.log(result);
}
excercise3(1, 10);
// 4. Create a function which uses tuple type to calculate the distance between two points in 2D space
function excercise4() {
    console.log('--= excercise4 =--');
    let a = [1, 1], b = [4, 5];
    function distance(p1, p2) {
        return Math.sqrt(Math.pow((p1[0] - p2[0]), 2) + Math.pow((p1[1] - p2[1]), 2));
    }
    console.log('Distance is: ' + distance(a, b) + ' points');
}
excercise4();
// 5. Create a function which uses type alias to calculate the distance between two points in 2D space - points are objects with x and y properties
function excercise5() {
    console.log('--= excercise5 =--');
    let a = { x: 1, y: 1 }, b = { x: 4, y: 5 };
    function distance(p1, p2) {
        let x1, y1, x2, y2;
        [x1, y1, x2, y2] = [p1.x, p1.y, p2.x, p2.y];
        return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
    }
    console.log('Distance is: ' + distance(a, b) + ' points');
}
excercise5();
