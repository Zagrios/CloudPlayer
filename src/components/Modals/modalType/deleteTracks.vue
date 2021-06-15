<template>
    <div id="delete-track">
        <div id="head">
            <span>Supprimer les musiques ?</span>
            <span id="error-msg" v-if="error">Une erreur est survenue</span>
        </div>
        <div class="track-wrapper">   
            <span v-if="!deleting && type == 'artist'" class="track">Voulez vous vraiment supprimer les {{playlist.tracks.length}} musiques de l'artiste {{playlist.name}} ? Cette opération ne peut pas être annulé.</span>
            <span v-else-if="!deleting && type == 'album'" class="track">Voulez vous vraiment supprimer les {{playlist.tracks.length}} musiques de l'album {{playlist.name}} ? Cette opération ne peut pas être annulé.</span>
            <div v-else class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
        <div id="bottom">
			<span class="btn" id="cancelBtn" @click="$emit('close')">Annuler</span>
			<span class="btn" id="delBtn" @click="deleteTrack">Supprimer</span>
        </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
    name:'deleteTrack',
    data(){
        return{
            deleting:false,
            error:false
        }
    },
    methods:{
        deleteTrack:function(){
            if(!this.playlist.tracks || this.playlist.tracks.length <= 0){return;}
            var tracksIds = this.playlist.tracks.map(e => e.id);
            var token = this.$store.getters.getToken;
            let data = new FormData();
            data.append("token", token);
            tracksIds.forEach((id) => {data.append('tracksIds[]', id)});
            this.deleting = true;
            this.error = false;
            axios({
                method:'POST',
                url:'http://localhost/cloudmusic_back/user/actions/deleteTracks.php',
                data
            }).then((response) => {
                this.deleting = false;
                if(response.status == 200 && response.data == 0){ this.deleteTypeFromStore(this.playlist, this.type); this.$emit('close'); return;}
                this.error = true;
            });
        },
        deleteTypeFromStore:function(playlist, type){
			if(type == 'artist'){
				const index = this.$store.getters.getArtists.map(e => e.name).indexOf(playlist.name);
				if(index == -1){return;}
				this.$store.state.artists.splice(index, 1);
			}
			else if(type == 'album'){
				const index = this.$store.getters.getAlbums.map(e => e.name).indexOf(playlist.name);
				if(index == -1){return;}
				this.$store.state.albums.splice(index, 1);
			}
			else{return;}
			this.deleteTracksFromStore(playlist.tracks);
        },
        deleteTracksFromStore:function(tracks){
			var idsToDelete = tracks.map(e => e.id);
			var indexs = this.$store.getters.getTracks.map(e => idsToDelete.includes(e.id) ? this.$store.getters.getTracks.map(a => a.id).indexOf(e.id) : '').filter(String);
			for(var i = indexs.length - 1; i >= 0; i--){
				this.$store.getters.getTracks.splice(indexs[i], 1);
			}

        }
    },
    props:{
        playlist:Object,
        type: String,
    },
}
</script>

<style lang='scss' scoped>

#delete-track{
    z-index: 1;
    width: 650px;
    margin-bottom: 50px;
    background-color: #212121;
    color: white;
    border: solid black 0;
    border-radius: 5px;
    #head {
		display: flex;
		align-content: center;
		align-items: center;
		justify-content: space-between;
		height: 45px;
		border-bottom: solid #c9c9c9 1px;
		span {
			margin-left: 5%;
			margin-right: 5%;
			letter-spacing: 1px;
			color: white;
		}
		#error-msg{color: crimson; font-weight: 600;}
	}
    .track-wrapper{
        height: 100px;
        width: 100%;
        display: flex;
        align-content: center;
        align-items: center;
        justify-content: center;
        margin: 20px 0 20px 0;
        .track{
            max-width: 90%;
            text-align: center;
            letter-spacing: 1px;
        }

    }
    #bottom {
		height: 50px;
		border-top: solid #c9c9c9 1px;
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
		#delBtn {
			border: solid crimson 1px;
			&:hover { background-color: crimson; }
		}
	}
}

/* #region pure css loader*/
.lds-ellipsis {
  display: inline-block;
  position: relative;
  height: 80px;
  width: 100%;
}
.lds-ellipsis div {
  position: absolute;
  top: 33px;
  width: 13px;
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