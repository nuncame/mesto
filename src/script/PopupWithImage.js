import { popupPic, popupCaption } from '../index.js';
import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(data, popupSelector) {
    super(popupSelector);
    this._name = data.name;
    this._image = data.link;
  }

  open() {
    popupPic.src = this._image;
    popupPic.alt = this._name;
    popupCaption.textContent = this._name;
    super.open();
  }
}
