import { shallowMount } from '@vue/test-utils';
import Button from '@/components/Button';
import ButtonModel from '@/models/Button';

describe('Button', () => {
    let button;
    let buttonModel;

    beforeEach(() => {
        buttonModel = new ButtonModel();

        button = shallowMount(Button, {
            propsData: {
                button: buttonModel,
                loading: false,
            },
        });
    });

    it('emits a page change if the button has a page and is not active', function () {
        buttonModel.page = 0;
        button.trigger('click');

        expect(button.emitted()['page-change']).toBeTruthy();
    });

    it('doesn\'t emit a page change if the button has a page and is active', function () {
        buttonModel.active = true;
        button.trigger('click');

        expect(button.emitted()['page-change']).toBeUndefined();
    });

    it('doesn\'t emit a page change if the button has a page', function () {
        button.trigger('click');

        expect(button.emitted()['page-change']).toBeUndefined();
    });

    it('shows a loader when the page is active and the loading property is true', function () {
        buttonModel.active = true;
        button = shallowMount(Button, {
            propsData: {
                button: buttonModel,
                loading: true,
            },
        });

        expect(button.find('i').is('i')).toBeTruthy();
    });

    it('doesn\'t show a loader when the page is active and the loading property is false', function () {
        buttonModel.active = false;
        button = shallowMount(Button, {
            propsData: {
                button: buttonModel,
                loading: true,
            },
        });

        expect(button.find('span').is('span')).toBeTruthy();
    });
});
