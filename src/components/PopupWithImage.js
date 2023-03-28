import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPic = document.querySelector('.popup__picture');
    this._popupCaption = document.querySelector('.popup__caption');
  }

  open(data) {
    console.log(data);
    this._popupPic.src = data.link;
    this._popupPic.alt = data.name;
    this._popupCaption.textContent = data.name;
    super.open();
  }
}
