<template>
    <div class="page">
        <p>
            Oops, không thể tìm thấy trang. Trở về
            <router-link :to="{name: 'home'}">trang chủ.</router-link>
        </p>
    </div>
</template>

<style scoped>
.page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 1.5rem;
}
</style>