<template>
	<div id="playlists-page">
        <div id="nav-bar">
            <h1>Playlists</h1>
            <span id="search-bar">
                <input v-model="searchString" @keyup="search" type="text" placeholder="Rechercher ...">
            </span>
            <span id="create-btn" @click="openModal">
                <BIconPlus id="create-icon"/>
                <span>Créer</span>
            </span>
        </div>
        <playlistList :playlists="this.$store.getters.getPlaylists" @clickDeleteButton="deletePlaylist" @openFolder="openPlaylist" @download="downloadPlaylist"/>
    </div>
</template>

<script>
import axios from "axios";
import { BIconPlus } from 'bootstrap-icons-vue';
import playlistList from '../fragments/playlists/playlistList.vue'

export default {
    name:'playlists',
	data(){
		return{
			searchString: "",
		}
	},
    methods:{
        openModal: function(){
            this.EventBus.emit('openModal', {type: 'createPlaylist'});
        },
        deletePlaylist:function(data){
            this.EventBus.emit('openModal', {type: 'deletePlaylist', parms:{'playlist': data}});
        },
        openPlaylist:function(playlist){
            this.$router.push("/home/playlists/"+playlist.name);
        },
        downloadPlaylist:function(playlist){
            if(!playlist.tracks || playlist.tracks == null || playlist.tracks.length <= 0){return;}
            var tracksIds = playlist.tracks.map(e => e.id);
            var tracksIdsUrl = tracksIds.map(function(el, idx){ return 'tracksIds[' + idx + ']=' + el; }).join('&');
            var token = this.$store.getters.getToken;
            window.location.assign("http://localhost/cloudmusic_back/user/actions/downloadTracks.php?token="+token+"&name="+playlist.name+"&"+tracksIdsUrl);
        },
		search:function(){
			if(!this.searchString){ this.$store.getters.getPlaylists.sort(this.$func.comparePlaylist); }
            else{ this.$store.commit('setPlaylists', this.$func.sortPlaylistBySearch(this.$store.getters.getPlaylists, this.searchString));}
		}
    },
	created(){
		if(this.$store.getters.getPlaylists.length > 0){return;}
		var token = this.$store.getters.getToken;
		axios({
			method: "GET",
			url: "http://localhost/cloudmusic_back/user/actions/getPlaylists.php?token="+token,
		}).then((response) => {
            var res = response.data;
			if (response.status == 200 && res.status == 0 && res.playlists.length > 0) {
                this.$store.commit('setPlaylists', res.playlists.sort(this.$func.comparePlaylist));
			}
		});
	},
	mounted(){
		this.$store.commit('setPlaylists', this.$store.getters.getPlaylists.sort(this.$func.comparePlaylist));
	},
    components:{ BIconPlus, playlistList },
}
</script>

<style lang='scss'>

#playlists-page{
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