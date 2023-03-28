import "./pages/index.css";
import Card from "./components/Card.js";
import {
  initialCards,
  config,
  popupInfoOpenBtn,
  popupPlaceOpenBtn,
  popupInfoPage,
  popupPlacePage,
  profileName,
  profileTitle,
  popupInfoForm,
  popupPlaceForm,
  popupImagePage,
} from "./utils/constants.js";
import FormValidator from "./components/FormValidator.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";

const validateInfoPopup = new FormValidator(config, popupInfoForm);
const validatePlacePopup = new FormValidator(config, popupPlaceForm);

const imagePopup = new PopupWithImage(popupImagePage);

imagePopup.setEventListeners();

function renderCard(item) {
  const card = new Card(
    {
      data: item,
      handleCardClick: () => {
        imagePopup.open(item);
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
  infoPopup.setInputValues(currentUserInfo.getUserInfo());
});
popupPlaceOpenBtn.addEventListener("click", () => placePopup.open());
