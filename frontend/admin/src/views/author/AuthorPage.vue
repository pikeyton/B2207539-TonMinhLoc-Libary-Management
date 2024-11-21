<template>
  <div class="container mt-4">
    <!-- Tiêu đề -->
    <div class="container-top">
        <HeaderTitle :title="'Danh sách Tác giả'" />
        <btn class="btn-add-author" nameBtn="Thêm" @click="addAuthor"></btn>
    </div>
    <!-- Thanh tìm kiếm -->
    <SearchBar
      :searchBy="'Tìm kiếm theo'"
      :options="searchOptions"
      @search="handleSearch"
    />
    <!-- Bảng hiển thị tác giả -->
    <div class="table-responsive mt-5">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên Tác Giả</th>
            <th scope="col">Public ID</th>
            <th scope="col">Giới Tính</th>
            <th scope="col">Mô Tả</th>
            <th scope="col">Cập nhật</th>
            <th scope="col">Xóa</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(author, index) in filteredAuthors" :key="author._id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ author.name }}</td>
            <td>{{ author.publicId }}</td>
            <td>{{ author.gender }}</td>
            <td>{{ author.descripe }}</td>
            <td>
              <button
                class="btn btn-warning"
                @click="updateAuthor(author._id)"
              >
                Cập nhật
              </button>
            </td>
            <td>
              <button
                class="btn btn-danger"
                @click="deleteAuthor(author._id)"
              >
                Xóa
              </button>
            </td>
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
.container {
  max-width: 100%;
  margin: 0 auto;
}

.table {
  margin-top: 20px;
  font-size: 1rem;
}

thead th {
  text-align: center;
}

td,
th {
  vertical-align: middle;
  text-align: center;
}

.text-center {
  text-align: center;
}

/* Cập nhật độ rộng các cột */
th:nth-child(1), td:nth-child(1) {
  width: 50px; /* Cột số thứ tự */
}

th:nth-child(2), td:nth-child(2) {
  width: 400px; /* Cột tên tác giả */
}

th:nth-child(3), td:nth-child(3) {
  width: 150px; /* Cột Public ID */
}

th:nth-child(4), td:nth-child(4) {
  width: 100px; /* Cột giới tính */
}

th:nth-child(5), td:nth-child(5) {
  width: 600px; /* Cột mô tả */
}

th:nth-child(6), td:nth-child(6) {
  width: 200px; /* Cột cập nhật */
}

th:nth-child(7), td:nth-child(7) {
  width: 120px; /* Cột xóa */
}
.container-top {
    text-align: center;
    padding: 20px;
}
</style>
