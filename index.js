const allClearBtn = document.querySelector(".clear");
const bracketsBtn = document.querySelector(".bracket");
const percentBtn = document.querySelector(".mod");
const divideBtn = document.querySelector(".divide");
const mulBtn = document.querySelector(".multiply");
const subBtn = document.querySelector(".subtract");
const addBtn = document.querySelector(".add");
const signInvertBtn = document.querySelector(".signInvert");
const equalBtn = document.querySelector(".equal");
const resultText = document.querySelector("#result");
const numberBtn = document.querySelectorAll(".num");
const symbolBtn = document.querySelectorAll(".symbol");
const decimalBtn = document.querySelector(".point");

// variable declaration and initialization
let result = "";
let operation = "";
let prevOperand = 0;
let leftParenthesisCount = 0;

// function to append the numbers
const appendNumber = (number) => {
  if (number == "." && result.includes(".")) return;
  result += number;
  updateDisplay();
};

const updateDisplay = () => {
  if (operation) {
    resultText.innerText = `${prevOperand} ${operation} ${result}`;
  } else {
    resultText.innerText = result;
  }
};

const selectOperator = (operatorValue) => {
  if (result === "") return;

  if (operation != "" && prevOperand != "") {
    calculateResult();
  }

  operation = operatorValue;
  prevOperand = result;
  result = "";
  updateDisplay();
};

//Calculate function
const calculateResult = () => {
  let evalResult;
  const prev = parseFloat(prevOperand);
  const current = parseFloat(result);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case "+":
      evalResult = prev + current;
      break;
    case "-":
      evalResult = prev - current;
      break;
    case "*":
      evalResult = prev * current;
      break;
    case "/":
      evalResult = prev / current;
      break;
    default:
      return;
  }

  result = evalResult.toString();
  operation = "";
  prevOperand = "";
};

// add buttons to result pane
numberBtn.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.innerText);
    // console.log(button.innerHTML);
  });
});

const clearDisplay = () => {
  result = "";
  prevOperand = "";
  operation = "";
  updateDisplay();
};

decimalBtn.addEventListener("click", () => appendNumber("."));
addBtn.addEventListener("click", () => selectOperator("+"));
subBtn.addEventListener("click", () => selectOperator("-"));
mulBtn.addEventListener("click", () => selectOperator("*"));
divideBtn.addEventListener("click", () => selectOperator("/"));
equalBtn.addEventListener("click", () => {
  if (result === "") return;
  calculateResult();
  updateDisplay();
});

allClearBtn.addEventListener("click", clearDisplay);
signInvertBtn.addEventListener("click", () => {
  const currentNumber = parseFloat(resultText.innerText);
  console.log(currentNumber);
  // console.log(resultText.innerText);
  resultText.innerText = (-currentNumber).toString();
});

percentBtn.addEventListener("click", () => {
  const currentNumber = parseFloat(resultText.innerText);
  resultText.innerText = (currentNumber / 100).toString();
});

bracketsBtn.addEventListener("click", () => {
  if (leftParenthesisCount % 2 === 0) {
    resultText.innerText += "(";
    leftParenthesisCount++;
  } else {
    const displayValue = resultText.innerText;
    resultText.innerText = displayValue.slice(0, -1) + ")";
    leftParenthesisCount++;
  }
});
