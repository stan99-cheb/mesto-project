

import { } from '../components/cards.js';
import { } from '../components/validate.js';
import { openPopup, closePopup } from '../components/popup.js';
import { } from '../components/utils.js';

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
//Находим попап в DOM
const popupProfile = document.querySelector('.popup-profile');
// Находим форму в DOM
const formProfile = popupProfile.querySelector('.form');
// Находим поля формы в DOM
const nameInput = formProfile.querySelector('.form__name-input');
const jobInput = formProfile.querySelector('.form__job-input');
//Находим попап в DOM
const popupCard = document.querySelector('.popup-card');
// Находим форму в DOM
const formCard = popupCard.querySelector('.form');
// Находим поля формы в DOM
const nameCardInput = formCard.querySelector('.form__name-input');
const linkCardInput = formCard.querySelector('.form__job-input');
//Находим кнопку в DOM
const editProfileButton = document.querySelector('.profile__edit-button');
//Находим кнопку в DOM
const closeProfileButton = popupCard.querySelector('.popup__close-button');
//Находим кнопку в DOM
const addCardButton = document.querySelector('.profile__add-button');
//Находим кнопку в DOM
const closeAddButton = popupProfile.querySelector('.popup__close-button');
//Находим попап в DOM
const popupImage = document.querySelector('.popup-image');
//Находим кнопку в DOM
const imagePopupCloseButton = popupImage.querySelector('.popup__close-button');

const newCard = {};


//Я не понимаю, что не так? Я не понимаю Вашего замечания. Может можно как-то визуализировать?
nameInput.value = profileTitle.textContent;
jobInput.value = profileSubtitle.textContent;
// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    // Получите значение полей jobInput и nameInput из свойства value
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup(popupProfile);
}
// Прикрепляем обработчик к форме:
formProfile.addEventListener('submit', handleProfileFormSubmit);
//Обработчки кнопки редактирования профиля
function openProfilePopup() {
    openPopup(popupProfile);
}
// Прикрепляем обработчик к кнопке:
editProfileButton.addEventListener('click', openProfilePopup);

// Прикрепляем обработчик к кнопке:
closeAddButton.addEventListener('click', () => closePopup(popupProfile));

// Обработчик сохранения новой карточки
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    // Получите значение полей jobInput и nameInput из свойства value
    // Выберите элементы, куда должны быть вставлены значения полей
    newCard.name = nameCardInput.value;
    newCard.link = linkCardInput.value;
    //Очищаем инпуты
    formCard.reset();
    addCard(newCard);
    closePopup(popupCard);
}
// Прикрепляем обработчик к форме:
formCard.addEventListener('submit', handleCardFormSubmit);

//Обработчки кнопки редактирования профиля
function openCardPopup() {
    openPopup(popupCard);
}
// Прикрепляем обработчик к кнопке:
addCardButton.addEventListener('click', openCardPopup);

// Прикрепляем обработчик к кнопке:
closeProfileButton.addEventListener('click', () => closePopup(popupCard));

// Прикрепляем обработчик к кнопке:
imagePopupCloseButton.addEventListener('click', () => closePopup(popupImage));