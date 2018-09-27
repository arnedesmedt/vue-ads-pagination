<template>
    <button
        :class="button.classes"
        :disabled="button.disabled"
        :title="button.title"
        class="border ml-1 leading-normal w-6"
        @click="pageChange"
    >
        <i
            v-if="isLoading"
            class="fa fa-spinner fa-spin"
        />
        <span
            v-else
            v-html="isLoading ? '' : button.html"
        />
    </button>
</template>

<script>
import Button from '../models/Button';

export default {
    name: 'Button',

    props: {
        button: {
            type: Button,
            required: true,
        },

        loading: {
            type: Boolean,
            required: false,
            default: false,
        },
    },

    computed: {
        isLoading () {
            return this.button.active && this.loading;
        },
    },

    methods: {
        pageChange () {
            if (this.button.page === undefined || this.button.active) {
                return;
            }

            this.$emit('page-change');
        },
    },
};
</script>
