'use strict'

import { initCards, addCard, hundleClickCards } from '../module/card.js';
import { popup_on, popup_out } from '../module/popup.js'
import { enableValidation } from '../module/validate.js'
import { } from '../module/utils.js'

(function () {
    const addButton = document.querySelector('.profile__add-button');

    function handleClickAddButton() {
        const elementAddPlace = document.querySelector('#form-add-place-template').content.cloneNode(true);

        popup_on(elementAddPlace);

        const form = document.querySelector('.form-add-place');

        enableValidation(form, popup_out);
    };

    addButton.addEventListener('click', handleClickAddButton)
})();

(function () {
    const editButton = document.querySelector('.profile__edit-button');

    function handleClickEditButton() {
        const elementEditPlace = document.querySelector('#form-edit-profile-template').content.cloneNode(true);

        elementEditPlace.querySelector('.form-edit-profile__name-input').value = document.querySelector('.profile__title').textContent;
        elementEditPlace.querySelector('.form-edit-profile__job-input').value = document.querySelector('.profile__subtitle').textContent;

        popup_on(elementEditPlace);

        const form = document.querySelector('.form-edit-profile');

        enableValidation(form, popup_out);
    }

    editButton.addEventListener('click', handleClickEditButton);
})();

(function () {
    const cards = document.querySelector('.cards');

    initCards();    //Первоначальная инициализация карточек
    
    cards.addEventListener('click', (e) => { hundleClickCards(e, popup_on) });  //Вешаем обработчик на блок
})();