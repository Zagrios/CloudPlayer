<template>
	<div id="edit-playlist">
		<div class="head">
			<span class="title" @click="test">Editer une playlist</span>
			<span id="error-msg" v-if="error">{{errMessage}}</span>
		</div>
		<div class="main">
			<div id="title-wrapper">
				<div id="title">
					<span>Nom : </span>
					<span id="title-input"><input type="text" maxlength="20" placeholder="Nom de la playlist" v-model="name"></span>
				</div>
			</div>
			<div id="tracks-wrapper">
				<trackListModal :title="'Ajouter ou enlever des musiques'" :tracksP="$store.getters.getTracks" v-model="selectedTrack" :preselectId="preselectedIds"/>
			</div>
		</div>
		<div class="bottom">
			<span class="btn" id="createBtn" @click="editPlaylist()">Enregistrer</span>
			<span class="btn" id="cancelBtn" @click="$emit('close')">Annuler</span>
		</div>
	</div>
</template>

<script>
import trackListModal from './modalComponents/trackListModal.vue';
import axios from 'axios';

export default {
	data(){
		return{
			name:this.playlist.name,
			selectedTrack:new Array(),
			preselectedIds:new Array(),
			error: false,
			errMessage : "",
		}
	},
	methods:{
		editPlaylist: function(){
			this.error = false;
			this.errMessage = "";
			if(this.name.length <= 1){this.error = true; this.errMessage = "Le nom de la playlist est trop court"; return;}
			var data = new FormData();
			data.append('token', this.$store.getters.getToken);
			data.append('old_name', this.playlist.name);
			data.append('name', this.name);
			this.selectedTrack.forEach((id) => {data.append('tracksId[]', id)});
			axios.post(this.$store.getters.getApiUrl+"post/createPlaylist.php", data).then((response) => {
				var data = response.data;
				if(response.status == 200 && data.status == 0){
					this.$router.push("/home/playlists/"+this.name);
					var playlist = data.playlist;
					this.$func.asignTrackToPlaylist(this.$store.getters.getTracks, playlist)
					this.$store.commit('updatePlaylist', playlist);
					this.$store.getters.getPlaylists.sort(this.$func.comparePlaylist);
					this.$emit('close');
				}
				else{
					if(data.status == 2){ this.errMessage = "Le nom est trop court"; }
					else if(data.status == 3){ this.errMessage = "Le nom est trop long"; }
					else if(data.status == 4){ this.errMessage = "La playlist existe déjà"; }
					else{ this.errMessage = "Une erreur est survenue" }
					this.error = true;
				}
			});
		},
	},
	created(){
		if(!this.playlist.tracks){return;}
		var tracks = this.playlist.tracks;
		var ids = new Array();
		tracks.forEach(track => ids.push(track.id));
		this.preselectedIds = ids;
	},
	props:{playlist:Object},
	components:{trackListModal},
}
</script>

<style lang='scss' scoped>

#edit-playlist{
    z-index: 1;
    width: 650px;
    margin-bottom: 50px;
    background-color: #212121;
    color: white;
    border: solid black 0;
    border-radius: 5px;
	.head{
		width: 100%;
		height: 45px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #c9c9c9;
		.title{ margin-left: 5%; letter-spacing: 1px;}
		#error-msg{color: crimson; font-weight: 600; margin-right: 5%;}
	}
	.main{
		display: flex;
		justify-content: center;
		flex-direction: column;
		width: 90%;
		margin-left: 5%;
		#title-wrapper{
			padding-left: 2%;
			width: 98%;
			height: 40px;
			margin-top: 10px;
			margin-bottom: 10px;
			background-color: rgb(14, 14, 14);
			border: solid black 0;
			border-radius: 10px;
			#title{
				width: 100%;
				display: flex;
				align-items: center;
				height: 100%;
				#title-input{
					width: 87%;
					margin-left: 5px;
					display: flex;
					background-color: #212121;
					height: 25px;
					border: 0 solid black;
					border-radius: 20px;
					padding-left: 7px;
					color: rgb(167, 167, 167);
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
		#tracks-wrapper{
			background-color: black;
			margin-bottom: 10px;
			border: 0 solid black;
			border-radius: 10px;
			
		}
	}
	.bottom{
		height: 50px;
		border-top: solid #c9c9c9 1px;
		display: flex;
		align-items: center;
		align-content: center;
		justify-content: center;
		.btn {
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			margin-left: 10px;
			margin-right: 10px;
			height: 27px;
			width: 120px;
			font-weight: bold;
			letter-spacing: 1px;
			border-radius: 5px;
			transition: all 0.1s ease;
			color: white;
		}
		#cancelBtn {
			border: solid #C1C1C1 1px;
			&:hover { background-color: #C1C1C1; }
		}
		#createBtn {
			border: solid rgb(58, 212, 65) 1px;
			&:hover { background-color: rgb(58, 212, 65); }
		}
	}
}

/* #region scrollbar*/

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #838383;
  border: solid black 0;
  border-radius: 20px;
}

::-webkit-scrollbar-thumb {
  background: rgb(75, 75, 75);
  border: solid black 0;
  border-radius: 20px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* #endregion */

</style>