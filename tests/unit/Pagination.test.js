import { shallowMount } from '@vue/test-utils';
import Pagination from '@/components/Pagination.vue';

describe('Pagination', () => {
    let props;

    beforeEach(() => {
        const itemsPerPage = 10;
        const maxVisiblePages = 5;
        const startPage = 0;
        const totalItems = 150;
        const loading = false;
        props = {
            itemsPerPage,
            maxVisiblePages,
            startPage,
            totalItems,
            loading,
        };
    });

    it('renders the pagination', function () {
        const pagination = shallowMount(Pagination, {
            propsData: props,
        });

        expect(pagination.html()).toMatchSnapshot();
    });

    it('renders the pagination if the page is equal to the last page', function () {
        props.startPage = 14;

        const pagination = shallowMount(Pagination, {
            propsData: props,
        });

        expect(pagination.html()).toMatchSnapshot();
    });

    it('renders nothing with itemsPerPage is 0', function () {
        props.itemsPerPage = 0;

        const pagination = shallowMount(Pagination, {
            propsData: props,
        });

        expect(pagination.html()).toBe(undefined);
    });

    it('renders no pages with only one page', function () {
        props.itemsPerPage = 150;

        const pagination = shallowMount(Pagination, {
            propsData: props,
        });

        expect(pagination.html()).toMatchSnapshot();
    });

    it('throws an error with negative start page', function () {
        props.startPage = -1;
        props.totalItems = 1;

        expect(() => {
            shallowMount(Pagination, {
                propsData: props,
            });
        }).toThrow('Start page cannot be under zero');
    });

    it('throws an error if the page is greater than the max page', function () {
        props.startPage = 2;
        props.totalItems = 1;

        expect(() => {
            shallowMount(Pagination, {
                propsData: props,
            });
        }).toThrow('Start page cannot be greater than the total number of pages');
    });

    it('emits the current page and the range on a click', function () {
        const pagination = shallowMount(Pagination, {
            propsData: props,
        });
        pagination.vm.click(1);

        expect(pagination.html()).toMatchSnapshot();
        expect(pagination.emitted().click).toBeTruthy();
        expect(pagination.emitted().click[0]).toEqual([
            1,
            {
                start: 10,
                end: 20,
            },
        ]);
    });
});
