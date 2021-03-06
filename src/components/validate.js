const enableValidation = ({
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass
}) => {
    const formList = document.querySelectorAll(formSelector);

    const showInputError = (formElement, inputElement, errorMessage) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

        const formBox = formElement.getBoundingClientRect();
        const inputElementBox = inputElement.getBoundingClientRect();

        const coordX = inputElementBox.x - formBox.x;
        const coordY = inputElementBox.y - formBox.y + inputElementBox.height;

        errorElement.style.left = coordX + 'px';
        errorElement.style.top = coordY + 'px';

        inputElement.classList.add(inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(errorClass);
    };

    const hideInputError = (formElement, inputElement) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.remove(inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(errorClass);
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
            buttonElement.classList.add(inactiveButtonClass);
        } else {
            buttonElement.removeAttribute('disabled');
            buttonElement.classList.remove(inactiveButtonClass);
        }
    };

    const setEventListeners = (formElement) => {
        const inputList = Array.from(formElement.querySelectorAll(inputSelector));
        const buttonElement = formElement.querySelector(submitButtonSelector);

        inputList.forEach((inputElement) => {
            toggleButtonState(inputList, buttonElement);

            inputElement.addEventListener('input', () => {
                isValid(formElement, inputElement);

                toggleButtonState(inputList, buttonElement);
            })
        })
    };

    formList.forEach((formElement) => {
        setEventListeners(formElement);
    });
};

export { enableValidation };