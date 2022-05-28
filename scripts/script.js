'use strict'

const timeAnimation = parseInt((getComputedStyle(document.querySelector(':root')).getPropertyValue('--time-animation')), 10) - 15;

let popup;
//Обработчик событий попапа
function submitButtonHandler() {
    const header = document.querySelector('.form__header');
    switch (header.textContent) {
        case 'Редактировать профиль':
            //Заполняем профиль новыми данными
            document.querySelector('.profile__title').textContent = document.querySelector('.form__name-input').value;
            document.querySelector('.profile__subtitle').textContent = document.querySelector('.form__job-input').value;
            popup_out();
            break;
        case 'Новое место':
            //Готовим объект
            const newCard = {
                name: document.querySelector('.form__name-input').value,
                link: document.querySelector('.form__job-input').value
            };
            //Добавляем новую карту
            addCard(newCard);
            popup_out();
            break;
    }
}

function popupHandler(e) {
    //Запрещаем действия по умолчанию
    e.preventDefault();
    //Получаем селектор цели
    const selectButton = e.target.closest('.popup__close-button') || e.target.closest('.form__submit-button') || e.target.closest('.popup');

    if (selectButton) {
        switch (selectButton.classList[0]) {
            case 'popup__close-button':
                popup_out();
                break;
            case 'form__submit-button':
                submitButtonHandler();
                break;
            case 'popup':
                popup_out();
                break;
        }
    }
}

function popupHandlerKey(e) {
    if (e.key === 'Escape') {
        popup_out();
    };
}

function popup_on(form) {
    //Клонируем попап из шаблона
    let popupCopy = document.querySelector('#popup-template').content.cloneNode(true);
    //добавляем в попап форму
    popupCopy.querySelector('.popup__container').append(form);
    //Подмешиваем селектор плавного появления окна
    popupCopy.querySelector('.popup').classList.add('popup_fade-in');
    //показываем форму на экране
    document.body.append(popupCopy);
    //Добавляем слушатель событий
    popup = document.querySelector('.popup');
    popup.addEventListener('click', popupHandler);
    //Добавляем слушатель событий клавиатуры
    document.addEventListener('keydown', popupHandlerKey);
}

function popup_out() {
    //Удаляем селектор плавного открытия
    popup.classList.remove('popup_fade-in');
    //Подмешиваем селектор плавного исчезновения
    popup.classList.add('popup_fade-out');
    //Убираем обработчик
    popup.removeEventListener('click', popupHandler);
    //Убираем обработчик клавиатуры
    document.removeEventListener('keydown', popupHandlerKey);
    //Ждем окончания анимации
    setTimeout(() => { popup.remove() }, timeAnimation);
}

function fillForm(form, select) {
    switch (select) {
        case 'edit':
            form.querySelector('.form__header').textContent = 'Редактировать профиль';
            form.querySelector('.form__name-input').placeholder = 'Иван Иванов';
            form.querySelector('.form__job-input').placeholder = 'О себе';
            form.querySelector('.form__submit-button').textContent = 'Сохранить';
            break;
        case 'add':
            form.querySelector('.form__header').textContent = 'Новое место';
            form.querySelector('.form__name-input').placeholder = 'Название';
            form.querySelector('.form__job-input').placeholder = 'Ссылка на картинку';
            form.querySelector('.form__submit-button').textContent = 'Создать';
            break;
    }
    return form;
}

const profile = document.querySelector('.profile');

function getDataProfile(item) {
    item.querySelector('.form__name-input').value = document.querySelector('.profile__title').textContent;
    item.querySelector('.form__job-input').value = document.querySelector('.profile__subtitle').textContent;
    return item;
}

function handleClickProfile(e) {
    //Выбираем клики на кнопки Edit и Add
    let selectButton = e.target.closest('.profile__edit-button') || e.target.closest('.profile__add-button');
    //Получаем клон элемента
    let elementForm = document.querySelector('#form-template').content.cloneNode(true);

    if (selectButton) {
        switch (selectButton.classList[0]) {
            case 'profile__edit-button':
                //Заполняем форму данными
                elementForm = fillForm(elementForm, 'edit');
                //Берем текущие данные профиля
                elementForm = getDataProfile(elementForm);
                //Открываем попап
                popup_on(elementForm);
                break;
            case 'profile__add-button':
                //Заполняем форму данными
                elementForm = fillForm(elementForm, 'add');
                //Открываем попап
                popup_on(elementForm);
                break;
        }
    }
}
//Вешаем обработчик на блок
profile.addEventListener('click', handleClickProfile);

const cards = document.querySelector('.cards');
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