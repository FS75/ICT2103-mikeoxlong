<template>
    <div class="itemContainerWithDropdown" :style="{width: givenWidth}">
        <header>{{text}}</header>
        <select :id=givenId>
            <option selected disabled>Choose a {{text}}</option>
        </select>
    </div>
</template>

<script>
    export default {
        name: "ItemContainerWithDropdown",
        components: {

        },
        props: {
            text: String,
            givenId: String,
            givenWidth: String,
        }
    }
</script>

<style scoped>
    .itemContainerWithDropdown {
        margin: 10px;
        margin-top: 30px;
        width: 300px;
        height: 300px;
        background-color: lightgrey;
        border: 2px solid grey;
        border-radius: 10%;
    }
</style>