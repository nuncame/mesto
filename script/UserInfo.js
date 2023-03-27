export default class UserInfo {
  constructor({ userNameSelector, infoSelector }) {
    this._userNameSelector = userNameSelector;
    this._infoSelector = infoSelector;
  }

  getUserInfo() {
    this._userData = {
      userName: this._userNameSelector.textContent,
      info: this._infoSelector.textContent,
    };
    return this._userData;
  }

  setUserInfo(userInfo) {
    this._userNameSelector.textContent = userInfo.userName;
    this._infoSelector.textContent = userInfo.info;
  }
}
