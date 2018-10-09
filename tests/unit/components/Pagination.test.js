import { shallowMount } from '@vue/test-utils';
import Pagination from '@/components/Pagination.vue';

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

    it('throws an error if the page is negative', () => {
        expect(() => {
            props.page = -1;
            pagination = shallowMount(Pagination, {
                propsData: props,
            });
        }).toThrow('page has to be positive');
    });

    it('throws an error if the page is greater than the totalPages', () => {
        expect(() => {
            props.page = 20;
            pagination = shallowMount(Pagination, {
                propsData: props,
            });
        }).toThrow('page may be maximum the total number of pages minus one');
    });


    it('throws an error if the totalItems is negative', () => {
        expect(() => {
            props.totalItems = -1;
            pagination = shallowMount(Pagination, {
                propsData: props,
            });
        }).toThrow('totalItems has to be positive');
    });


    it('throws an error if the itemsPerPage is negative', () => {
        expect(() => {
            props.itemsPerPage = -1;
            pagination = shallowMount(Pagination, {
                propsData: props,
            });
        }).toThrow('itemsPerPage has to be positive');
    });


    it('throws an error if the maxVisiblePages is negative', () => {
        expect(() => {
            props.maxVisiblePages = -1;
            pagination = shallowMount(Pagination, {
                propsData: props,
            });
        }).toThrow('maxVisiblePages has to be greater than 0');
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

    it('returns the correct visiblePages if their are more pages then maxVisiblePages', () => {
        expect(pagination.vm.visiblePages).toBe(5);
    });

    it('returns the correct visiblePages if their are less pages then maxVisiblePages', () => {
        pagination.setProps({
            totalItems: 10,
        });
        expect(pagination.vm.visiblePages).toBe(1);
    });

    it('returns the correct pages if their are more pages then maxVisiblePages', () => {
        expect(pagination.vm.pages).toEqual([-1, 0, 1, 2, 3, 4, 5, 6, '...', 14, 1]);
    });

    it('returns the correct pages if their are less pages then maxVisiblePages', () => {
        pagination.setProps({
            totalItems: 20,
        });
        expect(pagination.vm.pages).toEqual([-1, 0, 1, 1]);
    });

    it('uses the slot for displaying the range', function () {
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



    it('uses the buttons slot for displaying the buttons', function () {
        const pagination = shallowMount(Pagination, {
            propsData: props,
            scopedSlots: {
                buttons: '<div id="buttons" slot="buttons" slot-scope="props">' +
                '<span v-for="(button,key) in props.buttons">{{ button.page }}</span>' +
                '</div>',
            },
        });

        expect(pagination.find('#buttons').text()).toEqual('-10123456...141');
    });

    it('emits the current page, the start and end value on a click', function () {
        pagination.vm.pageChange(1);

        expect(pagination.emitted()['page-change']).toBeTruthy();
        expect(pagination.emitted()['page-change'][1]).toEqual([
            1,
            10,
            20,
        ]);
    });

    it('emits the current page, the start and end value on creation', function () {
        props.page = 3;
        const pagination = shallowMount(Pagination, {
            propsData: props,
        });

        expect(pagination.emitted()['page-change']).toBeTruthy();
        expect(pagination.emitted()['page-change'][0]).toEqual([
            3,
            30,
            40,
        ]);
    });
});
