<template>
    <button
        class="border ml-1 leading-normal w-6"
        :class="button.classes"
        :disabled="button.disabled"
        :title="button.title"
        v-html="button.html"
        @click="pageChange(button)"
    >
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
    },

    methods: {
        pageChange (button) {
            if (button.page === undefined || button.active) {
                return;
            }

            this.$emit('page-change');
        },
    },
};
</script>
