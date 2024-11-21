<template>
    <div class="prints-section">
      <h3>Danh sách bản in</h3>
      <table class="prints-table">
        <thead>
          <tr>
            <th>Chọn</th>
            <th>ID Bản In</th>
            <th>Loại</th>
            <th>Đang Mượn</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="print in prints" :key="print._id">
            <td><input type="radio"
              name="selectedPrint" v-model="selectedPrint" :value="print._id" /></td>
            <td>{{ print.publicId }}</td>
            <td>{{ print.documentType }}</td>
            <td>{{ print.readerReturnDate }}</td>
          </tr>
        </tbody>
      </table>
      <button class="btn-borrow" @click="onBorrowBooks">Đăng ký mượn</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      prints: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        selectedPrint: [],
      };
    },
    emits: ["borrow-books"],
    methods: {
      onBorrowBooks() {
        if (this.selectedPrint.length === 0) {
          alert("Vui lòng chọn ít nhất một bản in.");
          return;
        }
        this.$emit("borrow-books", this.selectedPrint);
      },
    },
  };
  </script>
  
  <style scoped>
  .prints-section {
    margin-top: 20px;
  }
  
  .prints-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 10px;
  }
  
  .prints-table th,
  .prints-table td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
  }
  
  .btn-borrow {
    background-color: #007bff;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-borrow:hover {
    background-color: #0056b3;
  }
  </style>
  