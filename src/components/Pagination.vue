<template>
    <div
        v-if="totalPages > 0"
        class="m-2 flex text-xs px-0"
    >
        <div class="pr-2 leading-loose">
            Items
            {{ oneBasedStart }}
            tot
            {{ oneBasedEnd }}
            van de
            {{ totalItems }}
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
                @click.native="button.page === undefined || button.active ? null : click(button.page)"
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
        startPage: {
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

    created () {
        if (this.startPage < 0) {
            throw new Error(
                'Start page cannot be under zero'
            );
        }

        if (this.startPage > this.totalPages) {
            throw new Error(
                'Start page cannot be greater than the total number of pages'
            );
        }
    },

    data () {
        return {
            page: this.startPage,
        };
    },

    computed: {
        range () {
            let start = this.page * this.itemsPerPage;
            let end = start + this.itemsPerPage;

            return {
                start,
                end,
            };
        },

        totalPages () {
            if (this.itemsPerPage === 0) {
                return 0;
            }

            return Math.ceil(this.totalItems / this.itemsPerPage);
        },

        oneBasedStart () {
            return this.range.start + 1;
        },

        oneBasedEnd () {
            let oneBasedEnd = this.range.end;

            return this.totalItems < oneBasedEnd ? this.totalItems : oneBasedEnd;
        },

        buttons () {
            let diff = Math.ceil((this.maxVisiblePages - 1) / 2);
            let start = this.page - diff;
            let end = start + this.maxVisiblePages;

            if (start < diff) {
                end -= (start - diff);
                start = start < 0 ? 0 : start;
            }

            if (end + diff > this.totalPages) {
                start -= end - this.totalPages + diff;
                end = end > this.totalPages ? this.totalPages : end;
            }

            let buttons = Array
                .from(new Array(end - start), (value, index) => start + index)
                .map(value => this.getButton(value));

            if (start > 1) {
                let button = start === 2
                    ? this.getButton(1)
                    : this.getButton(undefined, '...', '', true, false);

                buttons.unshift(button);
            }

            if (start !== 0) {
                buttons.unshift(this.getButton(0));
            }

            if (end < this.totalPages - 1) {
                let button = end === this.totalPages - 2
                    ? this.getButton(this.totalPages - 2)
                    : this.getButton(undefined, '...', '', true, false);

                buttons.push(button);
            }

            if (end !== this.totalPages) {
                buttons.push(this.getButton(this.totalPages - 1));
            }

            buttons.unshift(
                this.getButton(
                    this.page - 1,
                    '<i class="fa fa-angle-double-left"></i>',
                    'previous',
                    this.page === 0,
                    true
                )
            );

            buttons.push(
                this.getButton(
                    this.page + 1,
                    '<i class="fa fa-angle-double-right"></i>',
                    'next',
                    this.page === this.totalPages - 1,
                    true
                )
            );

            return buttons;
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
            let active = page === this.page;
            return {
                page: page,
                html: html || page + 1,
                active,
                title: disabled || active ? '' : title || page + 1 || '',
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

        click (page) {
            this.page = page;
            this.$emit('click', this.page, this.range);
        },
    },
};
</script>
