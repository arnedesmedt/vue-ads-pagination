<template>
    <div
        v-if="totalPages > 0"
        class="vue-ads-flex vue-ads-m-2 vue-ads-px-0 vue-ads-text-xs justify-between"
    >
        <slot
            :start="start + 1"
            :end="end"
            :total="totalItems"
        >
            <div class="vue-ads-pr-2 vue-ads-leading-loose">
                Items {{ start + 1 }} to {{ end }} of {{ totalItems }}
            </div>
        </slot >
        <div v-if="totalPages > 1">
            <pagination-with-input 
                v-if="withInput"
                class="vue-ads-flex-grow vue-ads-flex vue-ads-justify-end"
                v-bind="$props"
                @page-change="$emit('page-change', $event)"
            />
            <div v-else class="vue-ads-flex-grow vue-ads-flex vue-ads-justify-end h-full">
                <slot
                    :buttons="buttons"
                    name="buttons"
                >
                    <vue-ads-page-button
                        v-for="(button, key) in buttons"
                        :key="key"
                        v-bind="button"
                        @page-change="$emit('page-change', button.page)"
                    />
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
import paginationMixin from './MixinPagination.js';
import VueAdsPageButton from './PageButton';
import PaginationWithInput from './PaginationWithInput';

export default {
    name: 'VueAdsPagination',

    components: {
        'vue-ads-page-button': VueAdsPageButton,
        'pagination-with-input': PaginationWithInput,
    },

    mixins: [
        paginationMixin, 
    ],

    props: {
        withInput: {
            type: Boolean,
            default: false,
        },

        maxVisiblePages: {
            type: Number,
            default: 5,
            validator: (maxVisiblePages) => maxVisiblePages > 0,
        },

        loading: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        start () {
            return this.page * this.itemsPerPage;
        },

        end () {
            let end = this.start + this.itemsPerPage;

            return this.totalItems < end ? this.totalItems : end;
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
                this.page - 1,
                0,
                ...pages,
                this.totalPages - 1,
                this.page + 1,
            ];
        },

        filteredPages () {
            let diff = this.maxVisiblePages / 2;
            let toFilterPages = [
                ...Array(this.totalPages).keys(),
            ].slice(2, -2);

            if (toFilterPages.length > this.maxVisiblePages) {
                let diffFirst = this.page - toFilterPages[0];
                let diffLast = this.page - toFilterPages[toFilterPages.length - 1];

                if (diffFirst < diff) {
                    return toFilterPages.slice(0, this.maxVisiblePages);
                } else if (diffLast >= -diff) {
                    return toFilterPages.slice(-this.maxVisiblePages);
                } else {
                    return toFilterPages.filter(page => {
                        let diffPage = this.page - page;

                        return diffPage < 0 ? Math.abs(diffPage) <= diff : diffPage < diff;
                    });
                }
            }

            return null;
        },

        buttons () {
            return this.pages.map((page, key) => {
                return {
                    page,
                    active: page === this.page,
                    disabled: this.disabled(page, key),
                    html: this.html(page, key),
                    title: this.title(key),
                    loading: this.loading && page === this.page,
                };
            });
        },
    },

    watch: {
        page: {
            handler: 'pageChange',
            immediate: true,
        },

        itemsPerPage: {
            handler: 'rangeChange',
        },

        totalItems: {
            handler: 'rangeChange',
        },
    },

    methods: {
        pageChange (page) {
            if (page >= this.totalPages && page !== 0 && this.totalPages !== 0) {
                throw new Error('page may be maximum the total number of pages minus one');
            }

            this.rangeChange();
        },

        rangeChange () {
            if (this.page >= this.totalPages && this.totalPages !== 0) {
                this.$emit('page-change', this.totalPages - 1);
            } else {
                this.$emit('range-change', this.start, this.end);
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

            return String(page + 1);
        },

        disabled (page, key) {
            return key === 0 && this.page === 0 ||
                key === this.pages.length - 1 && this.page === this.totalPages - 1 ||
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
    },
};
</script>