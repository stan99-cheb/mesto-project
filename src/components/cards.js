const cardTemplate = document.querySelector('#new-place').content;

const createCard = (card, myUserId, showCard, likeCard, deleteCard) => {
    const cardElement = cardTemplate.cloneNode(true);
    const cardLink = cardElement.querySelector('.card__link');
    const cardName = cardElement.querySelector('.card__name');
    const cardLike = cardElement.querySelector('.card__like');
    const cardHeart = cardElement.querySelector('.card__heart');
    const cardTrash = cardElement.querySelector('.card__trash');

    cardName.textContent = card.name;
    cardLink.src = card.link;
    cardLink.alt = 'Изображение ' + card.name;
    cardLike.textContent = card.likes.length;

    cardLink.addEventListener('click', showCard);
    cardHeart.addEventListener('click', (e) => {
        likeCard(e.target, card._id);
    });
    cardTrash.addEventListener('click', (e) => {
        deleteCard(e, card._id);
    });

    if (!isMyCard(card.owner._id, myUserId)) {
        cardTrash.remove();
    };

    if (hasLikeCard(card.likes, myUserId)) {
        cardHeart.classList.add('card__heart_active');
    } else {
        cardHeart.classList.remove('card__heart_active');
    };

    return cardElement;
};

const isMyCard = (cardId, myId) => {
    return cardId === myId;
};

const hasLikeCard = (likes, myId) => {
    return likes.some(element => element._id === myId);
};

const isLike = (card) => {
    return card.classList.contains('card__heart_active');
};

const updateLike = (card, num) => {
    card.closest('.card').querySelector('.card__like').textContent = num;
};

const changeStatusHeart = (card) => {
    card.classList.toggle('card__heart_active');
};

const delCardElement = (card) => {
    card.closest('.card').remove();
};

export { createCard, isLike, delCardElement, updateLike, changeStatusHeart };