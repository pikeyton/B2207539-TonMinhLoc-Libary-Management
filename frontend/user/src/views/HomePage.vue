<template>
  <div class="home container pt-3">
    <h2>Chào Mừng Đến Với Trang Sách Thư Viện Sách Dành Cho Độc Giả</h2>
    <img
      src="@/assets/home.jpeg"
      alt="library"
      style="width: 50%; display: block; margin: auto"
    />
    <div class="home container pt-5">
      <ul>
          <li><b>Khám phá thế giới sách:</b> Tìm kiếm và đọc thông tin về các cuốn sách yêu thích, từ tiểu thuyết, văn học đến sách khoa học.</li>
          <li><b>Thông tin tác giả:</b> Tìm hiểu về các tác giả nổi tiếng và những câu chuyện đằng sau tác phẩm của họ.</li>
          <li><b>Hệ thống mượn sách dễ dàng:</b> Đăng ký mượn sách trực tuyến và theo dõi lịch sử mượn sách của bạn.</li>
          <li><b>Cập nhật sách mới:</b> Đừng bỏ lỡ các tựa sách mới nhất được thêm vào thư viện.</li>
          <li><b>Quản lý tài khoản độc giả:</b> Xem và chỉnh sửa thông tin cá nhân, kiểm tra lịch sử mượn trả sách.</li>
      </ul>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  text-align: center;
  margin: 0;
  padding: 0;
  background-color: #f9f9f9;
}

h2 {
  font-size: 2rem;
  margin-top: 00px;
  color: #333;
}

img {
  max-width: 60%;
  height: auto;
  margin: 10px; /* Thêm khoảng cách trên/dưới hình */
  border-radius: 8px; /* Bo góc hình ảnh để tạo cảm giác mềm mại */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Hiệu ứng đổ bóng */
}

ul {
  text-align: left;
  display: inline-block;
  margin: 10px; /* Căn giữa danh sách */
  padding: 0 20px;
  font-size: 1.2rem; /* Tăng kích thước chữ một chút */
  color: #333;
  line-height: 1.8; /* Giãn dòng để dễ đọc hơn */
}

p {
  margin: 20px auto;
  max-width: 800px;
  font-size: 1.1rem;
  color: #555;
  line-height: 1.8; /* Tăng giãn dòng */
}

.container {
  max-width: 1200px;
  margin: 0 auto; /* Đảm bảo căn giữa nội dung chính */
  padding: 00px;
}

</style>
