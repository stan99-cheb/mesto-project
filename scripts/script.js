

let editButton = document.querySelector('.profile__edit-button');

function showClick_editButton() {
    popup = document.querySelector('.popup');
    popup.classList.add('popup_active');
    console.log(popup.classList);
}
  
editButton.addEventListener('click', showClick_editButton);

let closeButton = document.querySelector('.popup__close-button');

function showClick_closeButton() {
    popup = document.querySelector('.popup');
    popup.classList.remove('popup_active');
    console.log(popup.classList);
}

closeButton.addEventListener('click', showClick_closeButton);