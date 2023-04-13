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

  setUserInfo(userInfo) {
    this._nameSelector.textContent = userInfo.name;
    this._infoSelector.textContent = userInfo.about;
    this._avatarSelector.src = userInfo.avatar;
  }
}
