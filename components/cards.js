import { openImagePopup } from './popup.js';

const cardsElement = document.querySelector('.cards');

(() => {
    
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
})();

//Функция добавления карточки
function addCard(item) {
    const cardElement = createCard(item);
    //Добавляем элемент
    cardsElement.prepend(cardElement);
}

//Функция создания карточки
function createCard(item) {
    //Я не смог вытащить эти константы наверх. Может есть какая-то хитрость?
    //Или возвращаемое значение функции не может быть в глобальной константе?
    //Получаем форму из шаблона
    const cardTemplate = document.querySelector('#new-place');
    //Клонируем карточку из шаблона
    const card = cardTemplate.content.cloneNode(true);
    //Получаем изображение карточки
    const imageCard = card.querySelector('.card__link');
    const nameCard = card.querySelector('.card__name');
    const heartCard = card.querySelector('.card__heart');
    const trashCard = card.querySelector('.card__trash');
    //Заполняем карточку
    nameCard.textContent = item.name;
    imageCard.src = item.link;
    imageCard.alt = item.name;
    //Вешаем обработчик на изображение
    imageCard.addEventListener('click', () => openImagePopup(item));
    //Вешаем обработчик на сердечко
    heartCard.addEventListener('click', likeCard);
    //Вешаем обработчик на корзину
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