import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
        this._formValues = {};
        
        this._formValues['formElement'] = this._popup.querySelector('.popup__form');

        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.querySelector('.popup__form').addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }
}