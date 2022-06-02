'use strict'

const timeAnimation = parseInt((getComputedStyle(document.querySelector(':root')).getPropertyValue('--time-animation')), 10) - 15;
const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const cards = document.querySelector('.cards');

function popupHandlerKey(e) {
    if (e.key === 'Escape') {
        //Убираем обработчик клавиатуры
        document.removeEventListener('keydown', popupHandlerKey);
        popup_out();
    };
}

function popup_on(element) {
    //Клонируем попап из шаблона
    const popupCopy = document.querySelector('#popup-template').content.cloneNode(true);

    //добавляем в попап элемент
    popupCopy.querySelector('.popup__container').append(element);
    //Подмешиваем селектор плавного появления окна
    popupCopy.querySelector('.popup').classList.add('popup_fade-in');
    //показываем попап на экране
    document.body.append(popupCopy);

    document.querySelector('.popup__close-button').addEventListener('click', popup_out, { once: true });

    const clickAnyPlace = document.querySelector('.popup');

    function handleClickAnyPlace(e) {
        if (e.target.classList.contains('popup')) {
            clickAnyPlace.removeEventListener('click', handleClickAnyPlace);
            popup_out();
        }
    };

    clickAnyPlace.addEventListener('click', handleClickAnyPlace);

    //Добавляем слушатель событий клавиатуры
    document.addEventListener('keydown', popupHandlerKey);
}

function popup_out() {
    const popup = document.querySelector('.popup');
    //Удаляем селектор плавного открытия
    popup.classList.remove('popup_fade-in');
    //Подмешиваем селектор плавного закрытия
    popup.classList.add('popup_fade-out');
    //Ждем окончания анимации
    setTimeout(() => { popup.remove() }, timeAnimation);
}




//Валидация форм
// Функция, которая добавляет класс с ошибкой
const showInputError = (element) => {
    element.classList.add('form-add-place__name-place_error');
};
  
// Функция, которая удаляет класс с ошибкой
const hideInputError = (element) => {
    element.classList.remove('form-add-place__name-place_error');
};
  
// Функция, которая проверяет валидность поля
const isValid = () => {
    if (!formInput.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      showInputError(formInput);
    } else {
      // Если проходит, скроем
      hideInputError(formInput);
    }
};

const setEventListeners = (formElement) => {

}

const enableValidation = (form) => {
    
}

function handleClickAddButton() {
    const elementAddPlace = document.querySelector('#form-add-place-template').content.cloneNode(true);

    popup_on(elementAddPlace);

    const form = document.querySelector('.form-add-place');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const newCard = {
            name: form.querySelector('.form-add-place__name-place-input').value,
            link: form.querySelector('.form-add-place__link-place-input').value
        };
        addCard(newCard);
        popup_out();
    }, { once: true });

    enableValidation(form);
}

function handleClickEditButton() {
    const elementEditPlace = document.querySelector('#form-edit-profile-template').content.cloneNode(true);

    elementEditPlace.querySelector('.form-edit-profile__name-input').value = document.querySelector('.profile__title').textContent;
    elementEditPlace.querySelector('.form-edit-profile__job-input').value = document.querySelector('.profile__subtitle').textContent;

    popup_on(elementEditPlace);

    // document.querySelector('.form-edit-profile').addEventListener('submit', (e) => {
    //     e.preventDefault();
    //     document.querySelector('.profile__title').textContent = document.querySelector('.form-edit-profile__name-input').value;
    //     document.querySelector('.profile__subtitle').textContent = document.querySelector('.form-edit-profile__job-input').value;
    //     popup_out();
    // }, { once: true });
}

addButton.addEventListener('click', handleClickAddButton)
editButton.addEventListener('click', handleClickEditButton);

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
//Функция добавления карточки
function addCard(item) {
    const card = document.querySelector('#card-template').content.cloneNode(true);
    card.querySelector('.card__name').textContent = item.name;
    card.querySelector('.card__link').src = item.link;
    card.querySelector('.card__link').alt = 'Изображение ' + item.name;
    //Добавляем элемент
    cards.prepend(card);
}

initialCards.forEach(item => addCard(item));

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
}
//Вешаем обработчик на блок
cards.addEventListener('click', hundleClickCards);