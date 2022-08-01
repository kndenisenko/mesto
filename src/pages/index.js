import './index.css' 

// note импорт переменных и функций
import { validatorConfig, initialCards } from "../scripts/const.js";

// note импорт классов
import { FormValidator } from "../scripts/formValidator.js";
import { Card } from "../scripts/card.js";
import { Section } from "../scripts/section.js"
import { PopupWithImage } from "../scripts/popupWithImage.js";
import { PopupWithForm } from "../scripts/popupWithForm.js";
import { UserInfo } from "../scripts/userInfo.js";

// note поиск попапа изменения профиля, кнопок его открытия и закрытия и формы
const profilePopupOpenButton = document.querySelector('.profile__edit');

// note поиск полей имени и профессии в попапе
const nameField = document.getElementById('username-input');
const professionField = document.getElementById('occupation-input');

const newCardPopupOpen = document.querySelector('.profile__add-button'); // находим кнопку добавления карточки (открытия попапа)

// note переменные и классы для валидации
const popupAddCardForm = document.querySelector('.popup__addform');
const userInfoForm = document.querySelector('.popup__form_username')

const validatorForAddCardPopup = new FormValidator(validatorConfig, popupAddCardForm);
const validatorForEditUserInfoPopup = new FormValidator(validatorConfig, userInfoForm);

// note функция, которая получает данные и создаёт карточку
function createCard(data) {
  const card = new Card(data, '#cardTemplate', () => { // #cardTemplate - шаблон для карточки в HTML
    imagePopup.open(data.name, data.src);
  });
  return card.getCardElement(); 
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
  validatorForAddCardPopup.resetValidation(); // сброс ошибок валидации, если есть
  addCardPopup.open(); // открытие попапа
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
  }, '.elements__container' );
  section.addItem(card);
  addCardPopup.close();
}

// подключаем валидацию
validatorForAddCardPopup.enableValidation();
validatorForEditUserInfoPopup.enableValidation();

// Вывод карточек через класс Section, добавление попапа с картинокй и активация попапов с инфой о юзере и добавлением карточки
const section = new Section({items: initialCards, renderer: createCard }, '.elements__container');
const imagePopup = new PopupWithImage('.popup_photobox');
const editProfilePopup = new PopupWithForm('.popup-profile', handleProfileFormSubmit);
const addCardPopup = new PopupWithForm('.popup_addcard', handleCardFormSubmit);
const userInfo = new UserInfo ({userNameSelector: '.profile__name', occupationSelector: '.profile__occupation'});

imagePopup.setEventListeners();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();

// фига-фигак и в продакшн
section.renderItems();