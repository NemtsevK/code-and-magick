import {SIMILAR_WIZARD_COUNT, DefaultColor} from './const.js';

const similarElement = document.querySelector('.setup__similar');
const similarListElement = similarElement.querySelector('.setup__similar-list');
const similarWizardTemplate = document.querySelector('#setup__wizard-template')
  .content
  .querySelector('.setup__similar-item');

const getWizardRank = (wizard) => {
  const coatColorInput = document.querySelector('[name="coat-color"]');
  const eyesColorInput = document.querySelector('[name="eyes-color"]');

  let rank = 0;

  if (wizard.colorCoat === (coatColorInput.value || DefaultColor.COAT_COLOR)) {
    rank += 2;
  }
  if (wizard.colorEyes === (eyesColorInput.value || DefaultColor.EYES_COLOR)) {
    rank += 1;
  }

  return rank;
};

const compareWizards = (wizardA, wizardB) => {
  const rankA = getWizardRank(wizardA);
  const rankB = getWizardRank(wizardB);

  return rankB - rankA;
};

const renderSimilarList = (similarWizards) => {
  const similarListFragment = document.createDocumentFragment();

  similarWizards
    .slice()
    .sort(compareWizards)
    .slice(0, SIMILAR_WIZARD_COUNT)
    .forEach(({ name, colorCoat, colorEyes }) => {
      const wizardElement = similarWizardTemplate.cloneNode(true);
      wizardElement.querySelector('.setup__similar-label').textContent = name;
      wizardElement.querySelector('.wizard-coat').style.fill = colorCoat;
      wizardElement.querySelector('.wizard-eyes').style.fill = colorEyes;
      similarListFragment.appendChild(wizardElement);
    });

  similarListElement.innerHTML = '';
  similarListElement.appendChild(similarListFragment);
  similarElement.classList.remove('hidden');
};

export { renderSimilarList };
