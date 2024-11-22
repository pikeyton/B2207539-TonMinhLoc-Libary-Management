<template>
  <div class="borrow-book-page">
    <h2 class="title">Quản Lý Mượn Sách</h2>

    <!-- Nhập ID Độc Giả -->
    <div class="form-section">
      <h4>Nhập ID Độc Giả</h4>
      <div class="form-group">
        <label for="readerId">ID Độc Giả:</label>
        <input 
          type="text" 
          id="readerId" 
          class="form-control"
          placeholder="Nhập ID độc giả..."
          v-model="readerId" 
          @change="fetchReader" 
        />
      </div>
      <div v-if="reader" class="reader-info card">
        <h5>Thông Tin Độc Giả</h5>
        <p><strong>ID:</strong> {{ reader.publicId }}</p>
        <p><strong>Họ và Tên:</strong> {{ reader.firstName }} {{ reader.lastName }}</p>
        <p><strong>Email:</strong> {{ reader.email }}</p>
        <p><strong>Số Sách Đang Mượn:</strong> {{ reader.currentNumberOfBooksBorrowed }}</p>
        <p><strong>Số Sách Tối Đa Có Thể Mượn:</strong> {{ reader.maximumNumberOfBooksBorrowed }}</p>
      </div>
    </div>

    <!-- Nhập ID Sách -->
    <div v-if="reader" class="form-section">
      <h4>Nhập ID Sách</h4>
      <div class="form-group">
        <label for="bookId">ID Sách:</label>
        <input 
          type="text" 
          id="bookId" 
          class="form-control"
          placeholder="Nhập ID sách..." 
          v-model="bookId" 
          @change="fetchBookDetails" 
        />
      </div>
    </div>

    <!-- Hiển thị thông tin sách -->
    <div v-if="selectedBook" class="book-details card">
      <h4>Thông Tin Sách</h4>
      <BookDetailCard
        :book="selectedBook"
        isDetailView
      />
    </div>

    <!-- Hiển thị danh sách bản in -->
    <div v-if="bookPrints.length" class="prints-section card">
      <h4>Danh Sách Bản In</h4>
      <BookPrint 
        :prints="bookPrints" 
        @borrow-books="handleBorrowBooks" 
      />
    </div>
  </div>
</template>

<script>
import BookDetailCard from "@/components/books/BookDetailCard.vue";
import BookPrint from "@/components/books/BookPrint.vue";
import readerService from "@/services/reader.service";
import bookService from "@/services/book.service";
import bookPrintService from "@/services/bookPrint.service";
import bookBorrowTrackingService from "@/services/bookBorrowTracking.service";
import { reactive } from "vue";

export default {
  components: {
    BookDetailCard,
    BookPrint,
  },
  data() {
    return {
      readerId: "",
      reader: null,
      bookId: "",
      selectedBook: null,
      bookPrints: [],
    };
  },
  methods: {
    // Tìm thông tin độc giả
    async fetchReader() {
      if (!this.readerId) {
        this.reader = null;
        return;
      }
      try {
        const response = await readerService.findByPublicId(this.readerId);
        this.reader = response.data || null;
        if (!this.reader) {
          alert("Không tìm thấy độc giả với ID này.");
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin độc giả:", error);
        alert("Không tìm thấy độc giả với ID này.");
        this.reader = null;
      }
    },

    // Lấy thông tin sách dựa trên ID
    async fetchBookDetails() {
      if (!this.bookId) {
        this.selectedBook = null;
        this.bookPrints = [];
        return;
      }
      try {
        const response = await bookService.findByPublicId(this.bookId);
        console.log(response.data)
        this.selectedBook = response.data || null;
        if (this.selectedBook) {
          console.log(this.selectedBook._id)
          await this.fetchBookPrints(this.selectedBook._id);
        } else {
          alert("Không tìm thấy sách với ID này.");
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin sách:", error);
        alert("Không tìm thấy sách với ID này.");
        this.selectedBook = null;
        this.bookPrints = [];
      }
    },

    // Lấy danh sách bản in của sách
    async fetchBookPrints(bookId) {
      try {
        const response = await bookPrintService.findByIdBook(bookId);
        this.bookPrints = response.data || [];
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bản in:", error);
        this.bookPrints = [];
      }
    },

    // Xử lý mượn sách
    async handleBorrowBooks(selectedPrint) {
        const savedUserData = JSON.parse(localStorage.getItem("user"));
        const staff = reactive({ ...savedUserData });
      if (!selectedPrint) {
        alert("Vui lòng chọn bản in để mượn.");
        return;
      }
      try {
        const response = await bookBorrowTrackingService.create(this.reader._id,selectedPrint, staff._id);
        if (response.status === "success") {
            alert( response.message|| "Mượn sách thành công!");
            await this.fetchBookPrints(this.selectedBook._id); 
        }
      } catch (error) {
        console.error("Lỗi khi mượn sách:", error);
        alert("Lỗi khi mượn sách.");
      }
    },
  },
};
</script><style scoped>
/* Tổng quan */
.borrow-book-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #333;
}

.title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
}

/* Form section */
.form-section {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

input.form-control {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input.form-control:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

/* Card style */
.card {
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #ffffff;
  margin-top: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.card h5 {
  font-size: 18px;
  margin-bottom: 10px;
  color: #007bff;
}

/* Book details */
.book-details {
  margin-top: 20px;
}

/* Prints section */
.prints-section {
  margin-top: 20px;
}

h4 {
  font-size: 20px;
  margin-bottom: 15px;
  color: #333;
}
</style>
