import { shallowMount, mount } from '@vue/test-utils';
import Pagination from '@/components/Pagination.vue';
import PageButton from '@/components/PageButton.vue';

describe('VueAdsPagination', () => {
    let pagination;
    let props;

    beforeEach(() => {
        props = {
            itemsPerPage: 10,
            maxVisiblePages: 5,
            page: 0,
            totalItems: 150,
            loading: false,
        };

        pagination = shallowMount(Pagination, {
            propsData: props,
        });
    });

    it('does not allow negative pages', () => {
        expect(pagination.vm.$options.props.page.validator(-1)).toBeFalsy();
    });

    it('throws an error if the page is greater than the totalPages', () => {
        expect(() => {
            props.page = 20;
            pagination = shallowMount(Pagination, {
                propsData: props,
            });
        }).toThrow('page may be maximum the total number of pages minus one');
    });


    it('does not allow negative totalItems', () => {
        expect(pagination.vm.$options.props.totalItems.validator(-1)).toBeFalsy();
    });

    it('does not allow negative itemsPerPage', () => {
        expect(pagination.vm.$options.props.itemsPerPage.validator(-1)).toBeFalsy();
    });


    it('does not allow negative maxVisiblePages', () => {
        expect(pagination.vm.$options.props.maxVisiblePages.validator(-1)).toBeFalsy();
    });

    it('calculates the correct start and end', () => {
        let start = pagination.vm.start;
        let end = pagination.vm.end;

        expect(start).toBe(0);
        expect(end).toBe(10);
    });

    it('calculates the start and end of the second page', () => {
        pagination.setProps({
            page: 1,
        });

        let start = pagination.vm.start;
        let end = pagination.vm.end;

        expect(start).toBe(10);
        expect(end).toBe(20);
    });


    it('totalPages is zero if itemsPerPage is zero', () => {
        pagination.setProps({
            itemsPerPage: 0,
        });

        expect(pagination.vm.totalPages).toBe(0);
    });

    it('returns the correct number of pages', () => {
        expect(pagination.vm.totalPages).toBe(15);
    });

    it('returns the correct pages if their are more pages then maxVisiblePages', () => {
        expect(pagination.vm.pages).toEqual([
            -1,
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            '...',
            14,
            1,
        ]);
    });

    it('returns the correct pages if their are less pages then maxVisiblePages', () => {
        pagination.setProps({
            totalItems: 20,
        });
        expect(pagination.vm.pages).toEqual([
            -1,
            0,
            1,
            1,
        ]);
    });

    it('uses the slot for displaying the range', () => {
        const pagination = shallowMount(Pagination, {
            propsData: props,
            scopedSlots: {
                default: '<p id="range" slot-scope="props">' +
                'Items {{ props.start }} tot {{ props.end }} van de {{ props.total }}' +
                '</p>',
            },
        });

        expect(pagination.find('#range').text()).toEqual('Items 1 tot 10 van de 150');
    });



    it('uses the buttons slot for displaying the buttons', () => {
        const pagination = shallowMount(Pagination, {
            propsData: props,
            scopedSlots: {
                buttons: '<div id="buttons" slot-scope="props">' +
                '<span v-for=\'(button,key) in props.buttons\'>{{ button.page }}</span>' +
                '</div>',
            },
        });

        expect(pagination.find('#buttons').text()).toEqual('-10123456...141');
    });

    it('emits the current range if the page changes from outside', () => {
        pagination.setProps({
            page: 2,
        });

        expect(pagination.emitted()['range-change']).toBeTruthy();
        expect(pagination.emitted()['range-change'][1]).toEqual([
            20,
            30,
        ]);
    });

    it('emits the current page if a button is clicked', () => {
        pagination = mount(Pagination, {
            propsData: props,
        });

        pagination.findAll(PageButton).at(2).trigger('click');

        expect(pagination.emitted()['page-change']).toBeTruthy();
        expect(pagination.emitted()['page-change'][0]).toEqual([
            1,
        ]);
    });

    it('adds a loading icon on the active page', () => {
        pagination.setProps({
            page: 2,
            loading: true,
        });

        expect(pagination.vm.buttons[3].loading).toBeTruthy();
    });

    it('set the end variable not to the page end if the page is not fully filled', () => {
        pagination.setProps({
            totalItems: 8,
        });

        expect(pagination.vm.end).toBe(8);
    });

    it('has a page in the middle', () => {
        pagination.setProps({
            page: 8,
        });

        expect(pagination.vm.pages).toEqual([
            7,
            0,
            '...',
            6,
            7,
            8,
            9,
            10,
            '...',
            14,
            9,
        ]);
    });

    it('has a page in the end', () => {
        pagination.setProps({
            page: 13,
        });

        expect(pagination.vm.pages).toEqual([
            12,
            0,
            '...',
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            14,
        ]);
    });
});
