import './index.css'

import { createCard, isLike, delCardElement, updateLike, changeStatusHeart } from './components/cards.js';
import { enableValidation } from './components/validate.js';
import { openPopup, closePopup } from './components/popup.js';
import { renderLoading } from './components/utils.js';
import { getUserMe, getInitialCards, setUserMe, setNewCard, setAvatar, delCard, likesCard, delLikesCard, cardForDel } from './components/api.js';

//Блок карточек
const cardsElement = document.querySelector('.cards');

//Блок кнопок на странице
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const avatarButton = document.querySelector('.profile__avatar');

//Блок редактирования профиля
const popupProfile = document.querySelector('.popup-profile');
const formProfile = popupProfile.querySelector('.popup__form');
const nameInput = formProfile.querySelector('.popup__input_type_name');
const aboutInput = formProfile.querySelector('.popup__input_type_about');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

//Блок добавления новой карточки
const popupCard = document.querySelector('.popup-card');
const formCard = popupCard.querySelector('.popup__form');
const nameCardInput = formCard.querySelector('.popup__input_type_place-name');
const linkCardInput = formCard.querySelector('.popup__input_type_link');

//Блок редактирования аватара
const avatarPopup = document.querySelector('.popup-avatar');
const formAvatar = avatarPopup.querySelector('.popup__form');
const avatarInput = formAvatar.querySelector('.popup__input_type_link');
const avatarProfile = document.querySelector('.profile__avatar');

//Блок показа изображения карточки
const popupImage = document.querySelector('.popup-image');
const popupImageCaption = popupImage.querySelector('.popup__caption');
const popupImageLink = popupImage.querySelector('.popup__image');

//Блок подтверждения удаления карточки
const delCardPopup = document.querySelector('.popup-delcard');
const delCardForm = delCardPopup.querySelector('.popup__form');

let myUserId = '';


//Обработчики кнопок на странице
const openProfilePopup = () => {
    nameInput.value = profileTitle.textContent;
    aboutInput.value = profileSubtitle.textContent;

    openPopup(popupProfile);
};

const openCardPopup = () => {
    openPopup(popupCard);
};

const openAvatarPopup = () => {
    openPopup(avatarPopup);
};

const showCard = (e) => {
    popupImageCaption.textContent = e.target.alt;
    popupImageLink.src = e.target.src;
    popupImageLink.alt = e.target.alt;

    openPopup(popupImage);
};

const deleteCard = (e, id) => {
    cardForDel.id = id;
    cardForDel.card = e.target;

    openPopup(delCardPopup);
};

//Вешаем обработчики на кнопки на странице
editProfileButton.addEventListener('click', openProfilePopup);
addCardButton.addEventListener('click', openCardPopup);
avatarButton.addEventListener('click', openAvatarPopup);

//Обработчики кнопок submit в формах
const handleProfileFormSubmit = (evt) => {
    evt.preventDefault();

    renderLoading(formProfile, true);

    setUserMe(nameInput.value, aboutInput.value)
        .then(() => {
            profileTitle.textContent = nameInput.value;
            profileSubtitle.textContent = aboutInput.value;

            closePopup(popupProfile);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(formProfile, false);
        });
};

function handleCardFormSubmit(evt) {
    evt.preventDefault();

    renderLoading(formCard, true);

    setNewCard(nameCardInput.value, linkCardInput.value)
        .then((card) => {
            renderCard(createCard(card, myUserId, showCard, likeCard, deleteCard));

            closePopup(popupCard);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(formCard, false);
        });
};

const handleAvatarFormSubmit = (evt) => {
    evt.preventDefault();

    renderLoading(formAvatar, true);

    setAvatar(avatarInput.value)
        .then(data => {
            avatarProfile.src = data.avatar;

            closePopup(avatarPopup);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(formAvatar, false);
        });
};

const handleDelCardFormSubmit = (evt) => {
    evt.preventDefault();

    delCard(cardForDel.id)
        .then(() => {
            delCardElement(cardForDel.card);

            closePopup(delCardPopup);
        })
        .catch((err) => {
            console.log(err);
        });
};

//Вешаем обработчики на кнопки submit в формах
formProfile.addEventListener('submit', handleProfileFormSubmit);
formCard.addEventListener('submit', handleCardFormSubmit);
formAvatar.addEventListener('submit', handleAvatarFormSubmit);
delCardForm.addEventListener('submit', handleDelCardFormSubmit);

//Блок основных функций
const renderCard = (cardElement) => {
    cardsElement.prepend(cardElement);
};

Promise.all([getUserMe(), getInitialCards()])
    .then(([res1, res2]) => {
        myUserId = res1._id;
        return res2;
    })
    .then((cards) => {
        return cards.map(card => {
            return createCard(card, myUserId, showCard, likeCard, deleteCard);
        });
    })
    .then((cardsElement) => {
        cardsElement.reverse().forEach(cardElement => {
            renderCard(cardElement);
        });
    })
    .catch((err) => {
        console.log(err);
    });

const likeCard = (heart, id) => {
    if (isLike(heart)) {
        delLikesCard(id)
            .then(card => {
                changeStatusHeart(heart);
                updateLike(heart, card.likes.length);
            })
            .catch((err) => {
                console.log(err);
            })
    } else {
        likesCard(id)
            .then(card => {
                changeStatusHeart(heart);
                updateLike(heart, card.likes.length);
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
});