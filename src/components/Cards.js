export default class Card {
    constructor(card, handleCardClick, handleLikeClick, handleDelClick, cardElementSelectorTemplate, userId) {
        this._card = card;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDelClick = handleDelClick;
        this._templateSelector = cardElementSelectorTemplate;
        this._userId = userId;
    };

    //Получаем DOM элемент карточки
    _getElement() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .cloneNode(true);
        return cardElement;
    };
    //Публичный метод возвращающий готовый элемент карточки
    create() {
        //Получаем DOM элемент карточки из шаблона
        this._element = this._getElement();
        //Вешаем слушатели на кнопки карточки
        this._setEventListeners();
        //Заполняем карточку данными
        this._element.querySelector('.card__link').src = this._card.link;
        this._element.querySelector('.card__name').textContent = this._card.name;
        this._element.querySelector('.card__link').alt = 'Изображение ' + this._card.name;
        this._element.querySelector('.card__like').textContent = this._card.likes.length;

        //Делаем проверку, если не моя карточка то удаляем DOM элемент корзинку
        if (!this._isMyCard(this._card.owner._id, this._userId)) {
            this._element.querySelector('.card__trash').remove();
        };
        //Делаем проверку, если я лайкал карточку, то закрашиваем сердечко
        if (this._hasLikeCard(this._card.likes, this._userId)) {
            this._element.querySelector('.card__heart').classList.add('card__heart_active');
        } else {
            this._element.querySelector('.card__heart').classList.remove('card__heart_active');
        };

        //Возвращаем готовый DOM элемент карточки
        return this._element;
    };

    _setEventListeners() {
        this._element.querySelector('.card__link').addEventListener('click', (evt) => {
            this._handleCardClick(evt.target);
        });
        this._element.querySelector('.card__heart').addEventListener('click', (evt) => {
            this._handleLikeClick(evt.target, this._card._id);
        });
        this._element.querySelector('.card__trash').addEventListener('click', (evt) => {
            this._handleDelClick(evt.target, this._card._id);
        });
    };

    _isMyCard(cardOwnerId, userId) {
        return cardOwnerId === userId;
    };

    _hasLikeCard(likes, myId) {
        return likes.some(element => element._id === myId);
    };
}