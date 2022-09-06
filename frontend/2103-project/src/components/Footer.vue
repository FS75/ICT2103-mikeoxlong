<template>
    <div class="footerContainer">
        <a :href="githubLink" target="_blank"></a>
    </div>
</template>

<script>
    export default {
        name: 'Footer',
        props: {
            githubLink: String,
        },
        data() {
            return {
            }
        },
    }
</script>

<style scoped>
.footerContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px;
    bottom: 0;
    left: 0;
    margin: 0;
}
</style>