<template>
    <div id="home">
        <div id="content">
            <nav-bar></nav-bar>
        </div>
        <player></player>
    </div>
</template>

<script>
import player from "./player/player"
import navBar from "./content/navBar"

export default {
    name: 'Home',
    components:{
      player,
      navBar,
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
  max-height: 100%;
  max-width: 100%;
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
}

#content{
    flex: 1;
    display: flex;
    flex-direction: row;
}

</style>