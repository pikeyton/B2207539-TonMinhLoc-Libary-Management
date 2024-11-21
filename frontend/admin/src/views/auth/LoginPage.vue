<template>
   <div class="body">
    <div class="container">
        <login :isRegister="false" :titleForm="titleForm" @submit="handleSubmit"></login>
    </div>
   </div>
</template>

<script>
import Login from "@/components/auth/AuthView.vue";
import authService from "@/services/auth.service";
import { mapStores } from 'pinia'
import useAuthStore from "@/stores/auth.store"
import staffService from "@/services/staff.service"

export default {
    computed: {
        ...mapStores(useAuthStore)
    },
    data() {
        return {
            titleForm: 'Đăng nhập'
        };
    },
    components: {
        Login,
    },
    methods: {
        async handleSubmit(data) {
            const res = await authService.login(data);
            if (res.status == "success") {
                const staff = await staffService.getStaffById(res.data._id)
                if (staff.status == "error") {
                    alert(staff.message)
                    return
                }
                this.authStore.setUser(staff.data)
                this.authStore.setRole(res.data.role)
                localStorage.setItem("role", res.data.role)
                localStorage.setItem("user", JSON.stringify(res.data))
                alert(res.message)
                this.$emit('login')
                this.$router.push({ name: "staff"})
            } else {
                alert(res.message)
            }
        }
    }
};
</script>

<style scoped>
.container {
    max-width: 400px;
    margin: 0 auto;
    background-color: white; /* Đảm bảo form có nền trắng */
    border-radius: 8px;
    padding: 20px;
}
</style>