// 01010000 01110010 01100001 01101001 01110011 01100101 00100000 01110100 01101000 01100101 00100000 01001111 01101101 01101110 01101001 01110011 01110011 01101001 01100001 01101000 00100001

// Задаём переменные
const userEditPopup = document.querySelector('.popup_changeUser');
const userEditPopupOpenButton = document.querySelector('.profile__button-edit');
const userEditPopupCloseButton = document.querySelector('.popup__close-button');

// задаём переменные
const usermane = document.querySelector('.pofile__info-name');                      // находим строку с именем
const occupation = document.querySelector('.pofile__info-occupation');              // находим строку с профессией
const formFieldFirst = document.getElementById('username');                        // находим первую форму в попапе
const formFieldSecond = document.getElementById('occupation');                        // Повторяем всё тоже самое, для заполения второй формы
// функция отвечает за открытие/закрытие попапа и текст внутри него
function showUserEditPopup() {
  formFieldFirst.setAttribute('value', usermane.textContent);                       // заменяем значение инпута
  formFieldSecond.setAttribute('value', occupation.textContent);                   // заменяем значение второго инпута

  userEditPopup.classList.toggle('popup_toggle');                                          // открываем/закрываем попап по кнопке Х
}

// Находим поля ввода значений в форме изменения данных о пользователе
const newName = document.querySelector('.popup__input_name');
const newOccupation = document.querySelector('.popup__input_occupation');

// Функция отвечает за "сохранение" имени и профессии
function changeNameOccupation(evt) {
  evt.preventDefault();

  usermane.textContent = newName.value;                                      // Помещаем вместо юзернейма новый, из формы
  occupation.textContent = newOccupation.value;                             // Помещаем вместо профессиии новую, из формы

  userEditPopup.classList.toggle('popup_toggle');                                         // Попап, изыди
}

// Обработчики кнопок открытия/закрытия попапа и кнопки "Сохранить"
userEditPopupOpenButton.addEventListener('click', showUserEditPopup);
userEditPopupCloseButton.addEventListener('click', showUserEditPopup);
userEditPopup.addEventListener('submit', changeNameOccupation);


// 01001000 01100001 01101001 01101100 00100000 01110100 01101000 01100101 00100000 01001111 01101101 01101110 01101001 01110011 01110011 01101001 01100001 01101000 00100001 00100000
// 01001000 01100101 00100000 01101001 01110011 00100000 01110100 01101000 01100101 00100000 01000111 01101111 01100100 00100000 01101001 01101110 00100000 01110100 01101000 01100101 00100000 01001101 01100001 01100011 01101000 01101001 01101110 01100101
// 01110100 01101000 01100101 00100000 01010011 01101111 01110101 01110010 01100011 01100101 00100000 01101111 01100110 00100000 01000001 01101100 01101100 00100000 01001011 01101110 01101111 01110111 01101100 01100101 01100100 01100111 01100101

// ---------------------------------------------------------------------------------------------------------------------
// Начало вывода дефолтных карточек

// Массив с дефолтными данными
const initialCards = [
  {
    name: 'Карачаевcк',
    link: './images/karachaevsk-1.jpg',
    alt: 'Гора на Кавказе'
  },
  {
    name: 'Гора Эльбрус',
    link: './images/elbrus-1.jpg',
    alt: 'Гора Эльбрус'
  },
  {
    name: 'Домбай',
    link: './images/dombai-1.jpg',
    alt: 'Лыжный курорт на Домбае'
  },
  {
    name: 'Гора Эльбрус',
    link: './images/elbrus-2.jpg',
    alt: 'Гора Эльбрус'
  },
  {
    name: 'Домбай',
    link: './images/dombai-2.jpg',
    alt: 'Домбай летом'
  },
  {
    name: 'Карачаево-Черкессия',
    link: './images/karachaevsk-1.jpg',
    alt: 'Гора на Кавказе'
  }
];

