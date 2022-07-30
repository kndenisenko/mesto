//----------------------------------------------------------------------------------------------------------------------
// note mesto - спринт 7 и 8
// Константы и массив с исходными карточками
//----------------------------------------------------------------------------------------------------------------------

import image1 from '../images/001_petrozavodsk.jpg'
import image2 from '../images/002_Longyearbyen.jpg'
import image3 from '../images/003-barneo.jpg'
import image4 from '../images/004-north-pole.jpg'
import image5 from '../images/005-greenland.jpg'
import image6 from '../images/006-Qaqortoq.jpg'


export const popupPhotoboxPicture = document.querySelector('.popup__photobox-image');
export const popupPhotoboxCaption = document.querySelector('.popup__photobox-caption');
export const popupPhotobox = document.querySelector('.popup_photobox');
export const ESC_KEYCODE = 27;

// note Массив исходных карточек
export const initialCards = [
  // {
  //   name: 'Юлианехоб (какорто́к)',
  //   src: './images/006-Qaqortoq.jpg',
  //   alt: 'Юлианехоб, также известный как Какорто́к'
  // },
  {
    name: 'Юлианехоб (какорто́к)',
    src: image6,
    alt: 'Юлианехоб, также известный как Какорто́к'
  },
  {
    name: 'Гренландия',
    src: image5,
    alt: 'Гренландия. здесь тоже был Фёдор Конюхов'
  },
  {
    name: 'Северный полюс',
    src: image4,
    alt: 'северный полюс. главная точка экспедиции'
  },
  {
    name: 'Барнео',
    src: image3,
    alt: 'Барнео. база на северном полюсе'
  },
  {
    name: 'Лонгйир',
    src: image2,
    alt: 'Лонгйир, второй известный город на пути'
  },
  {
    name: 'Петрозаводск',
    src: image1,
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
