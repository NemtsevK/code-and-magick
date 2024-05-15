import { FILE_TYPES } from './const.js';

const fileChooser = document.querySelector('.setup__upload-input');
const preview = document.querySelector('.setup__upload-image');

const onSetupUploadChange = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
};

fileChooser.addEventListener('change', onSetupUploadChange);
