// Created a class called Calculator to contain the innerworkings
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }
  // Clear function that resets the Operands and operations
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = "";
  }
  // Delete function that deletes the last number in the string
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  // Append Number Function that takes the number pressed and adds it to the current string
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  // Choose Operation which uses the Operator choosen to compute using that operator and it will also still accept more operands operators
  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }
  // Function to change operands into numbers and computes the calculations base don the operators pulled in
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "x":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = "";
    this.previousOperand = "";
  }
  // Function to update the current display with the respective number or final product depending on the button pressed
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand;
    if (this.currentOperand != null) {
      this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
    }
  }
}
// Variables set for the buttons and text elements
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);
// Class creeationg for Calculator with elements passed in
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);
// Button Listener for taking the numbers pressed and passing them into the appendNumber function
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});
// Button Listener  for taking the operations pressed and passing them into the chooseOperation function
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});
// Button Listener  for triggering the compute function and then applying the results
equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});
// Button Listener  for clearing the entire calculator
allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});
// Button Listener  for deleting the last string element
deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
