

block_popup: {
  let activePopup, newCard;

  function activePopupHandler(e) {
    const activePopup = e.target.closest('.popup');
    const header = activePopup.querySelector('.form__header');
    const selectButton = e.target.closest('.popup__close-button') || e.target.closest('.form__submit-button');
    
    e.preventDefault();
    
    if (selectButton) {
      if (selectButton.classList.contains('form__submit-button')) {
        switch (header.textContent) {
          case 'Редактировать профиль':
            document.querySelector('.profile__title').textContent = e.currentTarget.querySelector('.form__name-input').value;
            document.querySelector('.profile__subtitle').textContent = e.currentTarget.querySelector('.form__job-input').value;
            activePopup.removeEventListener('click', activePopupHandler);
            popupOff(activePopup);
            break;
          case 'Новое место':
            const newCard =
              {
                name: e.currentTarget.querySelector('.form__name-input').value,
                link: e.currentTarget.querySelector('.form__job-input').value
              };
            addCard(newCard);
            activePopup.removeEventListener('click', activePopupHandler);
            popupOff(activePopup);
            break;
        }
      }
    }
  }

  function popupOn(activePopup) {
    activePopup.classList.toggle('popup_active');

    activePopup.addEventListener('click', activePopupHandler);
  }

  function popupOff(activePopup) {
    
    activePopup.classList.toggle('popup_active');
  }
}

block_profile: {
  const popupProfile = document.querySelector('.popup-profile');
  const editButton = document.querySelector('.profile__edit-button');

  const popupCard = document.querySelector('.popup-card');
  const addButton = document.querySelector('.profile__add-button');

  function clickEditProfileHandler(e) {
    if (editButton) {
      popupProfile.querySelector('.form__name-input').value = document.querySelector('.profile__title').textContent;
      popupProfile.querySelector('.form__job-input').value = document.querySelector('.profile__subtitle').textContent;
      popupOn(popupProfile);
    }
  }
  //Вешаем обработчик на кнопку редактирования профиля
  editButton.addEventListener('click', clickEditProfileHandler);

  function clickAddCardHandler() {
    popupOn(popupCard);
  }

  addButton.addEventListener('click', clickAddCardHandler);
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
