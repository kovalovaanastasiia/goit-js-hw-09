const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let colorChangeTimer = null;

startBtn.addEventListener('click', startChangeBodyColor);
stopBtn.addEventListener('click', stopChangeBodyColor);

disableStopBtn()

function startChangeBodyColor() {
  startBtn.setAttribute('disabled', 'true');
  stopBtn.removeAttribute('disabled');
  document.body.style.backgroundColor = getRandomHexColor();
  colorChangeTimer = setTimeout(startChangeBodyColor, 1000);
}

function stopChangeBodyColor() {
  disableStopBtn()
  clearInterval(colorChangeTimer);
  startBtn.removeAttribute('disabled');
}

function disableStopBtn() {
  stopBtn.setAttribute('disabled', 'true');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}