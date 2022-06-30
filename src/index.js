import './pages/index.css'

import { creationCard } from './components/cards.js';
import { enableValidation } from './components/validate.js';
import { openPopup, closePopup } from './components/popup.js';
import { cleanForm } from './components/utils.js';

(function () {
    const editProfileButton = document.querySelector('.profile__edit-button');
    const popupProfile = document.querySelector('.popup-profile');
    const formProfile = popupProfile.querySelector('.form-profile');
    const nameInput = formProfile.querySelector('.form-profile__name');
    const jobInput = formProfile.querySelector('.form-profile__job');
    const profileTitle = document.querySelector('.profile__title');
    const profileSubtitle = document.querySelector('.profile__subtitle');

    function handleProfileFormSubmit(evt) {
        evt.preventDefault();

        profileTitle.textContent = nameInput.value;
        profileSubtitle.textContent = jobInput.value;

        closePopup(popupProfile);
    }

    formProfile.addEventListener('submit', handleProfileFormSubmit);

    function openProfilePopup() {
        cleanForm(formProfile);

        nameInput.value = profileTitle.textContent;
        jobInput.value = profileSubtitle.textContent;

        openPopup(popupProfile);
    }

    editProfileButton.addEventListener('click', openProfilePopup);
})();

(function () {
    const addCardButton = document.querySelector('.profile__add-button');
    const popupCard = document.querySelector('.popup-card');
    const formCard = popupCard.querySelector('.form-card');
    const nameCardInput = formCard.querySelector('.form-card__name');
    const linkCardInput = formCard.querySelector('.form-card__link');
    const newCard = {};
    const newCardArray = []

    function handleCardFormSubmit(evt) {
        evt.preventDefault();

        newCard.name = nameCardInput.value;
        newCard.link = linkCardInput.value;
        newCardArray[0] = newCard;
        creationCard(newCardArray);

        closePopup(popupCard);
    }

    formCard.addEventListener('submit', handleCardFormSubmit);

    function openCardPopup(evt) {
        cleanForm(formCard);

        openPopup(popupCard);
    }

    addCardButton.addEventListener('click', openCardPopup);
})();


(function () {
    const cardsElement = document.querySelector('.cards');
    const initialCards = [
        {
            name: 'Архыз',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
        },
        {
            name: 'Челябинская область',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
        },
        {
            name: 'Иваново',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
        },
        {
            name: 'Камчатка',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
        },
        {
            name: 'Холмогорский район',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
        },
        {
            name: 'Байкал',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
        }
    ];
    const cardElementArray = creationCard(initialCards);

    cardElementArray.forEach(cardElement => {
        cardsElement.prepend(cardElement)
    });


})();

// Вызовем функцию
enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
});