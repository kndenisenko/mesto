// note вот без этого не заработает ничего
// 01010000 01110010 01100001 01101001 01110011 01100101 00100000 01110100 01101000 01100101 00100000 01001111 01101101 01101110 01101001 01110011 01110011 01101001 01100001 01101000 00100001






// note поиск попапа изменения профиля, кнопок его открытия и закрытия и формы
const profilePopup = document.querySelector('.popup-profile');
const profilePopupOpenButton = document.querySelector('.profile__edit');
const profilePopupClose = document.querySelector('.popup__close-button');
const profilePopupForm = document.querySelector('.popup__form');

// note поиск имени и профессии в HTML-разметке
const username = document.querySelector('.profile__name');
const occupation = document.querySelector('.profile__occupation');

// note поиск полей имени и профессии в попапе
const nameField = document.getElementById('username');
const occupationField = document.getElementById('occupation');



// note обработчики нажатий для попапа с изменением информации о пользователе
profilePopupOpenButton.addEventListener('click', evt => {
  nameField.value = username.textContent;
  occupationField.value = occupation.textContent;
  openPopup(profilePopup);
});
profilePopupClose.addEventListener('click', evt => {
  closePopup(profilePopup)
});
profilePopupForm.addEventListener('submit', evt => {
  evt.preventDefault();
  username.textContent = nameField.value;
  occupation.textContent = occupationField.value;
  closePopup(profilePopup);
});

//----------------------------------------------------------------------------------------------------------------------
// note mesto - 5
//----------------------------------------------------------------------------------------------------------------------


// note Находим темплейт в разметке и получаем его содержимое с помощью content и место для клонирования
const cardTemplate = document.querySelector('#cardTemplate').content;  // что клонируем
const cloneTarget = document.querySelector('.elements__container'); // куда клонируем


// note Блок попапа с фотобоксом
const popupPhotobox = document.querySelector('.popup_photobox');  // находим попап фотобокса в разметке
const popupPhotoboxPicture = document.querySelector('.popup__photobox-image');
const popupPhotoboxCaption = document.querySelector('.popup__photobox-caption')
const popupPhotoboxClose = document.querySelector('.popup__photobox-close');

// note функция создания карточек
function createCard(item) {
  const cardNode = cardTemplate.cloneNode(true);  // клонируем темплейт
  cardNode.querySelector('.element__title').textContent = item.name;
  const cardImage = cardNode.querySelector('.element__image');
  cardImage.src = item.src;
  cardImage.alt = item.alt;

  addEventListeners(cardNode, cardImage);

  return cardNode; // Возвращаем результат работы функции
}


// note функция создания обработчиков событий, добавлена после ревью
function addEventListeners (card, image) {
  card.querySelector('.element__like').addEventListener('click', event => { // добавляем функцию лайка
    event.target.classList.toggle('element__like_liked');
  });

  card.querySelector('.element__delete').addEventListener('click', event => { // Удаление карточки
    const cardElement = event.target.closest('.element');
    cardElement.remove();
  });

  image.addEventListener('click', event => { // Открытие попапа с большой картинкой
    const pictureForPhotobox = event.target.closest('.element'); //вытаскиваем кликнутый элемент
    setBigPicture(pictureForPhotobox);
    openPopup(popupPhotobox);  // открытие попапа
  });
}



// note функция, которая создаёт начальные карточки и добавляет их в начало
function renderFirstCards(card) {
  const cardNode = createCard(card)
  cloneTarget.append(cardNode);
}

// note Создание дополнительной, пользовательской карточки и добавления её в начало
function renderSecondCards(card) {
  const cardNode = createCard(card)
  cloneTarget.prepend(cardNode);
}

// note Вывод дефолтных карточек
initialCards.forEach(renderFirstCards);

// note функция открытия попапа с большой картинкой
function setBigPicture(picture) {
  popupPhotoboxPicture.src = picture.querySelector('.element__image').src;
  popupPhotoboxPicture.alt = picture.querySelector('.element__image').alt;
  popupPhotoboxCaption.textContent = picture.querySelector('.element__title').textContent;
}

// note Обработчик нажатия на клавишу закрытия попапа с большой картитнкой
popupPhotoboxClose.addEventListener('click', evt => { // Закрытие попапа
  closePopup(popupPhotobox);
});

// note попап с добавлением новой карточки
const newCardPopup = document.querySelector('.popup_addcard'); // Находим попап добавления карточки в разметке
const newCardPopupOpen = document.querySelector('.profile__add-button'); // находим кнопку добавления карточки (открытия попапа)
const newCardPopupClose = document.querySelector('.popup__close-button_add'); // кнопка закрытия попапа с новой карточкой
const newCardName = document.querySelector('.popup__input-caption'); // берём заголовок для карточки из поля
const newCardSrc = document.querySelector('.popup__input-src'); // берём ссылку для карточки из поля

newCardPopup.addEventListener('submit', createNewCard); // вызов функции создания новой карточки по кнопке submit

// note обработчики нажатий открытия и закрытия попапа добавления карточки
newCardPopupOpen.addEventListener('click', evt => { // открытие попапа добавления карточки
  openPopup(newCardPopup);
})
newCardPopupClose.addEventListener('click', evt => { // закрытие попапа добавления карточки
  closePopup(newCardPopup);
})

// note добавление новой карточки
function createNewCard (evt) {
  evt.preventDefault();

  const newCard = { // создаём массив для будущей карточки, данные берутся из формы
    name: newCardName.value,
    src: newCardSrc.value,
    alt: newCardName.value
  };
  renderSecondCards(newCard); // рендер карточки
  closePopup(newCardPopup); // закрытие попапа
  newCardName.value = ''; // очистка полей ввода после вывода карточки (очистка формы через reset() не сработала)
  newCardSrc.value = '';  // очистка полей ввода после вывода карточки (очистка формы через reset() не сработала)

  // Делаем кнопку сабмита неактивной совсем
  const popupButtondisabled = newCardPopup.querySelector('.popup__button');
  popupButtondisabled.setAttribute('disabled', true);
  popupButtondisabled.classList.add('popup__button_disabled');

}


//----------------------------------------------------------------------------------------------------------------------
// note mesto - 6
//----------------------------------------------------------------------------------------------------------------------
// note закрытие попапа через escape
const closePushingEscape = (event) => {
  if (event.key === 'Escape') { // если нажат escape, то
    const openedPopup = document.querySelector('.popup_visible'); // находим попап
    closePopup(openedPopup) //удаляем класс открытого попапа
  }
}

// note Функции открытия и закрытия попапов, используются во всех попапах. Улучшена в шестом спринте, добавлена возможность закрытия через esc и оверлей
function openPopup(popup) {
  popup.classList.add('popup_visible');
  document.addEventListener('keydown', closePushingEscape);
  popup.addEventListener('mousedown', closePopupClickingOverlay)
}


function closePopup(popup) {
  popup.classList.remove('popup_visible');
  document.removeEventListener('keydown', closePushingEscape); // снятие слушателя, если попап закрыт другим способом
}

// note закрытие попапа по клику на оверлей
function closePopupClickingOverlay (evt) {
if (evt.target === evt.currentTarget) {
  closePopup(evt.target);
}
}

