let submitButtonContent = '';

const cleanForm = (form) => {
    const inputList = Array.from(form.querySelectorAll('.form__input'));
    const submitButton = form.querySelector('.form__submit-button');

    form.reset();

    inputList.forEach((inputElement) => {
        const errorElement = form.querySelector(`.${inputElement.id}-error`);

        if (errorElement.classList.contains('form__input-error_active')) {
            inputElement.classList.remove('form__input_type_error');
            errorElement.classList.remove('form__input-error_active')
        }
    });

    if (!submitButton.classList.contains('form__submit-button_inactive')) {
        submitButton.classList.add('form__submit-button_inactive');
        submitButton.setAttribute('disabled', '');
    }
}

const renderLoading = (form, isLoading) => {
    const formSubmitButton = form.querySelector('.form__submit-button');

    if (isLoading) {
        submitButtonContent = formSubmitButton.textContent;
        formSubmitButton.textContent = 'Сохранение...';
    } else {
        formSubmitButton.textContent = submitButtonContent;
    }
}

export { cleanForm, renderLoading };