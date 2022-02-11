// note вот без этого не заработает ничего
// ! 01010000 01110010 01100001 01101001 01110011 01100101 00100000 01110100 01101000 01100101 00100000 01001111 01101101 01101110 01101001 01110011 01110011 01101001 01100001 01101000 00100001

// note попап, кнокпи его открытия и закрытия
const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__edit');
const popupResetButton = document.querySelector('.popup__close-button');
const popupForm = document.querySelector('.popup__form');

// note поиск имени и профессии в HTML-разметке
const username = document.querySelector('.profile__name');
const occupation = document.querySelector('.profile__occupation');

// note поиск полей имени и профессии в попапе
const nameField = document.getElementById('username');
const occupationField = document.getElementById('occupation');

// note функция открытия попапа и добавления данных в поля попапа
function popupOpen() {
  popup.classList.add('popup_visible');
  nameField.value = username.textContent;
  occupationField.value = occupation.textContent;
}

// note сохранение данных из попапа
function popupCloseAndSave(evt) {
  evt.preventDefault();
  username.textContent = nameField.value;
  occupation.textContent = occupationField.value;
  popupClose();
}

// note функция закрытия попапа
function popupClose() {
  popup.classList.remove('popup_visible')
}

// note обработчики нажатий
popupOpenButton.addEventListener('click', popupOpen);
popupResetButton.addEventListener('click', popupClose);
popupForm.addEventListener('submit', popupCloseAndSave);
//----------------------------------------------------------------------------------------------------------------------
// mesto - 5
//----------------------------------------------------------------------------------------------------------------------
const initialCards = [
  {
    name: 'Петрозаводск',
    url: './images/001_petrozavodsk.jpg',
    alt: 'Петрозаводск, начало экспедиции'
  },
  {
    name: 'Лонгйир',
    url: './images/002_Longyearbyen.jpg',
    alt: 'Лонгйир, второй известный город на пути'
  },
  {
    name: 'Барнео',
    url: './images/003-barneo.jpg',
    alt: 'Барнео. база на северном полюсе'
  },
  {
    name: 'Северный полюс',
    url: './images/004-north-pole.jpg',
    alt: 'северный полюс. главная точка экспедиции'
  },
  {
    name: 'Гренландия',
    url: './images/005-greenland.jpg',
    alt: 'Гренландия. здесь тоже был Фёдор Конюхов'
  },
  {
    name: 'Юлианехоб (какорто́к)',
    url: './images/006-Qaqortoq.jpg',
    alt: 'Юлианехоб, также известный как Какорто́к'
  }
];

//Находим темплейт в разметке и получаем его содержимое с помощью content и место для клонирования
const cardTemplate = document.querySelector('#cardTemplate').content;
const cloneTarget = document.querySelector('.elements__container');
/*
const cardElement = cardTemplate.querySelector('.elements__container').cloneNode(true);
*/

function renderFirstCards (card) {
  const cardNode = cardTemplate.cloneNode(true);
  cardNode.querySelector('.element__title').textContent = card.name;
  cardNode.querySelector('.element__image').src = card.url;
  cardNode.querySelector('.element__image').alt = card.alt;

  // Да будет лайк - добавляем лайк
  cardNode.querySelector('.element__like').addEventListener('click', event => {
    const liked = event.target.closest('.element__like');
    liked.classList.toggle('element__like_liked');
  });

  // Удаление картинки
  cardNode.querySelector('.element__delete').addEventListener('click', event => {
    const removed = event.target.closest('.element');
    console.log(removed);
    removed.remove();
  });




  cloneTarget.prepend(cardNode);
}
initialCards.forEach(renderFirstCards);
