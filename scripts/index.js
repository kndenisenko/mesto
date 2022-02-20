// note вот без этого не заработает ничего
// 01010000 01110010 01100001 01101001 01110011 01100101 00100000 01110100 01101000 01100101 00100000 01001111 01101101 01101110 01101001 01110011 01110011 01101001 01100001 01101000 00100001

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
  const cardNode = cardTemplate.cloneNode(true);  // клонируем темплейт
  cardNode.querySelector('.element__title').textContent = item.name;
  cardNode.querySelector('.element__image').src = item.src;
//  cardNode.querySelector('.element__image').alt = item.alt; // fixme Если нельзя искать картинку (element__image) дважды, то как можно задать ей alt?

  cardNode.querySelector('.element__like').addEventListener('click', event => { // добавляем функцию лайка
    event.target.classList.toggle('element__like_liked');
  });

  cardNode.querySelector('.element__delete').addEventListener('click', event => { // Удаление карточки
    const cardElement = event.target.closest('.element');
    cardElement.remove();
  });

  cardNode.querySelector('.element__image').addEventListener('click', event => { // Открытие попапа с большой картинкой
    const pictureForPhotobox = event.target.closest('.element'); //вытаскиваем кликнутый элемент
    setBigPicture(pictureForPhotobox);
    openPopup(popupPhotobox);  // открытие попапа
    popupPhotoboxClose.addEventListener('click', evt => { // Закрытие попапа
      closePopup(popupPhotobox);
    });
  });

  return cardNode; // Возвращаем результат работы функции
}

// note функция, которая создаёт карточки и добавляет их в начало
function renderFirstCards(card) {
  const cardNode = createCard(card)
  cloneTarget.append(cardNode);
}

function renderSecondCards(card) {
  const cardNode = createCard(card)
  cloneTarget.prepend(cardNode);
}

// note Вывод дефолтных карточек
initialCards.forEach(renderFirstCards);


// note функция открытия попапа с большой картинкой
function setBigPicture(picture) {
  popupPhotoboxPicture.src = picture.querySelector('.element__image').src;
  popupPhotoboxCaption.textContent = picture.querySelector('.element__title').textContent;
}


const newCardPopup = document.querySelector('.popup_addcard'); // Находим попап добавления карточки в разметке
const NewCardPopupOpen = document.querySelector('.profile__add-button'); // находим кнопку добавления карточки (открытия попапа)
const newCardPopupClose = document.querySelector('.popup__close-button_add'); // кнопка закрытия попапа с новой карточкой
newCardPopup.addEventListener('submit', createNewCard); // вызов функции создания новой карточки по кнопке submit

// note обработчики нажатий открытия и закрытия попапа добавления карточки
NewCardPopupOpen.addEventListener('click', evt => { // открытие попапа добавления карточки
  openPopup(newCardPopup);
})
newCardPopupClose.addEventListener('click', evt => { // закрытие попапа добавления карточки
  closePopup(newCardPopup);
})


// note добавление новой карточки
function createNewCard (evt) {
  evt.preventDefault();
  const newCardName = document.querySelector('.popup__input-caption'); // берём заголовок для карточки из поля
  const newCardSrc = document.querySelector('.popup__input-src'); // берём ссылку для карточки из поля

  const newCard = { // создаём массив для будущей карточки, данные берутся из формы
    name: newCardName.value,
    src: newCardSrc.value,
  };
  renderSecondCards(newCard); // рендер карточки
  closePopup(newCardPopup); // закрытие попапа
  newCardName.value = ''; // очистка полей ввода после вывода карточки (очистка формы через reset() не сработала)
  newCardSrc.value = '';  // очистка полей ввода после вывода карточки (очистка формы через reset() не сработала)
}


