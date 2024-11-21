<template>
    <div class="reader-detail-card">
      <h3>Thông Tin Độc Giả</h3>
      <div class="reader-info">
        <p><strong>ID:</strong> {{ reader.publicId }}</p>
        <p><strong>Họ và tên:</strong> {{ reader.firstName }} {{ reader.lastName }}</p>
        <p><strong>Email:</strong> {{ reader.email }}</p>
        <p><strong>Số điện thoại:</strong> {{ reader.phoneNumber }}</p>
        <p><strong>Địa chỉ:</strong> {{ reader.address }}</p>
        <p><strong>Ngày sinh:</strong> {{ formatDate(reader.birthDay) }}</p>
        <p><strong>Giới tính:</strong> {{ reader.gender }}</p>
        <p>
          <strong>Số sách tối đa có thể mượn:</strong> {{ reader.maximumNumberOfBooksBorrowed }}
        </p>
        <p>
          <strong>Số sách đang mượn:</strong> {{ reader.currentNumberOfBooksBorrowed }}
        </p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      reader: {
        type: Object,
        required: true,
      },
    },
    methods: {
      formatDate(date) {
        if (!date) return "Không xác định";
        return new Date(date).toLocaleDateString("vi-VN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .reader-detail-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    background-color: #f9f9f9;
    max-width: 600px;
    margin: 0 auto;
  }
  
  h3 {
    margin-bottom: 15px;
    font-size: 20px;
    text-align: center;
  }
  
  .reader-info p {
    margin: 5px 0;
    font-size: 16px;
    line-height: 1.5;
  }
  </style>
  