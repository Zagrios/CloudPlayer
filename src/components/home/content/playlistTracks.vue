<template>
	<div id="playlistsTrack-page">
        <div id="nav-bar">
            <h1>{{ playlist.name }}</h1>
            <span id="search-bar">
                <input v-model="searchString" type="text" placeholder="Rechercher ...">
            </span>
            <span id="create-btn" @click="openModal">
                <BIconPencilFill id="create-icon"/>
                <span>Editer</span>
            </span>
        </div>
		<tracksList v-bind:tracks="this.playlist.tracks" :isPlaylistItem="true"></tracksList>
    </div>
</template>

<script>
import { BIconPencilFill } from 'bootstrap-icons-vue';
import tracksList from '../fragments/tracks/tracksList.vue';

export default {
	data(){
		return{
			searchString: "",
			playlist: Object(),
		}
	},
    methods:{
        openModal: function(){
            this.EventBus.emit('openModal', {type: 'createPlaylist'});
        }
    },
    components:{ BIconPencilFill, tracksList },
	mounted(){
		var playlists = this.$store.getters.getPlaylists;
		var l = playlists.length;
		var routename = this.$route.params.name;
		console.log(routename+" "+l);
		for(var i = 0; i < l; i++){
			if(playlists[i].name == routename){this.playlist = playlists[i]; return;}
		}
		
	},
}
</script>

<style lang='scss'>

#playlistsTrack-page{
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
                font-size: .8em;
            }
            &:hover{
                background-color: #202020;
            }
        }
    }
}

</style>