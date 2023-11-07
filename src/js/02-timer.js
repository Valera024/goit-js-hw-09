import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const input = document.querySelector("#datetime-picker")
const startBtn = document.querySelector("button[data-start]")
const spanDays = document.querySelector("span[data-days]")
const spanHours = document.querySelector("span[data-hours]")
const spanMinutes = document.querySelector("span[data-minutes]")
const spanSeconds = document.querySelector("span[data-seconds]")

startBtn.disabled = true;
const today = new Date();
let selectedDate;
let timerId;

startBtn.addEventListener("click", () => {
    timerId = setInterval(() => {
        const today = new Date();
        console.log("1")
        if(selectedDate - today.getTime() > 0) {
        const {days, hours, minutes, seconds} = convertMs(selectedDate - today.getTime())
        spanDays.textContent = addLeadingZero(days); 
        spanHours.textContent = addLeadingZero(hours);
        spanMinutes.textContent = addLeadingZero(minutes);
            spanSeconds.textContent = addLeadingZero(seconds);
        }
        else {
            clearInterval(timerId)
        }
    }, 1000)
})

flatpickr(input, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectedDate = selectedDates[0].getTime()
        console.log(selectedDates[0]);
        if (selectedDates[0].getTime() < today.getTime()) {
            Notiflix.Notify.failure("Please choose a date in the future")
        }
        else {
            startBtn.disabled = false;
        }
    },
});

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour)
    const minutes = Math.floor(((ms % day) % hour) / minute)
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return {days, hours, minutes, seconds}
}

function addLeadingZero(value) {
    return value < 10 ? `0${value}` : value;
}