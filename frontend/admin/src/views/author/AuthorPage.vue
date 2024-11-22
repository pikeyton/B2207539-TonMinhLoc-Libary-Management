<template>
  <div class="container mt-4">
    <!-- Tiêu đề -->
    <div class="header-section">
      <HeaderTitle :title="'Danh Sách Tác Giả'" />
      <btn class="btn-add-author" nameBtn="Thêm" @click="addAuthor"></btn>
    </div>

    <!-- Thanh tìm kiếm -->
    <SearchBar
      :searchBy="'Tìm kiếm theo'"
      :options="searchOptions"
      @search="handleSearch"
    />

    <!-- Bảng hiển thị tác giả -->
    <div class="table-container mt-5">
      <table class="table table-hover table-striped">
        <thead class="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên Tác Giả</th>
            <th scope="col">Public ID</th>
            <th scope="col">Giới Tính</th>
            <th scope="col">Mô Tả</th>
            <th scope="col">Cập Nhật</th>
            <th scope="col">Xóa</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(author, index) in filteredAuthors" :key="author._id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ author.name }}</td>
            <td>{{ author.publicId }}</td>
            <td>{{ author.gender === 'Male' ? 'Nam' : (author.gender === 'Female' ? 'Nữ' : 'Khác') }}</td>
            <td class="text-wrap">{{ author.descripe }}</td>
            <td>
              <button
                class="btn btn-warning btn-sm"
                @click="updateAuthor(author._id)"
              >
                Cập Nhật
              </button>
            </td>
            <td>
              <button
                class="btn btn-danger btn-sm"
                @click="deleteAuthor(author._id)"
              >
                Xóa
              </button>
            </td>
          </tr>
          <tr v-if="filteredAuthors.length === 0">
            <td colspan="7" class="text-center">Không tìm thấy tác giả nào</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
import HeaderTitle from "@/components/common/GreeTing.vue";
import SearchBar from "@/components/common/SearchBar.vue";
import authorService from "@/services/author.service";
import Btn from '@/components/common/ButtonA.vue';

export default {
  components: {
    HeaderTitle,
    SearchBar,
    Btn
  },
  data() {
    return {
      authors: [], // Danh sách tác giả từ API
      searchTerm: "",
      selectedOption: "",
      searchOptions: [
        { label: "Tên Tác Giả", value: "name" },
        { label: "Id Tác Giả", value: "id" }
      ],
    };
  },
  computed: {
    filteredAuthors() {
      if (!this.searchTerm) {
        return this.authors;
      }

      // Lọc danh sách dựa trên từ khóa tìm kiếm
      if (this.selectedOption === "name")
        return this.authors.filter((author) =>
            author.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      else 
        return this.authors.filter((author) =>
            author.publicId.toString().includes(this.searchTerm)
        );
    },
  },
  methods: {
    async fetchAuthors() {
      try {
        const response = await authorService.findAll();
        this.authors = response.data || [];
      } catch (error) {
        console.error("Lỗi khi tải danh sách tác giả:", error);
      }
    },
    handleSearch({ searchTerm, selectedOption }) {
      this.searchTerm = searchTerm;
      this.selectedOption = selectedOption;
    },
    async addAuthor() {
      this.$router.push({ name: "author-create" });
    },
    async updateAuthor(author) {
      this.$router.push({
          name: 'author-update',
          params: {
            id: author
          }
      });
    },
    async deleteAuthor(author) {
        if (window.confirm("Bạn có chắc chắn muốn xóa sách này?")) {
            await this.delete(author);
            this.fetchAuthors();
        }
    },
    async delete(id) {
        const res = await authorService.delete(id);
        if (res.status === "error") {
            alert(res.message);
        }
        else{
          alert(res.message);
        }
    }
  },
  mounted() {
    this.fetchAuthors();
  },
};
</script>

<style scoped>
/* Tổng quan */
.container {
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Arial', sans-serif;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 2px solid #ddd;
}

.header-section h1 {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.btn-add-author {
  padding: 10px 15px;
  font-size: 14px;
  font-weight: bold;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-add-author:hover {
  background-color: #0056b3;
}

/* Bảng hiển thị */
.table-container {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  background-color: #fff;
}

.table {
  margin: 0;
  width: 100%;
  border-collapse: collapse;
}

.table thead {
  background-color: #343a40;
  color: #fff;
}

.table th, .table td {
  text-align: center;
  vertical-align: middle;
  padding: 10px;
  font-size: 14px;
}

.table tbody tr {
  transition: background-color 0.3s ease;
}

.table tbody tr:hover {
  background-color: #f8f9fa;
}

/* Cột mô tả */
td.text-wrap {
  word-wrap: break-word;
  max-width: 300px;
}

/* Nút */
button {
  cursor: pointer;
}

button.btn-sm {
  padding: 5px 10px;
  font-size: 12px;
}

button.btn-warning {
  background-color: #ffc107;
  color: #fff;
  border: none;
}

button.btn-warning:hover {
  background-color: #e0a800;
}

button.btn-danger {
  background-color: #dc3545;
  color: #fff;
  border: none;
}

button.btn-danger:hover {
  background-color: #bd2130;
}

/* Hiển thị trung tâm khi không có dữ liệu */
.text-center {
  font-size: 16px;
  font-weight: bold;
  color: #6c757d;
}
</style>
