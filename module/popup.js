import { setEscapeKeylistener, setClickAnyPlaceListener } from './utils.js'

const timeAnimation = parseInt((getComputedStyle(document.querySelector(':root')).  //Стили из Root
                        getPropertyValue('--time-animation')), 10) - 15;            //Свойство. Тут магическое число, знаю, что нельзя.
                                                                                    //Просто попап пропадает чуть-чуть раньше, чем успевает закончиться анимация

function popup_on(element) {
    const popupElement = document.querySelector('#popup-template').content.cloneNode(true);    //Клонируем попап из шаблона
    const popupCloseButton = popupElement.querySelector('.popup__close-button');

    popupElement.querySelector('.popup__container').append(element);        //добавляем в попап элемент
    
    popupElement.querySelector('.popup').classList.add('popup_fade-in');    //Подмешиваем селектор плавного появления окна
    
    document.body.append(popupElement);     //показываем попап на экране

    popupCloseButton.addEventListener('click', popup_out, { once: true });  //Добавляем обработчик, срабатывает только 1 раз

    setEscapeKeylistener();

    setClickAnyPlaceListener();
}

function popup_out() {
    const popup = document.querySelector('.popup');
    
    popup.classList.remove('popup_fade-in');    //Удаляем селектор плавного открытия
    
    popup.classList.add('popup_fade-out');      //Подмешиваем селектор плавного закрытия
    
    setTimeout(() => { popup.remove() }, timeAnimation);    //Ждем окончания анимации
};

export { popup_on, popup_out };