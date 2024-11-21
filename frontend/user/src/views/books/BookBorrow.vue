<template>
  <BackButton />
  <div class="book-detail">
    <BookDetailCard :book="book" :isDetailView="true" />
    <BookPrints :prints="bookPrints" @borrow-books="borrowBooks" />
    
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import BookDetailCard from "@/components/books/BookDetailCard.vue";
import BookPrints from "@/components/books/BookPrint.vue";
import BackButton from "@/components/common/BackButton.vue";
import bookService from "@/services/book.service";
import bookBorrowRgistrationService from "@/services/bookBorrowRgistration.service";
import bookPrintService from "@/services/bookPrint.service";
import { useRoute } from "vue-router";

export default {
  name: "BookDetail",
  components: { BookDetailCard, BookPrints, BackButton },
  setup() {
    const route = useRoute();
    const book = reactive({});
    const bookPrints = reactive([]);
    

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


    const borrowBooks = async (selectedPrint) => {
      const userData = JSON.parse(localStorage.getItem ("user"));
      const readerId = userData._id
      try {
        const res = await bookBorrowRgistrationService.create(readerId, selectedPrint);
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
