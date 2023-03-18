import Notiflix from 'notiflix';

const formEl = document.querySelector(".form");

formEl.addEventListener('submit', formSubmitHandler);

function formSubmitHandler(event) {
  event.preventDefault();

  const {elements: {delay, step, amount}} = event.currentTarget;
  let firstDelay = Number(delay.value);
  const stepDelay = Number(step.value);

  for (let i = 1; i <= amount.value; i += 1) {
    createPromise(i, firstDelay)
      .then(({position, delay}) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({position, delay}) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    firstDelay += stepDelay;
  }
  delay.value = '';
  step.value = '';
  amount.value = '';
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay);
  });
}