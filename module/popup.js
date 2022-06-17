const timeAnimation = parseInt((getComputedStyle(document.querySelector(':root')).getPropertyValue('--time-animation')), 10) - 15;

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
};

export { popup_on, popup_out };