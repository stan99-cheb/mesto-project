

const addCard = (item, cards) => {
    const card = document.querySelector('#card-template').content.cloneNode(true);

    card.querySelector('.card__name').textContent = item.name;
    card.querySelector('.card__link').src = item.link;
    card.querySelector('.card__link').alt = 'Изображение ' + item.name;
    //Добавляем элемент
    cards.prepend(card);
};

function hundleClickCards(e) {
    //Выбраем нужный элемент
    const selectButton = e.target.closest('.card__link') || e.target.closest('.card__heart') || e.target.closest('.card__trash');
    //Если нажат нужный элемент
    if (selectButton) {
        switch (selectButton.classList[0]) {
            case 'card__link':
                //Получаем копию элемента
                const cloneSelectButton = selectButton.cloneNode(true);
                //Удаляем ненужный селектор
                cloneSelectButton.classList.remove('card__link');
                //Добавляем нужный
                cloneSelectButton.classList.add('popup__link');
                //Передаем элемент в попап и показываем попап
                popup_on(cloneSelectButton);
                break;
            case 'card__heart':
                //Переключаем сердечко
                selectButton.classList.toggle('card__heart_active');
                break;
            case 'card__trash':
                //Удаляем карточку
                e.target.closest('.card').remove();
                break;
        }
    }
};

export { addCard };