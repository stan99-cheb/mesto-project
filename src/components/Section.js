export default class Section {
    constructor({ data, renderer }, selector) {
        this._initialArray = data;
        this._renderer = renderer;
        this._container = document.querySelector(selector);
    }

    setItem(element) {
        this._container.append(element);
    }

    rendererCard() {
        this._initialArray.forEach(item => {
            this._renderer(item);
        });
    }
}