

const cards = document.querySelector('.cards');

const addCard = (item) => {
    const card = document.querySelector('#card-template').content.cloneNode(true);

    card.querySelector('.card__name').textContent = item.name;
    card.querySelector('.card__link').src = item.link;
    card.querySelector('.card__link').alt = 'Изображение ' + item.name;
    //Добавляем элемент
    cards.prepend(card);
};

export { addCard };