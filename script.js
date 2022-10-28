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

numbers.forEach((number)=>{
    number.addEventListener('click', (e)=>{
        if( lastPressed === 'number'){
            primaryDisplay.textContent += e.target.textContent;
            history[history.length-1] = primaryDisplay.textContent;
        }else{
            primaryDisplay.textContent = e.target.textContent;
            history.push(e.target.textContent);
        }
        lastPressed = 'number';

        secondaryDisplay.textContent = history.join('');
    })

});

point.addEventListener('click', (e)=>{
    if(!primaryDisplay.textContent.includes('.')){
    primaryDisplay.textContent += e.target.textContent;
    history.push(e.target.textContent);
    secondaryDisplay.textContent = history.join('');
    }
})

percent.addEventListener('click', (e)=>{
    primaryDisplay.textContent = primaryDisplay.textContent / 100;
    history.splice(-1, 1, primaryDisplay.textContent);
    secondaryDisplay.textContent = history.join('');
})

plusMinus.addEventListener('click', (e)=>{
   if(primaryDisplay.textContent > 0 && lastPressed === 'number'){
    primaryDisplay.textContent = -Math.abs(primaryDisplay.textContent);
    history.splice(-1, 1, primaryDisplay.textContent);
    secondaryDisplay.textContent = history.join('');
   }
   else if(primaryDisplay.textContent <= 0 && lastPressed === 'number'){
    primaryDisplay.textContent = Math.abs(primaryDisplay.textContent);
    history.splice(-1, 1, primaryDisplay.textContent);
    secondaryDisplay.textContent = history.join('');
   }
})

backspace.addEventListener('click', (e) => {
    primaryDisplay.textContent = primaryDisplay.textContent.substring(0,primaryDisplay.textContent.length-1);
    history.splice(-1, 1, primaryDisplay.textContent);
    secondaryDisplay.textContent = history.join('');
})

operators.forEach((operator)=>{
    operator.addEventListener('click',(e) => {
        if (lastPressed !== 'number' && lastPressed !== 'operator') {
            return;
        } else if (lastPressed === 'operator'){
            history.splice(history.length-1, 1,` ${e.target.textContent} `);
            secondaryDisplay.textContent = history.join('');  
        } else if (lastPressed === 'number') {
            if (typeof a === "undefined"){
                a = primaryDisplay.textContent;
            } else {
                b = primaryDisplay.textContent;
                a = operate(selectedOperator, a, b);
                primaryDisplay.textContent = a;
            }

            history.push(` ${e.target.textContent} `);
            secondaryDisplay.textContent = history.join('');
        }     
        selectedOperator = e.target.textContent;
        lastPressed = 'operator';
            
     })
    
});

equalsTo.addEventListener('click', (e) => {
        b = primaryDisplay.textContent;
        result = operate(selectedOperator, a, b);
        lastPressed = 'equalsTo';
        primaryDisplay.textContent = result;
        
    })

clearButton.addEventListener('click', () => {
    primaryDisplay.textContent = '';
    secondaryDisplay.textContent = '';
    history = [];
    a = undefined;
    b = undefined;
    selectedOperator = undefined;
    lastPressed = '';

})

function add(a, b){
    return parseFloat(a) + parseFloat(b);
}

function subtract(a, b){
   return parseFloat(a - b);
}

function multiply(a, b){
  return parseFloat(a * b);
}

function divide(a, b){
   return parseFloat(a / b);
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