const popups = document.querySelectorAll('.popup')

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_active')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close-button')) {
            closePopup(popup)
        }
    });
});

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const activePopup = document.querySelector('.popup_active');
        closePopup(activePopup);
    }
};

function openPopup(activePopup) {
    document.addEventListener('keydown', closeByEscape);

    activePopup.classList.add('popup_active');
};

function closePopup(activePopup) {
    document.removeEventListener('keydown', closeByEscape);

    activePopup.classList.remove('popup_active');
};

export { openPopup, closePopup };