const currencyEleOne = document.getElementById("currency-one");
const amountEleOne = document.getElementById("amount-one");
const currencyEleTwo = document.getElementById("currency-two");
const amountEleTwo = document.getElementById("amount-two");

const rateEle = document.getElementById("rate");
const swap = document.getElementById("swap");

function calculate() {
  const currencyOne = currencyEleOne.value;
  const currencyTwo = currencyEleTwo.value;

  fetch("https://open.exchangerate-api.com/v6/latest")
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[currencyTwo] / data.rates[currencyOne];
      rateEle.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;
      amountEleTwo.value = (amountEleOne.value * rate).toFixed(2);
    });
}

currencyEleOne.addEventListener("change", calculate);
amountEleOne.addEventListener("input", calculate);
currencyEleTwo.addEventListener("change", calculate);
amountEleTwo.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const temp = currencyEleOne.value;
  currencyEleOne.value = currencyEleTwo.value;
  currencyEleTwo.value = temp;
  calculate();
});

calculate();
