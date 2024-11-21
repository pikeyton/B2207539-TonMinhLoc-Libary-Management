<template>
   <div class="body">
    <div class="container">
        <login :isRegister="false" :titleForm="titleForm" @submit="handleSubmit"></login>
    </div>
   </div>
</template>

<script>
import Login from "@/components/auth/AuthForm.vue";
import authService from "@/services/auth.service";
import { mapStores } from 'pinia'
import useAuthStore from "@/stores/auth.store"
import readerService from "@/services/reader.service"

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
                const reader = await readerService.getReaderById(res.data._id)
                if (reader.status == "error") {
                    alert("Bạn không phải là tài khoản Độc Giả")
                    return
                }
                this.authStore.setUser(reader.data)
                this.authStore.setRole("reader")
                localStorage.setItem("role", "reader")
                localStorage.setItem("user", JSON.stringify(res.data))
                alert(res.message)
                this.$emit('login')
                this.$router.push({ name: "reader"})
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