

const enableCard = ({cardsClass, cardTemplate, cardNameClass, cardLinkClass, cardHeartClass, cardTrashClass}) => {

    //Функция добавления карточки
    const addCard = (item) => {
        const cards = document.querySelector(cardsClass);
        const card = document.querySelector(cardTemplate).content.cloneNode(true);

        card.querySelector(cardNameClass).textContent = item.name;
        card.querySelector(cardLinkClass).src = item.link;
        card.querySelector(cardLinkClass).alt = 'Изображение ' + item.name;
        //Добавляем элемент
        cards.prepend(card);
    };

    

    function hundleClickCards(e) {
        //Выбраем нужный элемент
        const selectButton = e.target.closest(cardLinkClass) || e.target.closest(cardHeartClass) || e.target.closest(cardTrashClass);
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
    }
}

export { enableCard };