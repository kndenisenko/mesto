// 01010000 01110010 01100001 01101001 01110011 01100101 00100000 01110100 01101000 01100101 00100000 01001111 01101101 01101110 01101001 01110011 01110011 01101001 01100001 01101000 00100001

// Задаём переменные
const userEditPopup = document.querySelector('.popup_changeUser');
const userEditPopupOpenButton = document.querySelector('.profile__button-edit');
const userEditPopupCloseButton = document.querySelector('.popup__close-button');

// задаём переменные
const usermane = document.querySelector('.pofile__info-name');                      // находим строку с именем
const occupation = document.querySelector('.pofile__info-occupation');              // находим строку с профессией

// функция отвечает за открытие/закрытие попапа и текст внутри него
function showUserEditPopup() {
  const formFieldFirst = document.getElementById('username');                           // находим первую форму в попапе
  formFieldFirst.setAttribute('value', usermane.textContent);                       // заменяем значение инпута

  const formFieldSecond = document.getElementById('occupation');                         // Повторяем всё тоже самое, для
  // заполения второй формы
  formFieldSecond.setAttribute('value', occupation.textContent);

  userEditPopup.classList.toggle('popup_toggle');                                                  // открываем/закрываем попап по кнопке Х
}

// Функция отвечает за "сохранение" имени и профессии
function changeNameOccupation(evt) {
  evt.preventDefault();
  const inputvalue = document.querySelectorAll('input');                            // Получаем значение всех инпутов сразу

  usermane.textContent = inputvalue[0].value;                                     // Помещаем вместо юзернейма новый, из формы
  occupation.textContent = inputvalue[1].value;                                   // Помещаем вместо профессиии новую, из формы

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

// Вывод первых карточек
function addFirstCards (card) {
// Находим темплейт по ID и получаем его содержимое через .content и клонируем ноду
  const userTemplate = document.querySelector('#card').content;                // Находим темплейт
  const cardContent = document.querySelector('.elements');                   // Находим место куда будем клонировать

  const cardNode = userTemplate.cloneNode(true);                                       // клонируем
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
    document.querySelector('.popup__photobox-image').src = event.target.src;
    document.querySelector('.popup__photobox-caption').textContent = card.name;

    // открытие и закрытие попапа
    imagePopop.classList.toggle('popup_toggle');
    imagePopopCloseButton.addEventListener('click', closeImagePopup);
  });
cardContent.append(cardNode);  // Появление карточек при загрузке страницы
}
initialCards.forEach(addFirstCards);

// Конец вывода дефолтных карточек
//----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
// Добавление карточки
const addCardPopup = document.querySelector('.popup_addCard');
const addCardPopupOpenButton = document.querySelector('.profile__button-add');
const addCardPopupCloseButton = document.querySelector('.popup__close-button_addCard');


function addNewCardPopup () {
  const formFieldFirst = document.getElementById('firstInput');                           // находим первую форму в попапе
  formFieldFirst.setAttribute('value', 'Название');

  const formFieldSecond = document.getElementById('secondInput');     // Повторяем всё тоже самое, для второй формы
  formFieldSecond.setAttribute('value', 'Ссылка на картинку');

  addCardPopup.classList.toggle('popup_toggle');                       // открываем/закрываем попап по кнопке
}

// Обработка данных из формы, создание новой карточки
function makeNewCard (object) {
  object.preventDefault()

  const userTemplate = document.querySelector('#card').content;                // Находим темплейт
  const cardContent = document.querySelector('.elements');                   // Задаём место, куда он будет клонироваться

  const inputvalue = document.querySelectorAll('.popup__input_addCard');
  const cardNode = userTemplate.cloneNode(true)
  cardNode.querySelector('.element__image').src = inputvalue[1].value;                     // Получаем ссылку на картинку из формы
  cardNode.querySelector('.element__image').alt = inputvalue[0].value;                     // Задаём alt картинке из формы
  cardNode.querySelector('.element__paragraph').textContent = inputvalue[0].value;         // Задаём имя карточке из формы


  //удаление новой карточки
  cardNode.querySelector('.element__thrashcan').addEventListener('click', event => {
    const removeCard = event.target.closest('.element');
    removeCard.remove();
  });


  //лайк новой карточки
  cardNode.querySelector('.element__button-like').addEventListener('click', event =>{
    const makeLiked = event.target.closest('.element__button-like');
    makeLiked.classList.toggle('element__button-liked');
  })


  //показ попапа с фото
  cardNode.querySelector('.element__image').addEventListener('click', event => {

    // Получаем название карточки, по которой кликнули
    const getText = event.target.closest('.element').querySelector('.element__paragraph').textContent;

    //Выставляем всё в попап
    //картинка
    document.querySelector('.popup__photobox-image').src = event.target.src;
    //текст
    document.querySelector('.popup__photobox-caption').textContent = getText;

    // открытие и закрытие попапа
    imagePopop.classList.toggle('popup_toggle');
    imagePopopCloseButton.addEventListener('click', closeImagePopup);
  });

  cardContent.prepend(cardNode);
  addCardPopup.classList.toggle('popup_toggle');                       // открываем/закрываем попап по кнопке
}

addCardPopupOpenButton.addEventListener('click', addNewCardPopup);
addCardPopupCloseButton.addEventListener('click', addNewCardPopup);
addCardPopup.addEventListener('submit', makeNewCard);
// Добавление карточки
//----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
// Попап с фотокарточкой
const imagePopop = document.querySelector('.popup_photobox');
const imagePopopCloseButton = document.querySelector('.popup__photobox-close');

// Функция
function closeImagePopup() {
  imagePopop.classList.remove('popup_toggle');
}
