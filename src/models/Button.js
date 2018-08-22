export default class Button {
    constructor (page) {
        this.page = page;
    }

    set page (page) {
        this._page = page;
    }

    get page () {
        return this._page;
    }

    set active (active) {
        this._active = active;
    }

    get active () {
        return this._active;
    }

    set disabled (disabled) {
        this._disabled = disabled;
    }

    get disabled () {
        return this._disabled;
    }

    set dots (dots) {
        this._dots = dots;
    }

    get dots () {
        return this._dots;
    }

    set html (html) {
        this._html = html;
    }

    get html () {
        return this._html || this.page + 1;
    }

    set title (title) {
        this._title = title;
    }

    get title () {
        return this.disabled || this.active ? '' : this._title || this.page + 1 || '';
    }

    set externalClasses (externalClasses) {
        this._externalClasses = externalClasses;
    }

    get externalClasses () {
        return this._externalClasses || {};
    }

    get classes () {
        let classes = ['focus:outline-none', 'border', 'ml-1', 'leading-normal', 'w-6', ...(this.externalClasses.default || [])];

        if (this.active) {
            return ['bg-tt-green', 'text-white', 'cursor-default', ...classes, ...(this.externalClasses.active || [])];
        }

        if (this.disabled) {
            return ['text-grey', 'bg-grey-light', 'cursor-default', ...classes, ...(this.externalClasses.disabled || [])];
        }

        if (this.dots) {
            return ['cursor-default', 'border-none', ...classes, ...(this.externalClasses.dots || [])];
        }

        return ['hover:bg-grey-lighter', ...classes];
    }
}
