<template>
    <h2 class="title">
        {{ title }}
    </h2>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        }
    
    }
};
</script>

<style scoped>
h2.title {
    text-align: center;
    font-size: 24px;
    padding: 20px 8px;
}
</style>