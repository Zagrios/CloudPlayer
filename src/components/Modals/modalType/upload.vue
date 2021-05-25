<template>
	<div id="upload-modal">
		<div id="top">
			<span>Ajouter vos musiques</span>
			<span v-if="error" id="error-msg">{{errorMsg}}</span>
		</div>
		<div id="main">
			<form id="form">
				<input type="file" id="files" multiple accept="audio/*" @change="saveFiles" />
				<span id="note">
					<b-icon-download v-if="!uploading" class="icon" />
					<div v-else class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
					<span v-if="!uploading">Glisser-déposer vos musiques</span>
					<span v-else>Envoi en cours ...</span>
				</span>
				<span id="files-text">{{ showFiles() }}</span>
			</form>
		</div>
		<div id="bottom">
			<span class="btn" id="saveBtn" @click="uploadMusics">Ajouter</span>
			<span class="btn" id="cancelBtn" @click="$emit('close')">Annuler</span>
		</div>
	</div>
</template>

<script>
import { BIconDownload } from "bootstrap-vue";
import axios from "axios";

export default {
	name: "Upload",
	data() {
		return {
			musics: null,
			uploading: false,
			error : false,
			errorMsg: "test",
		};
	},
	components: {
		BIconDownload,
	},
	methods: {
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
		uploadMusics: function () {
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
			}).then((response) => {
				this.uploading = false;
				if (response.status == 200 && response.data == 0) 
				{
					this.$emit('close');
				} 
				else 
				{
					this.error = true;
					if(!response || !response.status || response.status != 200 || response.data == 1){this.errorMsg = "Une erreur est survenue"; return;}
					else if(response.data == 2){this.errorMsg = "Type de fichier non valide"; return;}
					else{this.errorMsg = "Une erreur est survenue"; return;}
				}
			});
		},
	},
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
			}
			#files-text {
				max-width: 80%;
				position: absolute;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
				bottom: 40px;
				letter-spacing: 1px;
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