let operand1 = "";
let operand2 = "";
let operator = "";
let displayContainsResult = false;

displayDigitsOnClick();
handleOperatorClick();
evaluateOnClick();

// EFFECT: populates display when digit buttons are clicked
// stores display number in variable
// When a result is displayed, pressing a new digit should clear the result and start a new calculation
function displayDigitsOnClick() {
    const digits = document.querySelectorAll(".number");
    const display = document.querySelector("#display #content");
    console.log(display);
    digits.forEach(digit => {
        digit.addEventListener("click", () => {
            if (!operator) {
                if (displayContainsResult) {
                    operand1 = digit.textContent;
                    displayContainsResult = false;
                }
                else {
                    operand1 += digit.textContent;
                }
                display.textContent = operand1;
            }
            else {
                operand2 += digit.textContent;
                display.textContent = operand2;
            }
        });
    });
}

// occurs when an operator button is clicked
// EFFECT: updates display with the result of the operation and updates operation values
function handleOperatorClick() {
    const operators = document.querySelectorAll(".operator");
    const display = document.querySelector("#display #content")
    operators.forEach(operButton => {
        operButton.addEventListener("click", () => {
            // if you click on an operator before any numbers are in the display, don't do anything
            if (operand1) {
                if (operand2) {
                    display.textContent = operate(Number(operand1), operator, Number(operand2));
                    operand1 = display.textContent;
                    operator = operButton.textContent; // should be null if it's equal
                    operand2 = "";
                }
                else {
                    displayContainsResult = false;
                    display.textContent = ""; 
                    operator = operButton.textContent;
                }
            }
        });
    });
}

// EFFECT: updates display to the result of the operation.
// stores result in operand1 for chain operations, and clears operator and operand2
function evaluateOnClick() {
    const equals = document.querySelector("#equal");
    const display = document.querySelector("#display #content");
    equals.addEventListener("click", () => {
        if (operand1 && operator && operand2) {
            display.textContent = operate(Number(operand1), operator, Number(operand2));
            operand1 = display.textContent;
            operator = "";
            operand2 = "";
            displayContainsResult = true;
        }
    });
}

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
// TODO: raise alert when you divide by zero
function divide(x, y) {
    return x / y;
}