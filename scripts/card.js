//----------------------------------------------------------------------------------------------------------------------
// note mesto - спринт 7
//----------------------------------------------------------------------------------------------------------------------

export class Card {
  constructor(data, cardTemplateSelector, handleImageClick) {
    this._cardTemplate = document.querySelector(cardTemplateSelector).content;  // что клонируем
    this._name = data.name;
    this._src = data.src;
    this._handleImageClick = handleImageClick
  }

  // note два следующих метода  должны работать через this._ но не получилось :'(
  _handleLikeIcon = (event) => { // Лайк карточки
    event.target.classList.toggle('element__like_liked')
  }
  _handleDelete = (event) => { // Удаление карточки
    event.target.closest('.element').remove();
  }
  
  // добавление слушателей 
  _addEventListeners (cardImage) {
    this._cardElement.querySelector('.element__like').addEventListener('click', this._handleLikeIcon);
    this._cardElement.querySelector('.element__delete').addEventListener('click', this._handleDelete);
    this._cardElement.querySelector('.element__image').addEventListener('click', this._handleImageClick);
  }

  // note функция создания карточек
  getCardElement() {
    this._cardElement = this._cardTemplate.cloneNode(true);  // клонируем темплейт
    this._cardElement.querySelector('.element__title').textContent = this._name; // добавляем имя (заголовок)

    const cardImage = this._cardElement.querySelector('.element__image');
    cardImage.src = this._src;
    cardImage.alt = this._name;

    this._addEventListeners(cardImage);

    return this._cardElement; // Возвращаем результат работы функции

  }
}
