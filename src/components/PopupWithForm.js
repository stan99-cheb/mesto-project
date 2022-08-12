import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = this._popup.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        this._formValues['formElement'] = this._popup.querySelector('.popup__form');

        return this._formValues;
    }

    setInputValues(data) {
        this._inputList.forEach(input => input.value = data[input.name]);
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.querySelector('.popup__form').addEventListener('submit', (evt) => {
            evt.preventDefault();

            this._handleFormSubmit(this._getInputValues());
        });
    }

    close() {
        super.close();

        this._popup.querySelector('.popup__form').reset();
    }
}