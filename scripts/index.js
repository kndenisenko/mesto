// note вот без этого не заработает ничего
// ! 01010000 01110010 01100001 01101001 01110011 01100101 00100000 01110100 01101000 01100101 00100000 01001111 01101101 01101110 01101001 01110011 01110011 01101001 01100001 01101000 00100001

// note поиск попапа изменения профиля, кнопок его открытия и закрытия и формы
const profilePopup = document.querySelector('.popup-profile');
const ProfilePopupOpenButton = document.querySelector('.profile__edit');
const ProfilePopupClose = document.querySelector('.popup__close-button');
const ProfilePopupForm = document.querySelector('.popup__form');

// note поиск имени и профессии в HTML-разметке
const username = document.querySelector('.profile__name');
const occupation = document.querySelector('.profile__occupation');

// note поиск полей имени и профессии в попапе
const nameField = document.getElementById('username');
const occupationField = document.getElementById('occupation');

// note Функции открытия и закрытия попапов, используются во всех попапах
function openPopup(popup) {
  popup.classList.add('popup_visible');
}
function closePopup(popup) {
  popup.classList.remove('popup_visible');
}

// note обработчики нажатий для попапа с изменением информации о пользователе
ProfilePopupOpenButton.addEventListener('click', evt => {
nameField.value = username.textContent;
occupationField.value = occupation.textContent;
  openPopup(profilePopup);
});
ProfilePopupClose.addEventListener('click', evt => {
  closePopup(profilePopup)
});
ProfilePopupForm.addEventListener('submit', evt => {
  evt.preventDefault();
  username.textContent = nameField.value;
  occupation.textContent = occupationField.value;
  closePopup(profilePopup);
});

//----------------------------------------------------------------------------------------------------------------------
// note mesto - 5
//----------------------------------------------------------------------------------------------------------------------
const initialCards = [
  {
    name: 'Петрозаводск',
    src: './images/001_petrozavodsk.jpg',
    alt: 'Петрозаводск, начало экспедиции'
  },
  {
    name: 'Лонгйир',
    src: './images/002_Longyearbyen.jpg',
    alt: 'Лонгйир, второй известный город на пути'
  },
  {
    name: 'Барнео',
    src: './images/003-barneo.jpg',
    alt: 'Барнео. база на северном полюсе'
  },
  {
    name: 'Северный полюс',
    src: './images/004-north-pole.jpg',
    alt: 'северный полюс. главная точка экспедиции'
  },
  {
    name: 'Гренландия',
    src: './images/005-greenland.jpg',
    alt: 'Гренландия. здесь тоже был Фёдор Конюхов'
  },
  {
    name: 'Юлианехоб (какорто́к)',
    src: './images/006-Qaqortoq.jpg',
    alt: 'Юлианехоб, также известный как Какорто́к'
  }
];

// note Находим темплейт в разметке и получаем его содержимое с помощью content и место для клонирования
const cardTemplate = document.querySelector('#cardTemplate').content;  // что клонируем
const cloneTarget = document.querySelector('.elements__container'); // куда клонируем


// note Блок попапа с фотобоксом
const popupPhotobox = document.querySelector('.popup_photobox');  // находим попап фотобокса в разметке
const popupPhotoboxPicture = document.querySelector('.popup__photobox-image');
const popupPhotoboxCaption = document.querySelector('.popup__photobox-caption')
const popupPhotoboxClose = document.querySelector('.popup__photobox-close');


function createCard(item) {
  // note тут создаете карточку и возвращаете ее
  const cardNode = cardTemplate.cloneNode(true);
  cardNode.querySelector('.element__title').textContent = item.name;
  cardNode.querySelector('.element__image').src = item.src;
//  cardNode.querySelector('.element__image').alt = item.alt; // fixme Если нельзя искать картинку (element__image) дважды, то как можно задать ей alt?

  // note Да будет лайк - добавляем функцию лайка
  cardNode.querySelector('.element__like').addEventListener('click', event => {
    event.target.classList.toggle('element__like_liked');
  });

  // note Удаление карточки
  cardNode.querySelector('.element__delete').addEventListener('click', event => {
    const cardElement = event.target.closest('.element');
    cardElement.remove();
  });

// note Открытие попапа с большой картинкой
  cardNode.querySelector('.element__image').addEventListener('click', event => {
    const pictureForPhotobox = event.target.closest('.element'); //вытаскиваем кликнутый элемент
    setBigPicture(pictureForPhotobox);
    openPopup(popupPhotobox);  // открытие попапа
    popupPhotoboxClose.addEventListener('click', evt => { // Закрытие попапа
      closePopup(popupPhotobox);
    });
  });

  return cardNode; // Возвращаем результат работы функции
}

