<template>
    <button
        :class="buttonClasses"
        :disabled="disabled"
        :title="title"
        class="focus:outline-none ml-1 leading-normal w-6"
        @click="pageChange"
    >
        <i
            v-if="loading"
            class="fa fa-spinner fa-spin"
        />
        <span
            v-else
            v-html="html"
        />
    </button>
</template>

<script>
export default {
    name: 'VueAdsPageButton',

    props: {
        page: {
            type: [Number, String],
            required: true,
        },

        active: {
            type: Boolean,
            required: false,
            default: false,
        },

        disabled: {
            type: Boolean,
            required: false,
            default: false,
        },

        html: {
            type: String,
            required: true,
        },

        title: {
            type: String,
            required: false,
            default: '',
        },

        loading: {
            type: Boolean,
            required: false,
            default: false,
        },
    },

    computed: {
        buttonClasses () {
            return {
                'bg-teal-dark': this.active,
                'text-white': this.active,
                'cursor-default': this.active || this.disabled,
                'bg-grey-light': this.disabled && this.page !== '...',
                'text-grey': this.disabled && this.page !== '...',
                'hover:bg-grey-lighter': !this.active && !this.disabled,
            };
        },
    },

    methods: {
        pageChange () {
            if (
                this.page === '...' ||
                this.disabled ||
                this.active
            ) {
                return;
            }

            this.$emit('page-change');
        },
    },
};
</script>
