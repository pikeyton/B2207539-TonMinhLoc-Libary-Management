<template>
  <div class="table-responsive mt-5">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">ID Sách</th>
          <th scope="col">Tên Sách</th>
          <th scope="col" v-if="!register">Ngày Mượn</th>
          <th scope="col" v-else>Ngày Đăng Kí</th>
          <th scope="col" v-if="!register">Hạn Trả</th>
          <th scope="col" v-else>Hết hạn giữ chỗ</th>
          <th scope="col" v-if="!register">Ngày Trả</th>
          <th scope="col" v-if="enRetard">Gia Hạn</th>

        </tr>
      </thead>
      <tbody>
        <tr v-for="(tracking, index) in filteredTrackings" :key="tracking._id">
          <th scope="row">{{ index + 1 }}</th>
          <td >{{ tracking.bookPrintId.bookId.publicId }}</td> <!-- ID sách -->
          <td>{{ tracking.bookPrintId.bookId.name }}</td> <!-- Tên sách -->
          <td v-if="!register">{{ formatDate(tracking.borrowDate) }}</td>
          <td v-else>{{ formatDate(tracking.borrowRegistryDate) }}</td> <!-- Ngày đăng kí -->
          <td v-if="!register">{{ formatDate(tracking.dueDate) }}</td>
          <td v-else>{{ formatDate(tracking.expireAt) }}</td> <!-- Hạn trả -->
          <td v-if="!register">
            <span v-if="tracking.returnedDate">{{ formatDate(tracking.returnedDate) }}</span>
            <span v-else class="text-warning">Chưa trả</span>
          </td>
          <td v-if="enRetard">
            <btn class="btn-enRetard btn-danger" nameBtn="Gia hạn" @click="handleEnRetard(tracking._id)"></btn>
          </td> <!-- Gia hạn -->
        </tr>

        <!-- Nếu không có dữ liệu -->
        <tr v-if="filteredTrackings.length === 0">
          <td colspan="8" class="text-center">Không có dữ liệu</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Btn from "@/components/common/ButtonA.vue";
export default {
  components: {
    Btn,
  },
  props: {
    filteredTrackings: Array, // Dữ liệu danh sách
    formatDate: Function, // Hàm định dạng ngày tháng
    handleEnRetard: Function, 
    enRetard: { 
      type: Boolean,
      default: false,
    },
    register: { 
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.table {
  margin-top: 20px;
  font-size: 1rem;
}

thead th {
  text-align: center;
}

td, th {
  vertical-align: middle;
  text-align: center;
}

.text-center {
  text-align: center;
}

th:nth-child(1), td:nth-child(1) { width: 50px; } /* # */
th:nth-child(2), td:nth-child(2) { width: 200px; } /* ID Sách */
th:nth-child(5), td:nth-child(5) { width: 150px; } /* Tên Sách */
th:nth-child(6), td:nth-child(6) { width: 150px; } /* Ngày Mượn */
th:nth-child(7), td:nth-child(7) { width: 150px; } /* Hạn Trả */
th:nth-child(8), td:nth-child(8) { width: 120px; } /* Ngày Trả */
</style>
