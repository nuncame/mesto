export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleClickClose(evt) {
    if (
      evt.target === evt.currentTarget ||
      evt.target.classList.contains("popup__close-btn")
    ) {
      this.close(evt.currentTarget);
    }
  }

  open() {
    this._popupSelector.classList.add("popup_active");
    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
  }

  close() {
    this._popupSelector.classList.remove("popup_active");
  }

  setEventListeners() {
    this._popupSelector.addEventListener("mousedown", (evt) => {
      this._handleClickClose(evt);
    });
  }
}
