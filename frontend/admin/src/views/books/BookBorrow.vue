<template>
  <BackButton />
  <div class="book-detail">
    <BookDetailCard :book="book" :isDetailView="true" />
    <div class="reader-section">
      <h3>Thông tin độc giả</h3>
      <div class="reader-input">
        <label for="readerId">Nhập ID độc giả:</label>
        <input
          type="text"
          id="readerId"
          v-model="readerId"
          @change="fetchReader"
        />
      </div>
      <div v-if="reader" class="reader-info">
        <p><strong>ID:</strong> {{ reader.publicId }}</p>
        <p><strong>Họ và tên:</strong> {{ reader.firstName }} {{ reader.lastName }}</p>
        <p><strong>Email:</strong> {{ reader.email }}</p>
        <p><strong>Số điện thoại:</strong> {{ reader.phoneNumber }}</p>
        <p><strong>Địa chỉ:</strong> {{ reader.address }}</p>
        <p><strong>Số sách tối đa có thể mượn:</strong> {{ reader.maximumNumberOfBooksBorrowed }}</p>
        <p><strong>Số sách hiện đang mượn:</strong> {{ reader.currentNumberOfBooksBorrowed }}</p>
      </div>
    </div>
    <BookPrints :prints="bookPrints" @borrow-books="borrowBooks" />
    
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
.book-detail {
  max-width: 800px;
  margin: 0 auto;
}

.reader-section {
  margin-top: 20px;
}

.reader-input {
  margin-bottom: 10px;
}

.reader-info p {
  margin: 5px 0;
}

</style>
