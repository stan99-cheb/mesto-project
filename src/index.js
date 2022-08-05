// import './index.css'
import Api from './components/api.js';
import Card from './components/cards.js';
import Section from './components/Section.js';

import { enableValidation } from './components/validate.js';
import { openPopup, closePopup } from './components/popup.js';
import { renderLoading } from './components/utils.js';
import { setUserMe, setAvatar, cardForDel } from './components/api.js';

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

const userInfo = {};
const cardElementSelectorTemplate = '.new-place';
const cardsElementSelector = '.cards';

const api = new Api({
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-12',
    headers: {
        authorization: '5743d2b2-8d60-4e50-9a9c-7a3ab60b2c12',
        'Content-Type': 'application/json'
    }
});


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

const handleCardClick = (e) => {
    popupImageCaption.textContent = e.target.alt;
    popupImageLink.src = e.target.src;
    popupImageLink.alt = e.target.alt;

    openPopup(popupImage);
};

function handleLikeClick(heart, cardId) {
    if (heart.classList.contains('card__heart_active')) {
        api.delLikesCard(cardId)
            .then(card => {
                heart.classList.toggle('card__heart_active');
                heart.closest('.card').querySelector('.card__like').textContent = card.likes.length;
            })
            .catch((err) => {
                console.log(err);
            })
    } else {
        api.addLikeCard(cardId)
            .then(card => {
                heart.classList.toggle('card__heart_active');
                heart.closest('.card').querySelector('.card__like').textContent = card.likes.length;
            })
            .catch((err) => {
                console.log(err);
            });
    };
}

const handleDelClick = (e, id) => {
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

    api.addNewCard(nameCardInput.value, linkCardInput.value)
        .then((card) => {
            const NewCardRenderer = new Section({
                data: [card],
                renderer: (element) => {
                    const card = new Card(
                        element,
                        cardElementSelectorTemplate,
                        handleCardClick,
                        handleLikeClick,
                        handleDelClick
                    );
                    const cardElement = card.create();
                    
                    NewCardRenderer.setItem(cardElement);
                }
            }, cardsElementSelector);

            NewCardRenderer.rendererCard();

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

    api.delCard(cardForDel.id)
        .then(() => {
            cardForDel.card.closest('.card').remove();

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
Promise.all([api.getUserMe(), api.getInitialCards()])
    .then(([user, cards]) => {
        userInfo._id = user._id;
        userInfo.name = user.name;
        userInfo.about = user.about;
        userInfo.avatar = user.avatar;

        // setUserProfile(userName, userAbout, imgAvatar);

        const cardsArray = new Section({
            data: cards,
            renderer: (element) => {
                const card = new Card(
                    element,
                    cardElementSelectorTemplate,
                    handleCardClick,
                    handleLikeClick,
                    handleDelClick
                );
                const cardElement = card.create();
                cardsArray.setItem(cardElement);
            }
        }, cardsElementSelector);

        cardsArray.rendererCard();
    })
    .catch((err) => {
        console.log(err);
    });

enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
});

export { userInfo };