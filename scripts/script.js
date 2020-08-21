// 01010000 01110010 01100001 01101001 01110011 01100101 00100000 01110100 01101000 01100101 00100000 01001111 01101101 01101110 01101001 01110011 01110011 01101001 01100001 01101000 00100001

// Задаём переменные
let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__button-edit');
let popupCloseButton = document.querySelector('.popup__close-button');
// let popupSaveButton = document.querySelector('.popup__button-save'); //

// задаём переменные
let usermane = document.querySelector('.pofile__info-name');                      // находим строку с именем
let occupation = document.querySelector('.pofile__info-occupation');              // находим строку с профессией

// функция отвечает за открытие/закрытие попапа и текст внутри него
function popupOpenClose() {
  let formFieldFirst = document.getElementById('firstInput');                           // находим первую форму в попапе
  formFieldFirst.setAttribute('value', usermane.textContent);                       // заменяем значение инпута
  document.querySelector('.popup__paragraph').textContent = 'Редактировать профиль';    // добавляем заголовок
  document.querySelector('.popup__button-save').textContent = 'Сохранить';

  let formFieldSecond = document.getElementById('secondInput');                         // Повторяем всё тоже самое, для
  // заполения второй формы
  formFieldSecond.setAttribute('value', occupation.textContent);

  popup.classList.toggle('popup_toggle');                                                  // открываем/закрываем
  // попап по кнопке Х
}

// Функция отвечает за "сохранение" имени и профессии
function formSubmitHandler(evt) {
  evt.preventDefault();
  let inputvalue = document.querySelectorAll('input');                            // Получаем значение всех инпутов сразу

  usermane.textContent = inputvalue[0].value;                                     // Помещаем вместо юзернейма новый, из формы
  occupation.textContent = inputvalue[1].value;                                   // Помещаем вместо профессиии новую, из формы

  popup.classList.toggle('popup_toggle');                                         // Попап, изыди
}

// Обработчики кнопок открытия/закрытия попапа и кнопки "Сохранить"
popupOpenButton.addEventListener('click', popupOpenClose);
popupCloseButton.addEventListener('click', popupOpenClose);
popup.addEventListener('submit', formSubmitHandler);


// 01001000 01100001 01101001 01101100 00100000 01110100 01101000 01100101 00100000 01001111 01101101 01101110 01101001 01110011 01110011 01101001 01100001 01101000 00100001 00100000
// 01001000 01100101 00100000 01101001 01110011 00100000 01110100 01101000 01100101 00100000 01000111 01101111 01100100 00100000 01101001 01101110 00100000 01110100 01101000 01100101 00100000 01001101 01100001 01100011 01101000 01101001 01101110 01100101
// 01110100 01101000 01100101 00100000 01010011 01101111 01110101 01110010 01100011 01100101 00100000 01101111 01100110 00100000 01000001 01101100 01101100 00100000 01001011 01101110 01101111 01110111 01101100 01100101 01100100 01100111 01100101

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
const addFirstCards = (card) => {
// Находим темплейт по ID и получаем его содержимое через .content и клонируем ноду
  let userTemplate = document.querySelector('#user').content.cloneNode(true);
  const cardContent = document.querySelector('.elements');                           // Находим место, куда будет
  // вставлен темплейт

  userTemplate.querySelector('.element__image').src = card.link;                     //Вот тут магия. задаём картинку
  userTemplate.querySelector('.element__image').alt = card.alt;                      //И снова магия. задаём alt
  userTemplate.querySelector('.element__paragraph').textContent = card.name;        //Вжух! Имя.

  cardContent.append(userTemplate);  // Появление карточки при загрузке страницы
}
initialCards.forEach(addFirstCards);













