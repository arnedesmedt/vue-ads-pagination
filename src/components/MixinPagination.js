export default {
    props: {
        page: {
            type: Number,
            default: 0,
            validator: (page) => page >= 0,
        },
        itemsPerPage: {
            type: Number,
            default: 10,
            validator: (itemsPerPage) => itemsPerPage > 0,
        },
        totalItems: {
            type: Number,
            required: true,
            validator: (totalItems) => totalItems >= 0,
        },
    },
    computed: {
        totalPages () {
            if (this.itemsPerPage === 0) {
                return 0;
            }

            return Math.ceil(this.totalItems / this.itemsPerPage);
        },
    },
};