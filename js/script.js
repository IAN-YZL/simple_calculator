let result = 10;
let tempNum1 = 0;
let tempNum2 = 0;
let input = [false, false];
let index = 0;
let display = document.getElementById("result");



function equal () {
    display.innerHTML = result;
}

document.getElementById('equal').addEventListener("click", equal);
