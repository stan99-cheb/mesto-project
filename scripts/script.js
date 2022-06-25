import { addCard } from '../components/cards.js';
import { } from '../components/validate.js';
import { openPopup, closePopup } from '../components/popup.js';
import { } from '../components/utils.js';

(function () {
    const popupProfile = document.querySelector('.popup-profile');
    const formProfile = popupProfile.querySelector('.form-edit-profile');
    const nameInput = formProfile.querySelector('.form-edit-profile__name-input');
    const jobInput = formProfile.querySelector('.form-edit-profile__job-input');
    const profileTitle = document.querySelector('.profile__title');
    const profileSubtitle = document.querySelector('.profile__subtitle');
    const editProfileButton = document.querySelector('.profile__edit-button');
    const closeProfileButton = popupProfile.querySelector('.popup__close-button');

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
    closeProfileButton.addEventListener('click', () => closePopup(popupProfile));
})();


(function () {
    const popupCard = document.querySelector('.popup-card');
    const formCard = popupCard.querySelector('.form-add-card');
    const addCardButton = document.querySelector('.profile__add-button');
    const closeAddButton = popupCard.querySelector('.popup__close-button');
    const newCard = {};
    const nameCardInput = formCard.querySelector('.form-add-card__name-input');
    const linkCardInput = formCard.querySelector('.form-add-card__link-input');

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
    closeAddButton.addEventListener('click', () => closePopup(popupCard));
})();


(function () {
    const popupImage = document.querySelector('.popup-image');
    const imagePopupCloseButton = popupImage.querySelector('.popup__close-button');
    // Прикрепляем обработчик к кнопке:
    imagePopupCloseButton.addEventListener('click', () => closePopup(popupImage));
})();