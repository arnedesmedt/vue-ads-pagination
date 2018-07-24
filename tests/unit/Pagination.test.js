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

    it('renders the pagination without maxVisiblePages', function () {
        props.totalItems = 50;

        const pagination = shallowMount(Pagination, {
            propsData: props,
        });

        expect(pagination.html()).toMatchSnapshot();
    });

    it('renders the pagination with an even maxVisiblePages', function () {
        props.maxVisiblePages = 4;

        const pagination = shallowMount(Pagination, {
            propsData: props,
        });

        expect(pagination.html()).toMatchSnapshot();
    });

    it('shows 1...4567...15 with an even maxVisiblePages and the page is 5', function () {
        props.maxVisiblePages = 4;
        props.startPage = 4;

        const pagination = shallowMount(Pagination, {
            propsData: props,
        });

        expect(pagination.text()).toEqual(expect.stringMatching(/1...4567...15/));
    });

    it('shows 1...101112131415 with an even maxVisiblePages and the page is 11', function () {
        props.maxVisiblePages = 4;
        props.startPage = 10;

        const pagination = shallowMount(Pagination, {
            propsData: props,
        });

        expect(pagination.text()).toEqual(expect.stringMatching(/1...101112131415/));
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
        }).toThrow('startPage has to be positive');
    });

    it('throws an error if the page is greater than the max page', function () {
        props.startPage = 2;
        props.totalItems = 1;

        expect(() => {
            shallowMount(Pagination, {
                propsData: props,
            });
        }).toThrow('startPage may be maximum the total number of pages');
    });

    it('throws an error if the totalItems is negative', function () {
        props.totalItems = -1;

        expect(() => {
            shallowMount(Pagination, {
                propsData: props,
            });
        }).toThrow('totalItems has to be positive');
    });

    it('throws an error if the itemsPerPage is negative', function () {
        props.itemsPerPage = -1;

        expect(() => {
            shallowMount(Pagination, {
                propsData: props,
            });
        }).toThrow('itemsPerPage has to be positive');
    });

    it('throws an error if the maxVisiblePages is zero or negative', function () {
        props.maxVisiblePages = 0;

        expect(() => {
            shallowMount(Pagination, {
                propsData: props,
            });
        }).toThrow('maxVisiblePages has to be greater than 0');
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
