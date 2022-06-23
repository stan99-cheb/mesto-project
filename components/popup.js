

function openPopup(activePopup) {
    activePopup.classList.toggle('popup_active');
}

function closePopup(activePopup) {
    activePopup.classList.toggle('popup_active');
}

function openImagePopup(item) {
    const popupLink = popupImage.querySelector('.popup__link');
    const popupName = popupImage.querySelector('.popup__name');

    popupLink.src = item.link;
    popupLink.alt = item.name;
    popupName.textContent = item.name;

    openPopup(popupImage);
}