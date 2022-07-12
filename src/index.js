import './index.css'

import { createCard, isLike, delCardElement, updateLike, changeStatusHeart } from './components/cards.js';
import { enableValidation } from './components/validate.js';
import { openPopup, closePopup } from './components/popup.js';
import { renderLoading } from './components/utils.js';
import { getUserMe, getInitialCards, setUserMe, setNewCard, setAvatar, delCard, likesCard, delLikesCard, cardForDel } from './components/api.js'

const cardsElement = document.querySelector('.cards');

const renderCard = (cardElement) => {
    cardsElement.prepend(cardElement)
}

const likeCard = (heart, id) => {
    if (isLike(heart)) {
        delLikesCard(id)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then(card => {
                updateLike(heart, card.likes.length)
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        likesCard(id)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then(card => {
                updateLike(heart, card.likes.length)
            })
            .catch((err) => {
                console.log(err);
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
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                renderLoading(formProfile, false);
            });

        closePopup(popupProfile);
    }

    formProfile.addEventListener('submit', handleProfileFormSubmit);

    function openProfilePopup() {
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
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then(data => {
                newCard.name = data.name;
                newCard.link = data.link;
                newCard.ownerId = data.owner._id;
                newCard.like = data.likes;
                newCard.id = data._id

                renderCard(createCard(newCard))
            })
            .catch((err) => {
                console.log(err);
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

Promise.all([getUserMe(), getInitialCards()])
    .then(responses => Promise.all(responses.map(response => {
        if (response.ok) {
            return response.json()
        }
        return Promise.reject(`Ошибка: ${response.status}`);
    })))
    .then(([response1, response2]) => {
        return response2.map(element => {
            return {
                name: element.name,
                link: element.link,
                like: element.likes,
                id: element._id,
                ownerId: element.owner._id,
                myId: response1.id
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
    })
    .catch((err) => {
        console.log(err);
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
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then(data => {
                avatarProfile.src = data.avatar;
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                renderLoading(formAvatar, false);
            });

        closePopup(avatarPopup);
    }

    formAvatar.addEventListener('submit', handleAvatarFormSubmit);

    const openAvatarPopup = () => {
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
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then(() => {
                delCardElement(cardForDel.card);

                closePopup(delCardPopup);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    delCardForm.addEventListener('submit', handleDelCardFormSubmit);
})();

enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
});

export { likeCard }