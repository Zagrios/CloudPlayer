<template>
	<div id="playlists-page">
        <div id="nav-bar">
            <h1>Playlists</h1>
            <span id="search-bar">
                <input v-model="searchString" type="text" placeholder="Rechercher ...">
            </span>
            <span id="create-btn">
                <BIconPlus id="create-icon"/>
                <span>Créer</span>
            </span>
        </div>

    </div>
</template>

<script>
import axios from "axios";
import { BIconPlus } from 'bootstrap-icons-vue';

export default {
    name:'playlists',
	data(){
		return{
			searchString: "",
		}
	},
	created(){
		if(this.$store.getters.getPlaylists){return;}
		var token = this.$store.getters.getToken;
		axios({
			method: "GET",
			url: "http://localhost/cloudmusic_back/user/actions/getPlaylists.php?token="+token,
		}).then((response) => {
			console.log(response);
            var res = response.data;
			if (response.status == 200 && res.status == 0 && res.playlists.length > 0) {
				console.log(res.playlists);
			}
		});
	},
    components:{ BIconPlus },
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