// Находим темплейт по ID и получаем его содержимое через .content и находим место для клонирования
const userTemplate = document.querySelector('#card').content;                // Находим темплейт
const cloneTarget = document.querySelector('.elements');                     // Находим место куда будем клонировать

// переменные для записи имени карточки, ссылки на фото и alt
const newCardimg = document.querySelector('.popup__photobox-image');
const newCardtext = document.querySelector('.popup__photobox-caption');

//Функция создания карточки
function addFirstCards (card) {

  const cardNode = userTemplate.cloneNode(true);
  cardNode.querySelector('.element__image').src = card.link;                     //Задаём картинку карточки
  cardNode.querySelector('.element__image').alt = card.alt;                      //Задаём alt
  cardNode.querySelector('.element__paragraph').textContent = card.name;         //Задаём Имя.

  //удаление карточки. Удаляем ближайшую карточку в HTML по клику на ведро
  cardNode.querySelector('.element__thrashcan').addEventListener('click', event => {
    const removeCard = event.target.closest('.element');
    removeCard.remove();
  });

  // Добавление функции лайка. Лайкаем ближайшую в HTML карточку по клику на лайк
  cardNode.querySelector('.element__button-like').addEventListener('click', event => {
    const makeLiked = event.target.closest('.element__button-like');
    makeLiked.classList.toggle('element__button-liked');
  });

  // Выводим фотобокс.
  //Задаём действие по клику на картинку карточки
  cardNode.querySelector('.element__image').addEventListener('click', event => {

    //Вытаскиваем ссылку на изображение и выводим её в консоль, для теста работы функции. Эта функция работает.
    newCardimg.src = event.target.src;
    newCardtext.textContent = card.name;

    // открытие и закрытие попапа
    imagePopop.classList.toggle('popup_toggle');
  });
cloneTarget.prepend(cardNode); // Появление карточки на странице
}
initialCards.forEach(addFirstCards); // применение функции к каждому элементу массива - так появляются карточки



// Конец вывода дефолтных карточек
//----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
// Добавление карточки
// задаём константы для попапа добавления карточки
const addCardPopup = document.querySelector('.popup_addCard');
const addCardPopupOpenButton = document.querySelector('.profile__button-add');
const addCardPopupCloseButton = document.querySelector('.popup__close-button_addCard');
const addCardPopupSaveButton = document.querySelector('.popup__button-save_addCard');
const newCardName = document.querySelector('.popup__input_addCard-paragraph');
const newCardLink = document.querySelector('.popup__input_addCard-link');

// функция проверяет открытость/закрытость попапа и открывает/закрывает его, добавляя или убирая класс
function addNewCardPopup () {
  addCardPopup.classList.toggle('popup_toggle');                       // открываем/закрываем попап по кнопке
}

// Функция будет собирать введённые данные из формы и создавать из них объект newObject
function createdObj (evt) {
  evt.preventDefault();  //отмена перезагрузки страницы при отправке формы

  // создаём пустой объект c нужными значениями
  const newObject = {
    name: newCardName.value,
    link: newCardLink.value,
    alt: newCardName.value
  };


  //закрыть попап
  addCardPopup.classList.toggle('popup_toggle');
  //запуск добавления карточки через функцию отрисовки первых карточек
  addFirstCards(newObject);
}

addCardPopupOpenButton.addEventListener('click', addNewCardPopup);
addCardPopupCloseButton.addEventListener('click', addNewCardPopup);
addCardPopupSaveButton.addEventListener('click', createdObj);

// addCardPopup.addEventListener('submit', makeNewCard);
// Добавление карточки
//----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
// Попап с фотокарточкой
const imagePopop = document.querySelector('.popup_photobox');
const imagePopopCloseButton = document.querySelector('.popup__photobox-close');
imagePopopCloseButton.addEventListener('click', closeImagePopup);

// Функция открытия / закрытия фотобокса
function closeImagePopup() {
  imagePopop.classList.toggle('popup_toggle');
}
