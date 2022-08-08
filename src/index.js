// import './index.css'
import Api from './components/Api.js';
import Card from './components/Cards.js';
import Section from './components/Section.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithConfirm from './components/PopupWithConfirm.js';
import UserInfo from './components/UserInfo.js';
import FormValidator from './components/FormValidator.js';
import { renderLoading } from './components/utils.js';

//Блок кнопок на странице
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const avatarButton = document.querySelector('.profile__avatar');

const cardForDel = {};
const cardElementSelectorTemplate = '.new-place';
const cardsElementSelector = '.cards';

/*----------------------------------------------------класс Api----------------------------------------------------*/
const api = new Api({
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-12',
    headers: {
        authorization: '5743d2b2-8d60-4e50-9a9c-7a3ab60b2c12',
        'Content-Type': 'application/json'
    }
});

/*----------------------------------------------------класс UserInfo----------------------------------------------------*/
const userInfo = new UserInfo({
    name: document.querySelector('.profile__title').textContent,
    about: document.querySelector('.profile__subtitle').textContent
});

/*----------------------------------------------------класс Validate----------------------------------------------------*/
const selectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

/*----------------------------------------------------Слушатели кнопок на странице----------------------------------------------------*/
editProfileButton.addEventListener('click', () => {
    popupEdit.open();
    document.querySelector('.popup__input_type_name').value = document.querySelector('.profile__title').textContent;
    document.querySelector('.popup__input_type_about').value = document.querySelector('.profile__subtitle').textContent;

    const formElement = document.querySelector('[name="profile-form"]');
    const validate = new FormValidator(selectors, formElement);
    validate.setEventListeners();
});

addCardButton.addEventListener('click', () => {
    popupCard.open();

    const formElement = document.querySelector('[name="addcard-form"]');
    const validate = new FormValidator(selectors, formElement);
    validate.setEventListeners();
});

avatarButton.addEventListener('click', () => {
    popupAvatar.open();

    const formElement = document.querySelector('[name="avatar-form"]');
    const validate = new FormValidator(selectors, formElement);
    validate.setEventListeners();
});

/*----------------------------------------------------Обрабочики форм----------------------------------------------------*/
const popupEdit = new PopupWithForm(
    '.popup-profile',
    (formValues) => {
        renderLoading(formValues.formElement, true);

        api.setUserMe(formValues['profile-name'], formValues['profile-about'])
            .then((user) => {
                document.querySelector('.profile__title').textContent = user.name;
                document.querySelector('.profile__subtitle').textContent = user.about;

                popupEdit.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                renderLoading(formValues.formElement, false);
            });
    }
);

popupEdit.setEventListeners();

const popupCard = new PopupWithForm(
    '.popup-card',
    (formValues) => {
        renderLoading(formValues.formElement, true);

        const user = userInfo.getUserInfo();

        api.addNewCard(formValues['place-name'], formValues['card-link'])
            .then((card) => {
                const NewCardRenderer = new Section({
                    data: [card],
                    renderer: (element) => {
                        const card = new Card(
                            element,
                            handleCardClick,
                            handleLikeClick,
                            handleDelClick,
                            cardElementSelectorTemplate,
                            user
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

const popupWithImage = new PopupWithImage('.popup-image');

popupWithImage.setEventListeners();

const popupAvatar = new PopupWithForm(
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

popupAvatar.setEventListeners();

const popupDelConfirm = new PopupWithConfirm({
    popupSelector: '.popup-delcard',
    handleFormSubmit: () => {
        api.delCard(cardForDel.cardId)
            .then(() => {
                cardForDel.card.closest('.card').remove();

                popupDelConfirm.close();
            })
            .catch((err) => {
                console.log(err);
            });
    }
});

popupDelConfirm.setEventListeners();

/*----------------------------------------------------Колбэки кнопок карточки----------------------------------------------------*/
function handleCardClick(image) {
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
};

function handleDelClick(card, cardId) {
    cardForDel.card = card;
    cardForDel.cardId = cardId;

    popupDelConfirm.open();
};

/*----------------------------------------------------Основной код----------------------------------------------------*/
Promise.all([api.getUserMe(), api.getInitialCards()])
    .then(([user, cards]) => {
        userInfo.setUserInfo(user);

        const cardsArray = new Section({
            data: cards,
            renderer: (element) => {
                const card = new Card(
                    element,
                    handleCardClick,
                    handleLikeClick,
                    handleDelClick,
                    cardElementSelectorTemplate,
                    user
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