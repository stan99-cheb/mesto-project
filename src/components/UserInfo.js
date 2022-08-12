export default class UserInfo {
    constructor({name, about, avatar}) {
        this._nameElement = document.querySelector(name);
        this._aboutElement = document.querySelector(about);
        this._avatarElement = document.querySelector(avatar);
    }

    getUserInfo() {
        return { name: this._name, about: this._about };
    }

    getUserId() {
        return this._id;
    }

    setUserInfo(user) {
        this._name = user.name;
        this._about = user.about;
        this._avatar = user.avatar;
        this._id = user._id;

        this._nameElement.textContent = this._name;
        this._aboutElement.textContent = this._about;
        this._avatarElement.style.backgroundImage = `url(${this._avatar})`;
    }
}