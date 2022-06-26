

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    const formBox = formElement.getBoundingClientRect();
    const inputElementBox = inputElement.getBoundingClientRect();

    const coordX = inputElementBox.x - formBox.x;
    const coordY = inputElementBox.y - formBox.y + inputElementBox.height;

    errorElement.style.left = coordX + 'px';
    errorElement.style.top = coordY + 'px';

    inputElement.classList.add('form__input_type_error');
    errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove('form__input_type_error');
    errorElement.textContent = '';
};

const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.setAttribute('disabled', '');
    } else {
        buttonElement.removeAttribute('disabled');
    }
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.form__input'));
    const buttonElement = formElement.querySelector('.form__submit-button');

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement);

            toggleButtonState(inputList, buttonElement);
        });
    });
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.form'));

    formList.forEach((formElement) => {
        setEventListeners(formElement);
    });
};

export { enableValidation };