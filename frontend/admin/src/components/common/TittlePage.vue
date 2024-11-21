<template>
    <h1 :class="['title', colorClass, sizeClass]">{{ title }}</h1>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        colorClass: {
            type: String,
            default: "text-plum" // Lớp CSS mặc định
        },
        sizeClass: {
            type: String,
            default: "text-large" // Kích thước mặc định
        }
    }
}
</script>

<style scoped>
.title {
    text-align: center;
}

.text-plum {
    color: plum;
}

.text-blue {
    color: blue;
}

.text-large {
    font-size: 2rem;
}

.text-small {
    font-size: 1rem;
}
</style>
