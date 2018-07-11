<template>
  <div id="app">
    <Pagination
        :totalItems="150"
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
