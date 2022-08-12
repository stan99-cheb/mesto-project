export default class UserInfo {
    constructor({name, about}) {
        this._name = document.querySelector(name).textContent;
        this._about = document.querySelector(about).textContent;
    }

    getUserInfo() {
        return { name: this._name, about: this._about };
    }

    setUserInfo(user) {
        this._user = user;

        // document.querySelector('.profile__title').textContent = this._user.name;
        // document.querySelector('.profile__subtitle').textContent = this._user.about;
        // document.querySelector('.profile__avatar').style.backgroundImage = `url(${this._user.avatar})`;
    }
}