const popupImagePage = document.querySelector('.popup_type_image');
const popupPic = document.querySelector('.popup__picture');
const popupCaption = document.querySelector('.popup__caption');
const popupImageCloseBtn = document.querySelector(
  '.popup__close-btn_type_image'
);

export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._image = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__text').textContent = this._name;
    this._element.querySelector('.element__picture').src = this._image;
    this._element.querySelector('.element__picture').alt = this._name;

    return this._element;
  }

  _handleOpenPopup() {
    popupPic.src = this._image;
    popupPic.alt = this._name;
    popupCaption.textContent = this._name;
    popupImagePage.classList.add('popup_active');
    document.addEventListener('keyup', (evt) => this._handleEscClose(evt));
  }

  _handleClosePopup() {
    popupPic.src = '';
    popupImagePage.classList.remove('popup_active');
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this._handleClosePopup();
    }
  }

  _handleRemoveElement() {
    this._element.remove();
  }

  _setEventListeners() {
    const _elementRemoveBtn = this._element.querySelector('.element__trash');
    _elementRemoveBtn.addEventListener('click', () => {
      this._handleRemoveElement();
    });

    const _elementPicture = this._element.querySelector(
      '.element__image-fullscreen'
    );
    _elementPicture.addEventListener('click', () => {
      this._handleOpenPopup();
    });

    popupImageCloseBtn.addEventListener('click', () => {
      this._handleClosePopup();
    });

    const _elementLike = this._element.querySelector('.element__like');
    _elementLike.addEventListener('click', () => {
      _elementLike.classList.toggle('element__like_active');
    });
  }
}
