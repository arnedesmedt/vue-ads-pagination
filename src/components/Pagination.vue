<template>
    <div
        v-if="totalPages > 0"
        class="m-2 flex text-xs px-0"
    >
        <div 
            :class="detailClasses" 
            class="pr-2 leading-loose">
            <slot :range="{start: oneBasedStart, end: oneBasedEnd, total: totalItems}">
                {{ oneBasedStart }} - {{ oneBasedEnd }} of {{ totalItems }} items
            </slot>
        </div>
        <div
            v-if="totalPages > 1"
            class="flex-grow text-right px-0 flex justify-end"
        >
            <button-component
                v-for="(button, key) in buttons"
                :key="key"
                :button="button"
                :loading="loading"
                @page-change="pageChange(button.page)"
            />
        </div>
    </div>
</template>

<script>
import '../assets/css/styles.css';
import Button from '../models/Button';
import ButtonComponent from './Button';

export default {
    name: 'Pagination',

    components: {
        ButtonComponent,
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

        detailClasses: {
            type: Array,
            required: false,
            default: () => [],
        },

        buttonClasses: {
            type: Object,
            required: false,
            default: () => {},
        },
    },

    data () {
        return {
            currentPage: this.page,
        };
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
                    ? this.getButton(undefined, '...', '', false, true)
                    : this.getButton(value);
            });

            buttons.unshift(this.getButton(0));
            buttons.unshift(
                this.getButton(
                    this.currentPage - 1,
                    '<i class="fa fa-angle-double-left"></i>',
                    'previous',
                    this.currentPage === 0
                )
            );

            buttons.push(this.getButton(this.totalPages - 1));
            buttons.push(
                this.getButton(
                    this.currentPage + 1,
                    '<i class="fa fa-angle-double-right"></i>',
                    'next',
                    this.currentPage === this.totalPages - 1
                )
            );

            buttons.forEach(button => {
                button.externalClasses = this.buttonClasses;
            });

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

    watch: {
        page (page) {
            if (page !== this.currentPage) {
                this.pageChange(page);
            }
        },
    },

    mounted () {
        this.pageChange(this.currentPage);
    },

    methods: {
        getButton (
            page = undefined,
            html = undefined,
            title = undefined,
            disabled = false,
            dots = false
        ) {
            let button = new Button(page);
            button.active = page === this.currentPage;
            button.html = html;
            button.title = title;
            button.disabled = disabled;
            button.dots = dots;

            return button;
        },

        pageChange (page) {
            this.currentPage = page;
            this.$emit('page-change', this.currentPage, this.range);
        },
    },
};
</script>
