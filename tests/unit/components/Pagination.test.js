import { shallowMount } from '@vue/test-utils';
import Pagination from '@/components/Pagination.vue';

describe('Pagination', () => {
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

    it('throws an error if the page is negative', function () {
        pagination.setProps({
            page: -1,
        });

        expect(() => {
            pagination.vm.range;
        }).toThrow('page has to be positive');
    });

    it('throws an error if the page is greater than the totalPages', function () {
        pagination.setProps({
            page: 20,
        });

        expect(() => {
            pagination.vm.range;
        }).toThrow('page may be maximum the total number of pages');
    });

    it('throws an error if the totalItems is negative', function () {
        pagination.setProps({
            totalItems: -1,
        });

        expect(() => {
            pagination.vm.totalPages;
        }).toThrow('totalItems has to be positive');
    });

    it('calculates the correct range', function () {
        let range = pagination.vm.range;

        expect(range.start).toBe(0);
        expect(range.end).toBe(10);
    });

    it('calculates the range of the second page', function () {
        pagination.setProps({
            page: 1,
        });

        let range = pagination.vm.range;

        expect(range.start).toBe(10);
        expect(range.end).toBe(20);
    });

    it('throws an error if the totalItems is negative', function () {
        pagination.setProps({
            totalItems: -1,
        });

        expect(() => {
            pagination.vm.totalPages;
        }).toThrow('totalItems has to be positive');
    });

    it('throws an error if the itemsPerPage is negative', function () {
        pagination.setProps({
            itemsPerPage: -1,
        });

        expect(() => {
            pagination.vm.totalPages;
        }).toThrow('itemsPerPage has to be positive');
    });

    it('totalPages is zero if itemsPerPage is zero', function () {
        pagination.setProps({
            itemsPerPage: 0,
        });

        expect(pagination.vm.totalPages).toBe(0);
    });

    it('returns the correct number of pages', function () {
        expect(pagination.vm.totalPages).toBe(15);
    });

    it('returns the correct oneBasedStart', function () {
        expect(pagination.vm.oneBasedStart).toBe(1);
    });

    it('returns the correct oneBasedEnd', function () {
        expect(pagination.vm.oneBasedEnd).toBe(10);
    });

    it('returns a oneBasedEnd lower than the calculated end if no more items are left', function () {
        pagination.setProps({
            totalItems: 145,
            page: 14,
        });

        expect(pagination.vm.oneBasedEnd).toBe(145);
    });

    it('throws an error if the maxVisiblePages is lower than 1', function () {
        pagination.setProps({
            maxVisiblePages: 0,
        });

        expect(() => {
            pagination.vm.visibleButtonValues;
        }).toThrow('maxVisiblePages has to be greater than 0');
    });

    it('returns the default visibleButtonValues', function () {
        expect(pagination.vm.visibleButtonValues).toEqual([
            1, 2, 3, 4, 5, 6, '...',
        ]);
    });

    it('returns the visibleButtonValues when the page is 6', function () {
        pagination.setProps({
            page: 5,
        });

        expect(pagination.vm.visibleButtonValues).toEqual([
            '...', 3, 4, 5, 6, 7, '...',
        ]);
    });

    it('returns the visibleButtonValues when the page is 10', function () {
        pagination.setProps({
            page: 9,
        });

        expect(pagination.vm.visibleButtonValues).toEqual([
            '...', 7, 8, 9, 10, 11, '...',
        ]);
    });

    it('returns the visibleButtonValues when the page is 14', function () {
        pagination.setProps({
            page: 13,
        });

        expect(pagination.vm.visibleButtonValues).toEqual([
            '...', 8, 9, 10, 11, 12, 13,
        ]);
    });

    it('use the slot for displaying the range', function () {
        const pagination = shallowMount(Pagination, {
            propsData: props,
            scopedSlots: {
                default: '<p slot-scope="props">' +
                    'Items {{ props.range.start }} tot {{ props.range.end }} van de {{ props.range.total }}' +
                    '</p>',
            },
        });

        expect(pagination.text()).toEqual(expect.stringMatching(/Items 1 tot 10 van de 150/));
    });

    it('emits the current page and the range on a click', function () {
        pagination.vm.pageChange(1);

        expect(pagination.emitted()['page-change']).toBeTruthy();
        expect(pagination.emitted()['page-change'][1]).toEqual([
            1,
            {
                start: 10,
                end: 20,
            },
        ]);
    });

    it('emits the current page and the range on creation', function () {
        props.page = 3;
        const pagination = shallowMount(Pagination, {
            propsData: props,
        });

        expect(pagination.emitted()['page-change']).toBeTruthy();
        expect(pagination.emitted()['page-change'][0]).toEqual([
            3,
            {
                start: 30,
                end: 40,
            },
        ]);
    });

    it('updates the page externally', function () {
        expect(pagination.vm.currentPage).toBe(0);

        pagination.setProps({
            page: 1,
        });

        expect(pagination.vm.currentPage).toBe(1);
    });
});
