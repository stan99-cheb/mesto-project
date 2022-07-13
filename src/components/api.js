import { checkRes } from './utils.js';

const cardForDel = {
    id: '',
    card: null
}

const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-12',
    headers: {
        authorization: '5743d2b2-8d60-4e50-9a9c-7a3ab60b2c12',
        'Content-Type': 'application/json'
    }
}

const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(checkRes);
}

const getUserMe = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then(checkRes);
}

const setUserMe = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
        .then(checkRes);
}

const setNewCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
        .then(checkRes);
}

const delCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(checkRes);
}

const likesCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
        .then(checkRes);
}

const delLikesCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(checkRes);
}

const setAvatar = (ava) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: ava,
        })
    })
        .then(checkRes);
}

export {
    getInitialCards,
    getUserMe,
    setUserMe,
    setNewCard,
    delCard,
    likesCard,
    delLikesCard,
    setAvatar,
    cardForDel
}