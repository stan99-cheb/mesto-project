import { openPopup } from './popup.js';
import { delCard } from './api.js';

const cardsElement = document.querySelector('.cards');
const cardTemplate = document.querySelector('#new-place').content;
const popupImage = document.querySelector('.popup-image');
const popupImageName = popupImage.querySelector('.popup-image__name');
const popupImageLink = popupImage.querySelector('.popup-image__link');
const myOwnerId = '912df452cc2f9c1b7c925e7c';

const isMyCard = (id) => {
    if (id === myOwnerId) {
        return true;
    } else {
        return false;
    }
}

const createCard = (card) => {
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.card__name').textContent = card.name;
    cardElement.querySelector('.card__link').src = card.link;
    cardElement.querySelector('.card__link').alt = 'Изображение ' + card.name;
    cardElement.querySelector('.card__like').textContent = card.like;

    cardElement.querySelector('.card__link').addEventListener('click', showCard);
    cardElement.querySelector('.card__heart').addEventListener('click', likeCard);
    cardElement.querySelector('.card__trash').addEventListener('click', (e) => {
        deleteCard(e, card.id);
    });

    if (!isMyCard(card.ownerId)) {
        cardElement.querySelector('.card__trash').remove();
    }

    return cardElement;
};

const renderCard = (cardElement) => {
    cardsElement.prepend(cardElement)
}

const showCard = (e) => {
    popupImageName.textContent = e.target.alt;
    popupImageLink.src = e.target.src;
    popupImageLink.alt = e.target.alt;

    openPopup(popupImage);
};

const likeCard = (e) => {
    e.target.classList.toggle('card__heart_active');
};

const deleteCard = (e, id) => {
    e.target.closest('.card').remove();
    delCard(id);
};

export { createCard, renderCard }