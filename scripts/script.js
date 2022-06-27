import { addCard } from '../components/cards.js';
import { enableValidation } from '../components/validate.js';
import { openPopup, closePopup } from '../components/popup.js';
import { } from '../components/utils.js';

(function () {
    const editProfileButton = document.querySelector('.profile__edit-button');
    const popupProfile = document.querySelector('.popup-profile');
    const formProfile = popupProfile.querySelector('.form-profile');
    const closeButtonPopup = popupProfile.querySelector('.popup__close-button');
    const nameInput = formProfile.querySelector('.form-profile__name');
    const jobInput = formProfile.querySelector('.form-profile__job');
    const profileTitle = document.querySelector('.profile__title');
    const profileSubtitle = document.querySelector('.profile__subtitle');

    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;

    function handleProfileFormSubmit(evt) {
        evt.preventDefault();

        profileTitle.textContent = nameInput.value;
        profileSubtitle.textContent = jobInput.value;
        closePopup(popupProfile);
    }

    formProfile.addEventListener('submit', handleProfileFormSubmit);

    function openProfilePopup() {
        openPopup(popupProfile);
    }

    closeButtonPopup.addEventListener('click', () => closePopup(popupProfile));
    editProfileButton.addEventListener('click', openProfilePopup);
})();

(function () {
    const addCardButton = document.querySelector('.profile__add-button');
    const popupCard = document.querySelector('.popup-card');
    const formCard = popupCard.querySelector('.form-card');
    const closeButtonPopup = popupCard.querySelector('.popup__close-button');
    const nameCardInput = formCard.querySelector('.form-card__name');
    const linkCardInput = formCard.querySelector('.form-card__link');
    const newCard = {};

    function handleCardFormSubmit(evt) {
        evt.preventDefault();

        newCard.name = nameCardInput.value;
        newCard.link = linkCardInput.value;

        formCard.reset();
        addCard(newCard);
        closePopup(popupCard);
    }

    formCard.addEventListener('submit', handleCardFormSubmit);

    function openCardPopup() {
        openPopup(popupCard);
    }

    closeButtonPopup.addEventListener('click', () => closePopup(popupCard));
    addCardButton.addEventListener('click', openCardPopup);
})();


(function () {
    const popupImage = document.querySelector('.popup-image');
    const imagePopupCloseButton = popupImage.querySelector('.popup__close-button');

    imagePopupCloseButton.addEventListener('click', () => closePopup(popupImage));
})();

enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_inactive',
    inputErrorClass: 'form__input_type_error'
});