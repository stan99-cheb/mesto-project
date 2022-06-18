

const elementCards = document.querySelector('.cards');

(function (addCard) {   //Добавляем первоначальные карточки
    const initialCards = [
        {
            name: 'Владивосток',
            link: 'https://images.unsplash.com/photo-1587637885131-8b08567433d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
        },
        {
            name: 'Нижний Новгород',
            link: 'https://images.unsplash.com/photo-1547041959-0e5137186987?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80'
        },
        {
            name: 'Сочи',
            link: 'https://images.unsplash.com/photo-1522817510788-e72e35ce0774?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80'
        },
        {
            name: 'Казань',
            link: 'https://images.unsplash.com/photo-1628066068625-015ea7bcc21a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
        },
        {
            name: 'Ленинград',
            link: 'https://images.unsplash.com/photo-1556610961-2fecc5927173?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1367&q=80'
        },
        {
            name: 'Москва',
            link: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=749&q=80'
        }
    ];

    initialCards.forEach(item => addCard(item)); //Добавляем карточки
})(addCard);

function addCard(item) {    //На входе объект из ссылки и названия карточки
    const elementCard = document.querySelector('#card-template').content.cloneNode(true); //Клонируем элемент карточки из шаблона
    const nodeCardName = elementCard.querySelector('.card__name');    //Имя карточки
    const nodeCardLink = elementCard.querySelector('.card__link');    //Ссылка карточки

    nodeCardName.textContent = item.name;           //Добавляем новой карточке имя
    nodeCardLink.src = item.link;                   //Добавляем новой карточке ссылку 
    nodeCardLink.alt = 'Изображение ' + item.name;  //Добавляем новой карточке атрибут Alt
    
    elementCards.prepend(elementCard);              //Добавляем элемент
}

function hundleClickCards(e, popup_on) {
    
    const selectButton = e.target.closest('.card__link') || //Выбраем нужный элемент
                            e.target.closest('.card__heart') ||
                                e.target.closest('.card__trash');
    
    if (!selectButton) { return; }; //Если не нажат нужный элемент - выходим

    if (selectButton.classList.contains('card__heart')) {
        selectButton.classList.toggle('card__heart_active');
    }
    else if (selectButton.classList.contains('card__trash')) {
        e.target.closest('.card').remove();
    }
    else if (selectButton.classList.contains('card__link')) {
        const cloneSelectButton = selectButton.cloneNode(true);

        cloneSelectButton.classList.remove('card__link');
        cloneSelectButton.classList.add('popup__link');

        popup_on(cloneSelectButton);
    };
}

export { addCard, hundleClickCards };