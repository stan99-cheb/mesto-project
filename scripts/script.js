

block_popup_editProfile: {
  //Находим попап в DOM
  const popupElement = document.querySelector('.popup-profile');
  // Находим форму в DOM
  const formElement = popupElement.querySelector('.form');
  // Находим поля формы в DOM
  const nameInput = formElement.querySelector('.form__name-input');
  const jobInput = formElement.querySelector('.form__job-input');

  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__subtitle').textContent;
  // Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
  function formSubmitHandler (evt) {
    evt.preventDefault(); 
    // Получите значение полей jobInput и nameInput из свойства value
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__subtitle').textContent = jobInput.value;
    popupOff(popupElement);
  }

  // Прикрепляем обработчик к форме:
  formElement.addEventListener('submit', formSubmitHandler);

  //Находим кнопку в DOM
  const editProfileButton = document.querySelector('.profile__edit-button')
  //Обработчки кнопки редактирования профиля
  function showClickEditProfileButton() {
    popupOn(popupElement);
  }
  // Прикрепляем обработчик к кнопке:
  editProfileButton.addEventListener('click', showClickEditProfileButton);

  //Находим кнопку в DOM
  const closeAddButton = popupElement.querySelector('.popup__close-button');
  // Прикрепляем обработчик к кнопке:
  closeAddButton.addEventListener('click', function() {popupOff(popupElement)});
}

block_popup_addCard: {
  //Находим попап в DOM
  const popupElement = document.querySelector('.popup-card');
  // Находим форму в DOM
  const formElement = popupElement.querySelector('.form');
  // Находим поля формы в DOM
  const nameInput = formElement.querySelector('.form__name-input');
  const jobInput = formElement.querySelector('.form__job-input');

  // Обработчик сохранения новой карточки
  function formSaveHandler (evt) {
    const newCard = {};

    evt.preventDefault(); 
    // Получите значение полей jobInput и nameInput из свойства value
    // Выберите элементы, куда должны быть вставлены значения полей
    newCard.name = nameInput.value;
    newCard.link = jobInput.value;
    addCard(newCard);
    popupOff(popupElement);
  }

  // Прикрепляем обработчик к форме:
  formElement.addEventListener('submit', formSaveHandler);

  //Находим кнопку в DOM
  const addCardButton = document.querySelector('.profile__add-button')
  //Обработчки кнопки редактирования профиля
  function showClickAddCardButton() {
    popupOn(popupElement);
  }
  // Прикрепляем обработчик к кнопке:
  addCardButton.addEventListener('click', showClickAddCardButton);

  //Находим кнопку в DOM
  const closeProfileButton = popupElement.querySelector('.popup__close-button');
  // Прикрепляем обработчик к кнопке:
  closeProfileButton.addEventListener('click', function() {popupOff(popupElement)});
}

block_popup_card: {
  //Находим попап в DOM
  const popupElement = document.querySelector('.popup-image');

  //Находим кнопку в DOM
  const closeCardButton = popupElement.querySelector('.popup__close-button');
  // Прикрепляем обработчик к кнопке:
  closeCardButton.addEventListener('click', function() {
    popupElement.querySelector('.popup__link').remove();
    popupOff(popupElement)
  });
}

function popupOn(activePopup) {
  activePopup.classList.toggle('popup_active');
}

function popupOff(activePopup) {
  activePopup.classList.toggle('popup_active');
}

block_cards: {
  const cards = document.querySelector('.cards'),
        initialCards = [
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
  //Функция добавления карточки
  function addCard(item) {
    //Получаем форму из шаблона
    const cardTemplate = document.querySelector('#new-place');
    //Клонируем карточку из шаблона
    const card = cardTemplate.content.cloneNode(true);
    //Заполняем карточку
    card.querySelector('.card__name').textContent = item.name;
    card.querySelector('.card__link').src = item.link;
    card.querySelector('.card__link').alt = item.name;
    //Добавляем элемент
    cards.prepend(card);
  }

  initialCards.forEach((item) => {
    //Каждый элемента массива передаем в функцию
    addCard(item);
  });

  function cardsHundler(e) {
    const activePopup = document.querySelector('.popup-image');
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
          activePopup.querySelector('.popup__container').append(cloneSelectButton);
          popupOn(activePopup);
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
  cards.addEventListener('click', cardsHundler);
}
