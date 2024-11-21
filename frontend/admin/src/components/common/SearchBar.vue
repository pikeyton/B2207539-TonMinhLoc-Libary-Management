<template>
  <form class="form-inline form-search">
      <select class="form-control select-option" v-model="selectedOption">
          <option disabled value="">Tìm kiếm theo</option> 
          <option v-for="option in options" :key="option.value" :value="option.value">
              {{ option.label }}
          </option>
      </select>
      <input class="form-control input-search" type="search" :placeholder="searchBy" aria-label="Search" v-model="searchTerm">
      <button class="btn btn-outline-success" @click="handleSearch">Search</button>
  </form>
</template>

<script>
export default {
  props: {
      searchBy: {
          type: String,
          default: 'Tìm kiếm'
      },
      options: {
          type: Array,
          required: true,
          default: () => [] 
      }
  },
  emits: ['search'],
  data() {
      return {
          searchTerm: '',
          selectedOption: ''
      }
  },
  methods: {
      handleSearch(event) {
          event.preventDefault();
          this.$emit('search', { searchTerm: this.searchTerm, selectedOption: this.selectedOption });
      }
  }
}

</script>

<style scoped>
.form-search {
  width: 100%;
  display: grid;
  grid-template-columns: 250px 1fr 100px; 
  gap: 10px;
}

.input-search {
  flex: 1;
}

.select-option {
  width: 100%; 
  max-width: 100%; 
}
</style>

