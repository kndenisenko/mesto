export class Section {
  constructor({ items, renderer }, containerSelector){
    this._items = items
    this._renderer = renderer
    this._container = document.querySelector(containerSelector);
  }

//  // инициализация карточек из массива
//   renderItems() {
//     this._items.forEach(data  => {
//       this.addFirstItems(this._renderer(data))
//     });
//   }

renderItems(items, userID){ 
  items.forEach(item => {
    this._renderer(item, userID)
  });
};


// добавление исходные карточки в DOM
  addFirstItems(item) {
    this._container.append(item);
  }

 // добавление новой, пользровательской карточки в DOM
  addUserItem(item) {
    this._container.prepend(item);
  }
}
