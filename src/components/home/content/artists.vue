<template>
	<div id="artists-page">
        <div id="nav-bar">
            <h1>Artistes</h1>
            <span id="search-bar">
                <input v-model="searchString" type="text" placeholder="Rechercher ...">
            </span>
        </div>
        <playlistList :playlists="artists" @clickDeleteButton="deletePlaylist" @openFolder="openPlaylist" @download="downloadPlaylist"/>
    </div>
</template>

<script>
import playlistList from '../fragments/playlists/playlistList.vue'

export default {
    name:'artists',
	data(){
		return{
			searchString: "",
			artists:Array(),
		}
	},
    methods:{
        deletePlaylist:function(data){
            this.EventBus.emit('openModal', {type: 'deleteTracks', parms:{'playlist': data, 'type':'artist'}});
        },
        openPlaylist:function(artists){
            this.$router.push("/home/artists/"+artists.name);
        },
        downloadPlaylist:function(playlist){
            if(!playlist.tracks || playlist.tracks == null || playlist.tracks.length <= 0){return;}
            var tracksIds = playlist.tracks.map(e => e.id);
            var tracksIdsUrl = tracksIds.map(function(el, idx){ return 'tracksIds[' + idx + ']=' + el; }).join('&');
            var token = this.$store.getters.getToken;
            window.location.assign("http://localhost/cloudmusic_back/user/actions/downloadTracks.php?token="+token+"&name="+playlist.name+"&"+tracksIdsUrl);
        },
    },
	created(){
		if(!this.$store.getters.getTracks || this.$store.getters.getTracks.length <= 0){return;}
		this.$store.commit('setArtists', this.$func.asignArtist(this.$store.getters.getTracks)); 
		this.artists = this.$store.getters.getArtists;

	},
    components:{ playlistList },
}
</script>

<style lang='scss'>

#artists-page{
    width: 100%;
    height: 100%;
    #nav-bar{
        display: flex;
        align-content: center;
        align-items: center;
        height: 70px;
        width: 100%;
        padding-top: 6px;
        h1{
            float: left;
            letter-spacing: 1px;
            font-weight: 700;
            margin-top: 0;
            margin-bottom: 5px;
            margin-right: 20px;
        }
        #search-bar{
            display: flex;
            align-items: center;
            align-content: center;
            background-color: #181818;
            height: 20px;
            width: 250px;
            border: 0 solid black;
            border-radius: 20px;
            padding-left: 7px;
            color: rgb(129, 129, 129);
            input[type=text]{
                width: 100%;
                background-color: rgba($color: #000000, $alpha: 0.0);
                border: 0;
                letter-spacing: 1px;
                outline: none;
                color:inherit
            }
        }
        #create-btn{
            height: 20px;
            margin-left: 15px;
            display: flex;
            align-items: center;
            align-content: center;
            background-color: #181818;
            border: solid black 0;
            border-radius: 20px;
            padding: 0 10px 0 5px;
            letter-spacing: 1px;
            cursor: pointer;
            span{
                font-size: 0.83em;
            }
            #create-icon{
                margin-right: 5px;
                font-size: 1.4em;
            }
            &:hover{
                background-color: #202020;
            }
        }
    }
}

</style>