const RANDOM_QUOTE_API_URL = "Http://api.quotable.io/random";
const quoteDisplay = document.getElementById("quoteDispaly");
const quoteInput = document.getElementById("quoteInput");
const timerElemnt = document.getElementById("timer");
let currect = true;

quoteInput.addEventListener("input", () => {
  const arrayQuote = quoteDisplay.querySelectorAll("span");
  const arrayValue = quoteInput.value.split("");
  arrayQuote.forEach((charSpan, index) => {
    const charactor = arrayValue[index];
    if (charactor == null) {
      charSpan.classList.remove("correct");
      charSpan.classList.remove("incorrect");
      currect = false;
    } else if (charactor === charSpan.innerText) {
      charSpan.classList.add("correct");
      charSpan.classList.remove("incorrect");
      currect = true;
    } else {
      charSpan.classList.remove("correct");
      charSpan.classList.add("incorrect");
      currect = false;
    }
  });
  if (currect === true) {
    getNextQuote();
  }
});

getNextQuote();
async function RandomQuote() {
  const response = await fetch(RANDOM_QUOTE_API_URL);
  const data = await response.json();
  return data.content;
}
async function getNextQuote() {
  const quote = await RandomQuote();
  quoteDisplay.innerHTML = "";
  quote.split("").forEach((charactor) => {
    const charSpan = document.createElement("span");
    charSpan.innerText = charactor;
    quoteDisplay.appendChild(charSpan);
  });
  quoteInput.value = null;
  setTimer();
}
let startTime;
function setTimer() {
  timerElemnt.innerText = 0;
  startTime = new Date();
  setInterval(() => {
    timer.innerText = getTimerTime();
  }, 1000);
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
}
