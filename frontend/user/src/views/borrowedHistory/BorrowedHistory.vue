<template>
  <div class="container mt-4">
      <!-- Tiêu đề -->
      <div class="container-top">
          <HeaderTitle :title="'Lịch Sử Mượn Sách'" />
      </div>

      <!-- Lịch sử mượn sách -->
      <div class="history-section">
          <div class="filter-buttons">
              <button
                  class="filter-button"
                  :class="{ active: selectedStatus === 'all' }"
                  @click="fetchTrackings('all')"
              >
                  Tất cả
              </button>
              <button
                  class="filter-button"
                  :class="{ active: selectedStatus === 'borrowed' }"
                  @click="fetchTrackings('borrowed')"
              >
                  Đang Mượn
              </button>
              <button
                  class="filter-button"
                  :class="{ active: selectedStatus === 'returned' }"
                  @click="fetchTrackings('returned')"
              >
                  Đã Trả
              </button>
              <button
                  class="filter-button"
                  :class="{ active: selectedStatus === 'registered' }"
                  @click="fetchTrackings('registered')"
              >
                  Đã Đăng Ký
              </button>
          </div>
          <BookTrackingTable
            :filteredTrackings="trackings"
            :formatDate="formatDate"
            :enRetard=this.enRetard
            :handleEnRetard="handleEnRetard"
            :register=this.register
          />

      </div>
  </div>
</template>

<script>
import HeaderTitle from "@/components/common/GreeTing.vue";
import BookTrackingTable from "@/components/borrowHistory/BookTrackingTable.vue";
import bookBorrowTrackingService from "@/services/bookBorrowTracking.service";
import bookBorrowRgistration from "@/services/bookBorrowRgistration.service";

export default {
  components: { HeaderTitle, BookTrackingTable },
  data() {
      return {
          trackings: [], // Danh sách sách theo trạng thái
          selectedStatus: "all", // Trạng thái mặc định là tất cả
          enRetard: false,
          register: false,
      };
  },
  methods: {
      async fetchTrackings(status) {
          const userData = JSON.parse(localStorage.getItem ("user"));
          const readerId = userData._id
          this.selectedStatus = status;
          try {
            let response;
            const data = (await bookBorrowTrackingService.findByReader(readerId)).data;
            if (status === "all") {
                this.enRetard = false;
                this.register = false;
                response = data; // Tất cả lịch sử mượn sách
            } else if (status === "borrowed") {
                this.enRetard = true;
                this.register = false;
                response = data.filter((tracking) => tracking.returnedDate == null);
            } else if (status === "returned") {
                this.enRetard = false;
                this.register = false;
                response = data.filter((tracking) => tracking.returnedDate != null); // Đã trả
            } else if (status === "registered") {
                this.enRetard = false;
                this.register = true;
                response = (await bookBorrowRgistration.findByReader(readerId)).data;
                // Đăng ký
            }
              this.trackings = response || [];
          } catch (error) {
              console.error("Lỗi khi tải danh sách mượn sách:", error);
              alert("Không thể tải danh sách sách.");
          }
      },
      formatDate(date) {
          return new Date(date).toLocaleDateString("vi-VN");
      },
      async handleEnRetard(id) {
        try {
            const response = await bookBorrowTrackingService.renewBook(id);
            if (response.status === "success") {
                alert( response.message || "Cập nhật thành công.");
                this.fetchTrackings(this.selectedStatus);
            }
        }
        catch (error) {
            console.error("Lỗi khi gia hạn:", error);
            alert("Không thể gia hạn.");
        }

      },
  },
  mounted() {
      this.fetchTrackings("all");
  },
};
</script>

<style scoped>
.container-top {
  text-align: center;
  padding: 20px;
}

.history-section {
  margin-top: 20px;
}

.filter-buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.filter-button {
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.filter-button:hover {
  background-color: #0056b3;
}

.filter-button.active {
  background-color: #0056b3;
  font-weight: bold;
}
</style>
