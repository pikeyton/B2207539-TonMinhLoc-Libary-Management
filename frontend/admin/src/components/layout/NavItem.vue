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

<style scoped>
router-link {
    text-decoration: none;
    color: #007bff;
}

router-link:hover {
    text-decoration: underline;
    color: #0056b3;
}
</style>
