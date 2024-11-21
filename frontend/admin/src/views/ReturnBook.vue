<!-- src/views/ReturnBook.vue -->
<template>
    <div class="container mt-4">
      <!-- Tiêu đề -->
      <div class="container-top">
        <HeaderTitle :title="'Danh Sách Đang Mượn Sách'" />
      </div>
      <!-- Thanh tìm kiếm -->
      <SearchBar
        :searchBy="'Tìm kiếm theo'"
        :options="searchOptions"
        @search="handleSearch"
      />
      
      <!-- Bảng hiển thị -->
      <BookTrackingTable 
        :filteredTrackings="filteredTrackings" 
        :returnBook="returnBook"
        :formatDate="formatDate"
      />
    </div>
  </template>
  
  <script>
  import HeaderTitle from "@/components/common/GreeTing.vue";
  import SearchBar from "@/components/common/SearchBar.vue";
  import BookTrackingTable from "@/components/BookTrackingTable.vue";
  import bookBorrowTracking from "@/services/bookBorrowTracking.service";
  
  export default {
    components: { HeaderTitle, SearchBar, BookTrackingTable },
    data() {
      return {
        trackings: [],
        searchTerm: "",
        selectedOption: "",
        searchOptions: [
          { label: "ID Độc Giả", value: "readerId" },
          { label: "Tên Độc Giả", value: "readerName" },
        ],
      };
    },
    computed: {
      filteredTrackings() {
        if (!this.searchTerm) return this.trackings;
  
        if (this.selectedOption === "readerId") {
          return this.trackings.filter((tracking) =>
            tracking.readerId._id.toString().includes(this.searchTerm)
          );
        } else if (this.selectedOption === "readerName") {
          return this.trackings.filter((tracking) =>
            tracking.readerId.name.toLowerCase().includes(this.searchTerm.toLowerCase())
          );
        }
  
        return this.trackings;
      },
    },
    methods: {
      async fetchTrackings() {
        try {
          const response = await bookBorrowTracking.findAll();
          this.trackings = response.data || [];
        } catch (error) {
          console.error("Lỗi khi tải danh sách theo dõi mượn sách:", error);
        }
      },
      async returnBook(tracking) {
        if (window.confirm("Bạn có chắc chắn độc giả đã trả sách?")) {
          await this.return(tracking);
          this.fetchTrackings();
        }
      },
      async return(tracking) {
        try {
          await bookBorrowTracking.returnBook(tracking);
        } catch (error) {
          console.log(error.message || "Lỗi trả sách");
        }
      },
      handleSearch({ searchTerm, selectedOption }) {
        this.searchTerm = searchTerm;
        this.selectedOption = selectedOption;
      },
      formatDate(date) {
        return new Date(date).toLocaleDateString("vi-VN");
      },
    },
    mounted() {
      this.fetchTrackings();
    },
  };
  </script>
  
  <style scoped>
  .container-top {
    text-align: center;
    padding: 20px;
  }
  </style>
  