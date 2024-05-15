import { isEscapeKey, isEnterKey } from './util.js';

const userModalElement = document.querySelector('.setup');
const userModalOpenElement = document.querySelector('.setup-open');
const userModalCloseElement = userModalElement.querySelector('.setup__close');

const onDocumentKeydown = (event) => {
  if (isEscapeKey(event)) {
    event.preventDefault();
    closeUserModal();
  }
};

function openUserModal() {
  userModalElement.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeUserModal() {
  userModalElement.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
}

userModalOpenElement.addEventListener('click', () => {
  openUserModal();
});

userModalOpenElement.addEventListener('keydown', (event) => {
  if (isEnterKey(event)) {
    openUserModal();
  }
});

userModalCloseElement.addEventListener('click', () => {
  closeUserModal();
});

userModalCloseElement.addEventListener('keydown', (event) => {
  if (isEnterKey(event)) {
    closeUserModal();
  }
});

export { openUserModal, closeUserModal };
