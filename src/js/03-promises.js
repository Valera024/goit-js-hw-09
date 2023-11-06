import Notiflix from 'notiflix';  

const form = document.querySelector(".form")
const inputDelay = document.querySelector("input[name='delay']")
const inputStep = document.querySelector("input[name='step']")
const inputAmount = document.querySelector("input[name='amount']")

form.addEventListener("submit", formPromise)

function formPromise(event) {
  event.preventDefault();
  const initialDelay = parseInt(inputDelay.value);
  const step = parseInt(inputStep.value);
  const amount = parseInt(inputAmount.value);

  for (let i = 0; i < amount; i += 1) {
    const delay = initialDelay + i * step;
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position + 1} in ${delay}ms`)
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position + 1} in ${delay}ms`)
      })
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
    if (shouldResolve) {
      // Fulfill
      resolve({ position, delay })
    } else {
      // Reject
      reject({ position, delay })
    }
    }, delay)
    })
}
