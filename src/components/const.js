//Блок кнопок на странице
export const editProfileButton = document.querySelector('.profile__edit-button');
export const addCardButton = document.querySelector('.profile__add-button');
export const avatarButton = document.querySelector('.profile__avatar');

export const formValidators = {};
export const selectors = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

export const cardElementSelectorTemplate = '.card-template'; //Селектор шаблона карточки
export const cardsElementSelector = '.cards'; //Селектор контейнера в DOM куда вставляются карточки