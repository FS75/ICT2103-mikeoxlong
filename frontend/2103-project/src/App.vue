<template>
    <Header headerMain="ICT 2103 - Information Management" headerSub="done by Group mikeoxlong"></Header>
    <Overview></Overview>
    <Footer githubLink="https://github.com/FS75/ICT2103-mikeoxlong"></Footer>
</template>

<script>
  import Header from "./components/Header.vue"
  import Overview from "./components/Overview.vue"
  import Footer from "./components/Footer.vue"

  export default {
    name: 'Main',
    components: {
      Header,
      Overview,
      Footer,
    },
    data() {
      return {

      }
    },
    methods: {

    },
    
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400&display=swap');
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

#app {
  font-family: 'Helvetica';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #022B3A;
  background-color: #E5E5E5;
  height: 100%;
}
.app-container {
  text-align: center;
}
body #app .p-button {
  margin-left: .2em;
}
form {
  margin-top: 2em;
}
</style>

