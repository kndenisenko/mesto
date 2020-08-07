// 01010000 01110010 01100001 01101001 01110011 01100101 00100000 01110100 01101000 01100101 00100000 01001111 01101101 01101110 01101001 01110011 01110011 01101001 01100001 01101000 00100001

// Задаём переменные
let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__open-popup');
let popupCloseButton = document.querySelector('.popup__close-button');
let popupSaveButton = document.querySelector('.popup__button-save');

// задаём переменные
let usermane = document.querySelector('.pofile__info-name');                      // находим строку с именем
let occupation = document.querySelector('.pofile__info-occupation');              // находим строку с профессией



// функция отвечает за запуск формы
function popupOpenClose() {
  let formFieldFirst = document.querySelector('.popup__form-info-name');          // находим первую форму в попапе
  formFieldFirst.setAttribute('value', usermane.textContent);                     // заменяем значение инпута

  let formFieldSecond = document.querySelector('.popup__form-info-occupation');   // Повторяем всё тоже самое, для заполения второй формы
  formFieldSecond.setAttribute('value', occupation.textContent);

  popup.classList.toggle('popup_toggle');                                         // открываем/закрываем попап по кнопке Х
}

// Функция отвечает за "сохранение" имени и профессии
function formSubmitHandler(evt) {
  evt.preventDefault();
  let inputvalue = document.querySelectorAll('input');                            // Получаем значение всех инпутов сразу

  usermane.textContent = inputvalue[0].value;                                     // Помещаем вместо юзернейма новый, из формы
  occupation.textContent = inputvalue[1].value;                                   // Помещаем вместо профессиии новую, из формы

popup.classList.toggle('popup_toggle');                                           // Попап, изыди
}

// Обработчики кнопок открытия/закрытия попапа и кнопки "Сохранить"
popupOpenButton.addEventListener('click', popupOpenClose);
popupCloseButton.addEventListener('click', popupOpenClose);
popup.addEventListener('submit', formSubmitHandler);


