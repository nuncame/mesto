import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, formSelector, handleFormSubmit }, api) {
    super(popupSelector);
    this._formSelector = formSelector;
    this._handleFormSubmit = handleFormSubmit;
    this._submitBtnSelector =
      this._popupSelector.querySelector(".popup__save-btn");
    this._inputList = this._popupSelector.querySelectorAll(".popup__input");
    this._api = api;
  }

  _popupDataLoading(isLoading) {
    if (isLoading) {
      this._submitBtnSelector.textContent = "Сохраняется...";
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

  _postCard() {
    this._api
      .addCard(this._getInputValues())
      .then((data) => {
        return this._handleFormSubmit(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _updateUserData() {
    this._api
      .setUserData(this._getInputValues())
      .then((data) => {
        return this._handleFormSubmit(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _updateAvatar() {
    this._api
      .setAvatar(this._getInputValues())
      .then((data) => {
        return this._handleFormSubmit(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setEventListenersCard() {
    this._formSelector.addEventListener("submit", (event) => {
      event.preventDefault();
      this._popupDataLoading(true);
      this._postCard();
    });
    super.setEventListeners();
  }

  setEventListenersInfo() {
    this._formSelector.addEventListener("submit", (event) => {
      event.preventDefault();
      this._popupDataLoading(true);
      this._updateUserData();
    });
    super.setEventListeners();
  }

  setEventListenersAvatar() {
    this._formSelector.addEventListener("submit", (event) => {
      event.preventDefault();
      this._popupDataLoading(true);
      this._updateAvatar();
    });
    super.setEventListeners();
  }

  close() {
    this._formSelector.reset();
    super.close();
  }
}
