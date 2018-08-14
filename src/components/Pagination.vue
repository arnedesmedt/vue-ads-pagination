<template>
    <div
        v-if="totalPages > 0"
        class="m-2 flex text-xs px-0"
    >
        <div class="pr-2 leading-loose">
            <slot :range="{start: oneBasedStart, end: oneBasedEnd, total: totalItems}">
                {{ oneBasedStart }} - {{ oneBasedEnd }} of {{ totalItems }} items
            </slot>
        </div>
        <div
            v-if="totalPages > 1"
            class="flex-grow text-right px-0 flex justify-end"
        >
            <Button
                v-for="(button, key) in buttons"
                :key="key"
                :class="buttonClasses(button)"
                :disabled="button.disabled"
                :title="button.title"
                v-html="button.html"
                @click.native="button.page === undefined || button.active ? null : pageChange(button.page)"
            >
            </Button>
        </div>
    </div>
</template>

<script>
import '../assets/css/styles.css';
import Button from './Button';

export default {
    name: 'Pagination',
    components: {Button},
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
            currentPage: this.page,
        };
    },

    mounted () {
        this.pageChange(this.currentPage);
    },

    watch: {
        page (page) {
            if (page !== this.currentPage) {
                this.pageChange(page);
            }
        },
    },

    computed: {
        range () {
            if (this.currentPage < 0) {
                throw new Error(
                    'page has to be positive'
                );
            }

            if (this.currentPage > this.totalPages) {
                throw new Error(
                    'page may be maximum the total number of pages'
                );
            }

            let start = this.currentPage * this.itemsPerPage;
            let end = start + this.itemsPerPage;

            return {
                start,
                end,
            };
        },

        totalPages () {
            if (this.totalItems < 0) {
                throw new Error(
                    'totalItems has to be positive'
                );
            }

            if (this.itemsPerPage < 0) {
                throw new Error(
                    'itemsPerPage has to be positive'
                );
            }

            if (this.itemsPerPage === 0) {
                return 0;
            }

            return Math.ceil(this.totalItems / this.itemsPerPage);
        },

        oneBasedStart () {
            return this.range.start + 1;
        },

        oneBasedEnd () {
            let end = this.range.end;

            return this.totalItems < end ? this.totalItems : end;
        },

        buttons () {
            let buttons = this.visibleButtonValues.map(value => {
                return value === '...'
                    ? this.getButton(undefined, '...', '', true, false)
                    : this.getButton(value);
            });

            buttons.unshift(this.getButton(0));
            buttons.unshift(
                this.getButton(
                    this.currentPage - 1,
                    '<i class="fa fa-angle-double-left"></i>',
                    'previous',
                    this.currentPage === 0,
                    true
                )
            );

            buttons.push(this.getButton(this.totalPages - 1));
            buttons.push(
                this.getButton(
                    this.currentPage + 1,
                    '<i class="fa fa-angle-double-right"></i>',
                    'next',
                    this.currentPage === this.totalPages - 1,
                    true
                )
            );

            return buttons;
        },

        visibleButtonValues () {
            if (this.maxVisiblePages < 1) {
                throw new Error(
                    'maxVisiblePages has to be greater than 0'
                );
            }

            let maxVisiblePagesWithoutActiveOne = this.maxVisiblePages - 1;
            let diffWithThreeDot = (maxVisiblePagesWithoutActiveOne / 2) + 1;
            let totalButtonsWithoutFirstLastNextAndPrevious = this.maxVisiblePages + 2;

            let startVisibleButton = this.currentPage - Math.floor(diffWithThreeDot);
            if (startVisibleButton < 1) {
                startVisibleButton = 1;
            }

            let endVisibleButton = startVisibleButton + totalButtonsWithoutFirstLastNextAndPrevious;
            if (endVisibleButton > this.totalPages - 1) {
                endVisibleButton = this.totalPages - 1;
            }

            if (endVisibleButton - startVisibleButton < totalButtonsWithoutFirstLastNextAndPrevious) {
                startVisibleButton = endVisibleButton - totalButtonsWithoutFirstLastNextAndPrevious;
                startVisibleButton = startVisibleButton < 1 ? 1 : startVisibleButton;
            }

            let visibleButtonValues = Array
                .from(
                    new Array(endVisibleButton - startVisibleButton),
                    (value, index) => startVisibleButton + index
                );

            if (visibleButtonValues[0] > 1) {
                visibleButtonValues[0] = '...';
            }

            if (visibleButtonValues[visibleButtonValues.length - 1] < this.totalPages - 2) {
                visibleButtonValues[visibleButtonValues.length - 1] = '...';
            }

            return visibleButtonValues;
        },
    },

    methods: {
        getButton (
            page = undefined,
            html = undefined,
            title = undefined,
            disabled = false,
            showDisabled = true
        ) {
            let active = page === this.currentPage;
            return {
                page: page,
                html: html || page + 1,
                active,
                title: disabled || active
                    ? ''
                    : title || page + 1 || '',
                disabled,
                showDisabled,
            };
        },

        buttonClasses (button) {
            return {
                'text-grey': button.disabled && button.showDisabled,
                'bg-grey-light': button.disabled && button.showDisabled,
                'cursor-default': button.disabled || button.active,
                'border-none': button.disabled && !button.showDisabled,
                'bg-tt-green': button.active,
                'text-white': button.active,
                'hover:bg-grey-lighter': !button.active && !button.disabled,
            };
        },

        pageChange (page) {
            this.currentPage = page;
            this.$emit('page-change', this.currentPage, this.range);
        },
    },
};
</script>
