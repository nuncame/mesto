import "./pages/index.css";
import Card from "./components/Card.js";
import {
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
} from "./utils/constants.js";
import FormValidator from "./components/FormValidator.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import Api from "./components/Api";
import PopupWithConfirm from "./components/PopupWithConfirm";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-63/",
  headers: {
    authorization: "e6568974-8ec8-4226-acaa-3bf7e3f49d54",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  nameSelector: profileName,
  infoSelector: profileTitle,
  avatarSelector: avatarSelector,
});

let userId = null;

const cards = api.getCards();

Promise.all([cards, api.getUserData()])
  .then(([initialCards, userData]) => {
    userId = userData._id;
    renderCards(initialCards).renderItems(initialCards);
    userInfo.setUserInfo(userData);
  })
  .catch((err) => {
    console.log(err);
  });

const validateInfoPopup = new FormValidator(config, popupInfoForm);
const validatePlacePopup = new FormValidator(config, popupPlaceForm);
const validateAvatarPopup = new FormValidator(config, popupAvatarForm);

const imagePopup = new PopupWithImage(popupImagePage);
imagePopup.setEventListeners();

const removeCardPopup = new PopupWithConfirm(popupConfirmPage);
removeCardPopup.setEventListeners();

function createCard(item) {
  const card = new Card(
    {
      data: item,
      userId: userId,
      handleCardClick: () => {
        imagePopup.open(item);
      },
      handleLikeClick: (card) => {
        if (card.data.likes.find((userLiked) => userLiked._id === userId)) {
          api.removeLike(card.data._id).then((res) => {
            card.removeLike(card.data._id);
            card.getLikesQuantity(res.likes);
          });
        } else {
          api.addLike(card.data._id).then((res) => {
            card.addLike(card.data._id);
            card.getLikesQuantity(res.likes);
          });
        }
      },
      handleTrashClick: (card) => {
        removeCardPopup.open();
        removeCardPopup.setSubmitAction(() => {
          api.removeCard(card.data._id).then(() => {
            card.deleteCard();
            removeCardPopup.close();
          });
        });
      },
    },
    config.templateSelector
  );
  const cardElement = card.generateCard();
  return cardElement;
}

function renderCards(cards) {
  const defaultCardList = new Section(
    {
      items: cards,
      renderer: (data) => defaultCardList.addItem(createCard(data)),
    },
    config.cardsContainerSelector
  );

  return defaultCardList;
}

const infoPopup = new PopupWithForm(
  {
    popupSelector: popupInfoPage,
    formSelector: popupInfoForm,
    handleFormSubmit: (formData) => {
      userInfo.setUserInfo(formData);
      infoPopup.close();
    },
  },
  api
);
infoPopup.setEventListenersInfo();

const placePopup = new PopupWithForm(
  {
    popupSelector: popupPlacePage,
    formSelector: popupPlaceForm,
    handleFormSubmit: (formData) => {
      renderCards(cards).addItem(createCard(formData));
      placePopup.close();
    },
  },
  api
);
placePopup.setEventListenersCard();

const avatarPopup = new PopupWithForm(
  {
    popupSelector: popupAvatarPage,
    formSelector: popupAvatarForm,
    handleFormSubmit: (formData) => {
      userInfo.setUserInfo(formData);
      avatarPopup.close();
    },
  },
  api
);
avatarPopup.setEventListenersAvatar();

validateInfoPopup.enableValidation();
validatePlacePopup.enableValidation();
validateAvatarPopup.enableValidation();
popupInfoOpenBtn.addEventListener("click", () => {
  infoPopup.open();
  infoPopup.setInputValues(userInfo.getUserInfo());
});
popupPlaceOpenBtn.addEventListener("click", () => placePopup.open());
popupAvatarOpenBtn.addEventListener("click", () => avatarPopup.open());