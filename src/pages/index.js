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
// Новое апи
import { api } from '../components/Api.js'

let userID; // Задаём пустой userID, который заменится на реальный ID. Для отображения кнопки Delete

// note поиск попапа изменения профиля, кнопок его открытия и закрытия и формы
const profilePopupOpenButton = document.querySelector('.profile__edit');

// note поиск полей имени и профессии в попапе
const nameField = document.getElementById('username-input');
const professionField = document.getElementById('occupation-input');
const newCardPopupOpen = document.querySelector('.profile__add-button'); // находим кнопку добавления карточки (открытия попапа)

// note переменные и классы для валидации
const popupAddCardForm = document.querySelector('.popup__addform');
const userInfoForm = document.querySelector('.popup__form_username');
const popupAddPhotoForm = document.querySelector('.popup__changephoto-input');
const validatorForAddCardPopup = new FormValidator(validatorConfig, popupAddCardForm);
const validatorForEditUserInfoPopup = new FormValidator(validatorConfig, userInfoForm);
const validatorForPhotoPopup = new FormValidator(validatorConfig, popupAddPhotoForm);

// подключаем валидацию
validatorForAddCardPopup.enableValidation();
validatorForEditUserInfoPopup.enableValidation();
validatorForPhotoPopup.enableValidation();

// Вставляем первоначальные данные пользователя и делаем это так, чтобы вся страница открылась сразу 
Promise.all([api.loadProfile(), api.loadInitialCards()])
.then(([loadProfile, loadInitialCards]) => { 
    userInfo.setUserInfo(loadProfile.name, loadProfile.about); // вставляем имя и профессию пользователя
    userInfo.setAvatar(loadProfile.avatar); // вставляем аватар
    userID = loadProfile._id; // задаём значение для переменной var
    section.renderItems(loadInitialCards, loadProfile._id); // рендеринг карточек
})
.catch((err)=>{ console.log(`Ошибка промисов ${err}`);
})


// note функция, которая получает данные и создаёт карточку
const createCard = (data, userID) => {
  const card = new Card(
    data, 
    '#cardTemplate', // #cardTemplate - шаблон для карточки в HTML
    () => {imagePopup.open(data.name, data.link)},
    userID, // стрелочная функция-обработчик клика по картинке в карточке
    // блок удаление карточки - начало
    // блок удаления карточки открывает попап и меняет слушателя его сабмита
    // новый слушатель сабмита запускает api удаления 
    // и удаляет карточку со страницы через класс card
    // затем попап закрывается 
    (id) => {
      popupDelete.open();
        popupDelete.takeaction(() => {
          api.deleteCard(id)
          .then(() => {
            card.handleDelete();
            popupDelete.close();
        })
      .catch((err) => console.log(`Ошибка удаления карточки ${err}`))
    })
    },
    // блок удаление карточки - окончание
    // --------------------------------------
    // блок установки-удаления лайка, начало
    (id) => {
      if (card.isLiked()) {
        api.deleteLike(id)
        .then((res) => {
          card.setLikes(res.likes);
        });
      } else {
        api
          .setLike(id)
          .then((res) => {
            card.setLikes(res.likes);
          })
          .catch((err) => console.log(`Ошибка по лайку: ${err}`));
      }
    }
    // блок установки-удаления лайка, окончание
  );
  return card.getCardElement(); 
}


// обработчик сабмита попапа с добавлением карточки юзером в том числе через апи
const handleCardFormSubmit = (data) => {
  popupAddCard .changeButtonText(true);  
  api
  .addnewCard(data.caption, data.src)
  .then((res) => {
    section.addUserItem(createCard(res, userID))
    popupAddCard .close();
  })
  .catch((err) => console.log(`Ошибка добавления карточки: ${err}`))
  .finally(() => {
    popupAddCard .changeButtonText(false)
  });
}

// обработчик сабмита попапа о юзере
const handleProfileFormSubmit = (data) => {
  const { usermane, occupation } = data;
  editProfilePopup.changeButtonText(true);
  api
  .editProfile(usermane, occupation)
  .then((res) => {
  userInfo.setUserInfo(res.name, res.about);
  editProfilePopup.close();
})
.catch((err) => console.log(`Ошибка редактирования профиля: ${err}`))
.finally(() => {
  editProfilePopup.changeButtonText(false);
});
  
}

// Вывод карточек через класс Section, добавление попапа с картинокй и активация попапов с инфой о юзере и добавлением карточки
const section = new Section({
  initialCards,
    renderer: (item) => section.addFirstItems(createCard(item, userID)),
  },
'.elements__container'
);

const imagePopup = new PopupWithImage('.popup_photobox');
const editProfilePopup = new PopupWithForm('.popup-profile', handleProfileFormSubmit);
const userPhotoPopup = new PopupWithForm('.popup_changephoto', changePhoto); //  Подключаем попап к классу
const popupAddCard  = new PopupWithForm('.popup_addcard', handleCardFormSubmit);
const userInfo = new UserInfo ({userNameSelector: '.profile__name', occupationSelector: '.profile__occupation', avatarSelector: '.profile__avatar'});
const popupDelete = new PopupWithForm('.popup_deleteCard'); // поиск попапа для обработки сабмита
const userPhotoPopupSelector = document.querySelector('.profile__avatar')  //  Элемент, который открывает попап смены фотки юзера

imagePopup.setEventListeners();
editProfilePopup.setEventListeners();
popupAddCard .setEventListeners();
userPhotoPopup.setEventListeners();
popupDelete.setEventListeners();

// обработчик клика попапа: изменения фотки юзера на сервере и на странице 
function changePhoto(data) {
  userPhotoPopup.changeButtonText(true)
  api
  .editAvatar(data["avatar-input"]) // вытаскиваем ссылку на новый ававатр из data
  .then((res) => {
    userInfo.setAvatar(res.avatar)
  userPhotoPopup.close();
})
.catch((err) => console.log(`Ошибка изменения аватара профиля: ${err}`))
.finally(() => {
  userPhotoPopup.changeButtonText(false);
});
// profileAvatar.style.backgroundImage = `url(${avatarField.value})`
}

// Обработчик открытия попапа смены фотки юзера
userPhotoPopupSelector.addEventListener('click', () => {
  userPhotoPopup.open()
})

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
  popupAddCard.open(); // открытие попапа
})