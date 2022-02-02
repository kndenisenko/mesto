// note вот без этого не заработает ничего
// ! 01010000 01110010 01100001 01101001 01110011 01100101 00100000 01110100 01101000 01100101 00100000 01001111 01101101 01101110 01101001 01110011 01110011 01101001 01100001 01101000 00100001

// note попап, кнокпи его открытия и закрытия
let popup = document.querySelector('.popup');
let popuOpenButton = document.querySelector('.profile__edit');
let popupResetButton = document.querySelector('.popup__close-button');

// note поиск имени и профессии в HTML-разметке
let username = document.querySelector('.profile__name');
let occupation = document.querySelector('.profile__occupation');

// note поиск полей имени и профессии в попапе
let nameField = document.getElementById('username');
let occupationField = document.getElementById('occupation');

// note функция открытия и закрытия попапа, без сохранения изменний
function popupOpen() {
  popup.classList.toggle('popup__visible');
  nameField.setAttribute('value', username.textContent);
  occupationField.setAttribute('value', occupation.textContent);
}

// note сохранение данных из попапа
function popupCloseAndSave(evt) {
  evt.preventDefault();
  let newData = document.querySelectorAll('input');
  username.textContent = newData[0].value;
  occupation.textContent = newData[1].value;
  popup.classList.toggle('popup__visible');
}

// note обработчики нажатий
popuOpenButton.addEventListener('click', popupOpen);
popupResetButton.addEventListener('click', popupOpen);
popup.addEventListener('submit', popupCloseAndSave);
