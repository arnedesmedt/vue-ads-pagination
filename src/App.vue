<template>
    <div id="app">
        <vue-ads-pagination
            :total-items="totalItems"
            :max-visible-pages="maxVisiblePages"
            :page="page"
            :loading="loading"
            :items-per-page="itemsPerPage"
            @range-change="rangeChange"
            @page-change="pageChange"
        >
            <!--<template slot-scope="props">-->
            <!--<div class="vue-ads-pr-2 vue-ads-leading-loose">-->
            <!--Items {{ props.start }} tot {{ props.end }} van de {{ props.total }}-->
            <!--</div>-->
            <!--</template>-->
            <!--<template-->
            <!--slot="buttons"-->
            <!--slot-scope="props"-->
            <!--&gt;-->
            <!--<vue-ads-page-button-->
            <!--v-for="(button, key) in props.buttons"-->
            <!--:key="key"-->
            <!--v-bind="button"-->
            <!--@page-change="page = button.page"-->
            <!--/>-->
            <!--</template>-->
        </vue-ads-pagination>
    </div>
</template>

<script>
import './assets/css/tailwind.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
import VueAdsPagination from './components/Pagination';
import VueAdsPageButton from './components/PageButton';

export default {
    name: 'App',

    components: {
        VueAdsPageButton,
        VueAdsPagination,
    },

    data () {
        return {
            start: null,
            end: null,
            page: 0,
            maxVisiblePages: 4,
            totalItems: 12,
            loading: false,
            itemsPerPage: 10,
        };
    },

    methods: {
        pageChange (page) {
            this.page = page;
        },

        rangeChange (start, end) {
            this.start = start;
            this.end = end;
        },
    },
};
</script>
