


//Валидация форм
// Функция, которая добавляет класс с ошибкой
const showInputError = (form, inputElement) => {
    const errorElement = form.querySelector(`.${inputElement.id}-error`);
    
    errorElement.textContent = inputElement.validationMessage
    //inputElement.classList.add('form-add-place__name-place_error');

    const formBox = form.getBoundingClientRect();
    const inputElementBox = inputElement.getBoundingClientRect();

    const coordX = inputElementBox.x - formBox.x;
    const coordY = inputElementBox.y - formBox.y + inputElementBox.height;

    errorElement.style.setProperty('--form-error-position-left', coordX + 'px');
    errorElement.style.setProperty('--form-error-position-top', coordY + 'px');

    inputElement.style.borderBottom = 'var(--form-input-border-bottom-error)';
};
  
// Функция, которая удаляет класс с ошибкой
const hideInputError = (form, inputElement) => {
    const errorElement = form.querySelector(`.${inputElement.id}-error`);

    errorElement.textContent = "";
    //inputElement.classList.remove('form-add-place__name-place_error');

    inputElement.style.borderBottom = 'var(--form-input-border-bottom)';
};
  
// Функция, которая проверяет валидность поля
const isValid = (form, inputElement) => {
    if (!inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      showInputError(form, inputElement);
    } else {
      // Если проходит, скроем
      hideInputError(form, inputElement);
    }
};

const hasInvalidInput = (inputList) => {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
          // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
  
      return !inputElement.validity.valid;
    })
};

const toggleButtonState = (inputList, buttonElement) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      buttonElement.setAttribute('disabled', '');
    } else {
          // иначе сделай кнопку активной
      buttonElement.removeAttribute('disabled');
    }
};

const setEventListeners = (form) => {
    const inputList = Array.from(form.querySelectorAll('input'));
    const buttonElement = form.querySelector('[type="submit"]');
    
    toggleButtonState(inputList, buttonElement);

    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            isValid(form, inputElement);

            toggleButtonState(inputList, buttonElement);
        });
    })
};

const enableValidation = (form, popup_out) => {

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        popup_out();
    }, { once: true });

    setEventListeners(form);
}

export { enableValidation };