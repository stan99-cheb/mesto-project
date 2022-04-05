

function popupHandler(e) {
  //Перехватываем обработчик по умолчанию
  e.preventDefault();
  //Получаем селектор цели
  let selectTarget = e.target.className;

  switch (selectTarget) {
    case 'popup__close-button-image':
      popup_out(e.target);
      break;
    case 'form__submit-button':
      //Пока нет обработчика этой кнопки
      console.log('Сохранить');
      break;
  }
}

function popup_on(formCopy) {
  //Здесь храним попап
  const popupTemplate = document.querySelector('#popup-template');
  //Клонируем попап из шаблона
  let popupCopy = popupTemplate.content.cloneNode(true);
  //добавляем в попап форму
  popupCopy.querySelector('.popup__container').append(formCopy);
  //показываем форму на экране
  document.body.append(popupCopy);

  popupCopy = document.querySelector('.popup');
  popupCopy.addEventListener('click', popupHandler);
}

function popup_out(selectTarget) {
  popupCopy = document.querySelector('.popup');
  popupCopy.removeEventListener('click', popupHandler);
  //Закрываем попап
  selectTarget.closest('.popup').remove();
}

Section_profile: {
  const profile = document.querySelector('.profile');
  
  function editButton_showClick() {
    //Здесь будем хранить форму
    const formTemplate = document.querySelector('#form-template');
    //Клонируем форму из шаблона
    formCopy = formTemplate.content.cloneNode(true);
    //Заполняем форму
    formCopy.querySelector('.form__header').textContent = 'Редактировать профиль';
    formCopy.querySelector('.form__name-input').placeholder = 'Иван Иванов';
    formCopy.querySelector('.form__job-input').placeholder = 'О себе';
    formCopy.querySelector('.form__submit-button').textContent = 'Сохранить';
    //Вызываем открытие попапа, передаем форму
    popup_on(formCopy);
  }

  function addButton_showClick() {

  }

  function profileClickHandler(e) {
    let selectTarget = e.target.className || e.target.id;
    
    switch (selectTarget) {
      case 'profile__edit-button':
      case 'profileEditButtonIcon':
        editButton_showClick();
        break;
      case 'profile__add-button':
      case 'profileAddButtonIcon':
        addButton_showClick();
        break;
    }
  }

  profile.addEventListener('click', profileClickHandler);
}























/*
//Кнопка редактирования профиля пользователя
const editButton = document.querySelector('.profile__edit-button');

function showClick_closeButton(e) {
  //Удаляем обработчик с кнопки закрытия попапа
  const closeButton = document.querySelector('.popup__close-button');
  closeButton.removeEventListener('click', showClick_closeButton);
  //Закрываем попап
  e.target.closest('.popup').remove();
}

function showClick_form(e) {
  e.preventDefault();
  const submitButton = e.target.querySelector('.form__submit-button');
  console.log(submitButton);

  //Удаляем обработчик с формы
  const eventForm = document.querySelector('.form');
  eventForm.removeEventListener('submit', showClick_form);
  //Закрываем попап
  e.target.closest('.popup').remove();
}

function showClick_editButton() {
  const popupTemplate = document.querySelector('#popup-template');
  const formTemplate = document.querySelector('#form-template');

  popupCopy = popupTemplate.content.cloneNode(true);
  formCopy = formTemplate.content.cloneNode(true);

  formCopy.querySelector('.form__header').textContent = 'Редактировать профиль';
  formCopy.querySelector('.form__name-input').placeholder = 'Иван Иванов';
  formCopy.querySelector('.form__job-input').placeholder = 'О себе';
  formCopy.querySelector('.form__submit-button').textContent = 'Сохранить';

  popupCopy.querySelector('.popup__container').append(formCopy);

  document.body.append(popupCopy);

  const closeButton = document.querySelector('.popup__close-button');
  closeButton.addEventListener('click', showClick_closeButton);
  //nameInput.value = profileTitle.textContent;
  //jobInput.value = profileSubtitle.textContent;
}
  
editButton.addEventListener('click', showClick_editButton);


//Кнопка добавления нового места
const addButton = document.querySelector('.profile__add-button');

function showClick_addButton() {
  const popupTemplate = document.querySelector('#popup-template');
  const formTemplate = document.querySelector('#form-template');

  popupCopy = popupTemplate.content.cloneNode(true);
  formCopy = formTemplate.content.cloneNode(true);

  formCopy.querySelector('.form__header').textContent = 'Новое место';
  formCopy.querySelector('.form__name-input').placeholder = 'Название';
  formCopy.querySelector('.form__job-input').placeholder = 'Ссылка на картинку';
  formCopy.querySelector('.form__submit-button').textContent = 'Создать';

  popupCopy.querySelector('.popup__container').append(formCopy);
  
  document.body.append(popupCopy);

  const closeButton = document.querySelector('.popup__close-button');
  closeButton.addEventListener('click', showClick_closeButton);

  const eventForm = document.querySelector('.form');
  eventForm.addEventListener('submit', showClick_form);
}

addButton.addEventListener('click', showClick_addButton);
*/
/*

// Находим форму в DOM


// Находим поля формы в DOM

// Обработчик «отправки» формы
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
// Получите значение полей jobInput и nameInput из свойства value




  
// Вставьте новые значения с помощью textContent


  if (popupForm.children[3].textContent === 'Сохранить') {
    // Выберите элементы, куда должны быть вставлены значения полей
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
  } else if (popupForm.children[3].textContent === 'Создать') {
    const namePlaceInput = popupForm.children[1].value;
    const linkPlaceInput = popupForm.children[2].value;
    addCard(namePlaceInput, linkPlaceInput);
    showClick_closeButton();
  }

}
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

*/

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

