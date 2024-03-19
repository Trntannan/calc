const display = document.getElementById("display");

let equation = "0";
let firstNumber = null;
let operator = null;
let secondNumber = null;

function handleNumber(number) {
  if (equation === "0") {
    equation = number;
  } else {
    equation += number;
  }
  updateDisplay();
}

function clearDisplay() {
  equation = "0";
  firstNumber = null;
  operator = null;
  secondNumber = null;
  updateDisplay();
}

function deleteLastEntry() {
  equation = equation.slice(0, -1); 
}

function updateDisplay() {
  display.value = equation || "0";
}

function handleOperator(op) {
  if (operator === null) {
    firstNumber = parseFloat(equation);
    operator = op;
    equation += op;
  } else {
    equation = equation.slice(0, -2) + op;
    operator = op;
  }
  updateDisplay();
}

function calculateResult() {
  if (operator && firstNumber !== null) {
    secondNumber = parseFloat(equation.slice(equation.lastIndexOf(operator) + 1));
    let result;
    switch (operator) {
      case "+":
        result = firstNumber + secondNumber;
        break;
      case "-":
        result = firstNumber - secondNumber;
        break;
      case "*":
        result = firstNumber * secondNumber;
        break;
      case "/":
        result = firstNumber / secondNumber;
        break;
      case "%":
        result = firstNumber % secondNumber;
        break;
      default:
        result = "Invalid operation";
    }
    display.value = result;
    equation = result.toString();
    operator = null;
    firstNumber = null;
    secondNumber = null;
  }
}

document.querySelectorAll("input").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("operator")) {
      handleOperator(button.value);
    } else if (button.value === "=") {
      calculateResult();  
    } else {
      handleNumber(button.value);
    }
  });
});

document.getElementById("clearButton").addEventListener("click", function() {
  clearDisplay();
});

document.getElementById("backspace").addEventListener("click", function() {
  deleteLastEntry();
  updateDisplay(); 
});


