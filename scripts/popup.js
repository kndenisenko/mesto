const popup = document.querySelector(".popup");
let popupOpenButton = document.querySelector('.profile__open-popup');
let popupCloseButton = document.querySelector('.popup__close-button');

const popupToggle = function() {
  popup.classList.toggle('popup_toggle');
};

popupOpenButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);
