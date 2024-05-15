import { showAlert, getRandomArrayElement } from './util.js';
import { sendData } from './api.js';
import { Color, SubmitButtonText } from './const.js';

const wizardForm = document.querySelector('.setup-wizard-form');
const fireballColorElement = wizardForm.querySelector('.setup__fireball-wrap');
const eyesColorElement = wizardForm.querySelector('.wizard-eyes');
const coatColorElement = wizardForm.querySelector('.wizard-coat');
const fireballColorInput = wizardForm.querySelector('[name="fireball-color"]');
const eyesColorInput = wizardForm.querySelector('[name="eyes-color"]');
const coatColorInput = wizardForm.querySelector('[name="coat-color"]');
const submitButton = wizardForm.querySelector('.setup__submit');

fireballColorElement.addEventListener('click', (event) => {
  const randomColor = getRandomArrayElement(Color.FIREBALLS);
  event.target.style.backgroundColor = randomColor;
  fireballColorInput.value = randomColor;
});

const setEyesClick = (cb) => {
  eyesColorElement.addEventListener('click', (event) => {
    const randomColor = getRandomArrayElement(Color.EYES);
    event.target.style.fill = randomColor;
    eyesColorInput.value = randomColor;
    cb();
  });
};

const setCoatClick = (cb) => {
  coatColorElement.addEventListener('click', (event) => {
    const randomColor = getRandomArrayElement(Color.COATS);
    event.target.style.fill = randomColor;
    coatColorInput.value = randomColor;
    cb();
  });
};

const pristine = new Pristine(wizardForm, {
  classTo: 'setup__user-name',
  errorTextParent: 'setup__user-name',
  errorTextClass: 'setup__user-name-error',
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const setUserFormSubmit = (onSuccess) => {
  wizardForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(event.target))
        .then(onSuccess)
        .catch(
          (error) => {
            showAlert(error.message);
          }
        )
        .finally(unblockSubmitButton);
    }
  });
};

export { setUserFormSubmit, setEyesClick, setCoatClick };
