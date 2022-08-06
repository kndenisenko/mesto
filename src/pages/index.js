import './index.css' 

// note импорт переменных и функций
import { validatorConfig, initialCards } from "../scripts/const.js";

// note импорт классов
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js"
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from '../components/Api.js'

// выводим стандартные карточки с сервера через API
const defaultCards = new Api('https://mesto.nomoreparties.co/v1/cohort-46/cards');
defaultCards.getdefaultStuff().then(data => { 
  const section = new Section({items: data, renderer: createCard }, '.elements__container');
  section.renderItems();
})

// Выводим данные пользователя с сервера, через API
const defaultUser = new Api('https://mesto.nomoreparties.co/v1/cohort-46/users/me')
defaultUser.getdefaultStuff().then(data => {
  console.log(data.avatar)
  console.log(profileAvatar.style.backgroundImage)
  profileName.textContent = data.name
  profileAbout.textContent = data.about
  profileAvatar.style.backgroundImage = `url(${data.avatar})`
  console.log(profileAvatar.style.backgroundImage)
})

// обработчик сабмита попапа о юзере
const userChange = new Api('https://mesto.nomoreparties.co/v1/cohort-46/users/me');
const handleProfileFormSubmit = (data) => {
  const { usermane, occupation } = data
  // userInfo.setUserInfo(usermane, occupation)
  userChange.changeUser(usermane, occupation)
  .then(() => {
  profileName.textContent = usermane
  profileAbout.textContent = occupation
})
  editProfilePopup.close();
}

// обработчик сабмита попапа с добавлением картинки в том числе через апи
const handleCardFormSubmit = (data) => {
  const card = createCard({
    name: data.caption,
    link: data.src,
  }, '.elements__container' );
  console.log(data)
  newCardViaApi.addUserCard(data.caption, data.src)
  section.addItem(card);
  PopupAddCard.close();
}


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

// Переменные для блока инфы о юзере
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__occupation');
const profileAvatar = document.querySelector('.profile__avatar')

const newCardViaApi = new Api('https://mesto.nomoreparties.co/v1/cohort-46/cards');

// note функция, которая получает данные и создаёт карточку
const createCard = (data) => {
  const card = new Card(data, '#cardTemplate', () => { // #cardTemplate - шаблон для карточки в HTML
    imagePopup.open(data.name, data.link);
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
  PopupAddCard.open(); // открытие попапа
})




// подключаем валидацию
validatorForAddCardPopup.enableValidation();
validatorForEditUserInfoPopup.enableValidation();

// Вывод карточек через класс Section, добавление попапа с картинокй и активация попапов с инфой о юзере и добавлением карточки
const section = new Section({items: initialCards, renderer: createCard }, '.elements__container');
const imagePopup = new PopupWithImage('.popup_photobox');
const editProfilePopup = new PopupWithForm('.popup-profile', handleProfileFormSubmit);
const PopupAddCard = new PopupWithForm('.popup_addcard', handleCardFormSubmit);
const userInfo = new UserInfo ({userNameSelector: '.profile__name', occupationSelector: '.profile__occupation'});

imagePopup.setEventListeners();
editProfilePopup.setEventListeners();
PopupAddCard.setEventListeners();

// фига-фигак и в продакшн
//section.renderItems();