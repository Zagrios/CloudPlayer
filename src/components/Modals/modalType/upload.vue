<template>
	<div id="upload-modal">
		<div id="top">
			<span>Ajouter vos musiques</span>
			<span v-if="error" id="error-msg">{{errorMsg}}</span>
		</div>
		<div id="main">
			<form id="form">
				<span class="switch-mod-btn" v-if="!youtubeUpload" @click="youtubeUpload = !youtubeUpload">Lien Youtube</span>
				<span class="switch-mod-btn" v-if="youtubeUpload" @click="youtubeUpload = !youtubeUpload">Fichiers</span>
				<template v-if="!youtubeUpload">
					<input type="file" id="files" multiple accept="audio/*" @change="saveFiles" />
					<span id="note">
						<BIconDownload v-if="!uploading" class="icon"/>
						<div v-else class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
						<span v-if="!uploading">Glisser-déposer vos musiques</span>
						<span class="progress" v-else><span v-bind:style="{ width:this.uploadPercent+'%' }"></span></span>
					</span>
					<span id="files-text">{{ showFiles() }}</span>
				</template>
				<template v-else>
					<span v-if="!uploading" class="input-wrapper"><input type="text" placeholder="Coller ici le lien de la vidéo Youtube" v-model="youtubeLink"></span>
					<div v-else class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
				</template>
			</form>
		</div>
		<div id="bottom">
			<span class="btn" id="saveBtn" @click="uploadMusics">Ajouter</span>
			<span class="btn" id="cancelBtn" @click="close">Annuler</span>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import { BIconDownload } from 'bootstrap-icons-vue';

export default {
	name: "upload",
	data() {
		return {
			musics: null,
			uploading: false,
			uploadPercent: 0,
			error : false,
			errorMsg: "test",
			youtubeUpload: false,
			youtubeLink: "",
		};
	},
	methods: {
		close:function(){
			if(this.uploading){return;}
			this.$emit('close')
		},
		validateUrl:function(url){
			return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(url);
		},
		setProgressBar: function(percent){
			this.uploadPercent = percent;
		},
		saveFiles: function (e) {
			this.musics = e.target.files;
		},
		showFiles: function () {
			if (!this.musics || !this.musics.length) {
				return "Pas de musiques séléctionnées";
			}
			var s = "";
			for (var i = 0; i < this.musics.length; i++) {
				s += this.musics[i].name + " ";
			}
			return s;
		},
		uploadFromYoutube:function(){
			this.error = false; this.errorMsg = "";
			if(this.uploading){return;}
			if(!this.youtubeLink){return;}
			if(!this.validateUrl(this.youtubeLink)){this.errorMsg = "Lien Youtube invalide"; this.error = true; return;}
			var fd = new FormData();
			fd.append('token', this.$store.getters.getToken);
			fd.append('url', this.youtubeLink);
			this.uploading = true;
			axios({
				method: "POST",
				url: "http://localhost/cloudmusic_back/user/actions/youtubeUpload.php",
				data: fd,
			}).then((response) => {
				this.uploading = false;
				var data = response.data;
				if (response.status == 200 && data.status == 0 && data.tracks) 
				{
					this.addMusicsToStore(data.tracks);
					this.$emit('close');
				} 
				else 
				{
					this.error = true;
					if(!response || !response.status || response.status != 200 || data.status == 1){this.errorMsg = "Une erreur est survenue"; return;}
					else if(data.status == 2){this.errorMsg = "Vous possédez déjà cette musique"; return;}
					else{this.errorMsg = "Une erreur est survenue"; return;}
				}
			});
		},
		uploadMusics: function () {
			if(this.youtubeUpload){this.uploadFromYoutube(); return;}
			this.error = false;
			this.errorMsg = "";
			if (!this.musics || !this.musics.length) {return;}
			var fd = new FormData();
			for (var i = 0; i < this.musics.length; i++) 
			{
				fd.append("files[]", this.musics[i]);
			}
			fd.append("token", this.$store.getters.getToken);

			this.uploading = true;
			axios({
				method: "POST",
				url: "http://localhost/cloudmusic_back/user/actions/upload.php",
				data: fd,
				headers: { "Content-Type": "multipart/form-data" },
				onUploadProgress: progressEvent => { this.setProgressBar(Math.round((progressEvent.loaded * 100) / progressEvent.total)); }
			}).then((response) => {
				this.uploading = false;
				var data = response.data;
				if (response.status == 200 && data.status == 0 && data.tracks) 
				{
					this.addMusicsToStore(data.tracks);
					this.$emit('close');
				} 
				else 
				{
					this.error = true;
					if(!response || !response.status || response.status != 200 || data.status == 1){this.errorMsg = "Une erreur est survenue"; return;}
					else if(data.status == 2){this.errorMsg = "Type de fichier non valide"; return;}
					else{this.errorMsg = "Une erreur est survenue"; return;}
				}
			});
		},
		addMusicsToStore:function(tracks){
			tracks.forEach(track => {
				const index = this.$store.getters.getTracks.map(e => e.id).indexOf(track.id);
				if(index != -1){ 
					this.$store.state.tracks[index].album = track.album;
					this.$store.state.tracks[index].artist = track.artist;
					this.$store.state.tracks[index].duration = track.duration;
					this.$store.state.tracks[index].filename = track.filename;
					this.$store.state.tracks[index].id = track.id;
					this.$store.state.tracks[index].size = track.size;
					this.$store.state.tracks[index].title = track.title;
					this.$store.state.tracks[index].type = track.type;
				}
				else{ this.$store.state.tracks.push(track); }
			});
		}
	},
	components:{BIconDownload},
};
</script>

