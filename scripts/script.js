import { addCard } from '../components/cards.js';
import { enableValidation } from '../components/validate.js';
import { openPopup, closePopup } from '../components/popup.js';
import { } from '../components/utils.js';

// (function () {
//     const popupProfile = document.querySelector('.popup-profile');
//     const formProfile = popupProfile.querySelector('.form-edit-profile');
//     const nameInput = formProfile.querySelector('.form-edit-profile__name-input');
//     const jobInput = formProfile.querySelector('.form-edit-profile__job-input');
//     const profileTitle = document.querySelector('.profile__title');
//     const profileSubtitle = document.querySelector('.profile__subtitle');
//     const editProfileButton = document.querySelector('.profile__edit-button');
//     const closeProfileButton = popupProfile.querySelector('.popup-profile__close-button');

//     nameInput.value = profileTitle.textContent;
//     jobInput.value = profileSubtitle.textContent;
    
//     function handleProfileFormSubmit(evt) {
//         evt.preventDefault();
        
//         profileTitle.textContent = nameInput.value;
//         profileSubtitle.textContent = jobInput.value;
//         closePopup(popupProfile);
//     }

//     formProfile.addEventListener('submit', handleProfileFormSubmit);

//     function openProfilePopup() {
//         closeProfileButton.addEventListener('click', () => closePopup(popupProfile));

//         openPopup(popupProfile);
//     }

//     editProfileButton.addEventListener('click', openProfilePopup);
// })();


(function () {
    const addCardButton = document.querySelector('.profile__add-button');
    const popupCard = document.querySelector('.popup-card');
    const formCard = popupCard.querySelector('.form-card');
    const closeButtonPopup = popupCard.querySelector('.popup__close-button');
    //const nameCardInput = formCard.querySelector('.form-add-card__name-input');
    //const linkCardInput = formCard.querySelector('.form-add-card__link-input');
    //const newCard = {};

    function handleCardFormSubmit(evt) {
        evt.preventDefault();

        //newCard.name = nameCardInput.value;
        //newCard.link = linkCardInput.value;
        
        //formCard.reset();
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

// Вызовем функцию
//enableValidation();