<template>
    <div
        v-if="totalPages > 0"
        class="flex m-2 px-0 text-xs"
    >
        <slot
            :start="start + 1"
            :end="end"
            :total="totalItems"
        >
            <div
                class="pr-2 leading-loose"
            >
                {{ start + 1 }} - {{ end }} of {{ totalItems }} items
            </div>
        </slot>
        <div
            v-if="totalPages > 1"
            class="flex-grow flex justify-end"
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
import '../assets/css/tailwind.css';
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
        },

        itemsPerPage: {
            type: Number,
            required: false,
            default: 10,
        },

        maxVisiblePages: {
            type: Number,
            required: false,
            default: 5,
        },

        totalItems: {
            type: Number,
            required: true,
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

        visiblePages () {
            return this.maxVisiblePages > this.totalPages ? this.totalPages : this.maxVisiblePages;
        },

        pages () {

            let start = this.currentPage - (Math.ceil(this.visiblePages / 2) - 1);

            if (start < 2) {
                start = 2;
            }

            if (start + this.visiblePages > this.totalPages - 2) {
                start -= ((start + this.visiblePages) - (this.totalPages - 2));
            }

            if (start < 2) {
                start = 0;
            }

            let pages = [...Array(this.visiblePages).keys()].map(page => page + start);
            let before = start !== 0 ? [0, start === 2 ? 1 : '...'] : [];
            let after = start !== 0 ? [pages[pages.length - 1] === this.totalPages - 3 ? this.totalPages - 2 : '...', this.totalPages - 1] : [];

            return [
                this.currentPage - 1,
                ...before,
                ...pages,
                ...after,
                this.currentPage + 1,
            ];
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

        totalItems: {
            handler: 'validTotalItems',
            immediate: true,
        },

        itemsPerPage: {
            handler: 'validItemsPerPage',
            immediate: true,
        },

        maxVisiblePages: {
            handler: 'validMaxVisiblePages',
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
            if (page < 0) {
                throw new Error(
                    'page has to be positive'
                );
            }

            if (page >= this.totalPages) {
                throw new Error(
                    'page may be maximum the total number of pages minus one.'
                );
            }

            return true;
        },

        validTotalItems (totalItems) {
            if (totalItems < 0) {
                throw new Error(
                    'totalItems has to be positive'
                );
            }
        },

        validItemsPerPage (itemsPerPage) {
            if (itemsPerPage < 0) {
                throw new Error(
                    'itemsPerPage has to be positive'
                );
            }
        },

        validMaxVisiblePages (maxVisiblePages) {
            if (maxVisiblePages < 1) {
                throw new Error(
                    'maxVisiblePages has to be greater than 0'
                );
            }
        },
    },
};
</script>
