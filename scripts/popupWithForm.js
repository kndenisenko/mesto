import { Popup } from "./popup.js";

export class popupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector)

    this._handleSubmit = handleSubmit
    this._form = this._popup.querySelector('.popup__form') 
  }

  // Получаем значения инпутов у активной формы
  _getInputValues() {
    const inputs = [...this._form.querySelectorAll('.popup__input')];
    const values = {};
    inputs.forEach((input) => {
      values[input.name] = input.value
    });
    return values;
  }

    // Устанавливаем слушатель события на сабмит формы
  setEventListeners () {
    super.setEventListeners();
    this._form.addEventListener('submit', () => {
      this._handleSubmit(this._getInputValues())
    });
  }

  // Закрытие попапа и сброс значений инпутов
  close() {
    super.close();
    this._form.reset() // сбрасываем данные формы   
  }
}