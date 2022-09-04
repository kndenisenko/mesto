export class Section {
  constructor({ items, renderer }, containerSelector){
    this._items = items
    this._renderer = renderer
    this._container = document.querySelector(containerSelector);
  }

  // инициализация карточек из массива
  renderItems() {
    this._items.forEach(data  => {
      this.addFirstItems(this._renderer(data))
    });
  }

// добавление исходные карточки в DOM
  addFirstItems(element) {
    this._container.append(element);
  }

  // добавление новой, пользровательской карточки в DOM
  addUserItem(element) {
    this._container.prepend(element);
  }
}
