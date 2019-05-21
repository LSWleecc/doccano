<template>
  <div id="app">
    <Msit/>
  </div>
</template>

<script>
import Msit from './pages/Msit.vue'

export default {
  name: 'App',
  components: {
    Msit
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
