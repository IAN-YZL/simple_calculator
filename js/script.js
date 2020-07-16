let result = 0;
let tempNum = '';
let savedNum = '';
let sign;
let isSavedNum = false;
let pressEqual = false;
let display = document.getElementById("result");
const arithmetic = ['add', 'minus', 'multiple', 'divide'];
const otherSign = ['history', 'reset', 'equal'];

function listenClick() {
    let text = document.getElementsByTagName("td");
    for (let i = 0; i < text.length; i++) {
        text[i].addEventListener("click", function() {
            let input = text[i].id;
            if (otherSign.includes(input)) {
                otherOperation(input);
            } else if (tempNum.length >= 13) {
                display.innerHTML = 'error';
                // tempNum = '';
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
                    }
                    tempNum = '';
                    isSavedNum = true;
                    sign = input;
                } 
            }
        });
    }
}

function resetCalculator() {
    result = 0;
    tempNum = '';
    savedNum = '';
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
    if (tempNum === '') {
        tempNum = 0;
    }
    if (savedNum === '') {
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
            result = parseFloat(savedNum) / parseFloat(tempNum);
        default:
            break;
    }
}

function checkResult() {
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
            tempNum = result;
            display.innerHTML = result;
        default:
            break;
    }

}



window.onload = function() {
    this.listenClick();
}