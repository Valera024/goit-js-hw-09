const startBtn = document.querySelector("button[data-start]")
const stopBtn = document.querySelector("button[data-stop]")
const body = document.querySelector("body")
let timerId;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

stopBtn.disabled = true ;

const handleStart = function () {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    body.style.backgroundColor = getRandomHexColor();
    timerId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000)
} 

const handleStop = function () {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    clearInterval(timerId);
}

startBtn.addEventListener("click", handleStart);
stopBtn.addEventListener("click", handleStop)