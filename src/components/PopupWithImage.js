import { Popup } from "./Popup.js";

// Создаём класса popupWithImage, который расширяет исходный класс popup
export class PopupWithImage extends Popup {// перезаписываем open
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__photobox-image');
    this._caption = this._popup.querySelector('.popup__photobox-caption');

  }
  open(text, link) {
    this._image.src = link;
    this._image.alt = text; 
    this._caption.textContent = text;

    
    super.open()// отсылка к исходному классу
  }
}
