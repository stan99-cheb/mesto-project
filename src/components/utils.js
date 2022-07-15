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

const checkRes = (res) => {
    if (res.ok) {
        return res.json();
    };
    return Promise.reject(`Ошибка: ${res.status}`);
};

export { renderLoading, checkRes };