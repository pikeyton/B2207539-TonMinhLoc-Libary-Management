<template>
  <div class="container mt-4">
    <h2 class="text-center">{{ isEdit ? "Cập nhật Sách" : "Tạo Sách Mới" }}</h2>
    <form @submit.prevent="handleSubmit">
      <!-- Tên sách -->
      <div class="form-group">
        <label for="name">Tên Sách</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="formData.name"
          placeholder="Tên sách"
        />
        <p v-if="formErrors.name" class="text-danger">{{ formErrors.name }}</p>
      </div>

      <!-- Giá sách -->
      <div class="form-group">
        <label for="price">Giá</label>
        <input
          type="number"
          class="form-control"
          id="price"
          v-model="formData.price"
          placeholder="Giá sách"
        />
        <p v-if="formErrors.price" class="text-danger">{{ formErrors.price }}</p>
      </div>

      <!-- Năm xuất bản -->
      <div class="form-group">
        <label for="year">Năm Xuất Bản</label>
        <input
          type="number"
          class="form-control"
          id="year"
          v-model="formData.year"
          placeholder="Năm xuất bản"
        />
        <p v-if="formErrors.year" class="text-danger">{{ formErrors.year }}</p>
      </div>

      <!-- Nhà xuất bản -->
      <div class="form-group">
        <label for="publisher">Nhà Xuất Bản</label>
        <select
          class="form-control"
          id="publisher"
          v-model="formData.publisherId"
        >
          <option value="" disabled>Chọn nhà xuất bản</option>
          <option
            v-for="publisher in publishers"
            :key="publisher._id"
            :value="publisher._id"
          >
            {{ publisher.name }}
          </option>
        </select>
        <p v-if="formErrors.publisherId" class="text-danger">
          {{ formErrors.publisherId }}
        </p>
      </div>

      <!-- Lĩnh Vực -->
      <div class="form-group">
        <label for="bookField">Lĩnh vực</label>
        <select
          class="form-control"
          id="bookField"
          v-model="formData.bookFieldId"
        >
          <option value="" disabled>Chọn lĩnh vực</option>
          <option
            v-for="bookField in bookFields"
            :key="bookField._id"
            :value="bookField._id"
          >
            {{ bookField.name }}
          </option>
        </select>
        <p v-if="formErrors.bookFieldId" class="text-danger">
          {{ formErrors.bookFieldId }}
        </p>
      </div>

      <!-- Tác giả -->
      <div class="form-group">
        <label for="authors">Tác giả</label>
        <div id="authors" class="author-checkboxes">
          <div
            v-for="author in authors"
            :key="author._id"
            class="form-check"
          >
            <input
              type="checkbox"
              :id="author._id"
              class="form-check-input"
              :value="author._id"
              v-model="formData.authorIds"
            />
            <label :for="author._id" class="form-check-label">
              {{ author.name }} ({{ author.publicId }}) 
            </label>
          </div>
        </div>
        <p v-if="formErrors.authorIds" class="text-danger">
          {{ formErrors.authorIds }}
        </p>
      </div>

      <!-- Hình ảnh -->
      <div class="form-group">
        <label for="image">Hình ảnh</label>
        <input
          type="file"
          class="form-control"
          id="image"
          @change="handleImageUpload"
        />
        <div v-if="imagePreview" class="mt-2">
          <img :src="imagePreview" alt="Preview" class="img-thumbnail" />
        </div>
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
    publishers: {
      type: Array,
      required: true,
    },
    bookFields: {
      type: Array,
      required: true,
    },
    authors: {
      type: Array,
      required: true,
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
        price: this.initialData.price || "",
        year: this.initialData.year || "",
        bookFieldId: this.initialData.bookFieldId || "",
        publisherId: this.initialData.publisherId || "",
        authorIds: this.initialData.authorIds || [],
        image: null,
      },
      imagePreview: null,
      formErrors: {
        name: "",
        price: "",
        year: "",
        bookFieldId: "",
        publisherId: "",
        authorIds: "",
      },
    };
  },
  methods: {
    validateForm() {
      let isValid = true;
      this.formErrors = {
        name: "",
        price: "",
        year: "",
        bookFieldId: "",
        publisherId: "",
        authorIds: "",
      };

      if (!this.formData.name) {
        this.formErrors.name = "Tên sách là bắt buộc.";
        isValid = false;
      }
      if (!this.formData.price || this.formData.price <= 0) {
        this.formErrors.price = "Giá phải là số dương.";
        isValid = false;
      }
      const currentYear = new Date().getFullYear();
      if (
        !this.formData.year ||
        this.formData.year < 1800 ||
        this.formData.year > currentYear
      ) {
        this.formErrors.year = `Năm phải từ 1800 đến ${currentYear}.`;
        isValid = false;
      }
      if (!this.formData.bookFieldId) {
        this.formErrors.bookFieldId = "Lĩnh vực là bắt buộc.";
        isValid = false;
      }
      if (!this.formData.publisherId) {
        this.formErrors.publisherId = "Nhà xuất bản là bắt buộc.";
        isValid = false;
      }
      if (!this.formData.authorIds.length) {
        this.formErrors.authorIds = "Vui lòng chọn ít nhất một tác giả.";
        isValid = false;
      }

      return isValid;
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      this.formData.image = file;
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    handleSubmit() {
      if (!this.validateForm()) {
        return;
      }

      const formData = new FormData();

      Object.entries(this.formData).forEach(([key, value]) => {
        if (key === "authorIds") {
          formData.append(key, JSON.stringify(value));
        } else if (key === "image" && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, value);
        }
      });

      this.$emit("submit", formData);
    },
  },
};
</script>

<style scoped>
.author-checkboxes {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.img-thumbnail {
  max-width: 100%;
  height: auto;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.text-danger {
  font-size: 14px;
  color: red;
}

button {
  margin-top: 15px;
}
</style>
