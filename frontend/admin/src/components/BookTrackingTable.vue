<!-- src/components/BookTrackingTable.vue -->
<template>
    <div class="table-responsive mt-5">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên Người Đọc</th>
            <th scope="col">Tên Nhân Viên</th>
            <th scope="col">ID Sách</th>
            <th scope="col">Tên Sách</th>
            <th scope="col">Ngày Mượn</th>
            <th scope="col">Hạn Trả</th>
            <th scope="col">Ngày Trả</th>
            <th scope="col">Trả sách</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(tracking, index) in filteredTrackings" :key="tracking._id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ tracking.readerId.firstName + " " + tracking.readerId.lastName }}</td>
            <td>{{ tracking.staffId.firstName + " " + tracking.staffId.lastName }}</td>
            <td>{{ tracking.bookPrintId.bookId.publicId }}</td> 
            <td>{{ tracking.bookPrintId.bookId.name }}</td> <!-- Tên sách -->
            <td>{{ formatDate(tracking.borrowDate) }}</td>
            <td>{{ formatDate(tracking.dueDate) }}</td>
            <td>
              <span v-if="tracking.returnedDate">{{ formatDate(tracking.returnedDate) }}</span>
              <span v-else class="text-warning">Chưa trả</span>
            </td>
            <td>
              <!-- Cột trả sách -->
              <btn
                class="btn btn-warning"
                @click="returnBook({
                  readerId: tracking.readerId._id, 
                  bookPrintId: tracking.bookPrintId._id,
                })"
                nameBtn="Trả"
              >
                Trả sách
              </btn>
            </td>
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
  import Btn from '@/components/common/ButtonA.vue';
  
  export default {
    components: { Btn },
    props: {
      filteredTrackings: Array,
      returnBook: Function,
      formatDate: Function,
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
  
  th:nth-child(1), td:nth-child(1) { width: 50px; }
  th:nth-child(2), td:nth-child(2) { width: 150px; }
  th:nth-child(3), td:nth-child(3) { width: 150px; }
  th:nth-child(4), td:nth-child(4) { width: 150px; }
  th:nth-child(5), td:nth-child(5) { width: 250px; }
  th:nth-child(6), td:nth-child(6) { width: 150px; }
  th:nth-child(7), td:nth-child(7) { width: 150px; }
  th:nth-child(8), td:nth-child(8) { width: 120px; }
  </style>
  