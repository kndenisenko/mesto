//----------------------------------------------------------------------------------------------------------------------
// note mesto - спринт 7
//----------------------------------------------------------------------------------------------------------------------

export class Card {
  constructor(data, cardTemplateSelector, handleImageClick, userID, handledeleteClick, handleLikeClick) { 
    this._name = data.name;
    this._src = data.link;
    this._id = data._id;
    this._userID = userID
    this._ownerID = data.owner._id;

    this._cardTemplate = document.querySelector(cardTemplateSelector).content;  // что клонируем
    this._cardElement = this._cardTemplate.querySelector('.element').cloneNode(true); 
    this._cardImage = this._cardElement.querySelector('.element__image');

    this._buttonDelete = this._cardElement.querySelector('.element__delete');
    this._handleImageClick = handleImageClick;
    this._idHandler = document.querySelector('.element');

    this._handledeleteClick = handledeleteClick;


    this._buttonLike = this._cardElement.querySelector('.element__like');
    this._likes = data.likes;
    this._handleLikeClick = handleLikeClick;
    this._likeCounter = this._cardElement.querySelector('.element__like-counter');


  }

  // Обработчики клика на лайк и на удаление
  _handleLikeIcon = () => { // Лайк карточки
  //  this._buttonLike.classList.toggle('element__like_liked') // уже не требуется, за дайк отвечает другой метод 
  }

  handleDelete = () => { // Удаление карточки
    this._handledeleteClick(this._id) // тут запускается функция удаления карточки через api и тут же ей передаётся id нужной карточки
    this._cardElement.remove();
    this._cardElement = null;
    console.log('handleDelete from card js', this._id)
  } 
  
  // добавление слушателей 
  _addEventListeners () {
    this._buttonLike.addEventListener('click', () => this._handleLikeClick(this._id)); // ('click', () => this._handleLikeIcon());
    this._cardElement.querySelector('.element__delete').addEventListener('click', () => this._handledeleteClick(this._id)); 
    this._cardImage.addEventListener('click', () => this._handleImageClick());
  }

  // вот это должно менять количество лайков, но что-то пошло не так
  setLikes(newLikes) {
    this._likes = newLikes
    // console.log(this._likes.length)
    this._likeCounter.textContent = this._likes.length

    // меняем цвет кнопки лайка при нажатии
    if(this.isLiked()) {
      this._buttonLike.classList.add('element__like_liked')
    } else {
      this._buttonLike.classList.remove('element__like_liked')
    }
  }

  // Карточки, лйакнутые пользователем этой страницы
  isLiked() {
    const myOwnLikes = this._likes.find(user => user._id === this._userID)

    return myOwnLikes
  }


  // note функция создания карточек
  getCardElement() {
    this._cardElement.querySelector('.element__title').textContent = this._name; // добавляем имя (заголовок)
    this._cardImage.src = this._src;
    this._cardImage.alt = this._name;

    this._cardElement.id = this._id // добавляем ID к карточке
    
    this._addEventListeners();
    this.setLikes(this._likes);

    if(this._ownerID !== this._userID) {
      this._buttonDelete.style.display = 'none'
    }
    return this._cardElement; // Возвращаем результат работы 

  }
}
