//import './index.css'

import { createCard, renderCard } from './components/cards.js';
import { enableValidation } from './components/validate.js';
import { openPopup, closePopup } from './components/popup.js';
import { cleanForm, renderLoading } from './components/utils.js';
import { getInitialCards, getUserMe, setUserMe, setNewCard, setAvatar, delCard, cardForDel } from './components/api.js'

(function () {
    const editProfileButton = document.querySelector('.profile__edit-button');
    const popupProfile = document.querySelector('.popup-profile');
    const formProfile = popupProfile.querySelector('.form-profile');
    const nameInput = formProfile.querySelector('.form-profile__name');
    const jobInput = formProfile.querySelector('.form-profile__job');
    const avatarProfile = document.querySelector('.profile__avatar');
    const profileTitle = document.querySelector('.profile__title');
    const profileSubtitle = document.querySelector('.profile__subtitle');

    function handleProfileFormSubmit(evt) {
        evt.preventDefault();

        renderLoading(formProfile, true);

        profileTitle.textContent = nameInput.value;
        profileSubtitle.textContent = jobInput.value;

        setUserMe(nameInput.value, jobInput.value)
            .finally(() => {
                renderLoading(formProfile, false);
            });

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
            avatarProfile.src = data.avatar;
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

        renderLoading(formCard, true);

        setNewCard(nameCardInput.value, linkCardInput.value)
            .then(data => {
                newCard.name = data.name;
                newCard.link = data.link;
                newCard.ownerId = data.owner._id;
                newCard.like = data.likes;
                newCard.id = data._id
            })
            .then(() => renderCard(createCard(newCard)))
            .finally(() => {
                renderLoading(formCard, false);
            });;

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

        cardElementArray.reverse().forEach(cardElement => {
            renderCard(cardElement)
        });
    });

(function () {
    const avatarButton = document.querySelector('.profile__avatar');
    const avatarPopup = document.querySelector('.popup-avatar');
    const formAvatar = document.querySelector('.form-avatar');
    const avatarProfile = document.querySelector('.profile__avatar');
    const avatarInput = formAvatar.querySelector('.form-avatar__link');
    //link = 'https://bn1303files.storage.live.com/y4mngPFLWUFKUVKWzGHn3o5iEOuw5X2UZcomJxUkOuVTKSmc9LOtj6LXyzxloPWXlP07EaL22gqCQ4kUhaaQ56XhCVeVjnACyQvVsV8GxN4FnNCCAUQvxUjhieI4XYzetv7r8lqAay0lxIvCmoPCsD6ucEdyCHUEGpvqJAlwFhczDBPa4sVWkc47WpznW09-7SsZRzsQo20EcOIlCsaugoElJ2PwxVKcpRV1J2u7GtaRkQ?encodeFailures=1&width=337&height=450'

    const handleAvatarFormSubmit = (evt) => {
        evt.preventDefault();

        renderLoading(formAvatar, true);

        setAvatar(avatarInput.value)
            .then(data => {
                avatarProfile.src = data.avatar;
            })
            .finally(() => {
                renderLoading(formAvatar, false);
            });

        closePopup(avatarPopup);
    }

    formAvatar.addEventListener('submit', handleAvatarFormSubmit);

    const openAvatarPopup = () => {
        cleanForm(formAvatar);

        openPopup(avatarPopup);
    }

    avatarButton.addEventListener('click', openAvatarPopup)
})();

(function () {
    const delCardPopup = document.querySelector('.popup-delcard');
    const delCardForm = document.querySelector('.form-delcard');

    const handleDelCardFormSubmit = (evt) => {
        evt.preventDefault();

        delCard(cardForDel.id)
            .then(() => {
                cardForDel.card.closest('.card').remove();
            })

        closePopup(delCardPopup);
    }

    delCardForm.addEventListener('submit', handleDelCardFormSubmit);
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