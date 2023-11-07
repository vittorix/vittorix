const box = document.getElementById("box");
const inputNumber = document.getElementById("inputNumber");
const result = document.getElementById("result");
const error = document.getElementById("error");
const details = document.getElementById("details");
const buttonMinus = document.getElementById("buttonMinus");
const buttonPlus = document.getElementById("buttonPlus");
buttonMinus.disabled = true;
let calls = 0;

const factorial = function (n) {
  calls++;
  if (n == 1) return 1;
  else return n * factorial(n - 1);
};

// avoit entering or pasting of exponential numbers, negative numbers and decimal numbers
// e.g. 1e1 = 10, -2, 3.1 would all be accepted in the input type number
// also prevents the pasting of numbers > 170
const beforeinputHandler = function (event) {
  if (event.data) {
    const char = event.data.toLowerCase();
    if (
      char.indexOf(".") > -1 ||
      char.indexOf("e") > -1 ||
      char.indexOf("-") > -1 ||
      event.data > 170
    ) {
      event.preventDefault();
    }
  }
};

const evaluate = function (number) {
  const n = number.target == undefined ? number : number.target.value;
  const reg = new RegExp("[0-9]");
  error.style.visibility = false;

  if (reg.test(n) && n > 0 && n < 171) {
    let startTime = window.performance.now();
    let calculaterFactorial = factorial(n);
    let elapsed = window.performance.now() - startTime;

    result.innerHTML =
      "<br> " + parseFloat(n + "", 10) + "! = " + calculaterFactorial;
    details.innerHTML = "<br> recursive calls: " + calls;
    details.innerHTML += "<br> milliseconds: " + elapsed;
    error.innerHTML = "";
    startTime = 0;
    elapsed = 0;
  } else if (n == "") {
    result.innerHTML = "";
    details.innerHTML = "";
    error.innerHTML = "";
  } else {
    result.innerHTML = "";
    error.innerHTML = "<br>please enter a number between 1 and 170";
    details.innerHTML = "";
    error.style.visibility = true;
  }
  calls = 0;

  n < 2 ? (buttonMinus.disabled = true) : (buttonMinus.disabled = false);
  n > 169 ? (buttonPlus.disabled = true) : (buttonPlus.disabled = false);
};

const inputHandler = function (event) {
  evaluate(event);
};

const buttonMinusHandler = function (event) {
  inputNumber.value = Number(inputNumber.value) - 1;
  evaluate(inputNumber.value);
};

const buttonPlusHandler = function (event) {
  inputNumber.value = Number(inputNumber.value) + 1;
  evaluate(inputNumber.value);
};

inputNumber.addEventListener("beforeinput", beforeinputHandler);
inputNumber.addEventListener("input", inputHandler);
buttonMinus.addEventListener("click", buttonMinusHandler);
buttonPlus.addEventListener("click", buttonPlusHandler);
