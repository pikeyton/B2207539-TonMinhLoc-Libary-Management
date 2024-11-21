<template>
  <BackButton />
    <div class="container mt-4">
      <div v-if="authorData">
        <author-form
          :isEdit="true"
          :initialData="authorData"
          @submit="handleUpdate"
        />
      </div>
      <div v-else>
        <p>Đang tải dữ liệu...</p>
      </div>
    </div>
  </template>
  
  <script>
  import AuthorForm from "@/components/author/AuthorForm.vue";
  import authorService from "@/services/author.service";
  import BackButton from "@/components/common/BackButton.vue";
  import { useRoute, useRouter } from "vue-router";
  
  export default {
    components: {
      AuthorForm,
      BackButton,
    },
    data() {
      return {
        authorData: null,
      };
    },
    setup() {
      const route = useRoute();
      const router = useRouter();
      return { route, router };
    },
    mounted() {
      this.fetchAuthor();
    },
    methods: {
      async fetchAuthor() {
        try {
          const response = await authorService.findOne(this.route.params.id);
          if (!response || !response.data) {
            throw new Error("Không tìm thấy tác giả.");
          }
          this.authorData = response.data;
        } catch (error) {
          console.error("Lỗi khi tải dữ liệu:", error);
          alert("Không tìm thấy thông tin tác giả.");
          this.$router.push({ name: "authors" });
        }
      },
      async handleUpdate(updatedData) {
        try {
          const response = await authorService.update(this.route.params.id, updatedData);
          if (response.status === "success") {
            alert("Cập nhật tác giả thành công!");
            this.$router.push({ name: "author" });
          } else {
            throw new Error(response.message || "Cập nhật tác giả thất bại.");
          }
        } catch (error) {
          console.error("Lỗi khi cập nhật tác giả:", error);
          alert(error.message || "Đã xảy ra lỗi. Vui lòng thử lại.");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0;
  }
  </style>
  