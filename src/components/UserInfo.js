export default class UserInfo {
    constructor(user) {
        this._user = user;
    }

    getUserInfo() {
        return this._user;
    }

    setUserInfo(user) {
        this._user = user;

        document.querySelector('.profile__title').textContent = this._user.name;
        document.querySelector('.profile__subtitle').textContent = this._user.about;
        document.querySelector('.profile__avatar').style.backgroundImage = `url(${this._user.avatar})`;
    }
}