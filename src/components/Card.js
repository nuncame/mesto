export default class Card {
  constructor(
    { data, userId, handleCardClick, handleLikeClick, handleTrashClick },
    templateSelector
  ) {
    this.data = data;
    this._cardId = this.data._id;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._templateSelector = templateSelector;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._elementTrashBtn = this._element.querySelector(".element__trash");
    this._elementPic = this._element.querySelector(".element__picture");
    this._elementLikeBtn = this._element.querySelector(".element__like");
    this._elementLikeQty = this._element.querySelector(
      ".element__like-quantity"
    );

    this._element.querySelector(".element__text").textContent = this.data.name;
    this._elementPic.src = this.data.link;
    this._elementPic.alt = this.data.name;

    this._removeTrashIcon();
    this._renderLike();
    this.getLikesQuantity(this.data.likes);
    this._setEventListeners();

    return this._element;
  }

  _removeTrashIcon() {
    if (this.data.owner._id != this._userId) {
      this._elementTrashBtn.remove();
    }
  }

  _renderLike() {
    if (this.data.likes.find((userLiked) => userLiked._id === this._userId)) {
      this._elementLikeBtn.classList.add("element__like_active");
    }
  }

  getLikesQuantity(likes) {
    this.data.likes = likes;
    this._elementLikeQty.textContent = this.data.likes.length;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  addLike() {
    this._elementLikeBtn.classList.add("element__like_active");
  }

  removeLike() {
    this._elementLikeBtn.classList.remove("element__like_active");
  }

  _setEventListeners() {
    this._elementTrashBtn.addEventListener("click", () => {
      this._handleTrashClick(this);
    });

    this._elementPic.addEventListener("click", () => {
      this._handleCardClick();
    });

    this._elementLikeBtn.addEventListener("click", () => {
      this._handleLikeClick(this);
    });
  }
}
