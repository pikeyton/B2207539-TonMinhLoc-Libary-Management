<template>
  <div class="profile my-5">
    <form class="form" @submit.prevent="onSubmit">
      <legend class="form-title">Thông tin cá nhân</legend>
      
      <!-- Hiển thị Email -->
      <div class="mb-3 form-group">
        <label for="email" class="form-label">Email: </label>
        <input
          type="text"
          id="email"
          class="form-control"
          v-model="data.email"
          disabled
        />
      </div>

      <div class="mb-3 form-group">
        <label for="email" class="form-label">ID: </label>
        <input
          type="text"
          id="publicId"
          class="form-control"
          v-model="data.publicId"
          disabled
        />
      </div>

      <!-- Hiển thị Họ và tên -->
      <div class="mb-3 form-group">
        <label for="firstName" class="form-label">Họ: </label>
        <input
          type="text"
          id="firstName"
          class="form-control"
          v-model="data.firstName"
        />
      </div>
      <div class="mb-3 form-group">
        <label for="lastName" class="form-label">Tên: </label>
        <input
          type="text"
          id="lastName"
          class="form-control"
          v-model="data.lastName"
        />
      </div>

      <!-- Hiển thị Số điện thoại -->
      <div class="mb-3 form-group">
        <label for="phoneNumber" class="form-label">Số điện thoại: </label>
        <input
          type="text"
          id="phoneNumber"
          class="form-control"
          v-model="data.phoneNumber"
        />
      </div>

      <!-- Hiển thị Địa chỉ -->
      <div class="mb-3 form-group">
        <label for="address" class="form-label">Địa chỉ: </label>
        <input
          type="text"
          id="address"
          class="form-control"
          v-model="data.address"
        />
      </div>

      <!-- Hiển thị Ngày sinh -->
      <div class="mb-3 form-group">
        <label for="birthDay" class="form-label">Ngày sinh: </label>
        <input
          type="date"
          id="birthDay"
          class="form-control"
          v-model="formattedBirthDay"
        />
      </div>

      <!-- Hiển thị Giới tính -->
      <div class="mb-3 form-group">
        <label for="gender" class="form-label">Giới tính: </label>
        <select
          id="gender"
          class="form-control"
          v-model="data.gender"
        >
          <option value="Male">Nam</option>
          <option value="Female">Nữ</option>
        </select>
      </div>

      <!-- Nút Lưu -->
      <div class="mb-3 form-group">
        <button
          class="btn btn-outline-dark btn-md"
          :disabled="loading"
          @click="onSubmit"
        >
          Lưu
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
            v-if="loading"
          ></span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, computed } from "vue";
import staffService from "@/services/staff.service.js";
import Swal from "sweetalert2";

export default defineComponent({
  name: "ProfileForm",
  setup() {
    // Lấy dữ liệu từ localStorage
    const savedUserData = JSON.parse(localStorage.getItem("user"));

    const data = reactive({ ...savedUserData });
    const loading = ref(false);

    const formattedBirthDay = computed({
      get() {
        return data.birthDay ? new Date(data.birthDay).toISOString().split("T")[0] : "";
      },
      set(newDate) {
        data.birthDay = newDate;
      },
    });

    // Hàm xử lý lưu
    const onSubmit = async () => {

      loading.value = true;
      try {
        // Chỉ gửi các trường cần thiết
        const updatedData = {
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          address: data.address,
          birthDay: data.birthDay,
          gender: data.gender,
        };

        // Gọi API update
        const response = await staffService.update(data._id, updatedData);

        if (response.status !== "success") {
          await Swal.fire({
            icon: "error",
            title: "Thất bại",
            text: response.message || "Đã xảy ra lỗi, vui lòng thử lại sau!",
          });
          loading.value = false;
          return;
        }

        await Swal.fire({
          icon: "success",
          title: "Thành công",
          text: response.message || "Cập nhật thông tin thành công!",
        });

        localStorage.setItem("user", JSON.stringify({ ...data, ...response.data }));
        loading.value = false;
      } catch (error) {
        console.error("Cập nhật thất bại:", error);
        loading.value = false;
        await Swal.fire({
          icon: "error",
          title: "Có lỗi xảy ra",
          text: "Vui lòng thử lại sau!",
        });
      }
    };

    return {
      data,
      loading,
      formattedBirthDay,
      onSubmit,
    };
  },
});
</script>


<style scoped>

.profile {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
}

.form-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.form-control:disabled {
  background-color: #e9ecef;
  color: #6c757d;
  cursor: not-allowed;
}

.error-feedback {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.btn {
  padding: 0.5rem 1.5rem;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
}

.btn:hover {
  transform: scale(1.05);
}

.btn:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.spinner-border {
  margin-left: 10px;
}
</style>
