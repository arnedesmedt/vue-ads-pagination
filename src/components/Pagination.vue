<template>
    <div
        v-if="totalPages > 0"
        class="vue-ads-flex vue-ads-m-2 vue-ads-px-0 vue-ads-text-xs"
    >
        <slot
            :start="start + 1"
            :end="end"
            :total="totalItems"
        >
            <div
                class="vue-ads-pr-2 vue-ads-leading-loose"
            >
                {{ start + 1 }} - {{ end }} of {{ totalItems }} items
            </div>
        </slot>
        <div
            v-if="totalPages > 1"
            class="vue-ads-flex-grow vue-ads-flex vue-ads-justify-end"
        >
            <slot
                :buttons="buttons"
                name="buttons"
            >
                <vue-ads-page-button
                    v-for="(button, key) in buttons"
                    :key="key"
                    v-bind="button"
                    @page-change="pageChange(button.page)"
                />
            </slot>
        </div>
    </div>
</template>

<script>
import VueAdsPageButton from './PageButton';

export default {
    name: 'VueAdsPagination',

    components: {
        VueAdsPageButton,
    },

    props: {
        page: {
            type: Number,
            required: false,
            default: 0,
            validator: (page) => {
                return page >= 0;
            },
        },

        itemsPerPage: {
            type: Number,
            required: false,
            default: 10,
            validator: (itemsPerPage) => {
                return itemsPerPage > 0;
            },
        },

        maxVisiblePages: {
            type: Number,
            required: false,
            default: 5,
            validator: (maxVisiblePages) => {
                return maxVisiblePages > 0;
            },
        },

        totalItems: {
            type: Number,
            required: true,
            validator: (totalItems) => {
                return totalItems >= 0;
            },
        },

        loading: {
            type: Boolean,
            required: false,
            default: false,
        },
    },

    data () {
        return {
            currentPage: null,
        };
    },

    computed: {
        start () {
            return this.currentPage * this.itemsPerPage;
        },

        end () {
            let end = this.start + this.itemsPerPage;

            return this.totalItems < end ? this.totalItems : end;
        },

        totalPages () {
            if (this.itemsPerPage === 0) {
                return 0;
            }

            return Math.ceil(this.totalItems / this.itemsPerPage);
        },

        pages () {
            let filteredPages = this.filteredPages;
            let pages = filteredPages ?
                [
                    filteredPages[0] - 1 === 1 ? 1 : '...',
                    ...filteredPages,
                    filteredPages[filteredPages.length - 1] + 1 === this.totalPages - 2 ? this.totalPages - 2 : '...',
                ] :
                [
                    ...Array(this.totalPages - 2).keys(),
                ].map(page => page + 1);

            return [
                this.currentPage - 1,
                0,
                ...pages,
                this.totalPages - 1,
                this.currentPage + 1,
            ];
        },

        filteredPages () {
            let diff = this.maxVisiblePages / 2;
            let toFilterPages = [
                ...Array(this.totalPages).keys(),
            ].slice(2, -2);

            if (toFilterPages.length > this.maxVisiblePages) {
                let diffFirst = this.currentPage - toFilterPages[0];
                let diffLast = this.currentPage - toFilterPages[toFilterPages.length - 1];

                if (diffFirst < diff) {
                    return toFilterPages.slice(0, this.maxVisiblePages);
                } else if (diffLast >= -diff) {
                    return toFilterPages.slice(-this.maxVisiblePages);
                } else {
                    return toFilterPages.filter(page => {
                        let diffPage = this.currentPage - page;

                        return diffPage < 0 ? Math.abs(diffPage) <= diff : diffPage < diff;
                    });
                }
            }
        },

        buttons () {
            return this.pages.map((page, key) => {
                return {
                    page,
                    active: page === this.currentPage,
                    disabled: this.disabled(page, key),
                    html: this.html(page, key),
                    title: this.title(key),
                    loading: this.loading && page === this.currentPage,
                };
            });
        },
    },

    watch: {
        page: {
            handler: 'pageChange',
            immediate: true,
        },
    },

    methods: {
        pageChange (page) {
            if (page !== this.currentPage && this.validPage(page)) {
                this.currentPage = page;
                this.$emit('page-change', this.currentPage, this.start, this.end);
            }
        },

        html (page, key) {
            if (key === 0) {
                return '<i class="fa fa-angle-left"></i>';
            }

            if (key === this.pages.length - 1) {
                return '<i class="fa fa-angle-right"></i>';
            }

            if (page === '...') {
                return page;
            }

            return (page + 1) + '';
        },

        disabled (page, key) {
            return key === 0 && this.currentPage === 0 ||
                key === this.pages.length - 1 && this.currentPage === this.totalPages - 1 ||
                page === '...';
        },

        title (key) {
            if (key === 0) {
                return 'previous';
            }

            if (key === this.pages.length - 1) {
                return 'next';
            }

            return '';
        },

        validPage (page) {
            if (page >= this.totalPages) {
                throw new Error('page may be maximum the total number of pages minus one');
            }

            return true;
        },
    },
};
</script>
