<template>
    <div id="app">
        <Pagination
            :total-items="200"
            :max-visible-pages="4"
            :page="3"
            :detail-classes="['underline']"
            :button-classes="buttonClasses"
            :loading="true"
            @page-change="pageChange"
        >
            <template slot-scope="props">
                Items {{ props.range.start }} tot {{ props.range.end }} van de {{ props.range.total }}
            </template>
        </Pagination>
    </div>
</template>

<script>
import Pagination from './components/Pagination';

export default {
    name: 'App',
    components: {
        Pagination,
    },

    data () {
        return {
            buttonClasses: {
                default: ['border-none', 'bg-grey-lightest'],
                active: ['bg-orange', 'border-none'],
                dots: ['bg-white'],
                disabled: ['bg-grey-light'],
            },
        };
    },

    methods: {
        pageChange (page, range) {
            console.log(page, range);
        },
    },
};
</script>
