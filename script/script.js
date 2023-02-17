const elemTemplate = document
  .querySelector(".elements-template")
  .content.querySelector(".element");
const elements = document.querySelector(".elements");
const popupInfoOpenBtn = document.querySelector(".profile__edit-btn");
const popupPlaceOpenBtn = document.querySelector(".profile__add-btn");
const popupPage = document.querySelectorAll(".popup");
const popupInfoPage = document.querySelector(".popup_type_info");
const popupPlacePage = document.querySelector(".popup_type_place");
const popupImagePage = document.querySelector(".popup_type_image");
const popupInputName = document.querySelector(".popup__input_textfield_name");
const popupInputTitle = document.querySelector(".popup__input_textfield_title");
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
const popupInfoCloseBtn = document.querySelector(".popup__close-btn_type_info");
const popupPlaceCloseBtn = document.querySelector(
  ".popup__close-btn_type_place"
);
const popupImageCloseBtn = document.querySelector(
  ".popup__close-btn_type_image"
);
const popupFormInfo = document.querySelector(".popup__form_type_info");
const popupFormCard = document.querySelector(".popup__form_type_card");
const cardName = document.querySelector(".popup__input_type_place-name");
const cardLink = document.querySelector(".popup__input_type_place-link");
const popupPic = document.querySelector(".popup__picture");
const popupCaption = document.querySelector(".popup__caption");

function makeCard(card) {
  const element = elemTemplate.cloneNode(true);
  element.querySelector(".element__text").textContent = card.name;
  element.querySelector(".element__picture").src = card.link;
  element.querySelector(".element__picture").alt = card.name;

  element.querySelector(".element__like").addEventListener("click", () => {
    element
      .querySelector(".element__like")
      .classList.toggle("element__like_active");
  });

  element.querySelector(".element__trash").addEventListener("click", () => {
    element.remove();
  });

  element
    .querySelector(".element__image-fullscreen")
    .addEventListener("click", (evt) => {
      evt.preventDefault();
      openPopup(popupImagePage);
      popupPic.src = card.link;
      popupPic.alt = card.name;
      popupCaption.textContent = card.name;
    });

  return element;
}

function renderCards() {
  const cards = initialCards.map((card) => {
    return makeCard(card);
  });
  elements.append(...cards);
}

function addNewCard(evt) {
  evt.preventDefault();
  const name = cardName.value;
  const link = cardLink.value;
  const element = makeCard({ name, link });
  elements.prepend(element);
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
  resetForm(config, popupWindow);
  popupWindow.classList.add("popup_active");
  document.addEventListener("keydown", closePopupOnEscape);
}

function closePopup(popupWindow) {
  popupWindow.classList.remove("popup_active");
  document.removeEventListener("keydown", closePopupOnEscape);
}

function closePopupPage(evt) {
  if (evt.target === evt.currentTarget) {
    popupPage.forEach((page) => closePopup(page));
  }
}

function openInfoPopup() {
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

renderCards();
enableValidation(config);
popupInfoOpenBtn.addEventListener("click", openInfoPopup);
popupPlaceOpenBtn.addEventListener("click", () => openPopup(popupPlacePage));
popupInfoCloseBtn.addEventListener("click", () => closePopup(popupInfoPage));
popupPlaceCloseBtn.addEventListener("click", () => closePopup(popupPlacePage));
popupImageCloseBtn.addEventListener("click", () => closePopup(popupImagePage));
popupFormInfo.addEventListener("submit", submitInfoForm);
popupFormCard.addEventListener("submit", addNewCard);
popupPage.forEach((page) => page.addEventListener("click", closePopupPage));
