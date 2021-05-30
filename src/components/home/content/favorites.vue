<template>
	<div id="favorites-page">
        <div id="nav-bar">
            <h1>Favoris</h1>
            <span id="search-bar">
                <input v-model="searchString" @keyup="search" type="text" name="" id="" placeholder="Rechercher ...">
            </span>
        </div>
		<track-list v-bind:tracks="this.favorites"></track-list>
    </div>
</template>

<script>
import tracksList from '../fragments/tracks/tracksList.vue';
export default {
	name:'favorites',
	data(){
		return{
			favorites:null,
			searchString:"",
		}
	},
	methods:{
		search:function(){
            if(!this.searchString){ this.favorites = this.favorites.sort(this.$func.compareName); }
            else{ this.favorites = this.$func.sortArrayBySearch(this.favorites, this.searchString); }
        }
	},
	components:{
		'track-list':tracksList,
	},
	created(){
		var favs = Array();
		for(var i = 0; i < this.$store.getters.getTracks.length; i++){
			let track = this.$store.getters.getTracks[i];
			if(track.isFav == true){ favs.push(track); }
		}
		this.favorites = favs.sort(this.$func.compareName);
	},
}
</script>

<style lang='scss'>

#favorites-page{
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
    }
}

</style>