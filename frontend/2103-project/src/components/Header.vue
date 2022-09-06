<template>
    <div class="headerContainer">
        <header>
            <h1>{{headerMain}}</h1>
            <h4>{{headerSub}}</h4>
        </header>
    </div>
</template>

<script>
export default {
    name: 'Header',
    props: {
        headerMain: String,
        headerSub: String,
    },
    components: {
    },
}
</script>

<style scoped>
.headerContainer {
    padding: 15px;
    padding-bottom: 50px;
    border-radius: 5px;
    text-align: center;
    /* margin-bottom: 50px; */
}
h1 {
    margin-top: 20px;
    margin-bottom: 30px;
    /* text-shadow: 2px 4px 30px #14213D; */
}
h4 {
    /* text-shadow: 2px 4px 30px #14213D; */
    color: #14213D;
}
</style>