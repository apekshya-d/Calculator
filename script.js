let numbers = Array.from(document.querySelectorAll('.numbers'));
let primaryDisplay = document.querySelector('#primaryDisplay');
let secondaryDisplay = document.querySelector('#secondaryDisplay');
let operators = Array.from(document.querySelectorAll('.operator'));
let equalsTo = document.querySelector('#equalsTo');
let clearButton = document.querySelector('#clearButton');
let plusMinus = document.querySelector('#plusMinus');
let point = document.querySelector('.point');
let percent = document.querySelector('.percent');
let backspace = document.querySelector('#backspace');

let a; //currentNumber
let b; // nextNumber
let selectedOperator; // operator
let lastPressed = '';
let history = [];

document.addEventListener('keydown', (e) => {
    handleKeyboardEvent(e.key);
})

numbers.forEach((number) => {
    number.addEventListener('click', (e) => {
        if(e.detail === 0) return;
        forNumbers(e.target.textContent);
    })
})

point.addEventListener('click', (e) => {
    if(e.detail === 0) return;
    forPoint(e.target.textContent);
})

percent.addEventListener('click', (e) => {
    if(e.detail === 0) return;
    forPercent()
})

plusMinus.addEventListener('click', (e) => {
    if(e.detail === 0) return;
    forPlusMinus();
})

backspace.addEventListener('click', (e) => {
    if(e.detail === 0) return;
    forBackspace();
})

operators.forEach((operator) => {
    operator.addEventListener('click', (e) => {
        if(e.detail === 0) return;
        forOperators(e.target.textContent);
    });
});

equalsTo.addEventListener('click', (e) => {
    if(e.detail === 0) return;
    forEqualsTo();
})

clearButton.addEventListener('click', (e) => {
    if(e.detail === 0) return;
    forClearButton();
})

function add(a, b) {
    let total = parseFloat(a) + parseFloat(b);
    return Math.round(total * 100000) / 100000;
}

function subtract(a, b) {
    return parseFloat(Math.round((a - b) * 100000) / 100000);
}

function multiply(a, b) {
    return parseFloat(Math.round((a * b) * 100000) / 100000);
}

function divide(a, b) {
    return parseFloat(Math.round((a / b) * 100000) / 100000);
}

function operate(selectedOperator, a, b) {
    switch (selectedOperator) {
        case '+':
            return add(a, b);
            break;
        case '-':
            return subtract(a, b);
            break;
        case '×':
            return multiply(a, b);
            break;
        case '÷':
            return divide(a, b);
            break;

    }
}

function handleKeyboardEvent(value) {
    if (!isNaN(parseInt(value))) {
        forNumbers(value);
    } else if ('+-/*÷×'.includes(value)) {
        forOperators(value);
    } else if (value === '.') {
        forPoint(value);
    } else if (value === '=' || value === 'Enter') {
        forEqualsTo();
    } else if (value === '%') {
        forPercent();
    } else if (value === 'Backspace') {
        forBackspace();
    } else if (value === 'Escape') {
        forClearButton();
    }
}

function forNumbers(value) {
    if (lastPressed === 'equalsTo'){
        forClearButton();
    }

    if (lastPressed === 'number') {
        primaryDisplay.textContent += value;
        history[history.length - 1] = primaryDisplay.textContent;
    } else {
        primaryDisplay.textContent = value;
        history.push(value);
    }
    lastPressed = 'number';

    secondaryDisplay.textContent = history.join(' ');
}

function forOperators(value) {
    if (value === '/'){
        value = '÷';
    }

    if (value === '*'){
        value = '×'
    }

    if(displayError()){
        return;
    }
    
    if (lastPressed !== 'number' && lastPressed !== 'operator' && lastPressed !== 'equalsTo') {
        return;
    } else if (lastPressed === 'operator') {
        history.splice(history.length - 1, 1, ` ${value} `);
        secondaryDisplay.textContent = history.join(' ');
    } else if (lastPressed === 'equalsTo') {
        a = primaryDisplay.textContent;
        history.push(value);
        secondaryDisplay.textContent = history.join(' ');
    } else if (lastPressed === 'number') {
        if (typeof a === "undefined") {
            a = primaryDisplay.textContent;
        } else {
            b = primaryDisplay.textContent;
            a = operate(selectedOperator, a, b);
            primaryDisplay.textContent = a;
        }

        history.push(value);
        secondaryDisplay.textContent = history.join(' ');
    }
    selectedOperator = value;
    lastPressed = 'operator';
}

function forPoint(value) {
    if (!primaryDisplay.textContent.includes('.')) {
        primaryDisplay.textContent += value;
        history[history.length - 1] = primaryDisplay.textContent;
        secondaryDisplay.textContent = history.join(' ');
    }
}

function forEqualsTo() {
    if (lastPressed === 'equalsTo') {
        return;
    }
    if(displayError()){
        return;
    }

    b = primaryDisplay.textContent;
    result = operate(selectedOperator, a, b);
    lastPressed = 'equalsTo';
    primaryDisplay.textContent = result;
}

function forPercent() {
    primaryDisplay.textContent = primaryDisplay.textContent / 100;
    history.splice(-1, 1, primaryDisplay.textContent);
    secondaryDisplay.textContent = history.join(' ');
}

function forPlusMinus() {
    if (primaryDisplay.textContent > 0 && lastPressed === 'number') {
        primaryDisplay.textContent = -Math.abs(primaryDisplay.textContent);
        history.splice(-1, 1, primaryDisplay.textContent);
        secondaryDisplay.textContent = history.join(' ');
    } else if (primaryDisplay.textContent <= 0 && lastPressed === 'number') {
        primaryDisplay.textContent = Math.abs(primaryDisplay.textContent);
        history.splice(-1, 1, primaryDisplay.textContent);
        secondaryDisplay.textContent = history.join(' ');
    }
}

function forBackspace() {
    primaryDisplay.textContent = primaryDisplay.textContent.substring(0, primaryDisplay.textContent.length - 1);
    history.splice(-1, 1, primaryDisplay.textContent);
    secondaryDisplay.textContent = history.join(' ');
}

function forClearButton() {
    primaryDisplay.textContent = '';
    secondaryDisplay.textContent = '';
    history = [];
    a = undefined;
    b = undefined;
    selectedOperator = undefined;
    lastPressed = '';
}

function displayError() {
    if (selectedOperator === '÷' && parseInt(history[history.length-1]) === 0 ){
        forClearButton();
        primaryDisplay.textContent = 'ERROR';
        secondaryDisplay.textContent = '';
        return true;
    }
}