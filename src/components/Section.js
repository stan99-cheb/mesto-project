export default class Section {
    constructor(renderer, selector) {
        this._renderer = renderer;
        this._container = document.querySelector(selector);
    }

    setItem(element) {
        this._container.prepend(element);
    }

    rendererCard(data, user) {
        data.reverse().forEach(item => {
            this._renderer(item, user);
        });
    }
}