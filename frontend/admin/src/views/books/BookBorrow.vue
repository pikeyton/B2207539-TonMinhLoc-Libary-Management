<template>
  <div class="book-detail">
    <!-- Nút Quay Lại -->
    <BackButton />

    <!-- Hiển Thị Thông Tin Sách -->
    <div class="section">
      <h2>Thông Tin Sách</h2>
      <BookDetailCard :book="book" :isDetailView="true" />
    </div>

    <!-- Nhập ID Độc Giả -->
    <div class="section reader-section">
      <h2>Thông Tin Độc Giả</h2>
      <div class="reader-input">
        <label for="readerId">Nhập ID Độc Giả:</label>
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
        <h3>Chi Tiết Độc Giả</h3>
        <p><strong>ID:</strong> {{ reader.publicId }}</p>
        <p><strong>Họ và Tên:</strong> {{ reader.firstName }} {{ reader.lastName }}</p>
        <p><strong>Email:</strong> {{ reader.email }}</p>
        <p><strong>Số Điện Thoại:</strong> {{ reader.phoneNumber }}</p>
        <p><strong>Địa Chỉ:</strong> {{ reader.address }}</p>
        <p><strong>Số Sách Tối Đa Có Thể Mượn:</strong> {{ reader.maximumNumberOfBooksBorrowed }}</p>
        <p><strong>Số Sách Hiện Đang Mượn:</strong> {{ reader.currentNumberOfBooksBorrowed }}</p>
      </div>
    </div>

    <!-- Hiển Thị Danh Sách Bản In -->
    <div class="section">
      <h2>Danh Sách Bản In</h2>
      <BookPrints :prints="bookPrints" @borrow-books="borrowBooks" />
    </div>
  </div>
</template>


<script>
import { onMounted, reactive, ref } from "vue";
import BookDetailCard from "@/components/books/BookDetailCard.vue";
import BookPrints from "@/components/books/BookPrint.vue";
import BackButton from "@/components/common/BackButton.vue";
import bookService from "@/services/book.service";
import bookBorrowTrackingService from "@/services/bookBorrowTracking.service";
import readerService from "@/services/reader.service";
import bookPrintService from "@/services/bookPrint.service";
import { useRoute } from "vue-router";

export default {
  name: "BookDetail",
  components: { BookDetailCard, BookPrints, BackButton },
  setup() {
    const route = useRoute();
    const book = reactive({});
    const bookPrints = reactive([]);
    const readerId = ref("");
    const reader = reactive({});
    const savedUserData = JSON.parse(localStorage.getItem("user"));
    const staff = reactive({ ...savedUserData });

    const fetchBook = async () => {
      try {
        const response = await bookService.findOne(route.params.id);
        Object.assign(book, response.data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin sách:", error);
      }
    };

    const fetchBookPrints = async () => {
      try {
        const response = await bookPrintService.findByIdBook(route.params.id);
        Object.assign(bookPrints, response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bản in:", error);
      }
    };

    const fetchReader = async () => {
      if (!readerId.value) {
        Object.keys(reader).forEach(key => delete reader[key]);
        return;
      }
      try {
        const response = await readerService.findByPublicId(readerId.value);
        
        if (response.data) {
          Object.assign(reader, response.data);
        } else {
          Object.keys(reader).forEach(key => delete reader[key]);
          alert("Không tìm thấy độc giả với ID này.");
        }
        
      } catch (error) {
        console.error("Lỗi khi lấy thông tin độc giả:", error);
        // Xóa dữ liệu reader trong trường hợp lỗi
        Object.keys(reader).forEach(key => delete reader[key]);
        alert("Không tìm thấy độc giả với ID này.");
      }
    };


    const borrowBooks = async (selectedPrint) => {
      if (!reader._id) {
        alert("Vui lòng nhập ID độc giả trước.");
        return;
      }
      try {
        const res = await bookBorrowTrackingService.create(reader._id, selectedPrint, staff._id);
        alert(res.message);
        fetchBookPrints();
      } catch (error) {
        console.error("Lỗi khi cho mượn sách:", error);
        alert("Lỗi khi cho mượn sách.");
      }
    };

    onMounted(() => {
      fetchBook();
      fetchBookPrints();
    });

    return {
      book,
      bookPrints,
      readerId,
      reader,
      fetchReader,
      borrowBooks,
    };
  },
};
</script>
<style scoped>
/* Tổng Quan */
.book-detail {
  max-width: 800px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  color: #333;
}

/* Tiêu Đề */
.section h2 {
  font-size: 24px;
  margin-bottom: 15px;
  color: #007bff;
}

/* Phần Nhập ID Độc Giả */
.reader-input {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
}

input.form-control {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

input.form-control:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

/* Card Thông Tin */
.card {
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
  margin-top: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.card h3 {
  margin-bottom: 10px;
  color: #333;
  font-size: 20px;
}

/* Căn Chỉnh Thông Tin */
.reader-info p {
  margin: 5px 0;
  font-size: 16px;
  line-height: 1.6;
}

/* Section */
.section {
  margin-top: 30px;
  padding: 20px 0;
  border-bottom: 1px solid #ddd;
}

.section:last-child {
  border-bottom: none;
}
</style>
