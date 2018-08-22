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
});
