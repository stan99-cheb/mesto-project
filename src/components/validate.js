

const showInputError = (form, inputElement) => {
    const errorElement = form.querySelector(`.${inputElement.id}-error`);
    const formBox = form.getBoundingClientRect();
    const inputElementBox = inputElement.getBoundingClientRect();

    const coordX = inputElementBox.x - formBox.x;
    const coordY = inputElementBox.y - formBox.y + inputElementBox.height;

    errorElement.textContent = inputElement.validationMessage

    errorElement.style.setProperty('--form-error-position-left', coordX + 'px');
    errorElement.style.setProperty('--form-error-position-top', coordY + 'px');

    inputElement.style.borderBottom = 'var(--form-input-border-bottom-error)';
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (form, inputElement) => {
    const errorElement = form.querySelector(`.${inputElement.id}-error`);

    errorElement.textContent = "";

    inputElement.style.borderBottom = 'var(--form-input-border-bottom)';
};

// Функция, которая проверяет валидность поля
const isValid = (form, inputElement) => {

    if (!inputElement.validity.valid) {
        showInputError(form, inputElement); // Если поле не проходит валидацию, покажем ошибку
    } else {
        hideInputError(form, inputElement); // Если проходит, скроем
    };
};

const hasInvalidInput = (inputList) => {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
        // Обход массива прекратится и вся функция
        // hasInvalidInput вернёт true

        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonSubmit) => {

    if (hasInvalidInput(inputList)) {                 // Если есть хотя бы один невалидный инпут
        buttonSubmit.setAttribute('disabled', '');    // сделай кнопку неактивной
    } else {
        buttonSubmit.removeAttribute('disabled');     // иначе сделай кнопку активной
    };
};

const setEventListeners = (form) => {
    const inputList = Array.from(form.querySelectorAll('input'));   //Находим всем инпуты в форме
    const buttonSubmit = form.querySelector('[type="submit"]');     //Находим кнопку submit

    toggleButtonState(inputList, buttonSubmit);

    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            isValid(form, inputElement);

            toggleButtonState(inputList, buttonSubmit);
        });
    });
};

const enableValidation = (form, popup_out, callback) => { //На вход получаем элемент формы, обработчик формы и функцию закрытия попапа

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        callback();         //Обработчик формы

        popup_out();        //Закрываем попап
    }, { once: true });

    setEventListeners(form);
};

export { enableValidation };