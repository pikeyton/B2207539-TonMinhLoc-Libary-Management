<template>
  <tr>
    <td>
      <img :src="book.image" alt="Hình Ảnh" class="book-image" />
    </td>
    <td>
      <p><strong>ID Sách:</strong> {{ book.publicId }}</p>
      <p><strong>Tên Sách:</strong> {{ book.name }}</p>
      <p><strong>Tác Giả:</strong> {{ book.authorIds.map(author => author.name).join(', ') }}</p>
      <p><strong>Lĩnh Vực:</strong> {{ book.bookFieldId.name }}</p>
      <p><strong>Số Lượt Mượn:</strong> {{ book.numberOfLoans }}</p>
      <p><strong>Nhà Xuất Bản:</strong> {{ book.publisherId.name }}</p>
      <div v-if="!isDetailView" class="action-buttons">
        <btn class="btn-detail" nameBtn="Xem Bình Luận" @click="handleShowDetail" />
        <btn class="btn-borrow" nameBtn="Cho Mượn" @click="handleBorrow" />
        <btn class="btn-BookPrintRead" nameBtn="Thêm Bản In Chỉ Đọc" @click="handleBookPrintRead" />
        <btn class="btn-BookPrintBorrow" nameBtn="Thêm Bản In Có Thể Mượn" @click="handleBookPrintBorrow" />
        <btn class="btn-edit btn-warning" nameBtn="Chỉnh Sửa" @click="handleEdit" />
        <btn class="btn-delete btn-danger" nameBtn="Xóa" @click="handleDelete" />
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
      default: false,
    },
  },
  emits: ["showDetail", "borrow", "edit", "delete", "BookPrintRead", "BookPrintBorrow"],
  methods: {
    handleShowDetail() {
      this.$emit("showDetail", this.book);
    },
    handleBorrow() {
      this.$emit("borrow", this.book);
    },
    handleEdit() {
      this.$emit("edit", this.book);
    },
    handleDelete() {
      this.$emit("delete", this.book);
    },
    handleBookPrintRead() {
      this.$emit("BookPrintRead", this.book);
    },
    handleBookPrintBorrow() {
      this.$emit("BookPrintBorrow", this.book);
    },
  },
};
</script>

<style scoped>
.book-image {
  object-fit: cover;
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

td {
  vertical-align: middle;
  padding: 15px;
}

td p {
  margin: 8px 0;
  font-size: 16px;
  line-height: 1.5;
}

.action-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-start;
}
</style>
