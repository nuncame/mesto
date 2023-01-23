const popupOpenBtn = document.querySelector(".profile__edit-btn");
const popupPage = document.querySelector(".popup");

let popupInputName = document.querySelector(".popup__input_textfield_name");
let popupInputTitle = document.querySelector(".popup__input_textfield_title");
let profileName = document.querySelector(".profile__name");
let profileTitle = document.querySelector(".profile__title");
const popupCloseBtn = document.querySelector(".popup__close-btn");

function openPopup() {
  popupPage.classList.add("popup_active");
  popupInputName.value = profileName.textContent
  popupInputTitle.value = profileTitle.textContent
}

function closePopup() {
  popupPage.classList.remove("popup_active")
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileTitle.textContent = popupInputTitle.value;
  closePopup();
}

popupOpenBtn.addEventListener("click", openPopup);
popupCloseBtn.addEventListener("click", closePopup);
popupPage.addEventListener("submit", handleFormSubmit);


