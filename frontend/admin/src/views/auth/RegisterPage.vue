<template>
    <div class="container">
        <register :isRegister="true" :titleForm="titleForm" @submit="handleSubmit"></register>
    </div>
</template>

<script>
import Register from "@/components/auth/AuthView.vue";
import authService from "@/services/auth.service";

export default {
    data() {
        return {
            titleForm: 'Đăng ký',
        };
    },
    components: {
        Register,
    },
    methods: {
        async handleSubmit(user) {
            const res = await authService.register(user);
            alert(res.message)
            if (res.status == "success") {
                this.$router.push({ name: "login"})
            }
        }
    },
};
</script>

<style scoped>
.container {
    max-width: 400px;
}
</style>