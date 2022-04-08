

block_popup: {
  let popup;

  function popupHandler(e) {
    //Перехватываем обработчик по умолчанию
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
          submitButtonHandler()
          break;
      }
    }
  }

  function submitButtonHandler() {
    const header = document.querySelector('.form__header');
    switch (header.textContent) {
      case 'Редактировать профиль':
        document.querySelector('.profile__title').textContent = document.querySelector('.form__name-input').value;
        document.querySelector('.profile__subtitle').textContent = document.querySelector('.form__job-input').value;
        popup_out();
        break;
      case 'Новое место':
        const newCard = {
          name: document.querySelector('.form__name-input').value,
          link: document.querySelector('.form__job-input').value
        };
        addCard(newCard);
        popup_out();
        break;
    }
  }

  function popup_on(formCopy) {
    //Получаем шаблон
    const popupTemplate = document.querySelector('#popup-template');
    //Клонируем попап из шаблона
    let popupCopy = popupTemplate.content.cloneNode(true);
    //добавляем в попап форму
    popupCopy.querySelector('.popup__container').append(formCopy);
    //Подмешиваем селектор плавного появления окна
    popupCopy.querySelector('.popup').classList.add('popup_fade-in');
    //показываем форму на экране
    document.body.append(popupCopy);

    popup = document.querySelector('.popup');
    popup.addEventListener('click', popupHandler);
  }

  function popup_out() {
    popup.classList.remove('popup_fade-in');
    //Подмешиваем селектор плавного исчезновения окна
    popup.classList.add('popup_fade-out');
    //Убираем обработчик
    popup.removeEventListener('click', popupHandler);
    //Закрываем попап
    setTimeout(popup.remove(), 2000);
  }

}

block_form: {
  function getForm() {
    //Получаем форму из шаблона
    const formTemplate = document.querySelector('#form-template');
    //Клонируем
    const form = formTemplate.content.cloneNode(true);
    //Возвращаем форму
    return form;
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
}

block_profile: {
  const profile = document.querySelector('.profile');

  function fillDataProfile(item) {
    item.querySelector('.form__name-input').value = document.querySelector('.profile__title').textContent;
    item.querySelector('.form__job-input').value = document.querySelector('.profile__subtitle').textContent;
    return item;
  }

  function profileClickHandler(e) {
    //Выбираем клики на кнопки Edit и Add
    const selectButton = e.target.closest('.profile__edit-button') || e.target.closest('.profile__add-button');
    //Получаем форму из шаблона
    let elementForm = getForm();

    if (selectButton) {
      switch (selectButton.className) {
        case 'profile__edit-button':
          //Заполняем форму данными
          elementForm = fillForm(elementForm, 'edit');
          elementForm = fillDataProfile(elementForm);
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

  profile.addEventListener('click', profileClickHandler);
}

block_cards: {
  const cards = document.querySelector('.cards');

  const initialCards = [
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
  
  function addCard(item) {
    //Получаем форму
    const cardTemplate = document.querySelector('#new-place');
    //Клонируем карточку из шаблона
    const card = cardTemplate.content.cloneNode(true);

    card.querySelector('.card__name').textContent = item.name;
    card.querySelector('.card__link').src = item.link;
    card.querySelector('.card__link').alt = item.name;
    //Рисуем карту на экране
    cards.prepend(card);
  }

  initialCards.forEach((item) => {
    addCard(item);
  });

  function cardsHundler(e) {
    const selectButton = e.target.closest('.card__link') || e.target.closest('.card__heart') || e.target.closest('.card__trash');

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

  cards.addEventListener('click', cardsHundler);
}
