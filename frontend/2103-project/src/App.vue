<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/login">Login</router-link>
  </nav>
  <router-view/>
</template>

<style>

  body {
    padding: 0;
    margin: 0;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: #E5E5E5;
    height: 100%;
  }

  nav {
    padding: 10px;
  }

  nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  nav a.router-link-exact-active {
    color: #42b983;
  }

  header {
        margin: 10px;
    }

  .rowContainer{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .columnContainer{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
