const calcTyped = document.getElementById("calc-typed");
const calcResult = document.getElementById("calc-result");

calcTyped.innerText = "0";
calcResult.innerText = "0";

let firstNumber = null;
let operator = null;
let secondNumber = null;

function handleNumbers(number) {
  if (calcTyped.innerText === "0") {
    calcTyped.innerText = number;
  } else {
    calcTyped.innerText += number;
  }
}

function clearDisplay() {
  calcTyped.innerText = "0";
  calcResult.innerText = "0";
  firstNumber = null;
  operator = null;
  secondNumber = null;
}

function backspace() {
  calcTyped.innerText = calcTyped.innerText.slice(0, -1);
  if (calcTyped.innerText === "") {
    calcTyped.innerText = "0";
  }
}

function handleOperators(op) {
  if (operator === null) {
    firstNumber = parseFloat(calcTyped.innerText);
    operator = op;
    calcTyped.innerText += op;
  } else {
    calcTyped.innerText = calcTyped.innerText.slice(0, -1) + op;
    operator = op;
  }
}

function calculateResult() {
  if (operator && firstNumber !== null) {
    secondNumber = parseFloat(calcTyped.innerText.slice(calcTyped.innerText.lastIndexOf(operator) + 1));
    let result;

    if (operator === "+") {
      result = firstNumber + secondNumber;
    } else if (operator === "-") {
      result = firstNumber - secondNumber;
    } else if (operator === "*") {
      result = firstNumber * secondNumber;
    } else if (operator === "/") {
      result = firstNumber / secondNumber;
    } else if (operator === "%") {
      result = firstNumber % secondNumber;
    } else {
      result = "Invalid operation";
    }

    calcResult.innerText = result;
    calcResult.innerText = result.toString();
    operator = null;
    firstNumber = null;
    secondNumber = null;
  }
}

document.querySelectorAll("input").forEach((button) => { 
  button.addEventListener("click", () => {
    if (button.classList.contains("operator")) {
      handleOperators(button.value);
    } else if (button.value === "=") {
      calculateResult();  
    } else if (button.value === "AC") {
      clearDisplay();
    } else if (button.value === "DE") {
      backspace();
    } else {
      handleNumbers(button.value);
    }
  });
});

