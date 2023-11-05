const source = document.getElementById("source");
const result = document.getElementById("result");
let calls = 0;

const factorial = function (n) {
  calls++;
  if (n == 1) return 1;
  else return n * factorial(n - 1);
};

const inputHandler = function (number) {
  const n = number.target.value;
  const reg = new RegExp("[0-9]");
  if (reg.test(n) && n > 0 && n < 171) {
    let startTime = window.performance.now();
    result.innerHTML = "<br> result: " + factorial(n) + "<br> calls: " + calls;
    let elapsed = window.performance.now() - startTime;
    result.innerHTML += "<br> milliseconds: " + elapsed;
    startTime = 0;
    elapsed = 0;
  } else if (n == "") {
    result.innerHTML = "";
  } else result.innerHTML = "invalid";
  calls = 0;
};
source.addEventListener("input", inputHandler);
