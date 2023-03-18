import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const inputEl = document.querySelector("#datetime-picker");
const startBtn = document.querySelector('button[data-start]');
const day = document.querySelector('[data-days]');
const hour = document.querySelector('[data-hours]');
const min = document.querySelector('[data-minutes]');
const sec = document.querySelector('[data-seconds]');
let timerId = null;

startBtn.setAttribute('disabled', 'true');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.removeAttribute('disabled');
      Notiflix.Notify.success('Lets start the timer!');
    }
  },
};
flatpickr(inputEl, options);

startBtn.addEventListener('click', timeCountHandler);

function timeCountHandler() {
  startBtn.setAttribute('disabled', 'true');
  inputEl.setAttribute('disabled', 'true');
  timerId = setInterval(() => {
    const selectedDate = new Date(inputEl.value);
    const timeToFinish = selectedDate - Date.now();
    const {days, hours, minutes, seconds} = convertMs(timeToFinish);

    day.textContent = addLeadingZero(days);
    hour.textContent = addLeadingZero(hours);
    min.textContent = addLeadingZero(minutes);
    sec.textContent = addLeadingZero(seconds);

    if (timeToFinish < 1000) {
      clearInterval(timerId);
      inputEl.removeAttribute('disabled');
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return {days, hours, minutes, seconds};
}

function addLeadingZero(value) {
  return `${value}`.padStart(2, '0');
}
