export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleClick = this._handleClick.bind(this);
        this._handleButtonClose = this._handleButtonClose.bind(this);
    }

    open() {
        // this._popup.addEventListener('mousedown', this._handleClick);
        // document.addEventListener('keydown', this._handleEscClose);

        this._popup.classList.add('popup_active');
    }

    close() {
        // document.removeEventListener('keydown', this._handleEscClose);
        // this._popup.removeEventListener('mousedown', this._handleClick);

        this._popup.classList.remove('popup_active');
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _handleClick(evt) {
        if (evt.target.classList.contains('popup_active')) {
            this.close();
        };
    }

    _handleButtonClose() {
        this.close();
    }

    setEventListeners() {
        this._popup.querySelector('.popup__close').addEventListener('click', this._handleButtonClose);
    }
}