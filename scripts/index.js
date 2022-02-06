// note вот без этого не заработает ничего
// ! 01010000 01110010 01100001 01101001 01110011 01100101 00100000 01110100 01101000 01100101 00100000 01001111 01101101 01101110 01101001 01110011 01110011 01101001 01100001 01101000 00100001

// note попап, кнокпи его открытия и закрытия
const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__edit');
const popupResetButton = document.querySelector('.popup__close-button');
const popupContainer = document.querySelector('.popup__placeholder');

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
popupContainer.addEventListener('submit', popupCloseAndSave);



