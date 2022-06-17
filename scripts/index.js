'use strict'

const timeAnimation = parseInt((getComputedStyle(document.querySelector(':root')).getPropertyValue('--time-animation')), 10) - 15;
const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const cards = document.querySelector('.cards');

function popupHandlerKey(e) {
    if (e.key === 'Escape') {
        //Убираем обработчик клавиатуры
        document.removeEventListener('keydown', popupHandlerKey);
        popup_out();
    };
}

function popup_on(element) {
    //Клонируем попап из шаблона
    const popupCopy = document.querySelector('#popup-template').content.cloneNode(true);

    //добавляем в попап элемент
    popupCopy.querySelector('.popup__container').append(element);
    //Подмешиваем селектор плавного появления окна
    popupCopy.querySelector('.popup').classList.add('popup_fade-in');
    //показываем попап на экране
    document.body.append(popupCopy);

    document.querySelector('.popup__close-button').addEventListener('click', popup_out, { once: true });

    const clickAnyPlace = document.querySelector('.popup');

    function handleClickAnyPlace(e) {
        if (e.target.classList.contains('popup')) {
            clickAnyPlace.removeEventListener('click', handleClickAnyPlace);
            popup_out();
        }
    };

    clickAnyPlace.addEventListener('click', handleClickAnyPlace);

    //Добавляем слушатель событий клавиатуры
    document.addEventListener('keydown', popupHandlerKey);
}

function popup_out() {
    const popup = document.querySelector('.popup');
    //Удаляем селектор плавного открытия
    popup.classList.remove('popup_fade-in');
    //Подмешиваем селектор плавного закрытия
    popup.classList.add('popup_fade-out');
    //Ждем окончания анимации
    setTimeout(() => { popup.remove() }, timeAnimation);
}




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

const enableValidation = (form) => {

    setEventListeners(form);
}

function handleClickAddButton() {
    const elementAddPlace = document.querySelector('#form-add-place-template').content.cloneNode(true);

    popup_on(elementAddPlace);

    const form = document.querySelector('.form-add-place');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const newCard = {
            name: form.querySelector('.form-add-place__name-place-input').value,
            link: form.querySelector('.form-add-place__link-place-input').value
        };
        addCard(newCard);
        popup_out();
    }, { once: true });

    enableValidation(form);
}

function handleClickEditButton() {
    const elementEditPlace = document.querySelector('#form-edit-profile-template').content.cloneNode(true);

    elementEditPlace.querySelector('.form-edit-profile__name-input').value = document.querySelector('.profile__title').textContent;
    elementEditPlace.querySelector('.form-edit-profile__job-input').value = document.querySelector('.profile__subtitle').textContent;

    popup_on(elementEditPlace);

    const form = document.querySelector('.form-edit-profile');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        document.querySelector('.profile__title').textContent = document.querySelector('.form-edit-profile__name-input').value;
        document.querySelector('.profile__subtitle').textContent = document.querySelector('.form-edit-profile__job-input').value;
        popup_out();
    }, { once: true });

    enableValidation(form);
}

addButton.addEventListener('click', handleClickAddButton)
editButton.addEventListener('click', handleClickEditButton);

const initialCards = [
    {
        name: 'Владивосток',
        link: 'https://images.unsplash.com/photo-1587637885131-8b08567433d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
    },
    {
        name: 'Нижний Новгород',
        link: 'https://images.unsplash.com/photo-1547041959-0e5137186987?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80'
    },
    {
        name: 'Сочи',
        link: 'https://images.unsplash.com/photo-1522817510788-e72e35ce0774?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80'
    },
    {
        name: 'Казань',
        link: 'https://images.unsplash.com/photo-1628066068625-015ea7bcc21a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
    },
    {
        name: 'Ленинград',
        link: 'https://images.unsplash.com/photo-1556610961-2fecc5927173?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1367&q=80'
    },
    {
        name: 'Москва',
        link: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=749&q=80'
    }
];

import { addCard } from '../module/card.js';

initialCards.forEach(item => addCard(item, cards));

//Вешаем обработчик на блок
cards.addEventListener('click', hundleClickCards);