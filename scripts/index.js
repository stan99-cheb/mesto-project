'use strict'

import { hundleClickCards } from '../module/card.js';
import { popup_on, popup_out } from '../module/popup.js'
import { enableValidation } from '../module/validate.js'
import { getDataProfile, setDataProfile, getNewCard } from '../module/utils.js'

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