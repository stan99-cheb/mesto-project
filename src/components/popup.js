export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscCloseThis = this._handleEscClose.bind(this);
        this._handleClickThis = this._handleClick.bind(this);
    }

    open() {
        document.addEventListener('keydown', this._handleEscCloseThis);

        this._popup.classList.add('popup_active');
    }

    close() {
        document.removeEventListener('keydown', this._handleEscCloseThis);

        this._popup.classList.remove('popup_active');
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _handleClick(evt) {
        if (evt.target.classList.contains('popup_active') ||
                evt.target.classList.contains('popup__close')) {
            this.close();
            this._popup.removeEventListener('mousedown', this._handleClickThis);
        };
    }

    setEventListeners() {
        this._popup.addEventListener('mousedown', this._handleClickThis)
    }
}