import { Popup } from "./popup.js";

// Создаём класса popupWithImage, который расширяет исходный класс popup
export class popupWithImage extends Popup {
  // перезаписываем open
  open(text, link) {
    const image = this._popup.querySelector('.popup__photobox-image');
    const caption = this._popup.querySelector('.popup__photobox-caption');

    image.src = link;
    caption.textContent = text;
    
    super.open() // отсылка к исходному классу
  }
}