const card = document.querySelectorAll('.card');

for (let i = 0; i < card.length; i++) {
  card[i].children[0].src = initialCards[i].link;
  card[i].children[1].textContent = initialCards[i].name;
}

/*

function addCard(namePlace, linkPlace) {
  const cards = document.querySelector('.cards');

  cards.insertAdjacentHTML('afterbegin', `
    <div class="card">
      <img class="card__link" src="${linkPlace}" alt="${namePlace}">
      <h2 class="card__name">${namePlace}</h2>
      <button class="card__heart" type="button" aria-label="heart button"></button>
      <img class="card__trash" src="./images/trash.svg" alt="Изображение мусорной корзины">
    </div>
  `);
}



function popupImg(img) {
  const popupImg = document.querySelector('.popup');
  popupImg.classList.toggle('popup_active');

  popupImgLink = document.createElement('img');
  popupImgLink.classList = 'popup-img__link';
  popupImgLink.src = img.src;

  (popupImg.children[0]).append(popupImgLink);

  const popupImgCloseButton = document.querySelector('.popup-img__close-button');
  popupImgCloseButton.addEventListener('click', showClick_popupImgCloseButton);
}

function showClick_popupImgCloseButton() {
  const popupImg = document.querySelector('.popup');
  popupImg.classList.toggle('popup_active');

  popupImgLink = document.querySelector('.popup-img__link');
  setTimeout("popupImgLink.remove()", 1000);

  const popupImgCloseButton = document.querySelector('.popup-img__close-button');
  popupImgCloseButton.removeEventListener('click', showClick_popupImgCloseButton);
}


function delCard(trashButton) {
  //Выбираем родительский блок и удаляем его
  (trashButton.closest('.card')).remove();
}

function toggleHeart(heartButton) {
  //Переключаем селектор, если есть - убираем, если нет - добавляем
  heartButton.classList.toggle('card__heart_active');
}
//Обработчик событий в блоке cards
function showClick_card(e) {
  //выбираем первый селектор из целевого объекта
  switch (e.target.classList[0]) {
    case 'card__link':
      popupImg(e.target);
      break;
    case 'card__trash':
      //Передаем выполнение в функцию удаления карточки
      delCard(e.target);
      break;
    case 'card__heart':
      //Передаем выполнение в функцию переключения кнопки сердечка
      toggleHeart(e.target);
      break;
  }
}
//Подключаем прослушиватель событий через делегирование, на весь блок cards
const cards = document.querySelector('.cards');
cards.addEventListener('click', showClick_card);*/