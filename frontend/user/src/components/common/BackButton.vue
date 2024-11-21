<template>
    <button class="back-button" @click="goBack">
      <i class="back-icon"></i>
      Quay Lại
    </button>
  </template>
  
  <script>
  export default {
    name: "BackButton",
    methods: {
      goBack() {
        if (this.$router) {
          this.$router.go(-1);
        } else {
          window.history.back();
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .back-button {
    position: relative; /* Đặt nút không cố định */
    margin: 20px 0; /* Đẩy nút xuống một chút */
    padding: 10px 20px;
    background-color: #007bff; /* Màu xanh dễ nhìn */
    color: white;
    border: none;
    border-radius: 5px; /* Bo tròn nút */
    text-align: center;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease; /* Hiệu ứng hover mượt */
  }
  
  .back-button:hover {
    background-color: #0056b3; /* Màu nền khi hover */
  }
  
  .back-icon {
    border: solid #fff; /* Màu biểu tượng */
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 5px;
    transform: rotate(135deg);
    margin-top: 2px; /* Căn chỉnh biểu tượng với chữ */
    transition: transform 0.3s ease;
  }
  
  .back-button:hover .back-icon {
    transform: rotate(135deg) translateX(-2px); /* Hiệu ứng khi hover */
  }
  </style>
  