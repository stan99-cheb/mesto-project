const formElement = document.querySelector('.popup__form');

const editButton = document.querySelector('.profile__edit-button');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.popup__name-input');
const jobInput = document.querySelector('.popup__job-input');

const popup = document.querySelector('.popup');
const popupForm = popup.querySelector('.popup__form');

function showClick_editButton() {
    
  popup.classList.add('popup_active');

  popupForm.children[0].textContent = 'Редактировать профиль';

  popupForm.children[1].setAttribute('placeholder', 'Иван Иванов');
  
  popupForm.children[2].setAttribute('placeholder', 'О себе');

  //nameInput.value = profileTitle.textContent;
  //jobInput.value = profileSubtitle.textContent;

  popupForm.children[3].textContent = 'Сохранить';
}
  
editButton.addEventListener('click', showClick_editButton);



const closeButton = document.querySelector('.popup__close-button');

function showClick_closeButton() {
  popup.classList.remove('popup_active');

  popupForm.children[0].textContent = '';
  popupForm.children[1].value = '';
  popupForm.children[2].value = '';
}

closeButton.addEventListener('click', showClick_closeButton);



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



const addButton = document.querySelector('.profile__add-button');

function showClick_addButton() {

  popup.classList.add('popup_active');

  popupForm.children[0].textContent = 'Новое место';

  popupForm.children[1].setAttribute('placeholder', 'Название');

  popupForm.children[2].setAttribute('placeholder', 'Ссылка на картинку');

  popupForm.children[3].textContent = 'Создать';
}

addButton.addEventListener('click', showClick_addButton);



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
  const popupImg = document.querySelector('.popup-img');
  popupImg.classList.toggle('popup-img_active');

  popupImgLink = document.createElement('img');
  popupImgLink.classList = 'popup-img__link';
  popupImgLink.src = img.src;

  (popupImg.children[0]).append(popupImgLink);

  const popupImgCloseButton = document.querySelector('.popup-img__close-button');
  popupImgCloseButton.addEventListener('click', showClick_popupImgCloseButton);
}

function showClick_popupImgCloseButton() {
  const popupImg = document.querySelector('.popup-img');
  popupImg.classList.toggle('popup-img_active');

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
cards.addEventListener('click', showClick_card);