<template>
  <BackButton />
  <div class="container mt-4">
    <div v-if="bookData">
      <book-form
        :isEdit="true"
        :publishers="publishers"
        :bookFields="bookFields"
        :authors="authors"
        :initialData="bookData"
        @submit="handleUpdate"
      />
    </div>
    <div v-else>
      <p>Đang tải dữ liệu...</p>
    </div>
  </div>
</template>

<script>
import BackButton from "@/components/common/BackButton.vue";
import BookForm from "@/components/books/BookForm.vue";
import publisherService from "@/services/publisher.service";
import bookFieldService from "@/services/bookField.service";
import authorService from "@/services/author.service";
import bookService from "@/services/book.service";
import { useRoute, useRouter } from "vue-router";

export default {
  components: {
    BookForm,
    BackButton,
  },
  data() {
    return {
      bookData: null, 
      publishers: [], 
      bookFields: [], 
      authors: [], 
    };
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    return { route, router };
  },
  mounted() {
    this.fetchInitialData();
  },
  methods: {
    async fetchInitialData() {
      try {

        const bookResponse = await bookService.findOne(this.route.params.id);
        if (!bookResponse || !bookResponse.data) {
          throw new Error("Không tìm thấy thông tin sách.");
        }
        this.bookData = bookResponse.data;
        this.bookData.authorIds = null;
        this.bookData.image = null;
       
        const [publisherResponse, bookFieldResponse, authorResponse] = await Promise.all([
          publisherService.findAll(),
          bookFieldService.findAll(),
          authorService.findAll(),
        ]);

        this.publishers = publisherResponse.data || [];
        this.bookFields = bookFieldResponse.data || [];
        this.authors = authorResponse.data || [];
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        alert("Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại!");
        this.$router.push({ name: "book" });
      }
    },
    async handleUpdate(formData) {
      try {
        const response = await bookService.update(this.route.params.id, formData);

        if (response.status === "success") {
          alert("Sách đã được cập nhật thành công!");
          this.$router.push({ name: "book" });
        } else {
          throw new Error(response.message || "Đã xảy ra lỗi khi cập nhật sách.");
        }
      } catch (error) {
        console.error("Lỗi khi cập nhật sách:", error);
        alert(error.message || "Đã xảy ra lỗi. Vui lòng thử lại!");
      }
    },
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
