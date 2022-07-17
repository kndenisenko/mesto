// note импорт переменных и функций
import { validatorConfig, initialCards, popupPhotobox } from "./const.js";
import { openModalWindow, closePopup, } from "./utils.js";

// note импорт классов
import { FormValidator } from "./formValidator.js";
import { Card } from "./card.js";

// note поиск попапа изменения профиля, кнопок его открытия и закрытия и формы
const profilePopup = document.querySelector('.popup-profile');
const profilePopupOpenButton = document.querySelector('.profile__edit');
const profilePopupClose = document.querySelector('.popup__close-button');
const profilePopupForm = document.querySelector('.popup__form');

// note поиск имени и профессии в HTML-разметке
const username = document.querySelector('.profile__name');
const occupation = document.querySelector('.profile__occupation');

// note поиск полей имени и профессии в попапе
const nameField = document.getElementById('username-input');
const occupationField = document.getElementById('occupation-input');

// note Кнопка закрытия фотобокса
const popupPhotoboxClose = document.querySelector('.popup__photobox-close');

// note попап с добавлением новой карточки
const newCardPopup = document.querySelector('.popup_addcard'); // Находим попап добавления карточки в разметке
const newCardPopupOpen = document.querySelector('.profile__add-button'); // находим кнопку добавления карточки (открытия попапа)
const newCardPopupClose = document.querySelector('.popup__close-button_add'); // кнопка закрытия попапа с новой карточкой
const newCardName = document.querySelector('.popup__input-caption'); // берём заголовок для карточки из поля
const newCardSrc = document.querySelector('.popup__input-src'); // берём ссылку для карточки из поля

// note переменные и классы для валидации
const addCardForm = document.querySelector('.popup__addform');
const userInfoForm = document.querySelector('.popup__form_username')

const addCardValidator = new FormValidator(validatorConfig, addCardForm);
const editProfileValidator = new FormValidator(validatorConfig, userInfoForm);

// note место, куда клонируем темплейт карточки
const cloneTarget = document.querySelector('.elements__container');

// note функция, которая получает данные и создаёт карточку
function createCard(data, cloneTarget) {
  const card = new Card(data, '#cardTemplate');
  const markup = card.getCardElement();
  cloneTarget.prepend(markup);
}

// note Рендер первых 6 карточек
initialCards.forEach((data) => {
  createCard(data, cloneTarget);
})

// note добавление новой карточки пользователем
function addUserCard (evt) {
  evt.preventDefault();

  const newCard = { // создаём массив для будущей карточки, данные берутся из формы
    name: newCardName.value,
    src: newCardSrc.value,
  };

  renderAdditionalCard(newCard); // рендер карточки
  closePopup(newCardPopup); // закрытие попапа
  addCardForm.reset(); // очистка полей ввода формы через reset()

  // Делаем кнопку сабмита неактивной совсем (закомемнтировано для код-ревью от 26.06.2022)
  // const popupButtondisabled = newCardPopup.querySelector('.popup__button');
  // popupButtondisabled.disableSubmitButton; // используем метод disableSubmitButton из formValidator.js
  // popupButtondisabled.classList.add('popup__button_disabled');
}

// note Рендер дополнительной, пользовательской карточки, через функцию createCard
function renderAdditionalCard(data) {
  createCard(data, cloneTarget);
}

// note обработчики нажатий для попапа с изменением информации о пользователе
profilePopupOpenButton.addEventListener('click', () => {
  nameField.value = username.textContent;
  occupationField.value = occupation.textContent;
  openModalWindow(profilePopup);
});
profilePopupClose.addEventListener('click', () => {
  closePopup(profilePopup)
});
profilePopupForm.addEventListener('submit', evt => {
  evt.preventDefault();
  username.textContent = nameField.value;
  occupation.textContent = occupationField.value;
  closePopup(profilePopup);
});

// note Обработчик нажатия на клавишу закрытия попапа с большой картинкой
popupPhotoboxClose.addEventListener('click', () => { // Закрытие попапа
  closePopup(popupPhotobox);
});

newCardPopup.addEventListener('submit', addUserCard); // вызов функции создания новой карточки по кнопке submit

// note обработчики нажатий открытия и закрытия попапа добавления карточки
newCardPopupOpen.addEventListener('click', () => { // открытие попапа добавления карточки
  openModalWindow(newCardPopup);
})
newCardPopupClose.addEventListener('click', () => { // закрытие попапа добавления карточки
  closePopup(newCardPopup);
})

addCardValidator.enableValidation();
editProfileValidator.enableValidation();
