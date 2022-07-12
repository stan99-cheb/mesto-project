//import './index.css'

import { createCard, isLike, delCardElement, updateLike, changeStatusHeart } from './components/cards.js';
import { enableValidation } from './components/validate.js';
import { openPopup, closePopup } from './components/popup.js';
import { renderLoading } from './components/utils.js';
import { getInitialCards, setUserMe, setNewCard, setAvatar, delCard, likesCard, delLikesCard, cardForDel } from './components/api.js'

const cardsElement = document.querySelector('.cards');

const renderCard = (cardElement) => {
    cardsElement.prepend(cardElement)
}

const likeCard = (heart, id) => {
    if (isLike(heart)) {
        delLikesCard(id)
            .then(card => {
                updateLike(heart, card.likes.length)
            });
    } else {
        likesCard(id)
            .then(card => {
                updateLike(heart, card.likes.length)
            });
    }
    changeStatusHeart(heart);
};

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

                renderCard(createCard(newCard))
            })
            .finally(() => {
                renderLoading(formCard, false);
            });

        closePopup(popupCard);
    };

    formCard.addEventListener('submit', handleCardFormSubmit);

    function openCardPopup(evt) {
        openPopup(popupCard);
    };

    addCardButton.addEventListener('click', openCardPopup);
})();

getInitialCards()
    .then((array) => {
        return array.map(element => {
            return {
                name: element.name,
                link: element.link,
                like: element.likes,
                id: element._id,
                ownerId: element.owner._id,
            }
        })
    })
    .then((array) => {
        return array.map(card => {
            return createCard(card)
        });
    })
    .then((array) => {
        array.reverse().forEach(cardElement => {
            renderCard(cardElement)
        })
    });

(function () {
    const avatarButton = document.querySelector('.profile__avatar');
    const avatarPopup = document.querySelector('.popup-avatar');
    const formAvatar = document.querySelector('.form-avatar');
    const avatarProfile = document.querySelector('.profile__avatar');
    const avatarInput = formAvatar.querySelector('.form-avatar__link');

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
                delCardElement(cardForDel.card);

                closePopup(delCardPopup);
            })
    }

    delCardForm.addEventListener('submit', handleDelCardFormSubmit);
})();

const formList = document.querySelectorAll('.form');

const handleFormSubmit = (evt) => {
    evt.preventDefault();

    // form.reset();

    enableValidation({
        formSelector: '.form',
        inputSelector: '.form__input',
        submitButtonSelector: '.form__submit-button',
        inactiveButtonClass: 'form__submit-button_inactive',
        inputErrorClass: 'form__input_type_error',
        errorClass: 'form__input-error_active'
    });
};

formList.forEach(form => form.addEventListener('submit', handleFormSubmit));

export { likeCard }