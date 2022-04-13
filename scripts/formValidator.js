export class FormValidator {
  constructor(settings, form) {
    this._form = form
    this._settings = settings
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector('.popup__input');
    console.log(errorElement);
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage; // вывод сообщения об ошибке
    errorElement.classList.add(this._settings.errorClass) // добавлен в 7-м спринте, аналог действия из _toggleButtonState
  };

  _hideInputError (inputElement) {
    const errorElement = this._form.querySelector('.popup__input');
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.textContent = ''; // скрытие сообщения об ошибке
    errorElement.classList.add(this._settings.errorClass) // добавлен в 7-м спринте, аналог действия из _toggleButtonState
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid
    });
  };



  _disableSubmitButton(buttonElement) {
    buttonElement.classList.add(this._settings.inactiveButtonClass);
    buttonElement.disabled = true;
  }

  _enableSubmitButton(buttonElement) {
    buttonElement.classList.remove(this._settings.inactiveButtonClass);
    buttonElement.disabled = false;
  }


  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._disableSubmitButton(buttonElement);
    } else {
      this._enableSubmitButton(buttonElement);

    }
  };

  _setEventListeners() {
    const buttonElement = this._form.querySelector(this._settings.submitButtonSelector);
    const inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
    // const buttonElement = this._form.querySelector(this._settings.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement)

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      })
    });
  };

  enableValidation() {
    this._form.addEventListener('submit', (evt) => { // добавляем каждому элементу массива (форме) слушателей
      evt.preventDefault();
    });
    this._setEventListeners();
  };

}



// la = new FormValidator();
// console.log(la);
/*
const validatorConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type-error',
  errorClass: 'popup__error_visible'
}

const form = document.querySelector('.popup__form_username');
console.log(form);


const bla = new FormValidator(validatorConfig, form);
 */
