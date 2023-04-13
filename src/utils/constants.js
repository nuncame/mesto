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
const popupAvatarOpenBtn = document.querySelector(".profile__avatar-btn");
const popupInfoPage = document.querySelector(".popup_type_info");
const popupPlacePage = document.querySelector(".popup_type_place");
const popupAvatarPage = document.querySelector(".popup_type_avatar");
const popupConfirmPage = document.querySelector(".popup_type_confirm");
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
const popupInfoForm = document.querySelector(".popup__form_type_info");
const popupPlaceForm = document.querySelector(".popup__form_type_card");
const popupAvatarForm = document.querySelector(".popup__form_type_avatar");
const popupImagePage = document.querySelector(".popup_type_image");
const avatarSelector = document.querySelector(".profile__avatar");

export {
  config,
  popupInfoOpenBtn,
  popupPlaceOpenBtn,
  popupAvatarOpenBtn,
  popupInfoPage,
  popupPlacePage,
  popupAvatarPage,
  popupConfirmPage,
  profileName,
  profileTitle,
  popupInfoForm,
  popupPlaceForm,
  popupAvatarForm,
  popupImagePage,
  avatarSelector,
};
