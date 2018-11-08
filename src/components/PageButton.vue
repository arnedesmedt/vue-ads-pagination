<template>
    <button
        :class="buttonClasses"
        :disabled="disabled"
        :title="title"
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

        disableStyling: {
            type: Boolean,
            required: false,
            default: false,
        },
    },

    computed: {
        buttonClasses () {
            if (this.disableStyling)  {
                return {};
            }

            return {
                'focus:ads-outline-none': true,
                'ads-ml-1': true,
                'ads-leading-normal': true,
                'ads-w-6': true,
                'ads-bg-teal-dark': this.active,
                'ads-text-white': this.active,
                'ads-cursor-default': this.active || this.disabled,
                'ads-bg-grey-light': this.disabled && this.page !== '...',
                'ads-text-grey': this.disabled && this.page !== '...',
                'hover:ads-bg-grey-lighter': !this.active && !this.disabled,
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
