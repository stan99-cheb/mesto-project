export default class UserInfo {
    constructor(user) {
        this._userName = user.name;
        this._userAbout = user.about;
        this._userAvatar = user.avatar;
        this._userId = "";
    }

    getUserInfo() {
        return {
            name: this._userName,
            about: this._userAbout,
            avatar: this._userAvatar,
            _id: this._userId
        }
    }

    setUserInfo(user) {
        this._userName = user.name;
        this._userAbout = user.about;
        this._userAvatar = user.avatar;
        this._userId = user._id;

        document.querySelector('.profile__title').textContent = this._userName;
        document.querySelector('.profile__subtitle').textContent = this._userAbout;
        document.querySelector('.profile__avatar').style.backgroundImage = `url(${this._userAvatar})`;
    }
}