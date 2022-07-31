//----------------------------------------------------------------------------------------------------------------------
// note mesto - спринт 7
//----------------------------------------------------------------------------------------------------------------------

// note Создаём класс и сразу экспортируем его
export class FormValidator {
  constructor(settings, form) {
    this._form = form
    this._settings = settings
    // this._inputSelector = settings.inputSelector
    this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector))
    this._buttonElement = this._form.querySelector(this._settings.submitButtonSelector);
  }

  // note метод для установки слушателей
  _setEventListeners() {
    this._toggleButtonState()
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      })
    });
  };
  // note проверка инпута на валидность, вывод/скрытие ошибки и включение/выключение классов в зависимости от состояния инпута
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  // note метод вывода сообщения об ошибке в спан и применения стиля ошибки к инпуту
  _showInputError(inputElement, errorMessage) {
    const errorElement = inputElement.nextElementSibling
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage; // вывод сообщения об ошибке
  };

  // note метод скрытия сообщения об ошибке в спан и применения дефолтного стиля к инпуту
  _hideInputError (inputElement) {
    const errorElement = inputElement.nextElementSibling
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.textContent = ''; // скрытие сообщения об ошибке
  };

// note оценка состояния инпута (валиден или нет)
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid
    });
  };

  // note отключение кнопки при невалидном инпуте, сделан приватным после код-ревью
  _disableSubmitButton() {
    this._buttonElement.classList.add(this._settings.inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  // note включение кнопки при валидном инпуте
  _enableSubmitButton() {
    this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  // note выбор класса включения или выключения клавиши в зависимости от состояния инпута
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._disableSubmitButton(buttonElement);
    } else {
      this._enableSubmitButton(buttonElement);
    }
  };

  // note неприватный метод включения валидации
  enableValidation() {
    this._form.addEventListener('submit', (evt) => { // добавляем каждому элементу массива (форме) слушателей
      evt.preventDefault();
    });
    this._setEventListeners();
  };
}
