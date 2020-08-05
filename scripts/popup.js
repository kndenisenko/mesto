// Задаём константы
const popup = document.querySelector(".popup");
const popupOpenButton = document.querySelector('.profile__open-popup');
const popupCloseButton = document.querySelector('.popup__close-button');
const popupSaveButton = document.querySelector('.popup__button-save');

// Функция отвечает за запуск цикла при открытии окна
function popupOpenClose() {
  popup.classList.toggle('popup_toggle');                                        // Переключение класса, открытие/закрытие по кнопке X

  let placeholderFirstNew = userName.textContent;                                // Помещаем в переменную placeholderFirstNew значение строки с ID userName
  let placeholderFirstField = document.querySelector('.popup__form-info-name');  // Находим верхнее поле в форме попапа
  placeholderFirstField.setAttribute('placeholder', placeholderFirstNew);        // Заменяем плейсхолдер в попапе на значение строки с ID Username

  let placeholderSecondNew = occupation.textContent; // Повторяем всё тоже самое для второго поля попапа
  let placeholderSecondField = document.querySelector('.popup__form-info-occupation');
  placeholderSecondField.setAttribute('placeholder', placeholderSecondNew);
};

// функция работы кнопки сохранить
function popupSaveData() {
  let inputvalue = document.querySelectorAll('input');                            // Получаем значение всех инпутов сразу

  let setNewUsername = document.getElementById('userName');                       // Находим элеметнт - строку с юзернеймом
  setNewUsername.textContent = inputvalue[0].value;                               // Помещаем вместо юзернейма новый, из формы

  let setNewOccupation = document.getElementById('occupation');                   // Находим элеметнт - строку с профессией
  setNewOccupation.textContent = inputvalue[1].value;                             // Помещаем вместо профессиии новую, из формы

popup.classList.toggle('popup_toggle');                                           // Попап, изыди
}


// Обработчики кнопок открытия/закрытия попапа и кнопки "Сохранить"
popupOpenButton.addEventListener('click', popupOpenClose);
popupCloseButton.addEventListener('click', popupOpenClose);
popupSaveButton.addEventListener('click', popupSaveData);



