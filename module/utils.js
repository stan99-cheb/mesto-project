

import { addCard } from './card.js'
import { popup_out } from './popup.js'

function getNewCard() {

    const newCard = {
        name: document.querySelector('.form-add-place__name-place-input').value,
        link: document.querySelector('.form-add-place__link-place-input').value
    };

    addCard(newCard);
}

function getDataProfile(elementEditProfile) {
    elementEditProfile.querySelector('.form-edit-profile__name-input').value = document.querySelector('.profile__title').textContent;
    elementEditProfile.querySelector('.form-edit-profile__job-input').value = document.querySelector('.profile__subtitle').textContent;

}

function setDataProfile() {
    document.querySelector('.profile__title').textContent = document.querySelector('.form-edit-profile__name-input').value;
    document.querySelector('.profile__subtitle').textContent = document.querySelector('.form-edit-profile__job-input').value;
}

function setEscapeKeylistener() {

    function popupHandlerKey(e) {
        if (e.key === 'Escape') {
            document.removeEventListener('keydown', popupHandlerKey);   //Убираем обработчик клавиатуры

            popup_out();    //Закрываем попап
        };
    };

    document.addEventListener('keydown', popupHandlerKey);  //Добавляем слушатель событий клавиатуры
};

function setClickAnyPlaceListener() {
    const clickAnyPlace = document.querySelector('.popup');

    function handleClickAnyPlace(e) {
        if (e.target.classList.contains('popup')) {
            clickAnyPlace.removeEventListener('click', handleClickAnyPlace);

            popup_out();    //Закрываем попап
        }
    };

    clickAnyPlace.addEventListener('click', handleClickAnyPlace);   //Добавляем слушатель событий мышки
}

export { getDataProfile, setDataProfile, getNewCard, setEscapeKeylistener, setClickAnyPlaceListener };