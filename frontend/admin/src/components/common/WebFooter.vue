<template>
  <div>
    <footer
      class="d-flex flex-wrap justify-content-between align-items-center py-3 mt-4 border-top rounded-3"
    >
      <p class="col-md-4 mb-0">{{ currentYear }} Book Borrowing Management</p>
      <p class="col-md-4 text-end mb-0">Contact: pikeyton@gmail.com</p>
      <p class="col-md-4 text-center mb-0">Developed by PikeyTon</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'WebFooter',
  data() {
    return {
      currentYear: new Date().getFullYear()
    };
  }
};
</script>

<style scoped>
footer {
  background-color: #f8dcc0;
  text-align: center;
  font-size: 14px;
  color: #333;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  opacity: 0.8;
}
</style>