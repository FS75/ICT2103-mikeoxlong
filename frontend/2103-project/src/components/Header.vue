<template>
    <div class="header mt-2">{{text}}</div>
</template>

<script>
export default {
    name: "Header",
    props: {
        text: String,
    }
}
</script>

<style scoped>
.header {
    display: flex;
    justify-content: flex-start;
}
</style>