export default class FormValidator {
    constructor(selectors, formSelector) {
        this._inputSelector = selectors.inputSelector;
        this._submitButtonSelector = selectors.submitButtonSelector;
        this._inactiveButtonClass = selectors.inactiveButtonClass;
        this._inputErrorClass = selectors.inputErrorClass;
        this._errorClass = selectors.errorClass;

        this._formElement = document.querySelector(formSelector);
    };

    setEventListeners() {
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);

        this._inputList.forEach((inputElement) => {
            this._toggleButtonState(this._inputList, this._buttonElement);

            inputElement.addEventListener('input', () => {
                this._isValid(this._formElement, inputElement);

                this._toggleButtonState(this._inputList, this._buttonElement);
            })
        })
    };

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.setAttribute('disabled', '');
            buttonElement.classList.add(this._inactiveButtonClass);
        } else {
            buttonElement.removeAttribute('disabled');
            buttonElement.classList.remove(this._inactiveButtonClass);
        }
    };

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };

    _isValid(formElement, inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(formElement, inputElement);
        }
    };

    _hideInputError(formElement, inputElement) {
        this._errorElement = formElement.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.remove(this._inputErrorClass);
        this._errorElement.textContent = '';
        this._errorElement.classList.remove(this._errorClass);
    };

    _showInputError(formElement, inputElement, errorMessage) {
        this._errorElement = formElement.querySelector(`.${inputElement.id}-error`);

        this._formBox = formElement.getBoundingClientRect();
        this._inputElementBox = inputElement.getBoundingClientRect();

        this._coordX = this._inputElementBox.x - this._formBox.x;
        this._coordY = this._inputElementBox.y - this._formBox.y + this._inputElementBox.height;

        this._errorElement.style.left = this._coordX + 'px';
        this._errorElement.style.top = this._coordY + 'px';

        inputElement.classList.add(this._inputErrorClass);
        this._errorElement.textContent = errorMessage;
        this._errorElement.classList.add(this._errorClass);
    };

    resetValidation() {
        this._toggleButtonState(this._inputList, this._buttonElement);

        this._inputList.forEach((inputElement) => {
            this._hideInputError(this._formElement, inputElement)
        });
    };
}