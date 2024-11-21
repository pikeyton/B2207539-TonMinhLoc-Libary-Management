<template>
    <div class="form-container">
    <title-form :title="titleForm"></title-form>
    <form>
        <div v-if="isRegister" class="form-group">
            <label for="public-id">ID</label>
            <input type="text" class="form-control" id="public-id" v-model="publicId" autocomplete="off">
        </div>

        <div v-if="isRegister" class="form-group">
            <label for="last-name">Họ</label>
            <input type="text" class="form-control" id="last-name" v-model="lastName" autocomplete="family-name">
        </div>

        <div v-if="isRegister" class="form-group">
            <label for="first-name">Tên</label>
            <input type="text" class="form-control" id="first-name" v-model="firstName" autocomplete="given-name">
        </div>

        <div v-if="isRegister" class="form-group">
            <label for="birth-day">Ngày Sinh</label>
            <input type="date" class="form-control" id="birth-day" v-model="birthDay">
        </div>

        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" v-model="email" autocomplete="email">
        </div>

        <div v-if="isRegister" class="form-group">
            <label for="address">Địa Chỉ</label>
            <input type="text" class="form-control" id="address" v-model="address" autocomplete="street-address">
        </div>

        <div v-if="isRegister" class="form-group">
            <label for="phone">Số Điện Thoại</label>
            <input type="text" class="form-control" id="phone" v-model="phoneNumber" autocomplete="tel">
        </div>

        <div class="form-group">
            <label for="password">Mật Khẩu</label>
            <input type="password" class="form-control" id="password" v-model="password" autocomplete="new-password">
        </div>

        <div v-if="isRegister" class="form-group">
            <label>
                <input type="radio" v-model="gender" value="Male" name="sex"> Nam
            </label>
            <label>
                <input type="radio" v-model="gender" value="Female" name="sex"> Nữ
            </label>
        </div>

        <div class="submit-form">
            <btn @submit="handleSubmit" :contentComponent="'<p>Submit</p>'"></btn>
        </div>
    </form>
    </div>
</template>

<script>
import TitleForm from "@/components/common/TitleFrom.vue";
import Btn from "@/components/common/ButtonA.vue";

export default {
    props: {
        isRegister: {
            type: Boolean,
            default: true,
        },
        titleForm: {
            type: String,
            default: "Login",
        },
    },
    emits: ["submit"],
    data() {
        return {
            publicId: "",
            lastName: "",
            firstName: "",
            birthDay: "",
            email: "",
            address: "",
            phoneNumber: "",
            password: "",
            gender: "Male", // Giá trị mặc định
        };
    },
    components: {
        TitleForm,
        Btn,
    },
    methods: {
        getData() {
            if (!this.email || !this.password) {
                alert("Email và mật khẩu không được để trống.");
                return null;
            }
            if (this.isRegister && (!this.firstName || !this.lastName)) {
                alert("Họ và tên không được để trống.");
                return null;
            }
            return {
                publicId: this.publicId,
                lastName: this.lastName,
                firstName: this.firstName,
                birthDay: this.birthDay,
                email: this.email,
                address: this.address,
                phoneNumber: this.phoneNumber,
                password: this.password,
                gender: this.gender,
            };
        },
        handleSubmit(event) {
            event.preventDefault();
            const data = this.getData();
            if (data) {
                this.$emit("submit", data);
            }
        },
    },
};
</script>

<style scoped>
.form-container {
    background-image: url('/path-to-background-image.jpg');
}
form {
    margin-top: 24px;
}

.submit-form {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
</style>
