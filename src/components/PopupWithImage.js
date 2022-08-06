import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImageCaption = document.querySelector(popupSelector).querySelector('.popup__caption');
        this._popupImageLink = document.querySelector(popupSelector).querySelector('.popup__image');
    }

    open(image) {
        super.open();

        this._popupImageCaption.textContent = image.alt;
        this._popupImageLink.src = image.src;
        this._popupImageLink.alt = image.alt;
    }
}