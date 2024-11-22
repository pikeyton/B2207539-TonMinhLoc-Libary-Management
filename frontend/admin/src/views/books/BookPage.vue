<template>
    <div class="container mt-4">
      <div class="header-section">
        <Greeting :title="title" />
        <btn class="btn-add-book" nameBtn="Thêm Sách" @click="addBook" />
      </div>
      <SearchBar @search="handleSearch" :searchBy="searchBy" :options="options" />
  
      <div class="table-container mt-5">
        <table class="table table-hover table-striped">
          <thead class="table-dark">
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
              @edit="handleEdit"
              @delete="handleDelete"
              @BookPrintRead="handleBookPrintRead"
              @BookPrintBorrow="handleBookPrintBorrow"
            />
          </tbody>
        </table>
      </div>
    </div>
  </template>



<script>
import Greeting from '@/components/common/GreeTing.vue';
import bookService from '@/services/book.service';
import Btn from '@/components/common/ButtonA.vue';
import SearchBar from '@/components/common/SearchBar.vue';
import BookDetailCard from "@/components/books/BookDetailCard.vue";
import bookPrintService from '@/services/bookPrint.service';

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
        Btn,
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
        addBook() {
            this.$router.push({ name: 'book-create' });
        },
        async handleDelete(book) {
            if (window.confirm("Bạn có chắc chắn muốn xóa sách này?")) {
                await this.deleteBook(book._id);
                await this.getBooks();
                this.filter();
            }
        },
        async deleteBook(id) {
            const res = await bookService.delete(id);
            if (res.status === "error") {
                alert(res.message);
            }
        },
        async handleBookPrintRead(book) {
            if (window.confirm("Bạn có chắc chắn muốn tạo bản in này chỉ đọc?")) {
                await this.createBookPrint({
                    bookId: book._id,
                    documentType: 'Document Read'
                });
            }
        },
        async handleBookPrintBorrow(book) {
            if (window.confirm("Bạn có chắc chắn muốn tạo bản in này mượn?")) {
                await this.createBookPrint({
                    bookId: book._id,
                    documentType: 'Document Borrow'
                });
            }
        },
        async createBookPrint(data) {
            const res = await bookPrintService.create(data);
            if (res.status === "error") {
                alert(res.message);
            }
            else if (res.status === "success") {
                alert("Tạo bản in thành công!\n Có ID là: " + res.data);
            }
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
        },
        handleEdit(book) {
            this.$router.push({
                name: 'book-edit',
                params: {
                    id: book._id
                }
            });
        }
    }
};
</script>


<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #ddd;
  padding: 15px 0;
}

.btn-add-book {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
}

.btn-add-book:hover {
  background-color: #0056b3;
}

.table-container {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

.table {
  margin: 0;
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  text-align: left;
  padding: 10px;
}

.table thead {
  background-color: #343a40;
  color: #fff;
}

.table tbody tr:hover {
  background-color: #f8f9fa;
}
</style>