//----------------------------------------------------------------------------------------------------------------------
// note mesto - спринт 7
//----------------------------------------------------------------------------------------------------------------------

// note Функции открытия и закрытия попапов, используются во всех попапах. Улучшена в шестом спринте, добавлена возможность закрытия через esc и оверлей
export function closePopup(popup) {
  popup.classList.remove('popup_visible');
  document.removeEventListener('keydown', closePushingEscape); // снятие слушателя, если попап закрыт другим способом

}

// note Функции открытия и закрытия попапов, используются во всех попапах. Улучшена в шестом спринте, добавлена возможность закрытия через esc и оверлей
export function openModalWindow(modalWindow) {
  modalWindow.classList.add('popup_visible');
  document.addEventListener('keydown', closePushingEscape);
  modalWindow.addEventListener('mousedown', closePopupClickingOverlay)
}

// note закрытие попапа через escape
const closePushingEscape = (event) => {
  if (event.key === 'Escape') { // если нажат escape, то
    const openedPopup = document.querySelector('.popup_visible'); // находим попап
    closePopup(openedPopup) //удаляем класс открытого попапа
  }
}

// note закрытие попапа по клику на оверлей
function closePopupClickingOverlay (evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}
