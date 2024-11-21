<template>
  <div class="container mt-4">
    <h2 class="text-center">{{ isEdit ? "Cập nhật Tác Giả" : "Tạo Tác Giả Mới" }}</h2>
    <form @submit.prevent="handleSubmit">
      <!-- Tên Tác Giả -->
      <div class="form-group">
        <label for="name">Tên Tác Giả</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="formData.name"
          placeholder="Tên tác giả"
        />
        <p v-if="formErrors.name" class="text-danger">{{ formErrors.name }}</p>
      </div>

      <!-- Public ID -->
      <div class="form-group">
        <label for="publicId">Public ID</label>
        <input
          type="text"
          class="form-control"
          id="publicId"
          v-model="formData.publicId"
          placeholder="Public ID"
        />
        <p v-if="formErrors.publicId" class="text-danger">{{ formErrors.publicId }}</p>
      </div>

      <!-- Mô tả -->
      <div class="form-group">
        <label for="descripe">Mô Tả</label>
        <textarea
          class="form-control"
          id="descripe"
          v-model="formData.descripe"
          placeholder="Mô tả về tác giả"
        ></textarea>
        <p v-if="formErrors.descripe" class="text-danger">
          {{ formErrors.descripe }}
        </p>
      </div>

      <!-- Giới tính -->
      <div class="form-group">
        <label for="gender">Giới Tính</label>
        <select class="form-control" id="gender" v-model="formData.gender">
          <option value="" disabled>Chọn giới tính</option>
          <option value="Male">Nam</option>
          <option value="Female">Nữ</option>
        </select>
        <p v-if="formErrors.gender" class="text-danger">{{ formErrors.gender }}</p>
      </div>

      <!-- Nút submit -->
      <div class="form-group text-center">
        <button type="submit" class="btn btn-primary">
          {{ isEdit ? "Cập nhật" : "Tạo mới" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    initialData: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["submit"],
  data() {
    return {
      formData: {
        name: this.initialData.name || "",
        publicId: this.initialData.publicId || "",
        descripe: this.initialData.descripe || "",
        gender: this.initialData.gender || "",
      },
      formErrors: {
        name: "",
        publicId: "",
        descripe: "",
        gender: "",
      },
    };
  },
  methods: {
    validateForm() {
      let isValid = true;
      this.formErrors = {
        name: "",
        publicId: "",
        descripe: "",
        gender: "",
      };

      if (!this.formData.name) {
        this.formErrors.name = "Tên tác giả là bắt buộc.";
        isValid = false;
      }
      if (!this.formData.publicId) {
        this.formErrors.publicId = "Public ID là bắt buộc.";
        isValid = false;
      }
      if (!this.formData.gender) {
        this.formErrors.gender = "Giới tính là bắt buộc.";
        isValid = false;
      }

      return isValid;
    },
    handleSubmit() {
      if (!this.validateForm()) return;

      this.$emit("submit", { ...this.formData });
    },
  },
};
</script>

<style scoped>
.text-danger {
  font-size: 14px;
  color: red;
}
button {
  margin-top: 15px;
}
</style>
