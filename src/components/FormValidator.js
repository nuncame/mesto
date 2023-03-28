export default class FormValidator {
  constructor(config, formElement) {
    this.config = config;
    this._formElement = formElement;
    this._btnSave = this._formElement.querySelector(
      this.config.submitButtonSelector
    );
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this.config.inputElement)
    );
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );

    inputElement.classList.add(this.config.inputErrorClass);
    errorElement.classList.add(this.config.errorClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this.config.inputErrorClass);
    errorElement.classList.remove(this.config.errorClass);
    errorElement.textContent = '';
  }

  _allInputsValid() {
    return this._inputList.every((item) => {
      return item.validity.valid;
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState() {
    if (this._allInputsValid(this._inputList)) {
      this._btnSave.removeAttribute('disabled');
    } else {
      this._btnSave.setAttribute('disabled', 'disabled');
    }
  }

  _setEventListeners() {
    this._inputList.forEach((element) => {
      element.addEventListener('input', () => {
        this._checkInputValidity(element);
        this._toggleButtonState();
      });
      this._formElement.addEventListener('reset', () => {
        setTimeout(() => {
          this._toggleButtonState(), 0;
        });
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }

  resetValidation() {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
    this._toggleButtonState();
  }
}
