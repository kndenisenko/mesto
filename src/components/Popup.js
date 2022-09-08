export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
    this._handleEscClose = this._handleEscClose.bind(this)// Магия защиты от потери контекста
  }

 // открытие попапа, перезаписано в popupWithForm
  open () {
    this._popup.classList.add('popup_visible');
  document.addEventListener('keydown', this._handleEscClose);
  }

 // Закрытие попапа
  close () {
    this._popup.classList.remove('popup_visible');
    document.removeEventListener('keydown', this._handleEscClose);// снятие слушателя, если попап закрыт другим способом
  }

 // Закрытие попапа через esc
  _handleEscClose (evt) {
    if (evt.key === "Escape") {
      this.close(); // Возможна потеря контекста
    }
  } 


 // Установка слушателей событий
  setEventListeners () {
    this._popup.addEventListener('click', (e) => {
      if(e.target.classList.contains('popup__close-button') || e.target === e.currentTarget) // Чтобы попап закрывался по клику
      {
        this.close();
      }
    })
  }
}
