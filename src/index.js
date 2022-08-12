// import './index.css'
import Api from './components/Api.js';
import Card from './components/Cards.js';
import Section from './components/Section.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithConfirm from './components/PopupWithConfirm.js';
import UserInfo from './components/UserInfo.js';
import FormValidator from './components/FormValidator.js';
import * as data from './components/const.js';
import { renderLoading } from './components/utils.js';

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
    name: '.profile__title',
    about: '.profile__subtitle'
});

/*----------------------------------------------------класс Section----------------------------------------------------*/
const cardsArray = new Section(
    (card, user) => {
        const newCard = new Card(
            card,
            handleCardClick,
            handleLikeClick,
            handleDelClick,
            data.cardElementSelectorTemplate,
            user
        );
        const cardElement = newCard.create();

        cardsArray.setItem(cardElement);
    }
    , data.cardsElementSelector);

/*----------------------------------------------------Валидация----------------------------------------------------*/
const profileValidate = new FormValidator(data.selectors, '[name="profile-form"]');
profileValidate.setEventListeners();

const addCardValidate = new FormValidator(data.selectors, '[name="addcard-form"]');
addCardValidate.setEventListeners();

const avatarValidate = new FormValidator(data.selectors, '[name="avatar-form"]');
avatarValidate.setEventListeners();

/*----------------------------------------------------Слушатели кнопок на странице----------------------------------------------------*/
data.editProfileButton.addEventListener('click', () => {
    popupEdit.open();
    popupEdit.setInputValues(userInfo.getUserInfo());
});

data.addCardButton.addEventListener('click', () => {
    popupCard.open();
});

data.avatarButton.addEventListener('click', () => {
    popupAvatar.open();
});

/*----------------------------------------------------Обрабочики форм----------------------------------------------------*/
const popupEdit = new PopupWithForm(
    '.popup-profile',
    (formValues) => {
        renderLoading(formValues.formElement, true, 'Сохранение...');

        api.setUserMe(formValues['name'], formValues['about'])
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
        renderLoading(formValues.formElement, true, 'Сохранение...');

        const user = userInfo.getUserInfo();

        api.addNewCard(formValues['place-name'], formValues['card-link'])
            .then((card) => {

                cardsArray.rendererCard([card], user);

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

const popupAvatar = new PopupWithForm(
    '.popup-avatar',
    (formValues) => {
        renderLoading(formValues.formElement, true, 'Сохранение...');

        api.setAvatar(formValues['ava-link'])
            .then(data => {
                document.querySelector('.profile__avatar').style.backgroundImage = `url(${data.avatar})`;

                popupAvatar.close();
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

const popupWithImage = new PopupWithImage('.popup-image');

popupWithImage.setEventListeners();

const popupDelConfirm = new PopupWithConfirm({
    popupSelector: '.popup-delcard',
    handleFormSubmit: (formValues) => {
        renderLoading(formValues.formElement, true, 'Удаление...');

        api.delCard(formValues.cardId)
            .then(() => {
                formValues.cardElement.closest('.card').remove();

                popupDelConfirm.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                renderLoading(formValues.formElement, false);
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

function handleDelClick(cardElement, cardId) {
    popupDelConfirm.open(cardElement, cardId);
};

/*----------------------------------------------------Основной код----------------------------------------------------*/
Promise.all([api.getUserMe(), api.getInitialCards()])
    .then(([user, cards]) => {
        userInfo.setUserInfo(user);

        cardsArray.rendererCard(cards, user);
    })
    .catch((err) => {
        console.log(err);
    });