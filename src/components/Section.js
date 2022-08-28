export class Section {
  constructor({ items, renderer }, containerSelector){
    this._items = items
    this._renderer = renderer
    this._container = document.querySelector(containerSelector);
  }

  // инициализация карточек из массива
  renderItems() {
    this._items.forEach(data  => {
      this.addItem(this._renderer(data))
    });
  }

// добавление карточки в DOM, в начало - prepend
  addItem(element) {
    this._container.append(element);
  }
}
