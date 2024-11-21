<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-skin">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand">Libary System</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav me-auto">
            <nav-item :title="'Trang chủ'" :routerName="'home'" class="me-5 nav-item" />
            <nav-item :title="'Sách'" :routerName="'book'" class="me-5 nav-item" />
            <nav-item :title="'Tác giả'" :routerName="'author'" class="me-5 nav-item" />
            <nav-item :title="'Trả sách'" :routerName="'return'" class="me-5 nav-item" />
            <nav-item :title="'Trễ hạn'" :routerName="'enRetard'" class="me-5 nav-item" />
          </ul>
          <ul class="navbar-nav ms-auto">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Tài khoản
              </a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li>
                  <a v-if="role === guestRole" class="dropdown-item login-btn" @click="login">Đăng nhập</a>
                </li>
                <li>
                  <a v-if="role === guestRole" class="dropdown-item register-btn" @click="register">Đăng ký</a>
                </li>
                <li>
                  <a v-if="role === adminRole" class="dropdown-item profile-btn" @click="profile">Trang Cá Nhân</a>
                </li>
                <li>
                  <a v-if="role === adminRole" class="dropdown-item logout-btn" @click="logout">Đăng xuất</a>
                </li>
                
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
</template>
  

<script>
import NavItem from "@/components/common/NavItem.vue";

export default {
  components: {
    NavItem,
  },
  props: {
    role: {
      type: String,
      default: "guest",
    },
  },
  emits: ["login", "register", "logout", "profile"],
  data() {
    return {
      guestRole: "guest",
      adminRole: "staff",
    };
  },
  methods: {
    login() {
      this.$emit("login");
    },
    register() {
      this.$emit("register");
    },
    logout() {
      this.$emit("logout");
    },
    profile() {
      this.$emit("profile");
    },
  },
};
</script>


<style scoped>
.bg-skin {
  background-color: #f8dcc0; /* Màu da người */
}
.navbar-brand {
  color:darkturquoise;
  font-size: 2rem;
  font-weight: bold;
  border-right: 20px;
}
.nav-item {
  font-size: 1.5rem;
  border-right: 20px;
  color: #000;
}
.nav-link {
  color: #000;
  transition: color 0.3s ease-in-out;
}
.nav-link:hover {
  color: #555;
}
.dropdown-menu {
  background-color: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}
.dropdown-item:hover {
  background-color: #f5f5f5;
}
</style>

