export default class UserInfo {
  constructor({ nameSelector, infoSelector, avatarSelector }) {
    this._nameSelector = nameSelector;
    this._infoSelector = infoSelector;
    this._avatarSelector = avatarSelector;
  }

  getUserInfo() {
    this._userData = {
      name: this._nameSelector.textContent,
      about: this._infoSelector.textContent,
    };
    return this._userData;
  }

  setUserInfo(userData) {
    this._nameSelector.textContent = userData.name;
    this._infoSelector.textContent = userData.about;
  }

  setAvatar(userData) {
    this._avatarSelector.src = userData.avatar;
  }
}
