//----------------------------------------------------------------------------------------------------------------------
// mesto - спринт 7 и 8
// Константы и массив с исходными карточками
//----------------------------------------------------------------------------------------------------------------------


export const popupPhotoboxPicture = document.querySelector('.popup__photobox-image');
export const popupPhotoboxCaption = document.querySelector('.popup__photobox-caption');
export const popupPhotobox = document.querySelector('.popup_photobox');

// Массив исходных карточек. Стал пустым после перехода на api
export const initialCards = [];

// Конфиг для валидатора
export const validatorConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type-error',
  errorClass: 'popup__error_visible'
}
