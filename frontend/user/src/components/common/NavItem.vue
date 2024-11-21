<template>
  <router-link :to="{ name: routerName }">{{ title }}</router-link>
</template>

<script>
export default {
  props: {
      title: {
          type: String,
          required: true
      },
      routerName: {
          type: String,
          required: true
      }
  },
}
</script>

<style scoped></style>