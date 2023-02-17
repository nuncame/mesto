const config = {
  popupElement: ".popup__form",
  inputElement: ".popup__input",
  errorElement: ".popup__item-error",
  submitButtonSelector: ".popup__save-btn",
  inactiveButtonClass: "popup__save-btn_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__item-error_active",
};

const enableValidation = (config) => {
  const isValid = (popupElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(
        popupElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      hideInputError(popupElement, inputElement);
    }
  };

  const showInputError = (popupElement, inputElement, errorMessage) => {
    const errorElement = popupElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(config.inputErrorClass);
    errorElement.classList.add(config.errorClass);
    errorElement.textContent = errorMessage;
  };

  const hideInputError = (popupElement, inputElement) => {
    const errorElement = popupElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = "";
  };

  const setEventListeners = (popupElement) => {
    const inputList = Array.from(
      popupElement.querySelectorAll(config.inputElement)
    );
    const saveBtn = popupElement.querySelector(config.submitButtonSelector);
    inputList.forEach((formElement) => {
      formElement.addEventListener("input", () => {
        isValid(popupElement, formElement);
        toggleButtonState(inputList, saveBtn);
      });
      popupElement.addEventListener("reset", () => {
        setTimeout(() => {
          toggleButtonState(inputList, saveBtn), 0;
        });
      });
    });
  };

  function allInputsValid(inputList) {
    return inputList.every((popupElement) => {
      return popupElement.validity.valid;
    });
  }

  function toggleButtonState(inputList, saveBtn) {
    if (allInputsValid(inputList)) {
      saveBtn.removeAttribute("disabled");
    } else {
      saveBtn.setAttribute("disabled", "disabled");
    }
  }

  const popupFormList = Array.from(
    document.querySelectorAll(config.popupElement)
  );
  popupFormList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

const resetForm = (config, popupWindow) => {
  const inputFields = Array.from(
    popupWindow.querySelectorAll(config.popupElement)
  );
  inputFields.forEach((item) => {
    item.reset();
  });
  const errorSpans = Array.from(
    popupWindow.querySelectorAll(config.errorElement)
  );
  errorSpans.forEach((item) => {
    item.classList.remove(config.errorClass);
    item.textContent = "";
  });
  const errorInputs = Array.from(
    popupWindow.querySelectorAll(config.inputElement)
  );
  errorInputs.forEach((item) => {
    item.classList.remove(config.inputErrorClass);
  });
};
