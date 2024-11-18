<template>
  <div id="app">
    <AppHeader />

    <div class="container mt-3">
      <router-view />
    </div>

    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "@/components/layout/AppHeader.vue";
import AppFooter from "@/components/layout/AppFooter.vue";


export default {
  components: {
    AppHeader,
    AppFooter
  }
}

</script>
