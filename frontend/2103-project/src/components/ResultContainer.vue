<template>
    <div class="resultContainer">
        <header>{{headerText}}</header>
        <h3>{{value}}</h3>
    </div>
</template>

<script>
    export default {
        name: "ResultContainer",
        props: {
            headerText: String,
            value: String,
        },
        components: {
            
        },
    }
</script>

<style scoped>
    .resultContainer{
        margin: 10px;
        width: 250px;
        height: 100px;
        border: 2px solid black;
        border-radius: 10%;
    }
</style>