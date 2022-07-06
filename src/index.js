//import './pages/index.css'

import { createCard, renderCard } from './components/cards.js';
import { enableValidation } from './components/validate.js';
import { openPopup, closePopup } from './components/popup.js';
import { cleanForm } from './components/utils.js';
import { getInitialCards, getUserMe, setUserMe, setNewCard } from './components/api.js'

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

        setUserMe(nameInput.value, jobInput.value);

        closePopup(popupProfile);
    }

    formProfile.addEventListener('submit', handleProfileFormSubmit);

    function openProfilePopup() {
        cleanForm(formProfile);

        getUserMe()
            .then(data => {
                nameInput.value = data.name;
                jobInput.value = data.about;
            });

        openPopup(popupProfile);
    }

    getUserMe()
        .then(data => {
            profileTitle.textContent = data.name;
            profileSubtitle.textContent = data.about;
        });

    editProfileButton.addEventListener('click', openProfilePopup);
})();

(function () {
    const addCardButton = document.querySelector('.profile__add-button');
    const popupCard = document.querySelector('.popup-card');
    const formCard = popupCard.querySelector('.form-card');
    const nameCardInput = formCard.querySelector('.form-card__name');
    const linkCardInput = formCard.querySelector('.form-card__link');
    const newCard = {};

    function handleCardFormSubmit(evt) {
        evt.preventDefault();

        setNewCard(nameCardInput.value, linkCardInput.value)
            .then(data => {
                newCard.name = data.name;
                newCard.link = data.link;
                newCard.ownerId = data.owner._id;
                newCard.like = data.likes;
                newCard.id = data._id
            })
            .then(() => renderCard(createCard(newCard)));

        closePopup(popupCard);
    }

    formCard.addEventListener('submit', handleCardFormSubmit);

    function openCardPopup(evt) {
        cleanForm(formCard);

        openPopup(popupCard);
    }

    addCardButton.addEventListener('click', openCardPopup);
})();

getInitialCards()
    .then(data => {
        const initialCardArray = data.map(element => {
            return {
                name: element.name,
                link: element.link,
                like: element.likes,
                id: element._id,
                ownerId: element.owner._id,
            }
        });

        const cardElementArray = initialCardArray.map(card => {
            return createCard(card)
        });

        cardElementArray.forEach(cardElement => {
            renderCard(cardElement)
        });
    });

// Вызовем функцию
enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
});