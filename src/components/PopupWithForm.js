import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector)

    this._handleSubmit = handleSubmit
    this._form = this._popup.querySelector('.popup__form') 
    this._inputs = [...this._form.querySelectorAll('.popup__input')];
    this._values = {};
  }

  // Получаем значения инпутов у активной формы
  _getInputValues() {
    this._inputs.forEach((input) => {
    this._values[input.name] = input.value
    });
    return this._values;
  }

    // Устанавливаем слушатель события на сабмит формы
  setEventListeners () {
    
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => {
      e.preventDefault()
      this._handleSubmit(this._getInputValues())
    });
  }

  // Закрытие попапа и сброс значений инпутов
  close() {
    super.close();
    this._form.reset() // сбрасываем данные формы   
  }
}