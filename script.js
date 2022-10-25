let numbers = Array.from(document.querySelectorAll('.numbers'));
let display = document.querySelector('#display');
let operators = Array.from(document.querySelectorAll('.operator'));
let equalsTo = document.querySelector('#equalsTo');
let clearButton = document.querySelector('#clearButton');

let a; //currentNumber
let b; // nextNumber
let selectedOperator; // operator
let lastPressed = '';

numbers.forEach((number)=>{
    number.addEventListener('click',(e)=>{
        if( lastPressed === '' || lastPressed === 'number'){
        display.textContent += e.target.textContent;
        }else{
            display.textContent = e.target.textContent;
        }
        lastPressed = 'number';
    })

});

operators.forEach((operator)=>{
    operator.addEventListener('click',(e) => {
            if (typeof a === "undefined"){
                a = display.textContent;
            }else {
                b = display.textContent;
                a = operate(selectedOperator, a, b);
                display.textContent = a;
            }
            lastPressed = 'operator';
            selectedOperator = e.target.textContent;
        })
    
});

equalsTo.addEventListener('click', function () {
    b = display.textContent;
    result = operate(selectedOperator, a, b);
    lastPressed =  'equalsTo';
    display.textContent = result;
})

clearButton.addEventListener('click', () => {
    display.textContent = '';
    a = 0;
    b = 0;

})

function add(a, b){
    return parseInt(a) + parseInt(b);
}

function subtract(a, b){
   return a - b;
}

function multiply(a, b){
  return a * b;
}

function divide(a, b){
   return a / b;
}

function operate(selectedOperator, a, b){
    switch(selectedOperator){
        case '+' : 
            return  add(a ,b);
        break;
        case '-' : 
            return subtract(a, b);
        break;
        case '*' : 
            return multiply(a, b);
        break;
        case '/' : 
            return divide(a, b);
        break;

    }
}