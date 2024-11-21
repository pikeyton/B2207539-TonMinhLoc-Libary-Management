<template>
  <tr>
    <td>
      <img :src="book.image" alt="Hình Ảnh" class="book-image" width="500" height="300" />
    </td>
    <td>
      <p><strong>ID Sách:</strong> {{ book.publicId }}</p>
      <p><strong>Tên Sách:</strong> {{ book.name }}</p>
      <p><strong>Tác Giả:</strong> {{ book.authorIds.map(author => author.name).join(', ') }}</p>
      <p><strong>Lĩnh Vực:</strong> {{ book.bookFieldId.name }}</p>
      <p><strong>Số Lượt Mượn:</strong> {{ book.numberOfLoans }}</p>
      <p><strong>Nhà Xuất Bản:</strong> {{ book.publisherId.name }}</p>
      <div class="action-buttons" v-if="!isDetailView">
        <btn class="btn-detail" nameBtn="Xem Bình Luận" @click="handleShowDetail(book)"></btn>
        <btn class="btn-borrow" nameBtn="Đăng Ký Mượn" @click="handleBorrow(book)"></btn>
      </div>
    </td>
  </tr>
</template>

<script>
import Btn from "@/components/common/ButtonA.vue";
export default {
components: {
    Btn,
},
props: {
  book: {
    type: Object,
    required: true,
  },
  isDetailView: {
    type: Boolean,
    default: false, // Mặc định không phải trang chi tiết
  },
},
emits: ["showDetail", "borrow"],
methods: {
  handleShowDetail(book) {
    this.$emit("showDetail", book);
  },
  handleBorrow(book) {
    this.$emit("borrow", book);
  },
},
};
</script>

<style scoped>
/* Chỉnh hình ảnh */
.book-image {
object-fit: cover;
width: 100%;
max-width: 300px; /* Đảm bảo hình không quá lớn */
height: auto;
display: block;
margin: 0 auto; /* Căn giữa hình ảnh */
}

/* Bố cục tổng thể */
td {
vertical-align: middle; /* Canh giữa nội dung trong ô */
padding: 15px; /* Khoảng cách bên trong các ô */
}

/* Canh văn bản */
td p {
margin: 8px 0; /* Khoảng cách giữa các dòng */
font-size: 16px;
line-height: 1.5;
}

/* Chỉnh các nút hành động */
.action-buttons {
display: flex;
gap: 10px; /* Khoảng cách giữa các nút */
margin-top: 10px;
justify-content: center; /* Căn giữa các nút */
}
</style>
