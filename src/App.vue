<template>
  <div id="app">
    <ihead />
    <router-view/>
  </div>
</template>

<script>
  import ihead from './components/ihead'

export default {
  name: 'App',
  components: {
    ihead
  }
}
</script>

<style>
  html,body{
    margin:0;
    padding:0;
    background: #fff;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

  ul,li{
    list-style-type: none;
    margin:0;
    padding:0;
  }
</style>
