import Arhyz from '../images/arkhyz.jpg';
import Karelia from '../images/karelia.jpg';
import Ivanovo from '../images/ivanovo.jpg';
import Kamchatka from '../images/kamchatka.jpg';
import Adygea from '../images/adygea.jpg';
import Baikal from '../images/baikal.jpg';

const initialCards = [
  {
    name: 'Архыз',
    link: Arhyz,
  },
  {
    name: 'Карелия',
    link: Karelia,
  },
  {
    name: 'Иваново',
    link: Ivanovo,
  },
  {
    name: 'Камчатка',
    link: Kamchatka,
  },
  {
    name: 'Адыгея',
    link: Adygea,
  },
  {
    name: 'Байкал',
    link: Baikal,
  },
];

const config = {
  popupElement: '.popup__form',
  inputElement: '.popup__input',
  errorElement: '.popup__item-error',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__item-error_active',
  cardsContainerSelector: '.elements',
  templateSelector: '.elements-template',
};

const popupInfoOpenBtn = document.querySelector('.profile__edit-btn');
const popupPlaceOpenBtn = document.querySelector('.profile__add-btn');
const popupInfoPage = document.querySelector('.popup_type_info');
const popupPlacePage = document.querySelector('.popup_type_place');
const profileName = document.querySelector('.profile__name');
const profileTitle = document.querySelector('.profile__title');
const popupInfoForm = document.querySelector('.popup__form_type_info');
const popupPlaceForm = document.querySelector('.popup__form_type_card');
const popupImagePage = document.querySelector('.popup_type_image');

export {
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
};
