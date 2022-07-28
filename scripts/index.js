// note импорт переменных и функций
import { validatorConfig, initialCards, popupPhotobox } from "./const.js";

// note импорт классов
import { FormValidator } from "./formValidator.js";
import { Card } from "./card.js";
import { Section } from "./section.js"
import { popupWithImage } from "./popupWithImage.js";
import { popupWithForm } from "./popupWithForm.js";
import { UserInfo } from "./userInfo.js";

// note поиск попапа изменения профиля, кнопок его открытия и закрытия и формы
const profilePopupOpenButton = document.querySelector('.profile__edit');

// note поиск полей имени и профессии в попапе
const nameField = document.getElementById('username-input');
const professionField = document.getElementById('occupation-input');

const newCardPopupOpen = document.querySelector('.profile__add-button'); // находим кнопку добавления карточки (открытия попапа)

// note переменные и классы для валидации
const addCardForm = document.querySelector('.popup__addform');
const userInfoForm = document.querySelector('.popup__form_username')

const addCardValidator = new FormValidator(validatorConfig, addCardForm);
const editProfileValidator = new FormValidator(validatorConfig, userInfoForm);

// note место, куда клонируем темплейт карточки
const cloneTarget = document.querySelector('.elements__container');

// note функция, которая получает данные и создаёт карточку
function createCard(data, cloneTarget) {
  const card = new Card(data, '#cardTemplate', () => { // #cardTemplate - шаблон для карточки в HTML
    console.log('123')
    imagePopup.open(data.name, data.src);
  }); 
  const markup = card.getCardElement();
  cloneTarget.prepend(markup);
}

// note обработчики нажатий для попапа с изменением информации о пользователе
profilePopupOpenButton.addEventListener('click', () => {
  const {name, profession} = userInfo.getUserInfo();
  nameField.value = name;
  professionField.value = profession;
  editProfilePopup.open();
});

// note обработчики нажатий открытия и закрытия попапа добавления карточки
newCardPopupOpen.addEventListener('click', () => { // открытие попапа добавления карточки
  addCardPopup.open();
})

// обработчик открытия попапа с инфой о юзере
const handleProfileFormSubmit = (data) => {
  const { usermane, occupation } = data
  userInfo.setUserInfo(usermane, occupation)
  editProfilePopup.close();
}

// обработчик открытия попапа с добавлением картинки
const handleCardFormSubmit = (data) => {
  const card = createCard({
    name: data.caption,
    src: data.src,
  }, cloneTarget );
  section.addItem(card);
  addCardPopup.close();
}

// подключаем валидацию
addCardValidator.enableValidation();
editProfileValidator.enableValidation();


// Вывод карточек через класс Section, добавление попапа с картинокй и активация попапов с инфой о юзере и добавлением карточки
const section = new Section({items: initialCards, renderer: createCard }, cloneTarget);
const imagePopup = new popupWithImage('.popup_photobox');
const editProfilePopup = new popupWithForm('.popup-profile', handleProfileFormSubmit);
const addCardPopup = new popupWithForm('.popup_addcard', handleCardFormSubmit);
const userInfo = new UserInfo ({userNameSelector: '.profile__name', occupationSelector: '.profile__occupation'});

imagePopup.setEventListeners();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();

// фига-фигак и в продакшен
section.renderItems();