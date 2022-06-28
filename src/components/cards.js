import { openImagePopup } from './popup.js';

const cardsElement = document.querySelector('.cards');
const cardTemplate = document.querySelector('#new-place');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

initialCards.forEach(addCard);

//Функция добавления карточки
function addCard(item) {
    const cardElement = createCard(item);
    //Добавляем элемент
    cardsElement.prepend(cardElement);
}

//Функция создания карточки
function createCard(item) {
    const card = cardTemplate.content.cloneNode(true);
    const imageCard = card.querySelector('.card__link');
    const nameCard = card.querySelector('.card__name');
    const heartCard = card.querySelector('.card__heart');
    const trashCard = card.querySelector('.card__trash');
    
    nameCard.textContent = item.name;
    imageCard.src = item.link;
    imageCard.alt = item.name;
    
    imageCard.addEventListener('click', () => openImagePopup(item));
    
    heartCard.addEventListener('click', likeCard);
    
    trashCard.addEventListener('click', deleteCard);
    
    return card
}

function likeCard(e) {
    //Переключаем сердечко
    e.target.classList.toggle('card__heart_active');
}

function deleteCard(e) {
    //Удаляем карточку
    e.target.closest('.card').remove();
}

export { addCard }