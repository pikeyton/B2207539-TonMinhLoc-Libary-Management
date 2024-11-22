<template>
  <div class="container mt-4">
    <!-- Tiêu đề -->
    <div class="header-section">
      <HeaderTitle :title="'Danh Sách Tác Giả'" />
    </div>

    <!-- Thanh tìm kiếm -->
    <div class="search-section">
      <SearchBar
        :searchBy="'Tìm kiếm theo'"
        :options="searchOptions"
        @search="handleSearch"
      />
    </div>

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
          </tr>
        </thead>
        <tbody>
          <tr v-for="(author, index) in filteredAuthors" :key="author._id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ author.name }}</td>
            <td>{{ author.publicId }}</td>
            <td>{{ author.gender === 'Male' ? 'Nam' : (author.gender === 'Female' ? 'Nữ' : 'Khác') }}</td>
            <td class="text-wrap">{{ author.descripe }}</td>
          </tr>
          <tr v-if="filteredAuthors.length === 0">
            <td colspan="5" class="text-center">Không tìm thấy tác giả nào</td>
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

export default {
  components: {
    HeaderTitle,
    SearchBar,
  },
  data() {
    return {
      authors: [], // Danh sách tác giả từ API
      searchTerm: "",
      selectedOption: "",
      searchOptions: [
        { label: "Tên Tác Giả", value: "name" },
        { label: "Id Tác Giả", value: "id" },
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
  text-align: center;
  padding: 20px;
  border-bottom: 2px solid #ddd;
}

.header-section h1 {
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
}

/* Thanh tìm kiếm */
.search-section {
  margin: 20px 0;
}

/* Bảng */
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

/* Thông báo không có dữ liệu */
.text-center {
  font-size: 16px;
  font-weight: bold;
  color: #6c757d;
}
</style>
