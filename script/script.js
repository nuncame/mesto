const popupInfoOpenBtn = document.querySelector(".profile__edit-btn");
const popupPlaceOpenBtn = document.querySelector(".profile__add-btn");
const popupPage = document.querySelectorAll(".popup");
const popupInfoPage = document.querySelector(".popup_type_info");
const popupPlacePage = document.querySelector(".popup_type_place");
const popupForm = document.querySelector(".popup__form")
const popupInputName = document.querySelector(".popup__input_textfield_name");
const popupInputTitle = document.querySelector(".popup__input_textfield_title");
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
const popupCloseBtn = document.querySelectorAll(".popup__close-btn");

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

popupInfoOpenBtn.addEventListener("click", openInfoPopup);
popupPlaceOpenBtn.addEventListener("click", openPlacePopup);
popupCloseBtn.forEach(btn => btn.addEventListener("click", closePopup));
popupForm.addEventListener("submit", handleFormSubmit);


