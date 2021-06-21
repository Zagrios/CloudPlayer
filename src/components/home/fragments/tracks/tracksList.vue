<template>
	<div id="track-list">
		<div id="wrapper">
			<trackItem v-for="(track, index) in tracks" :key="track.id" :index="index" :trackP="track" :isPlaylistItem="isPlaylistItem" @removeFromPlaylist="removeFromPlaylist" @play="play"></trackItem>
		</div>
	</div>
</template>

<script>
import trackItem from "./trackItem";

export default {
    name:'tracksList',
    props:{tracks:Object(), isPlaylistItem:{type:Boolean, default:false}},
    methods:{
		removeFromPlaylist: function(data){
			this.$emit('removeFromPlaylist', data);
		},
		play:function(index){
			var tracks = [...this.tracks];
			var payload = {'tracks':tracks, 'index':index};
			this.$store.commit('setCurrentPlaylist', payload);
		}
    },
    components:{
        trackItem,
    },
}
</script>

<style lang='scss' scoped>

#track-list{
    width: 100%;
    max-height: calc(100% - 75px);
    height: calc(100% - 75px);
    overflow-y: scroll;
	#wrapper{
    width: fit-content;
		display: flex;
		flex-flow: row wrap;
		overflow-x: hidden;
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