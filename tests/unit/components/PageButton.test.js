import { shallowMount } from '@vue/test-utils';
import PageButton from '@/components/PageButton';

describe('PageButton', () => {
    let pageButton;

    beforeEach(() => {

        pageButton = shallowMount(PageButton, {
            propsData: {
                page: 0,
                html: '0',
            },
        });
    });

    it('emits a page change if the button has a page and is not active', () => {
        pageButton.trigger('click');

        expect(pageButton.emitted()['page-change']).toBeTruthy();
    });

    it('doesn\'t emit a page change if the button has a page and is active', () => {
        pageButton.setProps({
            active: true,
        });
        pageButton.trigger('click');

        expect(pageButton.emitted()['page-change']).toBeUndefined();
    });

    it('doesn\'t emit a page change if the button is disabled', () => {
        pageButton.setProps({
            disabled: true,
        });
        pageButton.trigger('click');

        expect(pageButton.emitted()['page-change']).toBeUndefined();
    });

    it('doesn\'t emit a page change if the button doesn\'t have a numeric page', () => {
        pageButton.setProps({
            page: '...',
        });
        pageButton.trigger('click');

        expect(pageButton.emitted()['page-change']).toBeUndefined();
    });

    it('shows a loader when the page is active and the loading property is true', () => {
        pageButton.setProps({
            active: true,
            loading: true,
        });

        expect(pageButton.find('i').is('i')).toBeTruthy();
    });

    it('doesn\'t show a loader when the page is active and the loading property is false', () => {
        pageButton.setProps({
            active: true,
            loading: false,
        });

        expect(pageButton.find('span').is('span')).toBeTruthy();
    });

    it('doesn\'t add styling if the styling is disabled', () => {
        pageButton.setProps({
            disableStyling: true,
        });

        expect(pageButton.vm.buttonClasses).toEqual({});
    });
});
