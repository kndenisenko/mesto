// note функция запуска валидации - самая главная функция, которая ссылается на остальные
const enableValidation = (config) => {
  const formsList = Array.from(document.querySelectorAll(config.formSelector))  //собираем формы в массив
  formsList.forEach((formElement) => {
    formElement.addEventListener('submit', function(event) { // добавляем каждому элементу массива (форме) слушателей
      event.preventDefault();
    })
    setEventListeners(formElement, config);
  })
};

// note Устанавливаем слушателей, которые потом добавляются к инпутам
const setEventListeners = (form, config) => {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector))  // собираем массив из инпутов, которые берутся из форм
  const buttonElement = form.querySelector(config.submitButtonSelector)  // находим кнопки сабмитов
  toggleButtonState(inputList, buttonElement, config)  // вызов функции переключения состояния кнопок сабмитов в зависимости от действий пользователя

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(inputElement, config); // вызов функции проверки валидности инпутов
      toggleButtonState(inputList, buttonElement, config);
    })
  });
};

// note проверка валидности или невалидности инпутов
const checkInputValidity = (inputElement, config) => {
  if (!inputElement.validity.valid) { // если инпут невалиден, вызвать функцию ниже
    showInputError(inputElement, inputElement.validationMessage, config);   // вызов функции показа ошибки
  } else { // если инпут валиден, то вызвать функцию
    hideInputError(inputElement, config); // вызов функции скрытия ошибки
  }
};

// note показ ошибки и подчёркивание поля, если инпут невалиден
const showInputError = (inputElement, errorMessage, config) => {
  console.log(inputElement)
  const forrma = document.querySelector('.popup__form_username'); // находим попап
  const forrmaa = forrma.querySelector('.popup__input')  // находим элемент ввода в попапе
  console.log(forrma)
  // const errorElement = inputElement.nextElementSibling; // находим ближайший span рядом с инпутом
  const errorElement = forrma.querySelector(`#${inputElement.id}-error`); // находим спан элемента инпута (не работает)
  // const errorElement = forrma.querySelector('.opup__input');

  // console.log(errorElement);
  inputElement.classList.add(config.inputErrorClass); // добавление подчёркивание линии инпута
  errorElement.textContent = errorMessage; // вывод сообщения об ошибке
};

// note скрытие ошибки и удаление красного подчёркивания поля, если инпут валиден
const hideInputError = (inputElement, config) => {
  const errorElement = inputElement.nextElementSibling; // находим ближайший span рядом с инпутом
  // const errorElement = inputElement.querySelector(`.${inputElement.id}-error`); // находим ближайший span рядом с инпутом
  inputElement.classList.remove(config.inputErrorClass) // удаление подчёркивание линии инпута
  errorElement.textContent = ''; // скрытие сообщения об ошибке
};

// note возврат true, если инпут валиден и false, если невалиден
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  });
};

// note Переключение состояния кнопки Submit, если инпут валиден или невалиден
function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {  //действия, если инпут невалиден
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true)
  } else { //действия, если инпут валиден
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.removeAttribute('disabled')
  }
}


// note запуск функции валидации с массивом настроек

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type-error',
  errorClass: 'popup__error_visible'
}

enableValidation(validationConfig);

