import Card from "./Card.js";
import { initialCards } from "./places.js";
import FormValidator from "./FormValidator.js";

const config = {
  popupElement: ".popup__form",
  inputElement: ".popup__input",
  errorElement: ".popup__item-error",
  submitButtonSelector: ".popup__save-btn",
  inactiveButtonClass: "popup__save-btn_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__item-error_active",
};

const cardsContainer = document.querySelector(".elements");
const popupInfoOpenBtn = document.querySelector(".profile__edit-btn");
const popupPlaceOpenBtn = document.querySelector(".profile__add-btn");
const popupList = document.querySelectorAll(".popup");
const popupInfoPage = document.querySelector(".popup_type_info");
const popupPlacePage = document.querySelector(".popup_type_place");
const popupInputName = document.querySelector(".popup__input_textfield_name");
const popupInputTitle = document.querySelector(".popup__input_textfield_title");
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
const popupFormInfo = document.querySelector(".popup__form_type_info");
const popupFormCard = document.querySelector(".popup__form_type_card");
const cardName = document.querySelector(".popup__input_type_place-name");
const cardLink = document.querySelector(".popup__input_type_place-link");
const popupImagePage = document.querySelector(".popup_type_image");
const popupPic = document.querySelector(".popup__picture");
const popupCaption = document.querySelector(".popup__caption");

const validateInfoPopup = new FormValidator(config, popupFormInfo);
const validatePlacePopup = new FormValidator(config, popupFormCard);

function makeCard(item) {
  const card = new Card(item, ".elements-template");
  const cardElement = card.generateCard();
  return cardElement;
}

function insertCard(item) {
  const card = makeCard(item);
  cardsContainer.append(card);
}

function renderCards() {
  initialCards.forEach((item) => {
    insertCard(item);
  });
}

function addNewCard(evt) {
  evt.preventDefault();
  const name = cardName.value;
  const link = cardLink.value;
  const element = makeCard({ name, link });
  cardsContainer.prepend(element);
  popupFormCard.reset();
  closePopup(popupPlacePage);
}

function closePopupOnEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_active");
    closePopup(openedPopup);
  }
}

function openPopup(popupWindow) {
  popupWindow.classList.add("popup_active");
  document.addEventListener("keydown", closePopupOnEscape);
}

function closePopup(popupWindow) {
  popupWindow.classList.remove("popup_active");
  document.removeEventListener("keydown", closePopupOnEscape);
}

function closePopupByClick(evt) {
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains("popup__close-btn")
  ) {
    closePopup(evt.currentTarget);
  }
}

function openInfoPopup() {
  validateInfoPopup.resetValidation();
  openPopup(popupInfoPage);
  popupInputName.value = profileName.textContent;
  popupInputTitle.value = profileTitle.textContent;
}

function submitInfoForm(evt) {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileTitle.textContent = popupInputTitle.value;
  closePopup(popupInfoPage);
}

function resetFormInputs(popupWindow) {
  const inputFields = Array.from(
    popupWindow.querySelectorAll(config.popupElement)
  );
  inputFields.forEach((item) => {
    item.reset();
  });
}

renderCards();
validateInfoPopup.enableValidation();
validatePlacePopup.enableValidation();
popupInfoOpenBtn.addEventListener("click", openInfoPopup);
popupPlaceOpenBtn.addEventListener("click", () => {
  resetFormInputs(popupPlacePage);
  validatePlacePopup.resetValidation();
  openPopup(popupPlacePage);
});
popupFormInfo.addEventListener("submit", submitInfoForm);
popupFormCard.addEventListener("submit", addNewCard);
popupList.forEach((page) =>
  page.addEventListener("mousedown", closePopupByClick)
);

export { popupImagePage, popupPic, popupCaption, openPopup };
