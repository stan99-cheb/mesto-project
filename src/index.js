// import './index.css'
import Api from './components/api.js';
import Card from './components/cards.js';
import Section from './components/Section.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';

import { enableValidation } from './components/validate.js';
import { renderLoading } from './components/utils.js';
import { setUserMe } from './components/api.js';

//Блок кнопок на странице
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const avatarButton = document.querySelector('.profile__avatar');

//Блок редактирования профиля
// const popupProfile = document.querySelector('.popup-profile');
// const formProfile = popupProfile.querySelector('.popup__form');
// const nameInput = formProfile.querySelector('.popup__input_type_name');
// const aboutInput = formProfile.querySelector('.popup__input_type_about');
// const profileTitle = document.querySelector('.profile__title');
// const profileSubtitle = document.querySelector('.profile__subtitle');

const userInfo = {};
const cardForDel = {};
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
const popupCard = new PopupWithForm(
    '.popup-card',
    (formValues) => {
        renderLoading(formValues.formElement, true);

        api.addNewCard(formValues['place-name'], formValues['card-link'])
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

                popupCard.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                renderLoading(formValues.formElement, false);
            });
    }
);

popupCard.setEventListeners();

const popupDelCard = new PopupWithForm(
    '.popup-delcard',
    () => {
        api.delCard(cardForDel.cardId)
            .then(() => {
                cardForDel.card.closest('.card').remove();

                popupDelCard.close();
            })
            .catch((err) => {
                console.log(err);
            });
    }
);

popupDelCard.setEventListeners();

const popupWithImage = new PopupWithImage('.popup-image');

popupWithImage.setEventListeners();

const popuAvatar = new PopupWithForm(
    '.popup-avatar',
    (formValues) => {
        renderLoading(formValues.formElement, true);

        api.setAvatar(formValues['ava-link'])
            .then(data => {
                document.querySelector('.profile__avatar').style.backgroundImage = `url(${data.avatar})`;

                popuAvatar.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                renderLoading(formValues.formElement, false);
            });
    }
);

popuAvatar.setEventListeners();

// const openProfilePopup = () => {
//     nameInput.value = profileTitle.textContent;
//     aboutInput.value = profileSubtitle.textContent;

//     openPopup(popupProfile);
// };

const openCardPopup = () => {
    popupCard.open();
};

const openAvatarPopup = () => {
    popuAvatar.open();
};

//Обработчики кнопок карточки
const handleCardClick = (image) => {
    popupWithImage.open(image);
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
    }
}

const handleDelClick = (card, cardId) => {
    cardForDel.card = card;
    cardForDel.cardId = cardId;

    popupDelCard.open();
}

//Вешаем обработчики на кнопки на странице
// editProfileButton.addEventListener('click', openProfilePopup);
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
}

//Вешаем обработчики на кнопки submit в формах
// formProfile.addEventListener('submit', handleProfileFormSubmit);

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