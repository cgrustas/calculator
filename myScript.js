let operand1;
let operand2;
let operator;

displayDigitsOnClick();

// EFFECT: populates display when digit buttons are clicked
// stores display number in variable
function displayDigitsOnClick() {
    const digits = document.querySelectorAll(".number");
    const display = document.querySelector("#display #content");
    console.log(display);
    digits.forEach(digit => {
        digit.addEventListener("click", () => {
            display.textContent += digit.textContent;
            operand1 = display.textContent;
        });
    });
}

/* 
 * I'm thinking that on an operator click, we should store the display text content in the 
 * operand1 variable. If the operand1 variable already has a content, it should go in the operand2
 * variable, and operate should immediately be called, and the result should be stored in the 
 * display.textContent. 
 * 
 * TODO: is there different logic for the equal operator? 
 * 
 * 
 * when + is clicked: 
 *  if operand1 is empty 
*/

// EFFECT: 
// function handleOperatorClick() {
//     const operators = document.querySelectorAll(".operator");
//     const display = document.querySelector("#display #content")
//     operators.forEach(operator => {
//         operator.addEventListener("click", () => {
//             if (!operand1) {

//             }



//             if (operand1) { // TODO: does this check if an operator has a value? 
//                 operand2 = Number(display.textContent);
//                 display.textContent = operate(operand1, operator, operand2);
//             }
//             else {
//                 operand1 = Number(display.textContent);
//             }
//         })
//     })
// }

// takes an operator and two numbers
// returns the result of x [+, -, *, /] y
function operate(x, operator, y) {
    switch (operator) {
        case '+':
            return add(x, y);
            break;
        case '-':
            return subtract(x, y);
            break;
        case '*':
            return multiply(x, y);
            break;
        case '/':
            return divide(x, y);
            break;
        default:
            alert("ERROR");
    }
}

// adds x and y
function add(x, y) {
    return x + y;
}

// subtracts x and y
function subtract(x, y) {
    return x - y;
}

// multiplies x and y
function multiply(x, y) {
    return x * y;
}

// divides x and y
function divide(x, y) {
    return x / y;
}