import Card from "./Card.js";
import { initialCards } from "./places.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

const config = {
  popupElement: ".popup__form",
  inputElement: ".popup__input",
  errorElement: ".popup__item-error",
  submitButtonSelector: ".popup__save-btn",
  inactiveButtonClass: "popup__save-btn_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__item-error_active",
  cardsContainerSelector: ".elements",
  templateSelector: ".elements-template",
};

const popupInfoOpenBtn = document.querySelector(".profile__edit-btn");
const popupPlaceOpenBtn = document.querySelector(".profile__add-btn");
const popupInfoPage = document.querySelector(".popup_type_info");
const popupPlacePage = document.querySelector(".popup_type_place");
const popupInputName = document.querySelector(".popup__input_textfield_name");
const popupInputTitle = document.querySelector(".popup__input_textfield_title");
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
const popupInfoForm = document.querySelector(".popup__form_type_info");
const popupPlaceForm = document.querySelector(".popup__form_type_card");
const popupImagePage = document.querySelector(".popup_type_image");
const popupPic = document.querySelector(".popup__picture");
const popupCaption = document.querySelector(".popup__caption");

const validateInfoPopup = new FormValidator(config, popupInfoForm);
const validatePlacePopup = new FormValidator(config, popupPlaceForm);

function renderCard(item) {
  const card = new Card(
    {
      data: item,
      handleCardClick: () => {
        const imagePopup = new PopupWithImage(item, popupImagePage);
        imagePopup.open();
        imagePopup.setEventListeners();
      },
    },
    config.templateSelector
  );
  const cardElement = card.generateCard();
  return cardElement;
}

const defaultCardList = new Section(
  {
    items: initialCards,
    renderer: (data) => defaultCardList.addItem(renderCard(data)),
  },
  config.cardsContainerSelector
);

defaultCardList.renderItems(initialCards);

const currentUserInfo = new UserInfo({
  userNameSelector: profileName,
  infoSelector: profileTitle,
});

const infoPopup = new PopupWithForm({
  popupSelector: popupInfoPage,
  formSelector: popupInfoForm,
  handleFormSubmit: (formData) => {
    currentUserInfo.setUserInfo(formData);
    infoPopup.close();
  },
});

infoPopup.setEventListeners();

const placePopup = new PopupWithForm({
  popupSelector: popupPlacePage,
  formSelector: popupPlaceForm,
  handleFormSubmit: (formData) => {
    defaultCardList.addItem(renderCard(formData));
    placePopup.close();
  },
});

placePopup.setEventListeners();

validateInfoPopup.enableValidation();
validatePlacePopup.enableValidation();
popupInfoOpenBtn.addEventListener("click", () => {
  infoPopup.open();
  popupInputName.value = currentUserInfo.getUserInfo().userName;
  popupInputTitle.value = currentUserInfo.getUserInfo().info;
});
popupPlaceOpenBtn.addEventListener("click", () => placePopup.open());

export { popupImagePage, popupPic, popupCaption };