// note функция, которая создаёт карточки
function renderCard(card) {
  const cardNode = createCard(card)
  cloneTarget.append(cardNode);
}

// note Вывод дефолтных карточек
initialCards.forEach(renderCard);


// note функция открытия попапа с большой картинкой
function setBigPicture(picture) {
  console.log(picture);
  popupPhotoboxPicture.src = picture.querySelector('.element__image').src;
  popupPhotoboxCaption.textContent = picture.querySelector('.element__title').textContent;
}




/*

// note Функция закрытия попапа с картинкой и её слушатель
function photoboxClose () {
  popupPhotobox.classList.remove('popup_visible');
}
popupPhotoboxClose.addEventListener('click', photoboxClose);






// note Добавление новой карточки
const openNewCardButton = document.querySelector('.profile__add-button'); // находим кнопку добавления карточки
const newCardPopup = document.querySelector('.popup_addcard'); // Находим попап добавления карточки в разметке
const newCardPopupClose = document.querySelector('.popup__close-button_add'); // кнопка закрытия попапа с новой карточкой
const newCardSubmit = document.querySelector('.popup__submit-button_addCard'); // кнопка "сохранить" при добавлении попапа
const newCardName = document.querySelector('.popup__input-caption');
const newCardSrc = document.querySelector('.popup__input-src');


// note открытие попапа и вызов функции его закрытия
  openNewCardButton.addEventListener('click', event => {
  newCardPopup.classList.add('popup_visible');
  })

// note функция закрытия попапа и её слушатель
function popupAddCardCLose () {
  newCardPopup.classList.remove('popup_visible');
}

// note функция добавления новой карточки
function createNewCard (evt) {
  evt.preventDefault();

  // note создаём пустой объект для будущей карточки
  const newCard = {
    name: newCardName.value,
    url: newCardSrc.value,
    alt: newCardName.value
  };

  // note закрытие попапа
  popupAddCardCLose();

  // note запуск добавления карточки через функцию отрисовки первых карточек
  renderFirstCards(newCard);
}
newCardPopupClose.addEventListener('click', popupAddCardCLose);
newCardSubmit.addEventListener('click', createNewCard);
*/




















/* note мусор, использованный в новом релизе код



// note функция создания карточек и добавления к ним слушателей
function renderFirstCards (card) {
  const cardNode = cardTemplate.cloneNode(true);
  cardNode.querySelector('.element__title').textContent = card.name;
  cardNode.querySelector('.element__image').src = card.url;
  cardNode.querySelector('.element__image').alt = card.alt;

// note Да будет лайк - добавляем функцию лайка
cardNode.querySelector('.element__like').addEventListener('click', event => {
  const liked = event.target.closest('.element__like');
  liked.classList.toggle('element__like_liked');
});


  // note Удаление карточки
  cardNode.querySelector('.element__delete').addEventListener('click', event => {
    const devNull = event.target.closest('.element');
    devNull.remove();
  });

// note Открытие попапа с большой картинкой? ранее находился внутри функции добавления карточек
  cardNode.querySelector('.element__image').addEventListener('click', event => {
    const imagePicture = event.target.closest('.element__image'); //Вытаскиваем источник картинки и альт
    popupPhotobox.classList.add('popup_visible');
    popupPhotoboxImage.src = event.target.src;
    popupPhotoboxImage.alt = event.target.alt;
    popupPhotoboxCaption.textContent = event.target.alt;
  })

  cloneTarget.prepend(cardNode);
}
initialCards.forEach(renderFirstCards);


// note Открытие попапа с большой картинкой
  cardNode.querySelector('.element__image').addEventListener('click', event => {
    const imagePicture = event.target.closest('.element__image'); //Вытаскиваем источник картинки и альт
    popupPhotobox.classList.add('popup_visible');
    popupPhotoboxImage.src = event.target.src;
    popupPhotoboxImage.alt = event.target.alt;  // fixme Если нельзя искать картинку дважды, то как можно задать ей alt?
    popupPhotoboxCaption.textContent = event.target.alt;
  })












*/
