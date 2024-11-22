<template>
    <div class="home container pt-3">
      <h2>Chào Mừng Đến Với Trang Quản Lý Sách Dành Cho Nhân Viên</h2>
      <img
        src="@/assets/home.jpeg"
        alt="bookworld"
        style="width: 50%; display: block; margin: auto"
      />
      <div class="home container pt-5">
        <ul>
            <li><b>Quản lý sách:</b> Thêm, chỉnh sửa, và xóa thông tin sách như tên, tác giả, thể loại, và năm xuất bản.</li>
            <li><b>Quản lý tác giả:</b> Cập nhật thông tin tác giả, thêm mới hoặc xóa tác giả dễ dàng.</li>
            <li><b>Theo dõi mượn và trả sách:</b> Kiểm soát tình trạng mượn trả sách và số lượng sách tồn kho.</li>
            <li><b>Kiểm tra sách trễ hạn:</b> Hiển thị danh sách độc giả mượn sách quá hạn để dễ dàng xử lý.</li>
            <li><b>Tìm kiếm thông tin nhanh chóng:</b> Tra cứu sách, tác giả hoặc độc giả bằng từ khóa.</li>
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
    margin: 10px auto; /* Căn giữa danh sách */
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
}

</style>
  
  
  