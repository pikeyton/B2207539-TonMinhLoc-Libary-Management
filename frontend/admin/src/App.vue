<template>
    <div id="app">
      <web-nav :role="role" @login="handleLogin" @register="handleRegister" @logout="handleLogout" @profile="handleProfile"></web-nav>
      <div class="container">
        <router-view @login="handleLogin"></router-view>
      </div>
      <web-footer></web-footer>
    </div>
</template>
  
  

<script>
import WebFooter from "@/components/common/WebFooter.vue"
import WebNav from "@/components/common/WebNav.vue"
import useAuthStore from "@/stores/auth.store.js";
import { mapStores } from "pinia";

export default {
  computed: {
      ...mapStores(useAuthStore),
  },
  components: {
      WebFooter,
      WebNav
  },
  data() {
      return {
          adminRole: "staff",
          guestRole: "guest",
          role: "guest"
      }
  },
  methods: {
      handleLogin() {
          const role = localStorage.getItem("role")
          if (role == this.adminRole) {
              this.authStore.setRole(this.adminRole)
              const admin = localStorage.getItem("user")
              this.role = this.adminRole
              this.authStore.setUser(admin)
              this.$router.push({ name: "staff" })
              return
          }
          this.role = this.guestRole
          this.$router.push({ name: "login" })
      },
      handleRegister() {
          const role = localStorage.getItem("role")
          if (role == this.adminRole) {
              this.authStore.setRole(this.adminRole)
              const admin = localStorage.getItem("user")
              this.role = this.adminRole
              this.authStore.setUser(admin)
              this.$router.push({ name: "staff" })
              return
          }
          this.role = this.guestRole
          this.$router.push({ name: "register" })
      },
      handleLogout() {
          localStorage.removeItem("role")
          localStorage.removeItem("user")
          this.authStore.setRole(this.guestRole)
          this.role = this.guestRole
          if (this.$route?.meta?.requiresAuth) {
              this.$router.push({ name: "login" })
          }
      },
      handleProfile() {
          this.$router.push({ name: "staff" })
      }
  }
}
</script>

<style>
body {
  height: 100%;
  margin: 0;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  margin: 0 auto;
  flex: 1; 
  background-color: #fff; /* Tùy chỉnh màu nền */
}


</style>