export default class UserInfo {
    constructor(userName, userAbout, userAvatar) {
        this._userName = userName;
        this._userAbout = userAbout;
        this._userAvatar = userAvatar;
    }

    getUserInfo() {

    }

    setUserInfo() {
        document.querySelector('.profile__title').textContent = this._userName;
        document.querySelector('.profile__subtitle').textContent = this._userAbout;
        document.querySelector('.profile__avatar').style.backgroundImage = `url(${this._userAvatar})`;
    }
}