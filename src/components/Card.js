//----------------------------------------------------------------------------------------------------------------------
// note mesto - спринт 7
//----------------------------------------------------------------------------------------------------------------------

export class Card {
  constructor(data, cardTemplateSelector, handleImageClick, userID, handledeleteClick) { 
    this._name = data.name;
    this._src = data.link;
    this._id = data._id;
    this._userID = userID
    this._ownerID = data.owner._id;
    this._likes = data.likes;
    this._cardTemplate = document.querySelector(cardTemplateSelector).content;  // что клонируем
    this._cardElement = this._cardTemplate.querySelector('.element').cloneNode(true); 
    this._cardImage = this._cardElement.querySelector('.element__image');
    this._buttonLike = this._cardElement.querySelector('.element__like');
    this._buttonDelete = this._cardElement.querySelector('.element__delete');
    this._handleImageClick = handleImageClick;
    this._idHandler = document.querySelector('.element');
    this._likeCounter = this._cardTemplate.querySelector('.element__like-counter');
    this._handledeleteClick = handledeleteClick;
  }

  // Обработчики клика на лайк и на удаление
  _handleLikeIcon = () => { // Лайк карточки
    this._buttonLike.classList.toggle('element__like_liked')
  }

  handleDelete = () => { // Удаление карточки
    this._handledeleteClick(this._id) // тут запускается функция удаления карточки через api и тут же ей передаётся id нужной карточки
    this._cardElement.remove();
    this._cardElement = null;
    console.log('handleDelete from card js', this._id)
  } 
  
  // добавление слушателей 
  _addEventListeners () {
    this._buttonLike.addEventListener('click', () => this._handleLikeIcon());
    this._cardElement.querySelector('.element__delete').addEventListener('click', () => this._handledeleteClick(this._id)); // 'click', () => this._handleDelete()
    this._cardImage.addEventListener('click', () => this._handleImageClick());
  }

  // note функция создания карточек
  getCardElement() {
    this._cardElement.querySelector('.element__title').textContent = this._name; // добавляем имя (заголовок)
    this._cardImage.src = this._src;
    this._cardImage.alt = this._name;

    this._cardElement.id = this._id // добавляем ID к карточке
    this._likeCounter.textContent = this._likes.length;
    this._addEventListeners();

    if(this._ownerID != this._userID) {
      this._buttonDelete.style.display = 'none'
    }

    return this._cardElement; // Возвращаем результат работы функции

  }
}
