const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');


//Находим попап в DOM
const popupProfile = document.querySelector('.popup-profile');
// Находим форму в DOM
const formProfile = popupProfile.querySelector('.form');
// Находим поля формы в DOM
const nameInput = formProfile.querySelector('.form__name-input');
const jobInput = formProfile.querySelector('.form__job-input');
nameInput.value = profileTitle.textContent;
jobInput.value = profileSubtitle.textContent;
// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleProfileFormSubmit (evt) {
  evt.preventDefault(); 
  // Получите значение полей jobInput и nameInput из свойства value
  // Выберите элементы, куда должны быть вставлены значения полей
  // Вставьте новые значения с помощью textContent
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupProfile);
}
// Прикрепляем обработчик к форме:
formProfile.addEventListener('submit', handleProfileFormSubmit);
//Находим кнопку в DOM
const editProfileButton = document.querySelector('.profile__edit-button')
//Обработчки кнопки редактирования профиля
function openProfilePopup() {
  openPopup(popupProfile);
}
// Прикрепляем обработчик к кнопке:
editProfileButton.addEventListener('click', openProfilePopup);
//Находим кнопку в DOM
const closeAddButton = popupProfile.querySelector('.popup__close-button');
// Прикрепляем обработчик к кнопке:
closeAddButton.addEventListener('click', function() {closePopup(popupProfile)});




//Находим попап в DOM
const popupCard = document.querySelector('.popup-card');
// Находим форму в DOM
const formCard = popupCard.querySelector('.form');
// Находим поля формы в DOM
const nameCard = formCard.querySelector('.form__name-input');
const linkCard = formCard.querySelector('.form__job-input');
// Обработчик сохранения новой карточки
function handleCardFormSubmit (evt) {
  const newCard = {};
  evt.preventDefault(); 
  // Получите значение полей jobInput и nameInput из свойства value
  // Выберите элементы, куда должны быть вставлены значения полей
  newCard.name = nameCard.value;
  newCard.link = linkCard.value;
  //Очищаем инпуты
  nameCard.value = '';
  linkCard.value = '';
  addCard(newCard);
  closePopup(popupCard);
}
// Прикрепляем обработчик к форме:
formCard.addEventListener('submit', handleCardFormSubmit);
//Находим кнопку в DOM
const addCardButton = document.querySelector('.profile__add-button')
//Обработчки кнопки редактирования профиля
function openCardPopup() {
  openPopup(popupCard);
}
// Прикрепляем обработчик к кнопке:
addCardButton.addEventListener('click', openCardPopup);
//Находим кнопку в DOM
const closeProfileButton = popupCard.querySelector('.popup__close-button');
// Прикрепляем обработчик к кнопке:
closeProfileButton.addEventListener('click', function() {closePopup(popupCard)});



//Находим попап в DOM
const popupImage = document.querySelector('.popup-image');
//Находим кнопку в DOM
const imagePopupCloseButton = popupImage.querySelector('.popup__close-button');
// Прикрепляем обработчик к кнопке:
imagePopupCloseButton.addEventListener('click', function() {
  closePopup(popupImage)
});


function openPopup(activePopup) {
  activePopup.classList.toggle('popup_active');
}

function closePopup(activePopup) {
  activePopup.classList.toggle('popup_active');
}




const cardsElement = document.querySelector('.cards'),
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
//Функция создания карточки
function createCard(item) {
  //Получаем форму из шаблона
  const cardTemplate = document.querySelector('#new-place');
  //Клонируем карточку из шаблона
  const card = cardTemplate.content.cloneNode(true);
  //Получаем изображение карточки
  const imageCard = card.querySelector('.card__link');
  const nameCard = card.querySelector('.card__name');
  const heartCard = card.querySelector('.card__heart');
  const trashCard = card.querySelector('.card__trash');
  //Заполняем карточку
  nameCard.textContent = item.name;
  imageCard.src = item.link;
  imageCard.alt = item.name;
  //Вешаем обработчик на изображение
  imageCard.addEventListener('click', openImagePopup);
  //Вешаем обработчик на сердечко
  heartCard.addEventListener('click', likeCard);
  //Вешаем обработчик на корзину
  trashCard.addEventListener('click', deleteCard);
return card
}
//Функция добавления карточки
function addCard(item) {
  const card = createCard(item);
  //Добавляем элемент
  cardsElement.prepend(card);
}

//Каждый элемента массива передаем в функцию
initialCards.forEach(addCard);

function openImagePopup(e) {
  const sourceImage = e.target;
  const popupImage = document.querySelector('.popup-image');
  const targetImage = popupImage.querySelector('.popup__link');
  const sourceName = e.target.nextElementSibling;
  const targetName = popupImage.querySelector('.popup__name');

  targetImage.src = sourceImage.src;
  targetImage.alt = sourceImage.alt;

  targetName.textContent = sourceName.textContent;

  openPopup(popupImage);
}

function likeCard(e) {
  //Переключаем сердечко
  e.target.closest('.card__heart').classList.toggle('card__heart_active');
}

function deleteCard(e) {
  //Удаляем карточку
  e.target.closest('.card').remove();
}
