<template>
  <div id="app">
    <Pagination
        :totalItems="200"
        :maxVisiblePages="4"
        :startPage="3"
    />
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
