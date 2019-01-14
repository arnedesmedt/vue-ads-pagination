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
            type: [
                Number,
                String,
            ],
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
                'focus:vue-ads-outline-none': true,
                'vue-ads-ml-1': true,
                'vue-ads-leading-normal': true,
                'vue-ads-w-6': true,
                'vue-ads-bg-teal-dark': this.active,
                'vue-ads-text-white': this.active,
                'vue-ads-cursor-default': this.active || this.disabled,
                'vue-ads-bg-grey-light': this.disabled && this.page !== '...',
                'vue-ads-text-grey': this.disabled && this.page !== '...',
                'hover:vue-ads-bg-grey-lighter': !this.active && !this.disabled,
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
