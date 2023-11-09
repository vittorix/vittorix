import * as UTIL from "./util.js";
const box = document.getElementById("box");
const inputNumber = document.getElementById("inputNumber");
const result = document.getElementById("result");
const error = document.getElementById("error");
const details = document.getElementById("details");
const buttonMinus = document.getElementById("buttonMinus");
const buttonPlus = document.getElementById("buttonPlus");
let buttonCopy = document.getElementById("buttonCopy");
const isNumericRegex = new RegExp("^[0-9]+$");
let calls = 0;

buttonMinus.disabled = true;

window.onload = function () {
  inputNumber.focus();
};

const factorial = function (n) {
  calls++;
  if (n == 1) return 1;
  else return n * factorial(n - 1);
};

const evaluate = function (number) {
  let n = number.target == undefined ? number : number.target.value;
  if (n > 170) {
    n = 170;
    inputNumber.value = 170;
  }

  error.style.visibility = false;

  if (isNumericRegex.test(n) && n > 0 && n < 171) {
    let startTime = window.performance.now();
    let calculatedFactorial = factorial(n);
    let elapsed = window.performance.now() - startTime;

    result.innerHTML =
      "<br> " + parseFloat(n + "", 10) + "! = " + calculatedFactorial;
    buttonCopy.hidden = false;
    details.innerHTML = "<br> recursive calls: " + calls;
    details.innerHTML += "<br> milliseconds: " + elapsed;
    error.innerHTML = "";
    startTime = 0;
    elapsed = 0;
  } else if (n == "") {
    buttonCopy.hidden = true;
    result.innerHTML = "";
    details.innerHTML = "";
    error.innerHTML = "";
  } else {
    buttonCopy.hidden = true;
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
  if (!isNumericRegex.test(inputNumber.value))
    inputNumber.value = (inputNumber.value + "").replace(/\D/g, "");
  if (inputNumber.value < 1) inputNumber.value = "";
  evaluate(event);
};

const buttonMinusHandler = function (event) {
  inputNumber.value =
    Number(inputNumber.value) > 170 ? 170 : Number(inputNumber.value) - 1;
  evaluate(inputNumber.value);
};

const buttonPlusHandler = function (event) {
  inputNumber.value = Number(inputNumber.value) + 1;
  evaluate(inputNumber.value);
};

const buttonCopyHandler = function (event) {
  let resultValue = result.innerHTML
    .substring(result.innerHTML.indexOf("=") + 1)
    .trim();
  UTIL.writeToClipboard(resultValue);
};

inputNumber.addEventListener("input", inputHandler);
buttonMinus.addEventListener("click", buttonMinusHandler);
buttonPlus.addEventListener("click", buttonPlusHandler);
buttonCopy.addEventListener("click", buttonCopyHandler);
