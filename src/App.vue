<template>
    <div id="app">
        <Pagination
            :total-items="200"
            :max-visible-pages="4"
            :start-page="3"
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
    name: 'app',
    components: {
        Pagination,
    },
};
</script>
