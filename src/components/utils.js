let submitButtonContent = '';

const renderLoading = (form, isLoading, text) => {
    const formSubmitButton = form.querySelector('.popup__button');

    if (isLoading) {
        submitButtonContent = formSubmitButton.textContent;
        formSubmitButton.textContent = text;
    } else {
        formSubmitButton.textContent = submitButtonContent;
    };
};

export { renderLoading };