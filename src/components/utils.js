let submitButtonContent = '';

const renderLoading = (form, isLoading) => {
    const formSubmitButton = form.querySelector('.popup__button');

    if (isLoading) {
        submitButtonContent = formSubmitButton.textContent;
        formSubmitButton.textContent = 'Сохранение...';
    } else {
        formSubmitButton.textContent = submitButtonContent;
    };
};

export { renderLoading };