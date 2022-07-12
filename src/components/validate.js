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

        toggleButtonState(inputList, buttonElement);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                isValid(formElement, inputElement);

                toggleButtonState(inputList, buttonElement);
            });
        });
    };

    formList.forEach((formElement) => {
        setEventListeners(formElement);
    });
};

// const cleanForm = (form) => {
    // const inputList = Array.from(form.querySelectorAll('.form__input'));
    // const submitButton = form.querySelector('.form__submit-button');

    // form.reset();

    // inputList.forEach((inputElement) => {
    //     const errorElement = form.querySelector(`.${inputElement.id}-error`);

    //     if (errorElement.classList.contains('form__input-error_active')) {
    //         inputElement.classList.remove('form__input_type_error');
    //         errorElement.classList.remove('form__input-error_active')
    //     }
    // });

    // if (!submitButton.classList.contains('form__submit-button_inactive')) {
    //     submitButton.classList.add('form__submit-button_inactive');
    //     submitButton.setAttribute('disabled', '');
    // }
// }

export { enableValidation };