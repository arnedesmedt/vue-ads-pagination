import Button from '../../../src/models/Button';

describe('Button', () => {
    const defaults = ['focus:outline-none', 'border', 'ml-1', 'leading-normal', 'w-6'];

    it('disables a button', () => {
        let button = new Button();
        button.disabled = true;

        expect(button.classes).toEqual([
            'text-grey',
            'bg-grey-light',
            'cursor-default',
            ...defaults,
        ]);
    });

    it('activates a button', () => {
        let button = new Button();
        button.active = true;

        expect(button.classes).toEqual([
            'bg-tt-green',
            'text-white',
            'cursor-default',
            ...defaults,
        ]);
    });

    it('makes ... of a button', () => {
        let button = new Button();
        button.dots = true;

        expect(button.classes).toEqual([
            'cursor-default',
            'border-none',
            ...defaults,
        ]);
    });

    it('customizes an active button', () => {
        let button = new Button();
        button.active = true;
        button.externalClasses = {
            'default': ['border-none'],
            'active': ['underline'],
        };

        expect(button.classes).toEqual([
            'bg-tt-green',
            'text-white',
            'cursor-default',
            ...defaults,
            'border-none',
            'underline',
        ]);
    });
});
