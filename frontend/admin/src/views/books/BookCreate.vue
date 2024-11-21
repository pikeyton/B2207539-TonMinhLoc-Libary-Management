<template>
  <BackButton />
  <div class="container mt-4">
    <book-form
      :isEdit="false"
      :publishers="publishers"
      :bookFields="bookFields"
      :authors="authors"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import BookForm from "@/components/books/BookForm.vue";
import publisherService from "@/services/publisher.service";
import BackButton from "@/components/common/BackButton.vue";
import bookFieldService from "@/services/bookField.service";
import authorService from "@/services/author.service";
import bookService from "@/services/book.service";

export default {
  components: {
    BookForm,
    BackButton,
  },
  data() {
    return {
      publishers: [],
      bookFields: [],
      authors: [],
    };
  },
  methods: {
    async fetchData() {
      try {
        // Lấy danh sách nhà xuất bản và tác giả từ API
        const [publisherResponse,bookFieldResponse, authorResponse] = await Promise.all([
          publisherService.findAll(),
          bookFieldService.findAll(),
          authorService.findAll(),
        ]);
        
        this.publishers = publisherResponse.data || [];
        this.bookFields = bookFieldResponse.data || [];
        this.authors = authorResponse.data || [];
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    },
    async handleSubmit(formData) {
      try {
        const response = await bookService.create(formData);

        if (response.status === "success") {
          alert("Sách đã được tạo thành công!");
          this.$router.push({ name: "book" });
        } else {
          throw new Error(response.message || "Đã xảy ra lỗi khi tạo sách.");
        }
      } catch (error) {
        console.error("Lỗi khi tạo sách:", error);
        alert(error.message || "Đã xảy ra lỗi. Vui lòng thử lại!");
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0px;
}
h1 {
  font-size: 28px;
  margin-bottom: 20px;
}
</style>
