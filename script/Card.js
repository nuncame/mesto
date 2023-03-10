import { popupImagePage, popupPic, popupCaption, openPopup } from "./index.js";
export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._image = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._elementPic = this._element.querySelector(".element__picture");
    this._elementLikeBtn = this._element.querySelector(".element__like");
    this._elementTrashBtn = this._element.querySelector(".element__trash");
    
    this._element.querySelector(".element__text").textContent = this._name;
    this._elementPic.src = this._image;
    this._elementPic.alt = this._name;

    this._setEventListeners();
    return this._element;
  }

  _handleOpenPopup() {
    popupPic.src = this._image;
    popupPic.alt = this._name;
    popupCaption.textContent = this._name;
    openPopup(popupImagePage);
  }

  _handleRemoveElement() {
    this._element.remove();
    this._element = null;
  }

  _handleLikeElement() {
    const _elementLike = this._element.querySelector(".element__like");
    _elementLike.classList.toggle("element__like_active");
  }

  _setEventListeners() {
    this._elementTrashBtn.addEventListener("click", () => {
      this._handleRemoveElement();
    });

    const _elementPicture = this._element.querySelector(
      ".element__image-fullscreen"
    );
    this._elementPic.addEventListener("click", () => {});

    this._elementLikeBtn.addEventListener("click", () => {
      this._handleLikeElement();
    });
  }
}
