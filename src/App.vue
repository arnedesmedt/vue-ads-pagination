<template>
    <div id="app">
        <vue-ads-pagination
            :total-items="200"
            :max-visible-pages="5"
            :page="page"
            :loading="loading"
            @page-change="pageChange"
        >
            <template slot-scope="props">
                <div class="pr-2 leading-loose">
                    Items {{ props.start }} tot {{ props.end }} van de {{ props.total }}
                </div>
            </template>
            <template
                slot="buttons"
                slot-scope="props"
            >
                <vue-ads-page-button
                    v-for="(button, key) in props.buttons"
                    :key="key"
                    v-bind="button"
                    :disable-styling="true"
                    @page-change="page = button.page"
                />
            </template>
        </vue-ads-pagination>
    </div>
</template>

<script>
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
            page: 5,
            loading: false,
        };
    },

    methods: {
        pageChange (page, start, end) {
            console.log(page, start, end);
        },
    },
};
</script>
