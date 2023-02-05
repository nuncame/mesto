const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Карелия',
    link: './images/karelia.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Адыгея',
    link: './images/adygea.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const elemTemplate = document.querySelector(".elements-template").content.querySelector(".element");
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
const popupCloseBtn = document.querySelectorAll(".popup__close-btn");
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
    element.querySelector(".element__like").classList.toggle("element__like_active");
  });

  element.querySelector(".element__trash").addEventListener("click", () => {
    element.remove();
  });

  element.querySelector(".element__image-fullscreen").addEventListener("click", (evt) => {
    evt.preventDefault();
    popupImagePage.classList.add("popup_active");
    popupPic.src = card.link;
    popupPic.alt = card.name;
    popupCaption.textContent = card.name;
  });

  return element;
}

function renderCards() {
  const cards = initialCards.map((card) => {
    return makeCard(card);
  })
  elements.append(...cards);
}

function addNewCard (evt) {
  evt.preventDefault();
  const name = cardName.value;
  const link = cardLink.value;
  const element = makeCard({name, link});
  elements.prepend(element);
  closePopup();
}

function openInfoPopup() {
  popupInfoPage.classList.add("popup_active");
  popupInputName.value = profileName.textContent;
  popupInputTitle.value = profileTitle.textContent;
}

function openPlacePopup() {
  popupPlacePage.classList.add("popup_active");
}

function closePopup() {
  popupPage.forEach(item => item.classList.remove("popup_active"));
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileTitle.textContent = popupInputTitle.value;
  closePopup();
}

renderCards();
popupInfoOpenBtn.addEventListener("click", openInfoPopup);
popupPlaceOpenBtn.addEventListener("click", openPlacePopup);
popupCloseBtn.forEach(btn => btn.addEventListener("click", closePopup));
popupFormInfo.addEventListener("submit", handleFormSubmit);
popupFormCard.addEventListener("submit", addNewCard);


