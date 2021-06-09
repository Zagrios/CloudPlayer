<template>
  <div id="removeTrackPlaylist">
        <div id="head">
            <span>Enlever de la playlist ?</span>
            <span id="error-msg" v-if="error">Une erreur est survenue</span>
        </div>
        <div class="track-wrapper">   
            <span v-if="!deleting" class="track">Voulez vous vraiment enlever {{track.title}} de la playlist ?</span>
            <div v-else class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
        <div id="bottom">
			<span class="btn" id="cancelBtn" @click="$emit('close')">Annuler</span>
			<span class="btn" id="delBtn" @click="deleteTrack">Enlever</span>
        </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            deleting:false,
            error:false
        }
    },
    methods:{
        deleteTrack:function(){
			var playlistId = this.playlist.id;
			var trackId = this.track.id;
			var token = this.$store.getters.getToken;
			let data = new FormData();
            data.append("token", token);
			data.append("playlistId", playlistId);
            data.append("trackId", trackId);
            this.deleting = true;
            this.error = false;
            axios({
                method:'POST',
                url:'http://localhost/cloudmusic_back/user/actions/removeTrackFromPlaylist.php',
                data
            }).then((response) => {
                this.deleting = false;
                if(response.status == 200 && response.data == 0){this.deleteTrackFromPlaylist(playlistId, trackId); this.$emit('close'); return;}
                this.error = true;
            });
        },
        deleteTrackFromPlaylist:function(playlistId, trackId){
            const indexTrack = this.playlist.tracks.map(e => e.id).indexOf(trackId);
			const indexPlaylist = this.$store.getters.getPlaylists.map(e => e.id).indexOf(playlistId);
            if(indexPlaylist != -1 && indexTrack != -1){  this.$store.getters.getPlaylists[indexPlaylist].tracks.splice(indexTrack, 1); }
        },
    },
    props:{
        track:Object, playlist:Object,
    },
}
</script>

<style lang='scss' scoped>

#removeTrackPlaylist{
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