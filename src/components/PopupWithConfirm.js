import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
  setSubmitAction(action) {
    this._handleDeleteConfirm = action;
  }

  setEventListeners() {
    this._popupSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleDeleteConfirm();
    });
    super.setEventListeners();
  }
}
