
export default class Validate {
    constructor(selectors, formElement) {
        this._formSelector = selectors.formSelector;
        this._inputSelector = selectors.inputSelector;
        this._submitButtonSelector = selectors.submitButtonSelector;
        this._inactiveButtonClass = selectors.inactiveButtonClass;
        this._inputErrorClass = selectors.inputErrorClass;
        this._errorClass = selectors.errorClass;

        this._formElement = formElement;

        // this.formList = document.querySelectorAll(this.formSelector);
        // this.formList.forEach((formElement) => {
        //     this._setEventListeners(formElement);
        // });
    }

    setEventListeners() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

        inputList.forEach((inputElement) => {
            this._toggleButtonState(inputList, buttonElement);

            inputElement.addEventListener('input', () => {
                this._isValid(this._formElement, inputElement);

                this._toggleButtonState(inputList, buttonElement);
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
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(this._errorClass);
    };

    _showInputError(formElement, inputElement, errorMessage) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

        const formBox = formElement.getBoundingClientRect();
        const inputElementBox = inputElement.getBoundingClientRect();

        const coordX = inputElementBox.x - formBox.x;
        const coordY = inputElementBox.y - formBox.y + inputElementBox.height;

        errorElement.style.left = coordX + 'px';
        errorElement.style.top = coordY + 'px';

        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    };
}