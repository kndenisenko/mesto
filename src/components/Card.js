//----------------------------------------------------------------------------------------------------------------------
// note mesto - спринт 7
//----------------------------------------------------------------------------------------------------------------------

export class Card {
  constructor(data, cardTemplateSelector, handleImageClick) {
    this._cardTemplate = document.querySelector(cardTemplateSelector).content;  // что клонируем
    this._cardElement = this._cardTemplate.querySelector('.element').cloneNode(true); 
    this._cardImage = this._cardElement.querySelector('.element__image');
    this._buttonLike = this._cardElement.querySelector('.element__like');
    this._handleImageClick = handleImageClick;
    this._idHandler = document.querySelector('.element');
    this._likeCounter = this._cardTemplate.querySelector('.element__like-counter');
    this._name = data.name;
    this._src = data.link;
    this._id = data._id;
    this._likes = data.likes;

  }

  // note два следующих метода  должны работать через this._ но не получилось :'(
  _handleLikeIcon = () => { // Лайк карточки
    this._buttonLike.classList.toggle('element__like_liked')
  }

  _handleDelete = () => { // Удаление карточки
    this._cardElement.remove();
    this._cardElement = null;
  } 
  
  // добавление слушателей 
  _addEventListeners () {
    this._buttonLike.addEventListener('click', () => this._handleLikeIcon());
    this._cardElement.querySelector('.element__delete').addEventListener('click', () => this._handleDelete());
    this._cardImage.addEventListener('click', this._handleImageClick);
  }

  // note функция создания карточек
  getCardElement() {
    this._cardElement.querySelector('.element__title').textContent = this._name; // добавляем имя (заголовок)
    this._cardImage.src = this._src;
    this._cardImage.alt = this._name;

    this._cardElement.id = this._id // добавляем ID к карточке
    this._likeCounter.textContent = this._likes.length;
    this._addEventListeners();

    return this._cardElement; // Возвращаем результат работы функции

  }
}
