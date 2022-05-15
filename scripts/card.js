//----------------------------------------------------------------------------------------------------------------------
// note mesto - спринт 7
//----------------------------------------------------------------------------------------------------------------------

import { popupPhotobox, popupPhotoboxPicture, popupPhotoboxCaption } from "./const.js";
import { openModalWindow } from "./utils.js";


export class Card {
  constructor(data, cardTemplateSelector) {
    this._cardTemplate = document.querySelector(cardTemplateSelector).content /* .querySelector('.element') */;  // что клонируем
    this._name = data.name;
    this._src = data.src;
  }


  // note два следующих метода  должны работать через this._ но не получилось :'(
  _handleLikeIcon = (event) => { // Лайк карточки
    event.target.classList.toggle('element__like_liked')
  }
  _handleDelete = (event) => { // Удаление карточки
    event.target.closest('.element').remove();
  }
  _handlePhotobox = () => { // Открытие попапа с большой картинкой
    popupPhotoboxPicture.src = this._src;
    popupPhotoboxPicture.alt = this._name;
    popupPhotoboxCaption.textContent = this._name;
    openModalWindow(popupPhotobox);  // открытие попапа
  }

  _addEventListeners (cardNode, cardImage) {
    this._cardElement.querySelector('.element__like').addEventListener('click', this._handleLikeIcon);
    // cardNode.querySelector('.element__delete').addEventListener('click', this._handleDelete);
    this._cardElement.querySelector('.element__delete').addEventListener('click', this._handleDelete);
    cardImage.addEventListener('click', this._handlePhotobox);
  }

  // note функция создания карточек
  getCardElement () {
    this._cardElement = this._cardTemplate.cloneNode(true);  // клонируем темплейт
    this._cardElement.querySelector('.element__title').textContent = this._name;

    const cardImage = this._cardElement.querySelector('.element__image');
    cardImage.src = this._src;
    cardImage.alt = this._alt;

    this._addEventListeners(this._cardElement, cardImage);

    return this._cardElement; // Возвращаем результат работы функции
  }
}
