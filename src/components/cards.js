import { likeCard } from '../index.js';
import { openPopup } from './popup.js';
import { likesCard, delLikesCard, cardForDel } from './api.js';

const cardTemplate = document.querySelector('#new-place').content;
const popupImage = document.querySelector('.popup-image');
const popupImageName = popupImage.querySelector('.popup-image__name');
const popupImageLink = popupImage.querySelector('.popup-image__link');
const myOwnerId = '912df452cc2f9c1b7c925e7c';

const delCardPopup = document.querySelector('.popup-delcard');

const isMyCard = (id) => {
    return id === myOwnerId
}

const hasLikeCard = (arrayLike) => {
    return arrayLike.some(element => element._id === myOwnerId)
}

const createCard = (card) => {
    const cardElement = cardTemplate.cloneNode(true);
    const cardLink = cardElement.querySelector('.card__link');
    const cardName = cardElement.querySelector('.card__name');
    const cardLike = cardElement.querySelector('.card__like');
    const cardHeart = cardElement.querySelector('.card__heart');
    const cardTrash = cardElement.querySelector('.card__trash');

    cardName.textContent = card.name;
    cardLink.src = card.link;
    cardLink.alt = 'Изображение ' + card.name;
    cardLike.textContent = card.like.length;

    cardLink.addEventListener('click', showCard);
    cardHeart.addEventListener('click', (e) => {
        likeCard(e.target, card.id);
    });
    cardTrash.addEventListener('click', (e) => {
        deleteCard(e, card.id);
    });

    if (!isMyCard(card.ownerId)) {
        cardTrash.remove();
    }

    if (hasLikeCard(card.like)) {
        cardHeart.classList.add('card__heart_active');
    } else {
        cardHeart.classList.remove('card__heart_active');
    };

    return cardElement;
};

const showCard = (e) => {
    popupImageName.textContent = e.target.alt;
    popupImageLink.src = e.target.src;
    popupImageLink.alt = e.target.alt;

    openPopup(popupImage);
};

const isLike = (card) => {
    return card.classList.contains('card__heart_active')
}

const updateLike = (card, num) => {
    card.closest('.card').querySelector('.card__like').textContent = num;
}

const changeStatusHeart = (card) => {
    card.classList.toggle('card__heart_active')
}

const deleteCard = (e, id) => {
    openPopup(delCardPopup);

    cardForDel.id = id;
    cardForDel.card = e.target
};

const delCardElement = (card) => {
    card.closest('.card').remove();
}

export { createCard, isLike, delCardElement, updateLike, changeStatusHeart }