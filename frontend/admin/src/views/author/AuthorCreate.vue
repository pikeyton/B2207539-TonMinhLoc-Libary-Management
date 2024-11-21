<template>
  <BackButton />
  <div class="container mt-4">
    <author-form
      :isEdit="false"
      @submit="handleCreate"
    />
  </div>
</template>

<script>
import AuthorForm from "@/components/author/AuthorForm.vue";
import authorService from "@/services/author.service";
import BackButton from "@/components/common/BackButton.vue";
import { useRouter } from "vue-router";

export default {
  components: {
    AuthorForm,
    BackButton,
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    async handleCreate(formData) {
      try {
        const response = await authorService.create(formData);
        if (response.status === "success") {
          alert("Tác giả đã được tạo thành công!");
          this.$router.push({ name: "author" });
        } else {
          throw new Error(response.message || "Tạo tác giả thất bại.");
        }
      } catch (error) {
        alert(error.message || "Đã xảy ra lỗi vui lòng thử lại");
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
