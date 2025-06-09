// To represent a calculator on a web page
const Calculator = {
    state: {
        operand1: "",
        operator: "",
        operand2: "",
        displayContainsResult: false
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
        if (!this.state.operator) {
            if (this.state.displayContainsResult) {
                this.state.operand1 = digit;
                this.state.displayContainsResult = false;
            } else {
                this.state.operand1 += digit;
            }
            this.updateDisplay(this.state.operand1);
        } else {
            this.state.operand2 += digit;
            this.updateDisplay(this.state.operand2);
        }
    },

    // Handle operator button clicks - performs pending operation if needed and sets new operator
    // Enables chain calculations by evaluating previous operation before setting new one
    handleOperatorClick(operatorSymbol) {
        if (this.state.operand1) {
            if (this.state.operand2) {
                // TODO: should this section be delegated? 
                const result = this.operate(
                    Number(this.state.operand1), 
                    this.state.operator, 
                    Number(this.state.operand2));
                this.updateDisplay(result);
                this.state.operand1 = result.toString();
                this.state.operator = operatorSymbol;
                this.state.operand2 = "";
            } else {
                this.state.displayContainsResult = false;
                this.updateDisplay("");
                this.state.operator = operatorSymbol;
            }
        }
    },

    // Evaluate the current operation when equals is pressed
    // Updates display with result and prepares state for potential chain operations
    evaluate() {
        if (this.state.operand1 && this.state.operator && this.state.operand2) {
            const result = this.operate(
                Number(this.state.operand1), 
                this.state.operator, 
                Number(this.state.operand2)
            );
            this.updateDisplay(result);
            this.state.operand1 = result.toString();
            this.state.operator = "";
            this.state.operand2 = "";
            this.state.displayContainsResult = true;
        }
    },
    
    // returns the result of [operator] y
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

    // adds x and y and returns the sum
    add(x, y) {
        return x + y;
    },
    
    // subtracts x and y and returns the difference
    subtract(x, y) {
        return x - y;
    },
    
    // multiplies x and y and returns the product
    multiply(x, y) {
        return x * y;
    },

    // divides x and y and returns the quotient
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
        this.state.displayContainsResult = false;
    },
    
     // Update the calculator display with the provided value
    updateDisplay(value) {
        this.display.textContent = value;
    }
}

document.addEventListener('DOMContentLoaded', () => Calculator.init());