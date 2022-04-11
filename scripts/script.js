

block_popup: {
  function popupCloseHandler(e) {
    const closeButton = e.target.closest('.popup');

    closeButton.removeEventListener('click', popupCloseHandler);

    popupOff(closeButton);
  }

  function popupOn(item) {
    const closeButton = item.querySelector('.popup__close-button');

    item.classList.toggle('popup_active');

    closeButton.addEventListener('click', popupCloseHandler);
  }

  function popupOff(item) {
    
    item.classList.toggle('popup_active');
  }
}

/*
block_popup: {
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
    const selectButton = e.target.closest('.popup__close-button') || e.target.closest('.form__submit-button');

    if (selectButton) {
      switch (selectButton.className) {
        case 'popup__close-button':
          popup_out();
          break;
        case 'form__submit-button':
          //Пока нет обработчика этой кнопки
          submitButtonHandler();
          break;
      }
    }
  }

  function popup_on(form) {
    //Получаем шаблон
    const popupTemplate = document.querySelector('#popup-template');
    //Клонируем попап из шаблона
    let popupCopy = popupTemplate.content.cloneNode(true);
    //добавляем в попап форму
    popupCopy.querySelector('.popup__container').append(form);
    //Подмешиваем селектор плавного появления окна
    popupCopy.querySelector('.popup').classList.add('popup_fade-in');
    //показываем форму на экране
    document.body.append(popupCopy);
    //Добавляем слушатель событий
    popup = document.querySelector('.popup');
    popup.addEventListener('click', popupHandler);
  }

  function popup_out() {
    //Удаляем селектор плавного открытия
    popup.classList.remove('popup_fade-in');
    //Подмешиваем селектор плавного исчезновения
    popup.classList.add('popup_fade-out');
    //Убираем обработчик
    popup.removeEventListener('click', popupHandler);
    //Ждем окончания анимации
    popup.addEventListener('animationend', () => {
      //Удаляем попап
      popup.remove();
    }, {once: true});//Прослушиватель выполняется только один раз
  }
}

block_form: {
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
}
*/


block_profile: {
  const popupProfile = document.querySelector('.popup-profile');
  const profile = document.querySelector('.profile__edit-button');

  function clickEditProfileHandler(e) {
    const editButton = e.target.closest('.profile__edit-button');
    
    if (editButton) {
      popupProfile.querySelector('.form__name-input').value = document.querySelector('.profile__title').textContent;
      popupProfile.querySelector('.form__job-input').value = document.querySelector('.profile__subtitle').textContent;
      popupOn(popupProfile);
    }
  }
  //Вешаем обработчик на кнопку редактирования профиля
  profile.addEventListener('click', clickEditProfileHandler);
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
  cards.addEventListener('click', cardsHundler);
}
