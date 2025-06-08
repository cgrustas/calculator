let operand1;
let operand2;
let operator;

displayDigitsOnClick();

// EFFECT: populates display when digit buttons are clicked
// TODO: stores display number in variable 
function displayDigitsOnClick() {
    const digits = document.querySelectorAll(".number");
    const display = document.querySelector("#content");
    console.log(display);
    digits.forEach(digit => {
        digit.addEventListener("click", () => {
            // TODO: these should be strings
            display.textContent += digit.textContent;
        });
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
function divide(x, y) {
    return x / y;
}