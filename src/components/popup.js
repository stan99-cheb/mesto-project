const popups = document.querySelectorAll('.popup')

popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup__close-button')) {
            closePopup(popup)
        }
    })
});

const popupImage = document.querySelector('.popup-image');

function openPopup(activePopup) {
    const keyEscape = (evt) => {
        if (evt.key === 'Escape') {
            document.removeEventListener('keydown', keyEscape);
            closePopup(activePopup);
        };
    };

    document.addEventListener('keydown', keyEscape);

    // const anyClick = (evt) => {
    //     if (evt.target.classList.contains('popup')) {
    //         closePopup(activePopup);
    //         activePopup.removeEventListener('click', anyClick);
    //     }
    // }

    // activePopup.addEventListener('click', anyClick);

    activePopup.classList.add('popup_active');
};

function closePopup(activePopup) {
    activePopup.classList.remove('popup_active');
};

function openImagePopup(item) {
    const popupLink = popupImage.querySelector('.popup-image__link');
    const popupName = popupImage.querySelector('.popup-image__name');

    popupLink.src = item.link;
    popupLink.alt = item.name;
    popupName.textContent = item.name;

    openPopup(popupImage);
};

export { openPopup, closePopup, openImagePopup };