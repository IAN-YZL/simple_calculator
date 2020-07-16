'use strict'

let result = 0;
let tempNum = 0;
let savedNum = 0;
let sign;
let isSavedNum = false;
let pressEqual = false;
let display = document.getElementById("result");
const arithmetic = ['add', 'minus', 'multiple', 'divide'];
const otherSign = ['history', 'reset', 'equal'];

function listenClick() {
    let text = document.getElementsByTagName("td");
    for (let i = 0; i < text.length; i++) {
        text[i].onmousedown = () => {
            text[i].style.backgroundColor = 'black';
        }
        text[i].addEventListener("click", function() {
            let input = text[i].id;
            if (otherSign.includes(input)) {
                otherOperation(input);
            } else if (tempNum.length >= 13) {
                display.innerHTML = 'error';
            } else{
                if (!arithmetic.includes(input) && !otherSign.includes(input)) {
                    if (input === '.') {
                        pointCheck();
                        display.innerHTML = tempNum;
                    } else if (!pressEqual){
                        tempNum += input;
                        display.innerHTML = parseFloat(tempNum);
                    } else {
                        tempNum = input;
                        pressEqual = false;
                        display.innerHTML = parseFloat(tempNum);
                    }
                } else if (arithmetic.includes(input)) {
                    if (isSavedNum) {
                        performCalculation();
                        checkResult();
                        display.innerHTML = result;
                        savedNum = result;
                    } else {
                        savedNum = tempNum;
                        isSavedNum = true;
                    }
                    tempNum = 0;
                    sign = input;
                } 
            }
            handleError();
        })
    }
}

function resetCalculator() {
    result = 0;
    tempNum = 0;
    savedNum = 0;
    isSavedNum = false;
    pressEqual = false;
}

function pointCheck() {
    if (tempNum.length === 0) {
        tempNum += '0.';
    } else if (!tempNum.includes('.')) {
        tempNum += '.';
    }
}

function performCalculation() {
    if (tempNum === 'error') {
        tempNum = 0;
    }
    if (savedNum === 'error') {
        savedNum = 0;  
    }
    switch (sign) {
        case 'add':
            result = parseFloat(savedNum) + parseFloat(tempNum);
            break;
        case 'minus':
            result = parseFloat(savedNum) - parseFloat(tempNum);
            break;
        case 'multiple':
            result = parseFloat(savedNum) * parseFloat(tempNum);
            break;
        case 'divide':
            if (tempNum == 0) {
                result = 'error';
            } else {
                result = parseFloat(savedNum) / parseFloat(tempNum);
            }
        default:
            break;
    }
}

function checkResult() {
    if (result === NaN) {
        result = 0;
    }
    if (result.toString().length > 13) {
        result = result.toString().substr(0, 13);  
    }
}

function otherOperation(input) {
    switch (input) {
        case 'reset':
            resetCalculator();
            display.innerHTML = 0;
            break;
        case 'equal':
            performCalculation();
            checkResult();
            display.innerHTML = result;
            tempNum = result;
            isSavedNum = false;
            pressEqual = true;
        case 'history':
            if (result === 'error') {
                result = 0;
            }
            tempNum = result;
            display.innerHTML = result;
        default:
            break;
    }

}

function handleError() {
    if (result === 'error') {
        result = 0;   
    }
    if (tempNum === 'error') {
        tempNum = 0;   
    }
    if (savedNum === 'error') {
        savedNum = 0;   
    }

}

function mouseUp() {
    let num = document.getElementsByClassName('calculator__num');
    for (let i = 0; i < num.length; i++) {
        num[i].onmouseup = () => {
            num[i].style.backgroundColor = '#646464';
        }
    }

    let button = document.getElementsByClassName('calculator__arithmetic');
    for (let i = 0; i < button.length; i++) {
        button[i].onmouseup = () => {
            button[i].style.backgroundColor = '#e3b81d';
        }     
    }

    let resetBtn = document.getElementById('reset');
    resetBtn.onmouseup = () => {
        resetBtn.style.backgroundColor = '#fc4d42';
    }


    let historyBtn = document.getElementById('history');
    historyBtn.onmouseup = () => {
        historyBtn.style.backgroundColor = '#2b8ae3';
    }

    let equalBtn = document.getElementById('equal');
    equalBtn.onmouseup = () => {
        equalBtn.style.backgroundColor = '#2b8ae3';
    }
}

window.onload = function() {
    this.listenClick();
    this.mouseUp();
}