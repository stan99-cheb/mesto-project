import { openPopup } from './popup.js';
import { delCard, likesCard, delLikesCard } from './api.js';

const cardsElement = document.querySelector('.cards');
const cardTemplate = document.querySelector('#new-place').content;
const popupImage = document.querySelector('.popup-image');
const popupImageName = popupImage.querySelector('.popup-image__name');
const popupImageLink = popupImage.querySelector('.popup-image__link');
const myOwnerId = '912df452cc2f9c1b7c925e7c';

const isMyCard = (id) => {
    return id === myOwnerId
}

const hasLikeCard = (arrayLike) => {
    return arrayLike.find(item => item._id == myOwnerId)
}

const createCard = (card) => {
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.card__name').textContent = card.name;
    cardElement.querySelector('.card__link').src = card.link;
    cardElement.querySelector('.card__link').alt = 'Изображение ' + card.name;
    cardElement.querySelector('.card__like').textContent = card.like.length;

    cardElement.querySelector('.card__link').addEventListener('click', showCard);
    cardElement.querySelector('.card__heart').addEventListener('click', (e) => {
        likeCard(e, card.id);
    });
    cardElement.querySelector('.card__trash').addEventListener('click', (e) => {
        deleteCard(e, card.id);
    });

    if (!isMyCard(card.ownerId)) {
        cardElement.querySelector('.card__trash').remove();
    }

    if (hasLikeCard(card.like)) {
        cardElement.querySelector('.card__heart').classList.add('card__heart_active');
    } else {
        cardElement.querySelector('.card__heart').classList.remove('card__heart_active');
    };

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

const isLike = (e) => {
    return e.target.classList.contains('card__heart_active')
}

const likeCard = (e, id) => {
    if (isLike(e)) {
        e.target.classList.remove('card__heart_active');
        delLikesCard(id)
            .then(data => {
                e.target.closest('.card').
                    querySelector('.card__like').textContent = data.likes.length;
            });
    } else {
        e.target.classList.add('card__heart_active');
        likesCard(id)
            .then(data => {
                e.target.closest('.card').
                    querySelector('.card__like').textContent = data.likes.length;
            });
    }
};

const deleteCard = (e, id) => {
    e.target.closest('.card').remove();
    delCard(id);
};

export { createCard, renderCard }