<template>
    <div>
        <i
            class="fa fa-angle-double-left wrapper"
            @click="goToPage(0)"
        ></i>
        <i
            class="fa fa-angle-left wrapper"
            @click="goToPage(page - 1)"
        ></i>
        <label>
            <input 
                :value="page + 1"
                class="input"
                @blur="goToPage($event.target.value - 1)"
                @keyup.enter="goToPage($event.target.value - 1)"
            />
            of {{ totalPages }}
        </label>
        <i
            class="fa fa-angle-right wrapper"
            @click="goToPage(page + 1)"
            
        ></i>
        <i
            class="fa fa-angle-double-right wrapper"
            @click="goToPage(totalPages - 1)"
        ></i>
    </div>
</template>

<script>
import paginationMixin from './MixinPagination';

export default {
    name: 'PaginationWithInput',

    mixins: [
        paginationMixin,
    ],

    methods: {
        goToPage (page) {
            let lastPage = this.totalItems / this.itemsPerPage;
            if (page >= 0 && page < lastPage && page !== this.page) {
                this.$emit('page-change', page);
            }
        },
    },
};
</script>

<style scoped>
.input {
    border: 1px solid #BBB;
    height: 24px;
    margin-left: 5px;
    width: 35px;
    outline: none;
    padding-left: 5px;
}

.wrapper {
    display: flex;    
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    margin-left: 5px;
    background-color: rgb(237, 242, 247);
    cursor: pointer;
}
</style>