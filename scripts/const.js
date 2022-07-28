//----------------------------------------------------------------------------------------------------------------------
// note mesto - спринт 7 и 8
// Константы и массив с исходными карточками
//----------------------------------------------------------------------------------------------------------------------

export const popupPhotoboxPicture = document.querySelector('.popup__photobox-image');
export const popupPhotoboxCaption = document.querySelector('.popup__photobox-caption');
export const popupPhotobox = document.querySelector('.popup_photobox');
export const ESC_KEYCODE = 27;

// note Массив исходных карточек
export const initialCards = [
  {
    name: 'Юлианехоб (какорто́к)',
    src: './images/006-Qaqortoq.jpg',
    alt: 'Юлианехоб, также известный как Какорто́к'
  },
  {
    name: 'Гренландия',
    src: './images/005-greenland.jpg',
    alt: 'Гренландия. здесь тоже был Фёдор Конюхов'
  },
  {
    name: 'Северный полюс',
    src: './images/004-north-pole.jpg',
    alt: 'северный полюс. главная точка экспедиции'
  },
  {
    name: 'Барнео',
    src: './images/003-barneo.jpg',
    alt: 'Барнео. база на северном полюсе'
  },
  {
    name: 'Лонгйир',
    src: './images/002_Longyearbyen.jpg',
    alt: 'Лонгйир, второй известный город на пути'
  },
  {
    name: 'Петрозаводск',
    src: './images/001_petrozavodsk.jpg',
    alt: 'Петрозаводск, начало экспедиции'
  }
];

// note Конфиг для валидатора
export const validatorConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type-error',
  errorClass: 'popup__error_visible'
}
