<template>
  <div id="home">
    <player></player>
  </div>
</template>

<script>
import player from "./player/player"

export default {
    name: 'Home',
    components:{
      player,
    },
    beforeCreate(){
      if(this.$store.getters.getToken == null || this.$store.getters.getUserName == null){this.$router.push({path:"/"})}
    },
    
}
</script>

<style>

#home{
  width: 100%;
  height: 100%;
  background-color: black;
  color: white;
}

</style>