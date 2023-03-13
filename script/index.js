import Card from './Card.js';
import { initialCards } from './places.js';
import FormValidator from './FormValidator.js';

const config = {
  popupElement: '.popup__form',
  inputElement: '.popup__input',
  errorElement: '.popup__item-error',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__item-error_active',
};

const elements = document.querySelector('.elements');
const popupInfoOpenBtn = document.querySelector('.profile__edit-btn');
const popupPlaceOpenBtn = document.querySelector('.profile__add-btn');
const popupPage = document.querySelectorAll('.popup');
const popupInfoPage = document.querySelector('.popup_type_info');
const popupPlacePage = document.querySelector('.popup_type_place');
const popupInputName = document.querySelector('.popup__input_textfield_name');
const popupInputTitle = document.querySelector('.popup__input_textfield_title');
const profileName = document.querySelector('.profile__name');
const profileTitle = document.querySelector('.profile__title');
const popupInfoCloseBtn = document.querySelector('.popup__close-btn_type_info');
const popupPlaceCloseBtn = document.querySelector(
  '.popup__close-btn_type_place'
);
const popupFormInfo = document.querySelector('.popup__form_type_info');
const popupFormCard = document.querySelector('.popup__form_type_card');
const cardName = document.querySelector('.popup__input_type_place-name');
const cardLink = document.querySelector('.popup__input_type_place-link');

const validateInfoPopup = new FormValidator(config, popupFormInfo);
const validatePlacePopup = new FormValidator(config, popupFormCard);

function makeCard(item) {
  const card = new Card(item, '.elements-template');
  const cardElement = card.generateCard();
  elements.append(cardElement);
  return cardElement;
}

function renderCards() {
  initialCards.forEach((item) => {
    makeCard(item);
  });
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
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_active');
    closePopup(openedPopup);
  }
}

function openPopup(popupWindow) {
  popupWindow.classList.add('popup_active');
  document.addEventListener('keydown', closePopupOnEscape);
}

function closePopup(popupWindow) {
  popupWindow.classList.remove('popup_active');
  document.removeEventListener('keydown', closePopupOnEscape);
}

function closePopupPage(evt) {
  if (evt.target === evt.currentTarget) {
    popupPage.forEach((page) => closePopup(page));
  }
}

function openInfoPopup() {
  resetForm(config, popupInfoPage);
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

function resetForm(config, popupWindow) {
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
    item.textContent = '';
  });
  const errorInputs = Array.from(
    popupWindow.querySelectorAll(config.inputElement)
  );
  errorInputs.forEach((item) => {
    item.classList.remove(config.inputErrorClass);
  });
}

renderCards();
validateInfoPopup.enableValidation();
validatePlacePopup.enableValidation();
popupInfoOpenBtn.addEventListener('click', openInfoPopup);
popupPlaceOpenBtn.addEventListener('click', () => {
  resetForm(config, popupPlacePage);
  openPopup(popupPlacePage);
});
popupInfoCloseBtn.addEventListener('click', () => closePopup(popupInfoPage));
popupPlaceCloseBtn.addEventListener('click', () => closePopup(popupPlacePage));
popupFormInfo.addEventListener('submit', submitInfoForm);
popupFormCard.addEventListener('submit', addNewCard);
popupPage.forEach((page) => page.addEventListener('click', closePopupPage));
