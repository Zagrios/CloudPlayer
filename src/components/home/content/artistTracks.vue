<template>
	<div id="playlistsTrack-page">
        <div id="nav-bar">
            <h1> {{this.$route.params.name}} </h1>
            <span id="search-bar">
                <input v-model="searchString" type="text" placeholder="Rechercher ...">
            </span>
        </div>
		<tracksList v-bind:tracks="this.artist.tracks"/>
    </div>
</template>

<script>
import tracksList from '../fragments/tracks/tracksList.vue';
import { mapGetters } from "vuex";

export default {
	data(){
		return{
			searchString: "",
			artist: Object(),
		}
	},
    methods:{
        setPlaylist:function(){
            var artists = this.$store.getters.getArtists;
            if(!artists || artists.length <= 0){ return Object(); }
            var routename = this.$route.params.name;
            var index = artists.map(e => e.name).indexOf(routename);
            return artists[index];
        },
    },
    computed:{
        ...mapGetters(["getTracks"]),
    },
    watch:{
        getTracks:{
            deep:true,
            handler(){
                this.$store.commit('setArtists', this.$func.asignArtist(this.$store.getters.getTracks)); 
                this.artist = this.setPlaylist();
            }
        },
    },
    components:{ tracksList },
	created(){
		this.artist = this.setPlaylist();
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