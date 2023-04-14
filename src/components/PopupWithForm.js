import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, formSelector, handleFormSubmit }) {
    super(popupSelector);
    this._formSelector = formSelector;
    this._handleFormSubmit = handleFormSubmit;
    this._submitBtnSelector =
      this._popupSelector.querySelector(".popup__save-btn");
    this._inputList = this._popupSelector.querySelectorAll(".popup__input");
  }

  popupDataLoading(isLoading) {
    if (isLoading) {
      this._submitBtnSelector.textContent = "Сохранение...";
    } else {
      this._submitBtnSelector.textContent = "Сохранить";
    }
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    this._formSelector.addEventListener("submit", (event) => {
      event.preventDefault();
      this.popupDataLoading(true);
      this._handleFormSubmit(this._getInputValues());
    });

    super.setEventListeners();
  }

  close() {
    this._formSelector.reset();
    super.close();
  }
}
