const popupOpenBtn = document.querySelector(".profile__edit-btn");
const popupPage = document.querySelector(".popup");

let popupInputName = document.querySelector(".popup__input-name");
let popupInputTitle = document.querySelector(".popup__input-title");
let profileName = document.querySelector(".profile__name");
let profileTitle = document.querySelector(".profile__title");

popupOpenBtn.addEventListener("click", openPopup);

function openPopup() {
  popupPage.classList.add("popup_active");
  popupInputName.value = profileName.textContent
  popupInputTitle.value = profileTitle.textContent
}

const popupCloseBtn = document.querySelector(".popup__close-btn");

popupCloseBtn.addEventListener("click", closePopup);

function closePopup() {
  popupPage.classList.remove("popup_active")
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileTitle.textContent = popupInputTitle.value;
}

popupPage.addEventListener("submit", handleFormSubmit);
popupPage.addEventListener("submit", closePopup);

