<template>
  <div><h1>OUAI</h1></div>
</template>

<script>
export default {
    name: 'Home',
    beforeCreate(){
      if(this.$store.getters.getToken == null || this.$store.getters.getUserName == null){this.$router.push({path:"/"})}
    },
}
</script>

<style>

</style>