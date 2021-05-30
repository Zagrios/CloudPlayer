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
        },
        loadTracks: function() {
            if(!this.$store.getters.getToken){return;}
            let data = new FormData();
            data.append("token", this.$store.getters.getToken);
            axios({
                method:'POST',
                url:'http://localhost/cloudmusic_back/user/actions/getAllTracksInfo.php',
                data
            }).then((response) => {
                var data = response.data;
                if(response && response.status && response.status == 200 && data && data.status == 0 && data.tracks && data.tracks.length > 0)
                {
                    this.$store.state.tracks = data.tracks.sort(this.$func.compareName);
                }
            });
        }
    },
    beforeCreate(){
      if(this.$store.getters.getToken == null || this.$store.getters.getUserName == null){this.$router.push({path:"/"});}
    },
    mounted(){
        this.loadTracks();
    },
    
}
</script>

<style>

#home{
  width: 100%;
  height: 100%;
  max-height: 100%;
  max-width: 100%;
  min-width: 100%;
  min-height: 100%;
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  position: relative;
}

#content{
    display: flex;
    flex-direction: row;
    max-height: calc(100% - 75px);
    min-height: calc(100% - 75px);;
}

</style>