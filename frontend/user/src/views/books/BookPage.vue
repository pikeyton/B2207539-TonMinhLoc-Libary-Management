<template>
    <div>
        <!-- Tiêu đề -->
        <div class="container-top">
            <Greeting :title="title" />
        </div>

        <!-- Thanh tìm kiếm -->
        <SearchBar 
            @search="handleSearch" 
            class="input-search" 
            :searchBy="searchBy" 
            :options="options" 
        />

        <!-- Bảng hiển thị sách -->
        <div class="table-container mt-5">
            <table class="table table-hover table-striped">
                <thead class="table-dark">
                    <tr>
                        <th class="image-column">Hình Ảnh</th>
                        <th class="info-column">Thông Tin Sách</th>
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
import Greeting from "@/components/common/GreeTing.vue";
import bookService from "@/services/book.service";
import SearchBar from "@/components/common/SearchBar.vue";
import BookDetailCard from "@/components/books/BookDetailCard.vue";

export default {
    data() {
        return {
            title: "Tra Cứu Sách",
            books: [],
            filterBooks: [],
            searchTerm: "",
            searchBy: "Tìm kiếm",
            options: [
                { label: "Tìm theo mã sách", value: "id" },
                { label: "Tìm kiếm theo tên sách", value: "name" },
                { label: "Tìm kiếm theo lĩnh vực", value: "field" },
                { label: "Tìm kiếm theo tác giả", value: "author" },
            ],
        };
    },
    components: {
        Greeting,
        SearchBar,
        BookDetailCard,
    },
    async beforeMount() {
        await this.getBooks();
    },
    methods: {
        handleSearch(search) {
            this.searchTerm = search.searchTerm;
            this.option = search.selectedOption;
            this.filter();
        },
        filter() {
            if (!this.searchTerm) {
                this.filterBooks = this.books;
                return;
            }

            const searchTerm = this.searchTerm.toLowerCase();

            switch (this.option) {
                case "id":
                    this.filterBooks = this.books.filter(book =>
                        book.publicId?.toLowerCase().includes(searchTerm)
                    );
                    break;
                case "name":
                    this.filterBooks = this.books.filter(book =>
                        book.name?.toLowerCase().includes(searchTerm)
                    );
                    break;
                case "field":
                    this.filterBooks = this.books.filter(book =>
                        book.bookFieldId.name?.toLowerCase().includes(searchTerm)
                    );
                    break;
                case "author":
                    this.filterBooks = this.books.filter(book =>
                        book.authorIds?.some(author =>
                            author.name.toLowerCase().includes(searchTerm)
                        )
                    );
                    break;
                default:
                    this.filterBooks = this.books;
            }
        },
        async getBooks() {
            try {
                const res = await bookService.findAll();
                this.books = res.data;
                this.filterBooks = this.books;
            } catch (error) {
                console.error("Lỗi khi tải danh sách sách:", error);
            }
        },
        handleBorrow(book) {
            this.$router.push({
                name: "book-borrow",
                params: {
                    id: book._id,
                },
            });
        },
        handleShowDetail(book) {
            this.$router.push({
                name: "book-detail",
                params: {
                    id: book._id,
                },
            });
        },
    },
};
</script>
<style scoped>
/* Tổng quan */
.container-top {
    text-align: center;
    padding: 20px;
}

/* Thanh tìm kiếm */
.input-search {
    margin-bottom: 20px;
}

/* Bảng */
.table-container {
    margin-top: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    overflow: hidden;
}

.table {
    width: 100%;
    border-collapse: collapse;
}

.table thead {
    background-color: #343a40;
    color: #fff;
}

.table th,
.table td {
    padding: 15px;
    text-align: left;
}

.table tbody tr:hover {
    background-color: #f8f9fa;
}

/* Cột hình ảnh */
.image-column {
    width: 40%;
    text-align: center;
}

/* Cột thông tin */
.info-column {
    width: 60%;
}

/* Hình ảnh */
.book-image {
    max-width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
