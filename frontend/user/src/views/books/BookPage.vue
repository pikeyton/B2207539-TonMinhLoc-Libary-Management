<template>
    <div>
        <div class="container-top">
            <greeting :title="title"></greeting>
        </div>
        <SearchBar @search="handleSearch" class="input-search" :searchBy="searchBy" :options="options"></SearchBar>
        <div class="row">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col" class="image-column">Hình Ảnh</th>
                        <th scope="col" class="info-column">Thông Tin Sách</th>
                    </tr>
                </thead>
                <tbody>
                    <BookDetailCard
                        v-for="book in filterBooks"
                        :key="book._id"
                        :book="book"
                        @showDetail="handleShowDetail"
                        @borrow="handleBorrow"
                    />
                </tbody>
            </table>
        </div>
    </div>
</template>



<script>
import Greeting from '@/components/common/GreeTing.vue';
import bookService from '@/services/book.service';
import SearchBar from '@/components/common/SearchBar.vue';
import BookDetailCard from "@/components/books/BookDetailCard.vue";

export default {
    data() {
        return {
            title: 'Quản lý sách',
            books: [],
            filterBooks: [],
            searchTerm: "",
            searchBy: "Tìm kiếm",
            options: [
                { label: 'Tìm theo mã sách', value: 'id'},
                { label: 'Tìm kiếm theo tên sách', value: 'name' },
                { label: 'Tìm kiếm theo lĩnh vực', value: 'field'},
                { label: 'Tìm kiếm theo tác giả', value: 'author' },
            ]
        };
    },
    components: {
        Greeting,
        SearchBar,
        BookDetailCard,
    },
    beforeMount: async function() {
        await this.getBooks();
    },
    methods: {
        handleSearch(search) {
            this.searchTerm = search.searchTerm;
            this.option = search.selectedOption;
            this.filter();
        },
        filter() {
            
            if (!this.searchTerm || this.searchTerm === "") {
                this.filterBooks = this.books;
                return;
            }
            if (!this.option) {
                this.filterBooks = this.books;
                return;
            }
            console.log(this.searchTerm, this.option);

            const searchTerm = this.searchTerm.toLowerCase();
            
            switch (this.option) {
                case 'id':
                    
                    this.filterBooks = this.books.filter(book =>
                        book.publicId?.toLowerCase().includes(searchTerm)
                    );
                    break;

                case 'name':
                    this.filterBooks = this.books.filter(book =>
                        book.name?.toLowerCase().includes(searchTerm)
                    );
                    break;
                
                case 'field':
                    this.filterBooks = this.books.filter(book =>
                        book.bookFieldId.name?.toLowerCase().includes(searchTerm)
                    );
                    break;

                case 'author':
                    this.filterBooks = this.books.filter(book =>
                        book.authorIds?.some(author =>
                            author.name.toLowerCase().includes(searchTerm)
                        )
                    );
                    break;

                default:
                    this.filterBooks = this.books;
                    break;
            }
        },

        async getBooks() {
            const res = await bookService.findAll();
            if (res.status === "error") {
                alert(res.message);
                return;
            }
            this.books = res.data;
            this.filterBooks = this.books;
        },
        handleBorrow(book){
            this.$router.push({
                name: 'book-borrow',
                params: {
                    id: book._id
                }
            })
        },
        handleShowDetail(book) {
            this.$router.push({
                name: 'book-detail',
                params: {
                    id: book._id
                }
            });
        }
    }
};
</script>

<style scoped>
.container-top {
    text-align: center;
    padding: 20px;
}

.input-search {
    margin-bottom: 12px;
}

.table {
    margin-top: 20px;
    width: 100%;
    text-align: left;
    font-size: 14px;
    border-collapse: collapse;
}

.table th,
.table td {
    padding: 15px;
    border: 1px solid #ddd;
    vertical-align: middle;
}

.image-column {
    width: 50%; 
    text-align: center;
    vertical-align: middle;
}

.info-column {
    width: 50%; 
}

.book-image {
    max-width: 90%; 
    max-height: 400px; 
    height: auto; 
    object-fit: cover;
    border-radius: 5px;
}

.action-buttons {
    margin-top: 10px;
    display: flex;
    gap: 10px;
}

.btn-detail,
.btn-edit,
.btn-delete {
    padding: 5px 10px;
    font-size: 14px;
    cursor: pointer;
}
</style>


