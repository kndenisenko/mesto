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

// Переменные для блока инфы о юзере
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__occupation');
const profileAvatar = document.querySelector('.profile__avatar')

// Получаем и вставляем на страницу данные пользователя. С сервера через API
api.loadProfile()
.then(data => {
  profileName.textContent = data.name;
  profileAbout.textContent = data.about;
  userID = (data._id) ;
  profileAvatar.style.backgroundImage = `url(${data.avatar})`;
})
.catch((err) => console.log(`Ошибка вставки данных пользователя ${err}`));


// выводим стандартные карточки с сервера через API
api.loadInitialCards().then(data => { 
  const section = new Section({items: data, renderer: createCard }, '.elements__container');
  section.renderItems();
})
.catch((err) => console.log(`Ошибка вставки карточек ${err}`));

// note функция, которая получает данные и создаёт карточку
const createCard = (data) => {
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
          console.log('remove like', res.likes)
        });
      } else {
        api
          .setLike(id)
          .then((res) => {
            console.log('res from index.js', res)
            console.log('res likes from index.js', res.likes)
            card.setLikes(res.likes);
            // console.log('set like', res.likes)
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
  PopupAddCard.changeButtonText(true);  
  api
  .addnewCard(data.caption, data.src)
  .then((res) => {
    section.addUserItem(createCard(res, userID))
  })
  .catch((err) => console.log(`Ошибка добавления карточки: ${err}`))
  .finally(() => {
    PopupAddCard.changeButtonText(false)
    PopupAddCard.close();
  });
}

// обработчик сабмита попапа о юзере
const handleProfileFormSubmit = (data) => {
  const { usermane, occupation } = data;
  editProfilePopup.changeButtonText(true);
  api.editProfile(usermane, occupation)
  .then(() => {
  profileName.textContent = usermane
  profileAbout.textContent = occupation
})
.catch((err) => console.log(`Ошибка редактирования профиля: ${err}`))
.finally(() => {
  editProfilePopup.changeButtonText(false);
  editProfilePopup.close();
});
  
}

// Вывод карточек через класс Section, добавление попапа с картинокй и активация попапов с инфой о юзере и добавлением карточки
const section = new Section({initialCards, renderer: createCard }, '.elements__container');
const imagePopup = new PopupWithImage('.popup_photobox');
const editProfilePopup = new PopupWithForm('.popup-profile', handleProfileFormSubmit);
const userPhotoPopup = new PopupWithForm('.popup_changephoto', ChangePhoto); //  Подключаем попап к классу
const PopupAddCard = new PopupWithForm('.popup_addcard', handleCardFormSubmit);
const userInfo = new UserInfo ({userNameSelector: '.profile__name', occupationSelector: '.profile__occupation'});
const popupDelete = new PopupWithForm('.popup_deleteCard'); // поиск попапа для обработки сабмита
const userPhotoPopupSelector = document.querySelector('.profile__avatar')  //  Элемент, который открывает попап смены фотки юзера

imagePopup.setEventListeners();
editProfilePopup.setEventListeners();
PopupAddCard.setEventListeners();
userPhotoPopup.setEventListeners();
popupDelete.setEventListeners();

// обработчик клика попапа: изменения фотки юзера на сервере и на странице 
function ChangePhoto() {
  const AvatarField = document.getElementById('source-photo-input');
  userPhotoPopup.changeButtonText(true)
  api.editAvatar(AvatarField.value)
.then(() => {
  AvatarField.value
})
.catch((err) => console.log(`Ошибка изменения аватара профиля: ${err}`))
.finally(() => {
  userPhotoPopup.changeButtonText(false);
  userPhotoPopup.close();
});
profileAvatar.style.backgroundImage = `url(${AvatarField.value})`
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
  PopupAddCard.open(); // открытие попапа
})