const cardsElement = document.querySelector('.cards');
const cardTemplate = document.querySelector('#new-place').content;

const creationCard = (cardsArray) => {
    const cardElementArray = cardsArray.map(element => {
        const cardElement = cardTemplate.cloneNode(true);

        cardElement.querySelector('.card__name').textContent = element.name;
        cardElement.querySelector('.card__link').src = element.link;
        
        return cardElement;
    });

    renderCards(cardElementArray);
};

const renderCards = (cardElementArray) => {
    cardElementArray.forEach(element => {
        cardsElement.append(element)
    });
}


// //Функция добавления карточки
// function addCard(item) {
//     const cardElement = createCard(item);
//     //Добавляем элемент
//     cardsElement.prepend(cardElement);
// }

// //Функция создания карточки
// function createCard(item) {
//     const card = cardTemplate.content.cloneNode(true);
//     const imageCard = card.querySelector('.card__link');
//     const nameCard = card.querySelector('.card__name');
//     const heartCard = card.querySelector('.card__heart');
//     const trashCard = card.querySelector('.card__trash');

//     nameCard.textContent = item.name;
//     imageCard.src = item.link;
//     imageCard.alt = item.name;

//     imageCard.addEventListener('click', () => openImagePopup(item));

//     heartCard.addEventListener('click', likeCard);

//     trashCard.addEventListener('click', deleteCard);

//     return card
// }

// function likeCard(e) {
//     //Переключаем сердечко
//     e.target.classList.toggle('card__heart_active');
// }

// function deleteCard(e) {
//     //Удаляем карточку
//     e.target.closest('.card').remove();
// }

export { creationCard }