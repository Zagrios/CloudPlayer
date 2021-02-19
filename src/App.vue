<template>
  <div id="app">
    <Init></Init>
  </div>
</template>

<script>

import Init from './components/init'

export default {
  name: 'App',
  components: {
    Init,
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Montserrat',Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
