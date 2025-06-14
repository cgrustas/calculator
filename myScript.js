// To represent a calculator on a web page
const Calculator = {
    state: {
        operand1: "",
        operator: "",
        operand2: "",
    },

    init() {
        this.display = document.querySelector("#display #content");
        this.attachEventListeners();
    },

    // Attach all event listeners to calculator buttons
    attachEventListeners() {
        this.attachDigitListeners();
        this.attachOperatorListeners();
        this.attachEqualsListener();
        this.attachClearListener();
    },

    // Set up click event listeners for all number buttons (0-9)
    attachDigitListeners() {
        const digits = document.querySelectorAll(".number");
        digits.forEach(digit => {
            digit.addEventListener("click", () => this.handleDigitClick(digit.textContent));
        });
    },

    // Set up click event listeners for all basic operator buttons (+, -, *, /)
    attachOperatorListeners() {
        const operators = document.querySelectorAll(".operator");
        operators.forEach(operator => {
            operator.addEventListener("click", () => 
                this.handleOperatorClick(operator.textContent));
        });
    },

    // Set up click event listener for the equals button
    attachEqualsListener() {
        const equals = document.querySelector("#equal");
        equals.addEventListener("click", () => this.evaluate());
    },

    // Set up click event listener for the all clear (AC) button
    attachClearListener() {
        const allClear = document.querySelector("#all-clear");
        allClear.addEventListener("click", () => this.clearData());
    },

    // Handle digit button clicks - appends digit to current operand and updates display
    // When a result is displayed, pressing a new digit starts a new calculation
    handleDigitClick(digit) {
        if (this.state.operator === "=") { // if we just completed a calculation
            this.state.operand1 = digit;
            this.state.operator = "";
            this.updateDisplay(this.state.operand1);
        } 
        else if (!this.state.operator) {
            this.state.operand1 += digit;
            this.updateDisplay(this.state.operand1);
        } 
        else {
            this.state.operand2 += digit;
            this.updateDisplay(this.state.operand2);
        }
    },

    // Handle operator button clicks - sets new operator and clears display
    // For chain calculations: shows result from previous operation and sets new operator
    handleOperatorClick(operator) {
        if (this.state.operand1) {
            if (this.state.operator === "=") { // if we just completed a calculation
                this.state.operator = operator;
                this.updateDisplay("");
            } 
            else if (this.state.operand2) {
                this.evaluate(); 
                this.state.operator = operator;
            } else {
                this.updateDisplay("");
                this.state.operator = operator;
            }
        }
    },

    // Calculate and display the result of the current operation
    // Reset calculator state variables
    evaluate() {
        if (this.state.operand1 && this.state.operator && this.state.operand2) {
            const result = this.operate(
                Number(this.state.operand1), 
                this.state.operator, 
                Number(this.state.operand2)
            );
            this.updateDisplay(result);
            this.state.operand1 = result.toString();
            this.state.operator = "=";
            this.state.operand2 = "";
        }
    },
    
    // Return the result of [operator] y
    operate(x, operator, y) {
        switch (operator) {
            case '+':
                return this.add(x, y);
            case '-':
                return this.subtract(x, y);
            case '*':
                return this.multiply(x, y);
            case '/':
                return this.divide(x, y);
            default:
                alert("ERROR");
                return 0;
        }
    },

    // Add x and y and returns the sum
    add(x, y) {
        return x + y;
    },
    
    // Subtract x and y and returns the difference
    subtract(x, y) {
        return x - y;
    },
    
    // Multiply x and y and returns the product
    multiply(x, y) {
        return x * y;
    },

    // Divide x and y and returns the quotient
    divide(x, y) {
        if (y == 0) {
            return "ERROR";
        }
        const result = x / y;
        return result % 1 === 0 ? result : result.toPrecision(4);
    },

    // Reset all calculator state to initial values and clear the display
    clearData() {
        this.updateDisplay("");
        this.state.operand1 = "";
        this.state.operator = "";
        this.state.operand2 = "";
    },
    
     // Update the calculator display with the provided value
    updateDisplay(value) {
        this.display.textContent = value;
    }
}

document.addEventListener('DOMContentLoaded', () => Calculator.init());