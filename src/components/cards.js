import { openPopup } from './popup.js';

const cardTemplate = document.querySelector('#new-place').content;
const popupImage = document.querySelector('.popup-image');
const popupImageName = popupImage.querySelector('.popup-image__name');
const popupImageLink = popupImage.querySelector('.popup-image__link');

const creationCard = (cardsArray) => {
    const cardElementArray = cardsArray.map(element => {
        const cardElement = cardTemplate.cloneNode(true);

        cardElement.querySelector('.card__name').textContent = element.name;
        cardElement.querySelector('.card__link').src = element.link;
        cardElement.querySelector('.card__link').alt = 'Изображение ' + element.name;

        cardElement.querySelector('.card__link').addEventListener('click', showCard);
        cardElement.querySelector('.card__heart').addEventListener('click', likeCard);
        cardElement.querySelector('.card__trash').addEventListener('click', deleteCard);

        return cardElement;
    });
    return cardElementArray;
};

const showCard = (e) => {
    popupImageName.textContent = e.target.alt;
    popupImageLink.src = e.target.src;

    openPopup(popupImage);
};

const likeCard = (e) => {
    e.target.classList.toggle('card__heart_active');
};

const deleteCard = (e) => {
    e.target.closest('.card').remove();
};

export { creationCard }