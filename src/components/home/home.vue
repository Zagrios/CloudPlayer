<template>
    <div id="home">
        <div id="content">
            <side-bar v-on:logOut="logOut"></side-bar>
            <router-view></router-view>
        </div>
        <player></player>
    </div>
</template>

<script>
import player from "./player/player"
import sideBar from "./content/sideBar"
import axios from "axios"

export default {
    name: 'Home',
    components:{
      player,
      sideBar,
    },
    methods:{
        logOut: function() {
            this.$func.createCookie("token", "", -1);
            let data = new FormData();
			data.append("token", this.$store.getters.getToken);
            axios({
				method:'POST',
                url:'http://localhost/cloudmusic_back/user/forms/logout.php',
                data
			}).then((response) => {
				if(response.status == 200 && response.data == 0)
				{
					console.log("Déconnecté !");
				}
				else
				{
					console.log("erreur")
				}
			})
            this.$store.state.username = null;
            this.$store.state.token = null;
            this.$router.push({path:"/"})
        }
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