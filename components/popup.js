//Находим попап в DOM
const popupImage = document.querySelector('.popup-image');

function openPopup(activePopup) {
    const keyEscape = (evt) => {
        if (evt.key === 'Escape') {
            document.removeEventListener('keydown', keyEscape);
            closePopup(activePopup);
        };
    };

    document.addEventListener('keydown', keyEscape);

    activePopup.classList.toggle('popup_active');
}

function closePopup(activePopup) {
    activePopup.classList.toggle('popup_active');
}

function openImagePopup(item) {
    const popupLink = popupImage.querySelector('.popup-image__link');
    const popupName = popupImage.querySelector('.popup-image__name');

    popupLink.src = item.link;
    popupLink.alt = item.name;
    popupName.textContent = item.name;

    openPopup(popupImage);
}

export { openPopup, closePopup, openImagePopup }