<style lang='scss'>
#upload-modal {
	width: 650px;
	height: 400px;
	margin-bottom: 50px;
	background-color: #212121;
	z-index: 1;
	border: solid black 0;
	border-radius: 5px;
	display: flex;
	flex-direction: column;
	div {
		width: 100%;
	}
	#top {
		display: flex;
		align-content: center;
		align-items: center;
		justify-content: space-between;
		height: 45px;
		border-bottom: solid #c9c9c9 2px;
		span {
			margin-left: 5%;
			margin-right: 5%;
			letter-spacing: 1px;
			color: white;
		}
		#error-msg{color: crimson; font-weight: 600;}
	}
	#main {
		display: flex;
		align-items: center;
		align-content: center;
		justify-content: center;
		height: 75%;
		form {
			position: relative;
			width: 90%;
			height: 90%;
			display: flex;
			align-content: center;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			border: dashed white 3px;
			border-radius: 5px;
			.switch-mod-btn{
				position: absolute;
				top: 7px;
				right: 7px;
				color: white;
				font-size: .8em;
				cursor: pointer;
				background-color: rgb(61, 61, 61);
				width: 100px;
				text-align: center;
				z-index: 2;
				border: solid black 0;
				border-radius: 10px;
				transition: background-color .1s ease;
				user-select: none;
				&:hover{background-color: rgb(97, 96, 96);}
			}
			#files {
				position: absolute;
				width: 100%;
				height: 100%;
				opacity: 0;
				z-index: 1;
			}
			#note {
				z-index: -1;
				position: absolute;
				display: flex;
				flex-direction: column;
				align-items: center;
				color: rgb(136, 136, 136);
				letter-spacing: 1px;
				.icon {
					font-size: 3.5em;
					margin-bottom: 5px;
				}
				.progress{
					overflow: hidden;
					width: 250px;
					height: 5px;
					background-color: #2b2b2b;
					border: 0 solid black;
					border-radius: 5px;
					span{
						display: block;
						height: 100%;
						max-width: 100%;
						background-color: white;
						border: 0 solid black;
						border-radius: 5px;
						transition: width .25s ease;
					}
				}
			}
			#files-text {
				max-width: 80%;
				position: absolute;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
				bottom: 40px;
				letter-spacing: 1px;
				color: white;
			}
		}
	}
	#bottom {
		height: 50px;
		border-top: solid #c9c9c9 2px;
		display: flex;
		align-items: center;
		align-content: center;
		justify-content: center;
		.btn {
			display: flex;
			align-content: center;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			margin-left: 10px;
			margin-right: 10px;
			height: 27px;
			width: 90px;
			font-weight: bold;
			letter-spacing: 1px;
			border-radius: 5px;
			transition: all 0.1s ease;
			color: white;
		}
		#saveBtn {
			border: solid rgb(58, 212, 65) 1px;
			&:hover {
				background-color: rgb(58, 212, 65);
			}
		}
		#cancelBtn {
			border: solid crimson 1px;
			&:hover {
				background-color: crimson;
			}
		}
	}
}

#upload-modal{
	.input-wrapper{
		background-color: rgb(75, 75, 75);
		width: 80%;
		height: 50px;
		overflow: hidden;
		border:0;
		border-radius: 50px;
		padding-left: 10px;
		input[type=text]{
			width: 100%;
			height: 100%;
			background-color: rgba($color: #000000, $alpha: 0.0);
			border: 0;
			letter-spacing: 1px;
			font-size: 1.1em;
			outline: none;
			color:white;
			&::placeholder{
				color: rgb(214, 214, 214);
			}
		}
	}
	
}

/* #region pure css loader*/
.lds-ellipsis {
  display: inline-block;
  position: relative;
  max-width: 80px;
  height: 80px;
}
.lds-ellipsis div {
  position: absolute;
  top: 33px;
  max-width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #fff;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}
/* #endregion */
</style>