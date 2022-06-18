'use strict'

import { hundleClickCards } from './components/card.js';
import { popup_on, popup_out } from './components/popup.js'
import { enableValidation } from './components/validate.js'
import { getDataProfile, setDataProfile, getNewCard } from './components/utils.js'

import './pages/index.css';

(function () {
    const addButton = document.querySelector('.profile__add-button');

    function handleClickAddButton() {
        const elementAddPlace = document.querySelector('#form-add-place-template').content.cloneNode(true);

        popup_on(elementAddPlace);

        const form = document.querySelector('.form-add-place');

        enableValidation(form, popup_out, getNewCard);
    };

    addButton.addEventListener('click', handleClickAddButton)
})();

(function () {
    const editButton = document.querySelector('.profile__edit-button');

    function handleClickEditButton() {
        const elementEditProfile = document.querySelector('#form-edit-profile-template').content.cloneNode(true);

        getDataProfile(elementEditProfile);   //Получение текущих значений из профиля
        
        popup_on(elementEditProfile);         //Открываем попап

        const form = document.querySelector('.form-edit-profile'); //Получаем элемент формы

        enableValidation(form, popup_out, setDataProfile);  //Добавляем валидацию полей
    }

    editButton.addEventListener('click', handleClickEditButton);
})();

(function () {
    const cards = document.querySelector('.cards');
    
    cards.addEventListener('click', (e) => {    //Вешаем обработчик на блок
        hundleClickCards(e, popup_on)           //Передаем в обработчик функцию открытия попапа
    });
})();

console.log('Hello, World!');

const numbers = [2, 3, 5];

// Стрелочная функция. Не запнётся ли на ней Internet Explorer?
const doubledNumbers = numbers.map(number => number * 2);

console.log(doubledNumbers); // 4, 6, 10 